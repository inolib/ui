/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
  plugins: [require("@ianvs/prettier-plugin-sort-imports")],
  pluginSearchDirs: false,
  printWidth: 120,
  importOrder: ["^\\~/(.*)$"],
  importOrderCaseInsensitive: true,
  importOrderCombineTypeAndValueImports: true,
  importOrderMergeDuplicateImports: true,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
