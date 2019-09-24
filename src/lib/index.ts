import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { includes, __, partial, equals, isNil, complement } from 'ramda';
import { exec, ExecOptions } from 'child_process';

export type ComponentProps = {
  type: string;
  name: string;
};

export type Component = {
  path: string;
  files: { path: string; content: string }[];
};

/**
 * Executes a command and writes the output to process.stdin
 * @param command - Command to be executed
 * @param callback
 */
const execWithOutput = (command: string, options?: ExecOptions, callback?) =>
  exec(command, options, callback).stdout.pipe(process.stdout);

/**
 * Executes a command on the current terminal
 * @param command - Command to be executed
 */
export const executeCommand = (command: string, options?: ExecOptions) =>
  promisify(execWithOutput)(command, options);

/**
 * Receives a predicate and retuns a funcion who receives
 * a para of type ComponentProps, and compare the field `type` with de predicate
 * @param pred
 */
export const ofType = (pred: string) => ({ type }) => equals(pred, type);

/**
 * Get the dir path which the current terminal is
 */
export const getCurrentPath = () => process.cwd();

/**
 * Receives a list and returns a verifier funcion that checks
 * if the param exists in the given list
 * @param list
 */
export const oneOf = (list: any[]) => (param: any) => includes(param, list);

/**
 * Receives a funcion and params, and returns caller function with
 * the giver params
 * @param fn
 * @param params
 */
export const bindWith = (fn: () => any, ...params: any) => partial(fn, params);

/**
 * Get the current project `src` dir path
 */
export const getSrcDirPath = () => path.join(getCurrentPath(), 'src');

/**
 * TODO
 * Recursively create a file
 * @param path
 * @param data
 */
export function createFileRecursive(dirPath: string, data: any) {
  const createDirs = (dirPath) => {};
}

/**
 * Create a file on disk
 * @param path path where to write the file
 * @param data content of the file
 */
export const createFile = promisify(fs.writeFile);

/**
 * Create a dir on disk
 * @param path path where to write the dir
 */
export const createDir = promisify(fs.mkdir);

/**
 * Verifies if a value is not nill
 * @param value value to be compared
 */
export const notNil: (value: any) => boolean = complement(isNil);
