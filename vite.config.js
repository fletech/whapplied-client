import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/api": {
//         target: import.meta.env.VITE_API_PROXY,
//         // target: "http://localhost:3000",
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// });

import dotenv from "dotenv";
dotenv.config();

const apiProxy = "http://localhost:3000";

export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: apiProxy,
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  // },
});
