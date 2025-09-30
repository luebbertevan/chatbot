import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    {
      name: "ignore-well-known", // middleware to ignore Error: No route matches URL "/.well-known/appspecific/com.chrome.devtools.json"
      configureServer(server) { 
        server.middlewares.use((req, res, next) => {
          if (req.url?.startsWith("/.well-known/")) {
            res.statusCode = 204; // no content
            return res.end();
          }
          next();
        });
      },
    },
  ],
});
 