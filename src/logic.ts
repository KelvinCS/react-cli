import path from 'path';
import { map, cond } from 'ramda';

import {
  createDir,
  getSrcDirPath,
  createFile,
  ComponentProps,
  Component,
  typeIs
} from './lib';

import {
  getStatefullComponent,
  getStatelessComponent,
  getPageComponent,
  ComponentDefinition
} from './definitions';

/**
 * Returns the component definition given the type
 * @param props
 */
const genComponent = (props: ComponentProps): Component =>
  cond([
    [typeIs('container'), genStatefullComponent],
    [typeIs('component'), genStatelessComponent],
    [typeIs('page'), genPageComponent]
  ])(props);

/**
 * Receives a resolved component e writes on disk
 * @param component
 */
async function writeComponentOnDisk(component: Component) {
  const createFiles = (files) =>
    map(({ path, content }) => createFile(path, content), files);

  await createDir(component.path);
  return Promise.all(createFiles(component.files));
}

/**
 * Receives a component definition and retuns a reolved component
 * with the final path
 * @param component
 */
function resolveComponent(component: ComponentDefinition): Component {
  const { mountPoint, files } = component;
  const componentPath = path.join(getSrcDirPath(), mountPoint);

  return {
    path: componentPath,
    files: files.map((file) => ({
      path: path.join(componentPath, file.name),
      content: file.template
    }))
  };
}

/**
 * Returns a resolved statefull component, given the props
 * @param props
 */
const genStatefullComponent = (props: ComponentProps) =>
  resolveComponent(getStatefullComponent(props));

/**
 * Returns a resolved stateless component, given the props
 * @param props
 */
const genStatelessComponent = (props: ComponentProps) =>
  resolveComponent(getStatelessComponent(props));

/**
 * Returns a resolved page component, given the props
 * @param props
 */
const genPageComponent = (props: ComponentProps) =>
  resolveComponent(getPageComponent(props));

export { writeComponentOnDisk, genComponent };
