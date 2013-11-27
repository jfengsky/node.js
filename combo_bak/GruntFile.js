/*
 * grunt-seajs-build
 *
 *
 * Copyright (c) 2013 WarWithinMe
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    transport: {
      options: {
        format: 'assets/mods/{{filename}}' //生成的id的格式
      },
      application: {
        files: {
          '.build': ['assets/mods/main.js', 'assets/mods/idb/db.js', 'assets/mods/lang/ang.js'] //将application.js、util.js合并且提取依赖，生成id，之后放在.build目录下
        }
      }
    },
    concat: {
      main: {
        options: {
          relative: true
        },
        files: {
          'dist/main.js': ['.build/main.js'], // 合并.build/application.js文件到dist/application.js中
          'dist/main-debug.js': ['.build/main-debug.js']
        }
      }
    },
    uglify: {
      main: {
        files: {
          'dist/main.js': ['dist/main.js'] //对dist/application.js进行压缩，之后存入dist/application.js文件
        }
      }
    },
    clean: {
      build: ['.build'] //清除.build文件
    }
  });

  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-cmd-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('build', ['transport', 'concat', 'uglify', 'clean'])
};