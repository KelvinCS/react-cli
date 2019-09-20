const statelessComponent = ({ name }) => `
import React from "react"
import { Container } from "./${name}.atoms"

type Props = {}

const ${name} = (props: Props) => (
  <Container>
    <p>Component!</p>
  </Container>
)

export default ${name}
`;

const statefullComponent = ({ name }) => `
import React, { Component } from "react"
import { Container } from "./${name}.atoms"

type Props = {}

class ${name} extends Component<Props> {
  render() {
    return(
      <div>
        <h1>Opa, Cabron!</h1>
      </div>
    )
  }
}

export default ${name}

`;

const atomsFile = () => `
import styled from 'styled-components'

export const Container = styled.div\`
  background-color: red;
  padding: 16px;
\`
`;

const rootFile = ({ name }) => `
import ${name} from "./${name}"

export default ${name}
`;

const pageComponent = ({ name }) => `
import React from "react"

const ${name} = (props: Props) => (
  <main>
    <p>Page!</p>
  </main>
)

export default ${name}

`;

export {
  statelessComponent,
  atomsFile,
  rootFile,
  statefullComponent,
  pageComponent
};
