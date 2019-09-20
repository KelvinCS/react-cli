"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pageComponent = exports.statefullComponent = exports.rootFile = exports.atomsFile = exports.statelessComponent = void 0;

var statelessComponent = function statelessComponent(_ref) {
  var name = _ref.name;
  return "\nimport React from \"react\"\nimport { Container } from \"./".concat(name, ".atoms\"\n\ntype Props = {}\n\nconst ").concat(name, " = (props: Props) => (\n  <Container>\n    <p>Component!</p>\n  </Container>\n)\n\nexport default ").concat(name, "\n");
};

exports.statelessComponent = statelessComponent;

var statefullComponent = function statefullComponent(_ref2) {
  var name = _ref2.name;
  return "\nimport React, { Component } from \"react\"\nimport { Container } from \"./".concat(name, ".atoms\"\n\ntype Props = {}\n\nclass ").concat(name, " extends Component<Props> {\n  render() {\n    return(\n      <div>\n        <h1>Opa, Cabron!</h1>\n      </div>\n    )\n  }\n}\n\nexport default ").concat(name, "\n\n");
};

exports.statefullComponent = statefullComponent;

var atomsFile = function atomsFile() {
  return "\nimport styled from 'styled-components'\n\nexport const Container = styled.div`\n  background-color: red;\n  padding: 16px;\n`\n";
};

exports.atomsFile = atomsFile;

var rootFile = function rootFile(_ref3) {
  var name = _ref3.name;
  return "\nimport ".concat(name, " from \"./").concat(name, "\"\n\nexport default ").concat(name, "\n");
};

exports.rootFile = rootFile;

var pageComponent = function pageComponent(_ref4) {
  var name = _ref4.name;
  return "\nimport React from \"react\"\nimport { Container } from \"./".concat(name, ".atoms\"\n\nconst ").concat(name, " = (props: Props) => (\n  <Container>\n    <p>Component!</p>\n  </Container>\n)\n\nexport default ").concat(name, "\n\n");
};

exports.pageComponent = pageComponent;