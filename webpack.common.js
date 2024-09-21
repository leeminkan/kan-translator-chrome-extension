const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");

module.exports = {
  entry: {
    popup: path.resolve("src/app/popup/index.tsx"),
    options: path.resolve("src/app/options/index.tsx"),
    background: path.resolve("src/app/background/background.ts"),
    contentScript: path.resolve("src/app/contentScript/index.tsx"),
    newTab: path.resolve("src/app/tabs/index.tsx"),
    offscreen: path.resolve("src/app/offscreen/index.ts"),
  },
  module: {
    rules: [
      {
        use: "ts-loader",
        test: /\.tsx?$/,
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        oneOf: [
          {
            resourceQuery: /inline/, // foo.css?inline
            use: getCssRuleUses("inline"),
          },
          {
            use: getCssRuleUses(),
          },
        ],
      },
      {
        type: "assets/resource",
        test: /\.(png|jpg|jpeg|gif|woff|woff2|tff|eot|svg)$/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve("src/app/static"),
          to: path.resolve("dist"),
        },
      ],
    }),
    ...getHtmlPlugins([
      "popup",
      "options",
      "newTab",
      "contentScript",
      "offscreen",
    ]),
  ],
  resolve: {
    extensions: [".tsx", ".js", ".ts", ".css"],
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist"),
  },
  optimization: {
    splitChunks: {
      chunks(chunk) {
        return chunk.name !== "contentScript";
      },
    },
  },
};

function getHtmlPlugins(chunks) {
  return chunks.map(
    (chunk) =>
      new HtmlPlugin({
        title: "Kan Translator Extension",
        filename: `${chunk}.html`,
        chunks: [chunk],
      })
  );
}

function getCssRuleUses(type) {
  return [
    type === "inline" ? "to-string-loader" : "style-loader",
    {
      loader: "css-loader",
      options: {
        importLoaders: 1,
      },
    },
    {
      loader: "postcss-loader", // postcss loader needed for tailwindcss
      options: {
        postcssOptions: {
          ident: "postcss",
          plugins: [tailwindcss, autoprefixer],
        },
      },
    },
  ];
}
