/// <reference path="../typings/tsd.d.ts"/>

import * as Bluebird from 'bluebird';
import Logger from './Logger';

const log = Logger('HttpClient');

let nextRequestId = 0;

export function request(method: string, url: string, payload?: any): Bluebird<string> {
  const requestId = nextRequestId++;

  log.debug(`Requesting ${method.toUpperCase()} ${url} (req#${requestId})`);
  return Bluebird.delay(1000).then(response => {
    log.debug(`Received response (req#${requestId})`);
    return 'test';
  });
}

export function get(url: string): Bluebird<string> {
  return request('GET', url);
}

export function post(url: string, payload: any): Bluebird<string> {
  return request('POST', url, payload);
}

export function put(url: string, payload: any): Bluebird<string> {
  return request('PUT', url, payload);
}

export function del(url: string): Bluebird<string> {
  return request('DELETE', url);
}
