import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
    }),
    paths: {
      base: process.env.NODE_ENV === "production" ? "/bk" : "",
    },
    prerender: {
      entries: ["*"],
    },
  },
};
