const path = require("path");

const rulePaths = ["src/handles/", "src/triggerEvents"];

const isNeedCheck = (relativePath) => {
    return rulePaths.some((rulePath) => {
        return relativePath.replaceAll("\\", "/").startsWith(rulePath);
    });
};

module.exports = {
    meta: {
        messages: {
            avoidName: "Avoid using variables named '{{ name }}'",
            avoidDefaultExport: "Avoid using defaultExport",
            allowSingleNamedExport: "Allow single named export value",
            namedExportNotFound: "Named export value not found",
            namedExportMissmatchName:
                "Named export name does not match file name. Excepted {{ fileName }} got {{ className }}",
        },
    },
    create(context) {
        if (!isNeedCheck(path.relative(context.getCwd(), context.filename))) return {};

        const sourceCode = context.sourceCode;

        const defaultExportNodes = sourceCode.ast.body.filter((node) => node.type === "ExportDefaultDeclaration");

        if (defaultExportNodes.length > 0) {
            context.report({
                node: defaultExportNodes[0],
                messageId: "avoidDefaultExport",
            });
        }

        const namedExportNodes = sourceCode.ast.body.filter(
            (node) => node.type === "ExportNamedDeclaration" && node.exportKind !== "type"
        );

        if (namedExportNodes.length < 1) {
            context.report({
                node: sourceCode.ast,
                messageId: "namedExportNotFound",
            });
        } else if (namedExportNodes.length === 1) {
            const fileName = path.parse(context.filename).name;
            const className = namedExportNodes[0].declaration.id.name;

            if (fileName !== className)
                context.report({
                    node: namedExportNodes[0],
                    messageId: "namedExportMissmatchName",
                    data: {
                        fileName,
                        className,
                    },
                });
        } else if (namedExportNodes.length > 1) {
            namedExportNodes.forEach((i) => {
                context.report({
                    node: i,
                    messageId: "allowSingleNamedExport",
                });
            });
        }

        return {};
    },
};
