import { defineConfig } from "vite";
// import { VitePWA } from "vite-plugin-pwa";
import vue from "@vitejs/plugin-vue";
// import { name as baseName, description } from "./package.json";

// export default defineConfig(({ mode }) => {
export default defineConfig(() => {
  return {
    plugins: [
      vue(),
      // VitePWA({
      //   registerType: "autoUpdate",
      //   injectRegister: "auto",
      //   workbox: {
      //     globPatterns: [
      //       "**/*.{js,css,html,xml,ico,png,svg,jpg,woff2,mp3,wav}",
      //     ],
      //   },
      //   includeAssets: [
      //     "favicon.ico",
      //     "apple-touch-icon.png",
      //     "safari-pinned-tab.svg",
      //   ],
      //   manifest: createManifest(mode),
      //   // devOptions: {
      //   //   enabled: true,
      //   // },
      // }),
    ],
    root: "./views/web",
    // publicDir: "../assets",
    build: {
      outDir: "../../dist-web",
      assetsDir: ".",
      emptyOutDir: true,
      sourcemap: true,
    },
  };
});

// function createManifest(mode) {
//   const name = `${baseName}${mode === "development" ? " (dev)" : ""}`;

//   // the first ico version is created with the text generator from https://favicon.io/. then, the html and most of the image set is generated uploading the base icon on https://realfavicongenerator.net/. lastly, the maskable icon is created at https://maskable.app/editor.
//   const android512 = {
//     src: "/android-chrome-512x512.png",
//     sizes: "512x512",
//     type: "image/png",
//   };
//   const icons = [
//     {
//       src: "/android-chrome-192x192.png",
//       sizes: "192x192",
//       type: "image/png",
//     },
//     android512,
//     {
//       ...android512,
//       purpose: "any",
//     },
//     {
//       src: "/maskable_icon.png",
//       sizes: "512x512",
//       type: "image/png",
//       purpose: "maskable",
//     },
//   ];

//   return {
//     name,
//     short_name: name,
//     description,
//     categories: ["games", "entertainment", "education"],
//     start_url: "/",
//     id: "/",
//     theme_color: "#1a1a1a",
//     background_color: "#1a1a1a",
//     display: "standalone",
//     lang: "en",
//     orientation: "portrait",
//     icons,
//     screenshots: [
//       {
//         src: "screenshot-1.jpg",
//         sizes: "1080x1860",
//         type: "image/jpg",
//       },
//       {
//         src: "screenshot-2.jpg",
//         sizes: "1080x1860",
//         type: "image/jpg",
//       },
//       {
//         src: "screenshot-3.jpg",
//         sizes: "1080x1860",
//         type: "image/jpg",
//       },
//       {
//         src: "screenshot-4.jpg",
//         sizes: "1080x1860",
//         type: "image/jpg",
//       },
//     ],
//   };
// }
