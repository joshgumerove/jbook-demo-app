import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

const fileCache = localForage.createInstance({
  name: "filecache",
});

(async () => {
  await fileCache.setItem("color", "red");

  const color = await fileCache.getItem("color");

  console.log("color: ", color);
})();

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log("onResolve", args);
        if (args.path === "index.js") {
          return { path: args.path, namespace: "a" };
        }

        if (args.path.includes("./") || args.path.includes("../")) {
          return {
            path: new URL(
              args.path,
              "https://unpkg.com" + args.resolveDir + "/"
            ).href,
            namespace: "a",
          };
        }

        return { path: `https://unpkg.com/${args.path}`, namespace: "a" };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);

        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: `
              import React from "react";
              console.log(React);
            `,
          };
        }

        const { data, request } = await axios.get(args.path);

        return {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
      });
    },
  };
};
