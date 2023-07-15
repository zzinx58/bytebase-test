import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import UnoCSS from "unocss/vite";
import {
  presetUno,
  presetIcons,
  presetAttributify,
  presetTypography,
} from "unocss";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";
import { vitePluginForArco } from "@arco-plugins/vite-react";
import transformerVariantGroup from "@unocss/transformer-variant-group";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    UnoCSS({
      presets: [
        presetUno(),
        presetIcons(),
        presetAttributify(),
        presetTypography(),
      ],
      transformers: [transformerVariantGroup()],
    }),
    react(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "./public")],
      symbolId: "svg-[name]",
    }),
    vitePluginForArco({
      style: "css",
    }),
  ],
});
