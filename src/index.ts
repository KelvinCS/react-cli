import program from 'commander';
import { cond, T } from 'ramda';
import { oneOf } from './lib';
import {
  genComponent,
  writeComponentOnDisk,
  createReactApp,
  createOrganizationalFolders
} from './logic';

async function runCreate(type, name) {
  const props = { type, name };
  const component = genComponent(props);

  return writeComponentOnDisk(component);
}

async function runInit(appName) {
  await createReactApp(appName);
  await createOrganizationalFolders(appName);
}

program
  .command('init <name>')
  .description('Init a new React project')
  .action(runInit);

program
  .command('create <type> <name>')
  .description(
    'Create a new component, page or container Ex: react-cli create component List'
  )
  .action(
    cond([
      [oneOf(['page', 'component', 'container']), runCreate],
      [T, console.log]
    ])
  );

export function cli(argv: string[]) {
  program.parse(argv);
}
