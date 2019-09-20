"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _commander = _interopRequireDefault(require("commander"));

var _ramda = require("ramda");

var _lib = require("./lib");

var _logic = require("./logic");

function runCreate(type, name) {
  var component = (0, _logic.genComponent)({
    type: type,
    name: name
  });
  (0, _logic.writeComponentOnDisk)(component);
}

_commander["default"].command('create <type> <name>').description('Create a new component, page or container Ex: react-cli create component List').action((0, _ramda.cond)([[(0, _lib.oneOf)(['page', 'component', 'container']), runCreate], [_ramda.T, console.log]]));

_commander["default"].parse(process.argv);