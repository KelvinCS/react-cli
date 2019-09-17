import fs from "fs";
import { includes, __ } from "ramda";

export const getCurrentPath = () => process.cwd();
export const oneOf = list => includes(__, list);

export function createFile(path, data) {
  return new Promise(resolve => fs.writeFile(path, data, resolve));
}

export function createDir(path) {
  return new Promise(resolve => fs.mkdir(path, null, resolve.bind(null, path)));
}
