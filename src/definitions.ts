import {
  rootFile,
  statelessComponent,
  statefullComponent,
  atomsFile
} from './templates';
import { ComponentProps } from './lib';

type ComponentFile = {
  name: string;
  template: string;
};

export type ComponentDefinition = {
  mountPoint: string;
  name: string;
  files: ComponentFile[];
};

function getStatefullComponent(props: ComponentProps): ComponentDefinition {
  const { name } = props;

  return {
    mountPoint: `/containers/${name}`,
    name,
    files: [
      {
        name: 'index.js',
        template: rootFile(props)
      },
      {
        name: `${name}.js'`,
        template: statefullComponent(props)
      },
      {
        name: `${name}.atoms.js`,
        template: atomsFile()
      }
    ]
  };
}

function getStatelessComponent(props: ComponentProps): ComponentDefinition {
  const { name } = props;

  return {
    mountPoint: `/components/${name}`,
    name,
    files: [
      {
        name: 'index.js',
        template: rootFile(props)
      },
      {
        name: `${name}.js'`,
        template: statelessComponent(props)
      },
      {
        name: `${name}.atoms.js`,
        template: atomsFile()
      }
    ]
  };
}

function getPageComponent(props: ComponentProps): ComponentDefinition {
  const { name } = props;

  return {
    mountPoint: `/pages/${name}`,
    name,
    files: [
      {
        name: 'index.js',
        template: rootFile(props)
      },
      {
        name: `${name}.js`,
        template: statefullComponent(props)
      }
    ]
  };
}

export { getStatefullComponent, getStatelessComponent, getPageComponent };
