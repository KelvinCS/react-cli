"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeComponentOnDisk = writeComponentOnDisk;
exports.genComponent = exports.genPageComponent = exports.genStatelessComponent = exports.genStatefullComponent = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _path = _interopRequireDefault(require("path"));

var _lib = require("./lib");

var _ramda = require("ramda");

var _definitions = require("./definitions");

var typeIs = function typeIs(pred) {
  return function (_ref) {
    var type = _ref.type;
    return (0, _ramda.equals)(pred, type);
  };
};

var genComponent = function genComponent(props) {
  return (0, _ramda.cond)([[typeIs('container'), genStatefullComponent], [typeIs('component'), genStatelessComponent], [typeIs('page'), genPageComponent]])(props);
};

exports.genComponent = genComponent;

function writeComponentOnDisk(_x) {
  return _writeComponentOnDisk.apply(this, arguments);
}

function _writeComponentOnDisk() {
  _writeComponentOnDisk = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(component) {
    var createFiles;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            createFiles = function createFiles(files) {
              return (0, _ramda.map)(function (_ref2) {
                var path = _ref2.path,
                    content = _ref2.content;
                return (0, _lib.createFile)(path, content);
              }, files);
            };

            _context.next = 3;
            return (0, _lib.createDir)(component.path);

          case 3:
            return _context.abrupt("return", Promise.all(createFiles(component.files)));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _writeComponentOnDisk.apply(this, arguments);
}

function resolveComponent(component) {
  var mountPoint = component.mountPoint,
      files = component.files;

  var componentPath = _path["default"].join((0, _lib.getSrcDirPath)(), mountPoint);

  return {
    path: componentPath,
    files: files.map(function (file) {
      return {
        path: _path["default"].join(componentPath, file.name),
        content: file.template
      };
    })
  };
}

var genStatefullComponent = function genStatefullComponent(props) {
  return resolveComponent((0, _definitions.getStatefullComponent)(props));
};

exports.genStatefullComponent = genStatefullComponent;

var genStatelessComponent = function genStatelessComponent(props) {
  return resolveComponent((0, _definitions.getStatelessComponent)(props));
};

exports.genStatelessComponent = genStatelessComponent;

var genPageComponent = function genPageComponent(props) {
  return resolveComponent((0, _definitions.getPageComponent)(props));
};

exports.genPageComponent = genPageComponent;