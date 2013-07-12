/**
 * Description:
 * Author: jiangfeng (jiangfeng@tomstaff.com)
 * Update: 2013-07-11 10:41
 */

function route(handle, pathname) {
  console.log("About to route a request for " + pathname);
  if (typeof handle[pathname] === 'function') {
    return handle[pathname]();
  } else {
    console.log("No request handler found for " + pathname);
    return "404 Not found";
  }
}

exports.route = route;