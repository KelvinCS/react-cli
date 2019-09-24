"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStatefullComponent = getStatefullComponent;
exports.getStatelessComponent = getStatelessComponent;
exports.getPageComponent = getPageComponent;

var _templates = require("./templates");

function getStatefullComponent(props) {
  var name = props.name;
  return {
    mountPoint: "/containers/".concat(name),
    name: name,
    files: [{
      name: 'index.js',
      template: (0, _templates.rootFile)(props)
    }, {
      name: "".concat(name, ".js'"),
      template: (0, _templates.statefullComponent)(props)
    }, {
      name: "".concat(name, ".atoms.js"),
      template: (0, _templates.atomsFile)()
    }]
  };
}

function getStatelessComponent(props) {
  var name = props.name;
  return {
    mountPoint: "/components/".concat(name),
    name: name,
    files: [{
      name: 'index.js',
      template: (0, _templates.rootFile)(props)
    }, {
      name: "".concat(name, ".js'"),
      template: (0, _templates.statelessComponent)(props)
    }, {
      name: "".concat(name, ".atoms.js"),
      template: (0, _templates.atomsFile)()
    }]
  };
}

function getPageComponent(props) {
  var name = props.name;
  return {
    mountPoint: "/pages/".concat(name),
    name: name,
    files: [{
      name: 'index.js',
      template: (0, _templates.rootFile)(props)
    }, {
      name: "".concat(name, ".js"),
      template: (0, _templates.statefullComponent)(props)
    }]
  };
}