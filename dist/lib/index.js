"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFile = createFile;
exports.createDir = createDir;
exports.oneOf = exports.getCurrentPath = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _ramda = require("ramda");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getCurrentPath = () => process.cwd();

exports.getCurrentPath = getCurrentPath;

const oneOf = list => (0, _ramda.includes)(_ramda.__, list);

exports.oneOf = oneOf;

function createFile(path, data) {
  return new Promise(resolve => _fs.default.writeFile(path, data, resolve));
}

function createDir(path) {
  return new Promise(resolve => _fs.default.mkdir(path, null, resolve.bind(null, path)));
}