module.exports = function (plop) {
  plop.load("@panter/plop-pack-manul", {
    templatePath: "./plopTemplates",
    basePath: "src",
    componentTests: false,
    containerStorybook: true,
    containerTests: false,
    modulesPath: "modules",
    extension: "ts",
    jsxExtension: "tsx",
  });
};
