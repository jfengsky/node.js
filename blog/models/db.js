/**
 * Created with JetBrains WebStorm.
 * User: jfeng
 * Date: 13-8-17
 * Time: 上午11:38
 * To change this template use File | Settings | File Templates.
 */

var settings = require('../settings'),
    Db = requie('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;

module.exports = new Db(settings.db, new Server(settings.host, Connection.DEFAULT_PORT,{}),{safe: true});