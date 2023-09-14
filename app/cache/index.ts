import localforage from "localforage";

export const pkgCache = localforage.createInstance({
    name: "pkg_cache",
});