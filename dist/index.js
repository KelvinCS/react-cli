"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cli = cli;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _commander = _interopRequireDefault(require("commander"));

var _ramda = require("ramda");

var _lib = require("./lib");

var _logic = require("./logic");

function runCreate(_x, _x2) {
  return _runCreate.apply(this, arguments);
}

function _runCreate() {
  _runCreate = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(type, name) {
    var props, component;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            props = {
              type: type,
              name: name
            };
            component = (0, _logic.genComponent)(props);
            return _context.abrupt("return", (0, _logic.writeComponentOnDisk)(component));

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _runCreate.apply(this, arguments);
}

function runInit(_x3) {
  return _runInit.apply(this, arguments);
}

function _runInit() {
  _runInit = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(appName) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _logic.createReactApp)(appName);

          case 2:
            _context2.next = 4;
            return (0, _logic.createOrganizationalFolders)(appName);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _runInit.apply(this, arguments);
}

_commander["default"].command('init <name>').description('Init a new React project').action(runInit);

_commander["default"].command('create <type> <name>').description('Create a new component, page or container Ex: react-cli create component List').action((0, _ramda.cond)([[(0, _lib.oneOf)(['page', 'component', 'container']), runCreate], [_ramda.T, console.log]]));

function cli(argv) {
  _commander["default"].parse(argv);
}