import axios from "axios";
import * as esbuild from "esbuild";
//import { pkgCache } from "~/cache";

export const unpkgPathPlugin = (code: string) => {

    return {
        name: "unpkg-path-plugin",

        setup(build: esbuild.PluginBuild) {

            // Handle root entry file of 'index.js'
            build.onResolve({ filter: /(^index\.js$)/ }, () => {
                return { path: "index.js", namespace: "build" };
            });

            // Handle relative paths (check if path starts with './' or '../')
            build.onResolve({ filter: /^\.+\// }, (args: any) => {
                return {
                    namespace: "build",
                    path: new URL(args.path, "https://unpkg.com" + args.resolveDir + "/").href,
                };
            });

            // Handle main file of a module
            build.onResolve({ filter: /.*/ }, async (args: any) => {
                return {
                    namespace: "build",
                    path: `https://unpkg.com/${args.path}`,
                };
            });

            build.onLoad({ filter: /.*/ }, async (args: any) => {
                console.log("onLoad: ", args);

                if (args.path === "index.js") {
                    return {
                        loader: "jsx",
                        contents: code,
                    };
                }

                // Cache: Check if package is in cache
                /*
                const cachedPkg = await pkgCache.getItem<esbuild.OnLoadResult>(args.path);

                if (cachedPkg) {
                    return cachedPkg;
                }
                */

                // Fetch package (if not in cache)
                const { data, request } = await axios.get(args.path);

                const result: esbuild.OnLoadResult =  {
                    loader: "jsx",
                    contents: data,
                    resolveDir: new URL("./", request.res.responseUrl).pathname,
                };

                // Cache: Save fetched package to cache
                //await pkgCache.setItem(args.path, result);

                return result;
            });
        },
    };
};