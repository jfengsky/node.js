/**
 * Description:
 * Author: jiangfeng (jiangfeng@tomstaff.com)
 * Update: 2013-07-11 10:41
 */

function route(handle, pathname) {
  console.log("About to route a request for " + pathname);
  if (typeof handle[pathname] === 'function') {
    handle[pathname]();
  } else {
    console.log("No request handler found for " + pathname);
  }
}

exports.route = route;