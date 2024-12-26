import { defineConfig } from "tsup";

export default defineConfig({
  format: ["cjs", "esm"],
  entryPoints: ["index.tsx"],
  dts: true,
  shims: true,
  skipNodeModulesBundle: true,
  clean: true,
  external: ["react", "react-dom"],
  sourcemap: true,
  target: "ESNext",
});
