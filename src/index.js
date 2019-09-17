import program from "commander";
import path from "path";
import { cond, T, concat } from "ramda";
import { statelessComponent, rootFile, atomsFile } from "./templates";
import { getCurrentPath, createDir, createFile, oneOf } from "./lib";

const componentDefinition = [
  { file: "index.js", content: rootFile },
  { file: "[name].js", content: statelessComponent },
  { file: "[name].atoms.js", content: atomsFile }
];

const containerDefinition = [
  { file: "index.js", content: rootFile },
  { file: "[name].js", content: statelessComponent },
  { file: "[name].atoms.js", content: atomsFile }
];

const pageDefinition = [
  { file: "index.js", content: rootFile },
  { file: "[name].js", content: statelessComponent },
  { file: "[name].atoms.js", content: atomsFile }
];

function resolveComponent(mountPoint, definition) {
  return {};
}

function createComponent(type, componentName) {
  const mountDir = path.join(getCurrentPath(), "src", concat(type, "s"));
  const componentPath = path.join(mountDir, componentName);

  createDir(componentPath).then(() =>
    map(
      ({ name, layout }) => createFile(path.join(componentPath, name), layout),
      componentTree
    )
  );
}

program
  .command("create <type> <name>")
  .description(
    "Create a new component, page or container Ex: react-cli create component List"
  )
  .action(
    cond([
      [oneOf(["component", "page", "container"]), createComponent],
      [T, () => console.log("Wrong argument")]
    ])
  );

program.parse(process.argv);
