"use strict";

var _commander = _interopRequireDefault(require("commander"));

var _path = _interopRequireDefault(require("path"));

var _ramda = require("ramda");

var _templates = require("./templates");

var _lib = require("./lib");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const componentDefinition = [{
  file: "index.js",
  content: _templates.rootFile
}, {
  file: "[name].js",
  content: _templates.statelessComponent
}, {
  file: "[name].atoms.js",
  content: _templates.atomsFile
}];
const containerDefinition = [{
  file: "index.js",
  content: _templates.rootFile
}, {
  file: "[name].js",
  content: _templates.statelessComponent
}, {
  file: "[name].atoms.js",
  content: _templates.atomsFile
}];
const pageDefinition = [{
  file: "index.js",
  content: _templates.rootFile
}, {
  file: "[name].js",
  content: _templates.statelessComponent
}, {
  file: "[name].atoms.js",
  content: _templates.atomsFile
}];

function resolveComponent(mountPoint, definition) {
  return {};
}

function createComponent(type, componentName) {
  console.log(type, componentName); // const componentPath = path.join(getCurrentPath(), componentName);
  // createDir(componentPath).then(() =>
  //   map(
  //     ({ name, layout }) => createFile(path.join(componentPath, name), layout),
  //     componentTree
  //   )
  // );
}

_commander.default.command("create <type> <name>").description("Create a new component, page or container Ex: `react-cli create component List`").action((0, _ramda.cond)([[(0, _lib.oneOf)(["component", "page", "container"]), createComponent], [_ramda.T, () => console.log("Wrong argument")]]));

_commander.default.parse(process.argv);