import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import {
  includes,
  partial,
  equals,
  isNil,
  complement,
  split,
  filter,
  cond,
  T,
  always,
  compose,
  isEmpty,
  identity,
  map
} from 'ramda';

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
export const bindWith = (fn: (...params: any) => any, ...params: any) =>
  partial(fn, params);

/**
 * Get the current project `src` dir path
 */
export const getSrcDirPath = () => path.join(getCurrentPath(), 'src');

/**
 * Asynchronously reduces a list
 * @param reducer
 * @param initialValue
 * @param list
 */
export async function reduceAsync(
  reducer: (acc, elem) => Promise<any>,
  initialValue: any,
  list: any[]
) {
  const reduceWith = (reducer) => (elem: any) => (acc: any) =>
    reducer(acc, elem);

  const tasks = map(reduceWith(reducer), list);

  return promiseWaterfall(tasks, [initialValue]);
}

/**
 * Receive an array of promises called tasks, each task receives the result of
 * its predecessor as a param. The first task receives the params from `initialParams`.
 * @param tasks array of functions that returns a promise
 * @param initialParams params to be passed to the fist task
 */
export async function promiseWaterfall(
  tasks: ((...params) => Promise<any>)[],
  initialParams?: any[]
) {
  const [firstTask, ...tasksLeft] = tasks;

  let result = await firstTask(...initialParams);

  for (let task of tasksLeft) {
    result = await task(result);
  }

  return result;
}

/**
 * Recursively create a dir or file
 * @param path
 * @param data
 */
export async function createFileRecursively(filePath: string, data?: any) {
  const paths = filter(notEmpty, split('/', filePath));
  const makeFile = (path) => createFile(path, data);

  return reduceAsync(
    async (acc, elem) => {
      const dir = path.join(acc, elem);
      const exists = await pathExists(dir);

      return cond([
        [always(exists), identity],
        [hasExtension, makeFile],
        [T, createDir]
      ])(dir);
    },
    '/',
    paths
  );
}

/**
 * Create a dir recursively
 * @param path
 */
export const createDirRecursively = (path: string) =>
  createFileRecursively(path);

/**
 * Create a file on disk
 * @param path path where to write the file
 * @param data content of the file
 * @returns param path
 */
export const createFile = (
  path: fs.PathLike,
  data: any,
  options?: fs.WriteFileOptions
) => promisify(fs.writeFile)(path, data, options).then(always(path));

/**
 * Create a dir on disk
 * @param path path where to write the dir
 * @returns param path
 */
export const createDir = (
  path: fs.PathLike,
  options?: fs.MakeDirectoryOptions
) => promisify(fs.mkdir)(path, options).then(always(path));

/**
 * Verify if a predicate is not empty
 * @param predicate
 */
export const notEmpty = complement(isEmpty);

/**
 * Verify if a path has extension
 * @param path
 */
export const hasExtension = compose(
  notEmpty,
  path.extname
);

/**
 * Verify if a path exists
 * @param path
 */
export const pathExists = promisify(fs.exists);

/**
 * Verifies if a value is not nill
 * @param value value to be compared
 */
export const notNil: (value: any) => boolean = complement(isNil);
