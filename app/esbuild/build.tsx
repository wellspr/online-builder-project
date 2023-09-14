import * as esbuild from "esbuild";
import { unpkgPathPlugin } from "./plugins";

export const build = async (code: string) => await esbuild.build({
    entryPoints: ["index.js"],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(code)],
    define: {
        "process.env.NODE_ENV": "'production'",
        global: "window",
    }
});