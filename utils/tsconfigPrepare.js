import fs from "fs";

fs.appendFileSync(
    "./build/fullTypes/tsconfig.json",
    JSON.stringify({
        compilerOptions: {
            noEmit: true,
            module: "ES6",
            target: "es2017",
            lib: ["ES2017"],
            moduleResolution: "node",
            noImplicitAny: true,
            removeComments: false,
            preserveConstEnums: true,
            sourceMap: true,
            outDir: "build/tsc/lib",
            declaration: true,
            esModuleInterop: true,
            declarationDir: "build/tsc/types",
            baseUrl: ".",
            types: [],
        },
    }),
);
