###URL 模块
  * url.parse(url,qs,sl) 将url解析为一个对象，其中包含host,hostname,port等字段，若qs为true，则调用querystring解析查询串
  * url.format(obj) 将obj生成为一个url字符串
  * querystring.stringify(obj,'sep','eq') 将对象obj生成查询串


        //url test
        var url = require('url');
        var qs = 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash';
  
        var obj = url.parse(qs,true,true);
        console.log(obj);
  
        var dst = {protocol:'http',host:'localhost',pathname:'/index.php',search:'?cmd=version'};
        console.log(url.format(dst));
  
        var diff = url.resolve('http://localhost/index.php?cmd=version','http://localhost/index.php');
        console.log(diff);
  
        //querystring test
        var querystring = require('querystring');
        var qstr = querystring.stringify({cmd:'get',name:'bill',sexy:'mail'});
        console.log(qstr);
  
        console.log(querystring.parse(qstr));
  
  
        //输出
        { protocol: 'http:',
          slashes: true,
          auth: 'user:pass',
          host: 'host.com:8080',
          port: '8080',
          hostname: 'host.com',
          href: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash',
          hash: '#hash',
          search: '?query=string',
          query: { query: 'string' },
          pathname: '/p/a/t/h',
          path: '/p/a/t/h?query=string' }
        http://localhost/index.php?cmd=version
        http://localhost/index.php
        cmd=get&name=bill&sexy=mail
        { cmd: 'get', name: 'bill', sexy: 'mail' }



原文地址：Node.js开发指南之二：核心模块介绍(http://blog.csdn.net/zzulp/article/details/8111427)
