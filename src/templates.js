const statelessComponent = () =>
  `import React from "react"
import { Container } from "./${name}.atoms"

type Props = {}

const ${name} = (props: Props) => (
  <Container>
    <p>Component!</p>
  </Container>
)

export default ${name}
`;

const atomsFile = () =>
  `import styled from 'styled-components'

export const Container = styled.div\`
  background-color: red;
  padding: 16px;
\`
`;

const rootFile = () =>
  `import ${name} from "./${name}"

export default ${name}
`;

export { statelessComponent, atomsFile, rootFile };
