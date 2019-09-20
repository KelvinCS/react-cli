import program from 'commander';
import { cond, T } from 'ramda';
import { oneOf } from './lib';
import { genComponent, writeComponentOnDisk } from './logic';

function runCreate(type, name) {
  const props = { type, name };
  const component = genComponent(props);

  writeComponentOnDisk(component);
}

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

program.parse(process.argv);
