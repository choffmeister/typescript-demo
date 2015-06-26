var gulpUtil = require('gulp-util'),
    through = require('through2');

var waitForStreamToFinish = function (callback, delay) {
  var objs = [];
  return through.obj(
    function (obj, enc, cb) {
      objs.push(obj);
      cb();
    },
    function (cb) {
      setTimeout(function () {
        callback(objs);
        cb();
      }, delay || 0);
    }
  );
};

var triggerReload = function (server) {
  return waitForStreamToFinish(function (files) {
    if (server.lr) {
      gulpUtil.log('Trigger livereload');
      files.forEach(function (f) {
        server.notify.call(server, {type: 'changed', path: f.path});
      });
    }
  });
};

var triggerRestart = function (server) {
  return waitForStreamToFinish(function () {
    if (server.server) {
      gulpUtil.log('Trigger restart');
      server.start.call(server);
    }
  });
};

module.exports = {
  triggerReload: triggerReload,
  triggerRestart: triggerRestart
};
