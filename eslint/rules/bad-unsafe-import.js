const path = require("path");

const whiteList = ["src/typesAppener.ts", "src/test.ts"];

const isNeedCheck = (relativePath) => {
    return !whiteList.some((rulePath) => {
        return relativePath.replaceAll("\\", "/").startsWith(rulePath);
    });
};

module.exports = {
    meta: {
        messages: {
            importNotAllowedHere: "Import {{ specifier }} from unsafe not allowed here",
        },
        fixable: "code",
    },
    create(context) {
        if (!isNeedCheck(path.relative(context.getCwd(), context.filename))) return {};

        return {
            ImportDeclaration: function (node) {
                if (node.source.value === "@war3js/unsafe") {
                    node.specifiers.forEach((importSpecifier) => {
                        if (importSpecifier.type !== "ImportSpecifier") return;

                        if (!importSpecifier.imported.name.startsWith("__")) return;

                        context.report({
                            node: importSpecifier,
                            messageId: "importNotAllowedHere",
                            data: {
                                specifier: importSpecifier.imported.name,
                            },
                            fix(fixer) {
                                return fixer.remove(importSpecifier);
                            },
                        });
                    });
                }
            },
        };
    },
};
