/**
 * Description:
 * Author: jiangfeng (jiangfeng@tomstaff.com)
 * Update: 2013-07-11 10:26
 */

var server = require('./server'),
  router = require('./router'),
  requestHandlers = require('./requestHandlers'),

  handle = {};

handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

server.start(router.route, handle);
