import { defineConfig } from "tsup";

export default defineConfig([
    {
        name: "main",
        entry: ["./src/index.ts"],
        outDir: "./build/tsup-bundle",
        format: ["esm"],
        sourcemap: false,
        clean: true,
        bundle: true,
        splitting: false,
        dts: true,
        target: "es5",
        tsconfig: "./tsconfig.build.json",
        noExternal: ["@war3js/events", "@war3js/unsafe", "text-decoding", "@war3js/headers-polyfill"],
    },
]);
