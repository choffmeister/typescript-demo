/// <reference path="../typings/tsd.d.ts"/>

import winston = require('winston');

class Logger {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  debug(format: string, ...params: any[]) {
    winston.log.apply(this, ['debug', this.name + ' - ' + format].concat(params));
  }

  info(format: string, ...params: any[]) {
    winston.log.apply(this, ['info', this.name + ' - ' + format].concat(params));
  }

  warn(format: string, ...params: any[]) {
    winston.log.apply(this, ['warn', this.name + ' - ' + format].concat(params));
  }

  error(format: string, ...params: any[]) {
    winston.log.apply(this, ['error', this.name + ' - ' + format].concat(params));
  }
}

export = (name: string): Logger => new Logger(name);
