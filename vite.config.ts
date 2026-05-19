import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const react = (await import("@vitejs/plugin-react-swc")).default;

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
    },
  };
});
