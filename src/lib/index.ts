import fs from 'fs';
import path from 'path';
import { includes, __, partial, equals } from 'ramda';

export type ComponentProps = {
  type: string;
  name: string;
};

export type Component = {
  path: string;
  files: { path: string; content: string }[];
};

/**
 * Receives a predicate and retuns a funcion who receives
 * a ComponentProps, and compare the `type` field with de predicate
 * @param pred
 */
export const typeIs = (pred) => ({ type }: ComponentProps) =>
  equals(pred, type);

/**
 * Get the dir path which the current terminal is
 */
export const getCurrentPath = () => process.cwd();

/**
 * Receives a list and returns a verifier funcion that checks
 * if the param exists on the given list
 *
 * @param list
 */
export const oneOf = (list) => (param) => includes(param, list);

/**
 * Receives a funcion and params, and returns caller function with
 * the giver params
 * @param fn
 * @param params
 */
export const bindWith = (fn, ...params) => partial(fn, params);

/**
 * Get the current project `src` dir path
 */
export const getSrcDirPath = () => path.join(getCurrentPath(), 'src');

/**
 * Create a file on disk
 * @param path path where to write the file
 * @param data content of the file
 */
export function createFile(path, data) {
  return new Promise((resolve) => fs.writeFile(path, data, resolve));
}

/**
 * Create a dir on disk
 * @param path path where to write the dir
 */
export function createDir(path) {
  return new Promise((resolve) => fs.mkdir(path, null, partial(resolve, path)));
}
