"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rootFile = exports.atomsFile = exports.statelessComponent = void 0;

const statelessComponent = ({
  name
}) => `import React from "react"
import { Container } from "./${name}.atoms"

type Props = {}

const ${name} = (props: Props) => (
  <Container>
    <p>Component!</p>
  </Container>
)

export default ${name}
`;

exports.statelessComponent = statelessComponent;

const atomsFile = ({}) => `import styled from 'styled-components'

export const Container = styled.div\`
  background-color: red;
  padding: 16px;
\`
`;

exports.atomsFile = atomsFile;

const rootFile = ({
  name
}) => `import ${name} from "./${name}"

export default ${name}
`;

exports.rootFile = rootFile;