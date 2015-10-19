/// <reference path="../typings/tsd.d.ts"/>

import * as express from 'express';
import * as HttpClient from './HttpClient';
import * as serveStatic from 'serve-static';
import Logger from './Logger';

const log = Logger('server');
const app = express();
const hostname = '0.0.0.0';
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(serveStatic('./public'));

log.info('Starting...');
app.listen(port, hostname, () => log.info(`Listening on http://${hostname}:${port}`));

HttpClient.get('http://google.de/');
HttpClient.put('http://google.de/', {});
HttpClient.post('http://google.de/', {});
