"use-strict";

const mix = require("laravel-mix");
const path = require("path");

mix.alias({
  "@": path.join(__dirname, "node_modules"),
});

mix.browserSync({
  ui: false,
  server: "./",
  files: ["dist", "*.html"],
});

mix
  .setPublicPath("dist")
  .js("src/main.js", "js")
  .sass("sass/main.scss", "css")
  .options({
    processCssUrls: false,
    postCss: [require("cssnano")(), require("autoprefixer")()],
  });
