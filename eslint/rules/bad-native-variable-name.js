const path = require("path");

const whiteList = ["src/utils/common.ts"];

const isNeedCheck = (relativePath) => {
    return !whiteList.some((rulePath) => {
        return relativePath.replaceAll("\\", "/").startsWith(rulePath);
    });
};

module.exports = {
    meta: {
        messages: {
            badNativeName: "The constant that calls native is declared incorrectly. Suggest name {{ suggestName }}",
        },
        fixable: "code",
    },
    create(context) {
        if (isNeedCheck(path.relative(context.getCwd(), context.filename))) return {};

        return {
            "VariableDeclaration[kind='const'] VariableDeclarator[init.type='CallExpression'] > CallExpression[callee.name='getNativeByName']":
                function (node) {
                    const callExpression = node;
                    const variableDeclarator = node.parent;

                    const variableName = variableDeclarator.id.name;
                    const nativeName = callExpression.arguments[0].value;
                    let nativeModifier = "";

                    if (callExpression.arguments[3]?.value) nativeModifier = "Nw";
                    else if (callExpression.arguments[2]?.value) nativeModifier = "Ne";

                    if (variableName != nativeName + nativeModifier) {
                        context.report({
                            node: variableDeclarator,
                            messageId: "badNativeName",
                            data: {
                                suggestName: nativeName + nativeModifier,
                            },
                        });
                    }
                },
        };
    },
};
