/* eslint-disable @typescript-eslint/no-unused-vars */

import {
    Project,
    SyntaxKind,
    ClassDeclaration,
    InterfaceDeclaration,
    EnumDeclaration,
    FunctionDeclaration,
    VariableDeclaration,
    TypeAliasDeclaration,
    VariableDeclarationKind,
    FunctionDeclarationStructure,
    Scope,
    StructureKind,
    ExportedDeclarations,
    ModuleDeclaration,
    ModuleDeclarationKind,
    ClassMemberTypes,
} from "ts-morph";
import path from "path";

import * as bootstrapExport from "./index.js";
import { AutoMappedMethodMetadata, getMethodMeta, isClassHasModified } from "./services/HandleBuilder.js";
import { getListNatives, __getDatabaseDocKey, getGlobalsKeys, __getDatabaseGlobalType } from "@war3js/unsafe";

const project = new Project();
const configSourceFile = project.addSourceFileAtPath("./.typesAppenderConfig.d.ts");

const nativeTypeMappingInterface = configSourceFile.getInterfaceOrThrow("__ColnfigOnlyTypeToHandle");

const inputFilePath = configSourceFile
    .getVariableDeclarationOrThrow("__ColnfigOnlyBundlePath")
    .getInitializerIfKind(SyntaxKind.StringLiteral)
    .getLiteralText();

const outputBundlleFilePath = configSourceFile
    .getVariableDeclarationOrThrow("__ColnfigOnlyFixedBundleOutPath")
    .getInitializerIfKind(SyntaxKind.StringLiteral)
    .getLiteralText();

const outputNativesFilePath = configSourceFile
    .getVariableDeclarationOrThrow("__ColnfigOnlyNativesOutPath")
    .getInitializerIfKind(SyntaxKind.StringLiteral)
    .getLiteralText();

const outputConstantsFilePath = configSourceFile
    .getVariableDeclarationOrThrow("__ColnfigOnlyConstantssOutPath")
    .getInitializerIfKind(SyntaxKind.StringLiteral)
    .getLiteralText();

const inputBundleFile = project.addSourceFileAtPath(inputFilePath);

const outputBundlleFile = project.createSourceFile(outputBundlleFilePath, "", {
    overwrite: true,
});

const nativesSourceFile = project.createSourceFile(outputNativesFilePath, "", {
    overwrite: true,
});

const constantsSourceFile = project.createSourceFile(outputConstantsFilePath, "", {
    overwrite: true,
});

const exportedDeclarations = Array.from(inputBundleFile.getExportedDeclarations().values()).flat();

// Move all export to global

let declareGlobalBlock = inputBundleFile.getModule("global");

if (!declareGlobalBlock) {
    declareGlobalBlock = inputBundleFile.addModule({
        name: "global",
        hasDeclareKeyword: true,
        declarationKind: ModuleDeclarationKind.Global,
    });
}

// Append chain property type

moveExportToGlobal(exportedDeclarations, declareGlobalBlock);

// Append autogenerated methods

Object.keys(bootstrapExport).forEach((key) => {
    const value = (bootstrapExport as any)[key];

    if (isClassHasModified(value)) {
        const className = value.name;
        const classDeclaration = declareGlobalBlock.getClassOrThrow(className);

        Object.entries(value.prototype).forEach((entry) => {
            const [memberName, memberValue] = entry;

            if (typeof memberValue === "function") {
                const methodMetadata = getMethodMeta(memberValue);

                if (methodMetadata) appendGeneratedClassMethod(classDeclaration, memberName, methodMetadata);
            }
        });
    }
});

nativesSourceFile.addStatements("// eslint-disable-next-line @typescript-eslint/triple-slash-reference");
nativesSourceFile.addStatements(
    `/// <reference path="${path.relative(path.dirname(outputNativesFilePath), outputBundlleFilePath)}" />`,
);
nativesSourceFile.addStatements("// eslint-disable-next-line @typescript-eslint/triple-slash-reference");
nativesSourceFile.addStatements(
    `/// <reference path="${path.relative(path.dirname(outputConstantsFilePath), outputBundlleFilePath)}" />`,
);

let declareNativesBlock = nativesSourceFile.getModule("natives");

if (!declareNativesBlock) {
    declareNativesBlock = nativesSourceFile.addModule({
        name: '"natives"',
        declarationKind: ModuleDeclarationKind.Module,
        hasDeclareKeyword: true,
    });
}

let declareConstantsBlock = constantsSourceFile.getModule("constants");

if (!declareConstantsBlock) {
    declareConstantsBlock = constantsSourceFile.addModule({
        name: '"constants"',
        declarationKind: ModuleDeclarationKind.Module,
        hasDeclareKeyword: true,
    });
}

// Save output bundle file

inputBundleFile.forEachChild((child) => {
    outputBundlleFile.addStatements(child.getText());
});

outputBundlleFile.saveSync();

// Append natives package

const nativesList = getListNatives();

Object.entries(nativesList).forEach((entry) => {
    const nativeName = entry[0];
    const nativeFunction = entry[1];

    const method = declareNativesBlock.addFunction({
        name: nativeName,
        parameters: nativeFunction.parametres.map((argType, i) => {
            return {
                type: convertJassTypeToJsType(argType),
                name: nativeFunction.parametresName[i],
            };
        }),

        returnType: convertJassTypeToJsType(nativeFunction.returnType),
    });

    if (__getDatabaseDocKey(nativeName)) {
        method.addJsDoc(__getDatabaseDocKey(nativeName).replaceAll("{.lua}", "lua"));
    }
});

nativesSourceFile.saveSync();

// Append constants package

const constants = getGlobalsKeys();

constants.forEach((constaneName) => {
    const constant = declareConstantsBlock.addVariableStatement({
        declarationKind: VariableDeclarationKind.Const,
        declarations: [
            {
                name: constaneName,
                type: convertJassTypeToJsType(__getDatabaseGlobalType(constaneName)),
            },
        ],
    });

    if (__getDatabaseDocKey(constaneName)) {
        constant.addJsDoc(__getDatabaseDocKey(constaneName).replaceAll("{.lua}", "lua"));
    }
});

constantsSourceFile.saveSync();

function convertJassTypeToJsType(typeName: string): string {
    return nativeTypeMappingInterface.getProperty(typeName)?.getTypeNode()?.getText() || "unknown";
}

function moveExportToGlobal(exportedDeclarations: ExportedDeclarations[], globalBlock: ModuleDeclaration) {
    exportedDeclarations.forEach((declaration) => {
        if (declaration instanceof ClassDeclaration) {
            const structure = declaration.getStructure();
            structure.hasDeclareKeyword = false;
            structure.isExported = false;
            declareGlobalBlock.addClass(structure);
        } else if (declaration instanceof InterfaceDeclaration) {
            const structure = declaration.getStructure();
            structure.hasDeclareKeyword = false;
            structure.isExported = false;
            declareGlobalBlock.addInterface(structure);
        } else if (declaration instanceof EnumDeclaration) {
            const structure = declaration.getStructure();
            structure.hasDeclareKeyword = false;
            structure.isExported = false;
            declareGlobalBlock.addEnum(structure);
        } else if (declaration instanceof VariableDeclaration) {
            declareGlobalBlock.addVariableStatement({
                declarationKind: VariableDeclarationKind.Const,
                declarations: [declaration.getStructure()],
            });
        } else if (declaration instanceof TypeAliasDeclaration) {
            declareGlobalBlock.addTypeAlias(declaration.getStructure());
        } else if (declaration instanceof FunctionDeclaration) {
            declareGlobalBlock.addFunction(declaration.getStructure() as FunctionDeclarationStructure);
        } else {
            throw new Error("Unknown export declaration kind");
        }

        declaration.remove();
    });
}

function appendGeneratedClassMethod(declaration: ClassDeclaration, name: string, metadata: AutoMappedMethodMetadata) {
    switch (metadata.methodType) {
        case "method": {
            const method = declaration.addMember({
                kind: StructureKind.Method,
                name,
                scope: Scope.Public,
                parameters: metadata.argTypes.map((argType, i) => {
                    return {
                        type: convertJassTypeToJsType(argType),
                        name: metadata.argNames[i],
                    };
                }),

                returnType: convertJassTypeToJsType(metadata.returnType),
            }) as ClassMemberTypes;

            method.addJsDoc(`
            Class member alias for {@link natives.${metadata.nativeName} | ${metadata.nativeName}}
            `);

            break;
        }
        case "chainProperty": {
            // Getter
            const method = declaration.addMember({
                kind: StructureKind.Method,
                name,
                scope: Scope.Public,
                parameters: [],

                returnType: convertJassTypeToJsType(metadata.type),
            }) as ClassMemberTypes;

            method.addJsDoc(`
            Class chain property alias for {@link natives.${metadata.getNativeName} | ${metadata.getNativeName}} and {@link natives.${metadata.setNativeName} | ${metadata.setNativeName}}
            `);

            //Setter
            declaration.addMember({
                kind: StructureKind.Method,
                name,
                scope: Scope.Public,
                typeParameters: [`T = ${convertJassTypeToJsType(metadata.type)}`],
                parameters: [
                    {
                        name: "value",
                        type: `T | ((this: this, currentValue: T) => T)`,
                    },
                ],

                returnType: "this",
            });

            break;
        }
    }
}
