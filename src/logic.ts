import path from 'path';
import { map, cond, join, when, always } from 'ramda';

import {
  getSrcDirPath,
  ComponentProps,
  Component,
  ofType,
  executeCommand,
  getCurrentPath,
  notNil,
  createFileRecursively,
  createDirRecursively,
  createDir
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
    [ofType('container'), genStatefullComponent],
    [ofType('component'), genStatelessComponent],
    [ofType('page'), genPageComponent]
  ])(props);

/**
 * Receives a resolved component e writes on disk
 * @param component
 */
async function writeComponentOnDisk(component: Component) {
  const createFiles = (files) =>
    map(({ path, content }) => createFileRecursively(path, content), files);

  await createDirRecursively(component.path);
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
 * Create the folders
 * @param appName
 */
export async function createOrganizationalFolders(appName: string) {
  const srcDir = path.join(getCurrentPath(), appName, 'src');

  const createFolder = (folder) => createDir(path.join(srcDir, folder));

  return Promise.all([
    createFolder('pages'),
    createFolder('components'),
    createFolder('containers')
  ]);
}

/**
 * Use create-react-app to init a new application
 * @param appName
 */
export const createReactApp = (appName: string) =>
  executeCommand(`npx create-react-app ${appName}`);

export function installModules(modules: string[], directory?: string) {
  return installModule(join(' ', modules), directory);
}

export const installModule = (moduleName, directory?: string) =>
  executeCommand(
    `yarn add ${moduleName}`,
    when(notNil, always({ cwd: directory }))(directory)
  );

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
