/// <reference path="../typings/tsd.d.ts"/>

import express = require('express');
import serveStatic = require('serve-static');
import Logger = require('./Logger');

const log = Logger('server');
const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(serveStatic('./public'));

log.info('Starting server on port %d', port);
app.listen(port, () => log.info('Started server'));
