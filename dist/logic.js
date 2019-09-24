"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOrganizationalFolders = createOrganizationalFolders;
exports.installModules = installModules;
exports.writeComponentOnDisk = writeComponentOnDisk;
exports.genComponent = exports.installModule = exports.createReactApp = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _path = _interopRequireDefault(require("path"));

var _ramda = require("ramda");

var _lib = require("./lib");

var _definitions = require("./definitions");

/**
 * Returns the component definition given the type
 * @param props
 */
var genComponent = function genComponent(props) {
  return (0, _ramda.cond)([[(0, _lib.ofType)('container'), genStatefullComponent], [(0, _lib.ofType)('component'), genStatelessComponent], [(0, _lib.ofType)('page'), genPageComponent]])(props);
};
/**
 * Receives a resolved component e writes on disk
 * @param component
 */


exports.genComponent = genComponent;

function writeComponentOnDisk(_x) {
  return _writeComponentOnDisk.apply(this, arguments);
}
/**
 * Receives a component definition and retuns a reolved component
 * with the final path
 * @param component
 */


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
              return (0, _ramda.map)(function (_ref) {
                var path = _ref.path,
                    content = _ref.content;
                return (0, _lib.createFileRecursively)(path, content);
              }, files);
            };

            _context.next = 3;
            return (0, _lib.createDirRecursively)(component.path);

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
/**
 * Create the folders
 * @param appName
 */


function createOrganizationalFolders(_x2) {
  return _createOrganizationalFolders.apply(this, arguments);
}
/**
 * Use create-react-app to init a new application
 * @param appName
 */


function _createOrganizationalFolders() {
  _createOrganizationalFolders = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(appName) {
    var srcDir, createFolder;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            srcDir = _path["default"].join((0, _lib.getCurrentPath)(), appName, 'src');

            createFolder = function createFolder(folder) {
              return (0, _lib.createDir)(_path["default"].join(srcDir, folder));
            };

            return _context2.abrupt("return", Promise.all([createFolder('pages'), createFolder('components'), createFolder('containers')]));

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _createOrganizationalFolders.apply(this, arguments);
}

var createReactApp = function createReactApp(appName) {
  return (0, _lib.executeCommand)("npx create-react-app ".concat(appName));
};

exports.createReactApp = createReactApp;

function installModules(modules, directory) {
  return installModule((0, _ramda.join)(' ', modules), directory);
}

var installModule = function installModule(moduleName, directory) {
  return (0, _lib.executeCommand)("yarn add ".concat(moduleName), (0, _ramda.when)(_lib.notNil, (0, _ramda.always)({
    cwd: directory
  }))(directory));
};
/**
 * Returns a resolved statefull component, given the props
 * @param props
 */


exports.installModule = installModule;

var genStatefullComponent = function genStatefullComponent(props) {
  return resolveComponent((0, _definitions.getStatefullComponent)(props));
};
/**
 * Returns a resolved stateless component, given the props
 * @param props
 */


var genStatelessComponent = function genStatelessComponent(props) {
  return resolveComponent((0, _definitions.getStatelessComponent)(props));
};
/**
 * Returns a resolved page component, given the props
 * @param props
 */


var genPageComponent = function genPageComponent(props) {
  return resolveComponent((0, _definitions.getPageComponent)(props));
};