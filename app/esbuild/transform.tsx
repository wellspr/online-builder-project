import * as esbuild from "esbuild";

export const transform = async (code: string) => await esbuild.transform(code, {
    loader: "jsx",
    target: "es2015",
});