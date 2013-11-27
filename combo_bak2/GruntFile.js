module.exports = function(grunt){
    
     grunt.initConfig({
          transport : {
            application: {
              files: [
                {
                  src: '*.js',   // 目录下的js文件依赖分析
                  dest: 'temp'
                }
              ]
            }
               // options : {
               //      format : 'application/application'  //生成的id的格式
               // },
               // application : {
               //      files : {
               //           '.build' : ['application/application.js','application/util.js']   //将application.js、util.js合并且提取依赖，生成id，之后放在.build目录下
               //      }
               // }
          },
          concat : {
            application: {
              // options: {
              //   noncmd: true
              // },
              files: {
                'dist/application.js': [
                  'application/application.js',
                  'application/util.js'
                ]
                // ,
                // 'dist/util.js': [
                //   'application/util.js'
                // ]
              }
            }
               // main : {
               //      options : {
               //           relative : true
               //      },
               //      files : {
               //           'dist/application.js' : ['.build/application.js'],  // 合并.build/application.js文件到dist/application.js中
               //           'dist/application-debug.js' : ['.build/application-debug.js']
               //      }
               // }
          }
          // ,
          // uglify : {
          //      main : {
          //           files : {
          //                'dist/application.js' : ['dist/application.js'] //对dist/application.js进行压缩，之后存入dist/application.js文件
          //           }
          //      }
          // },
          // clean : {
          //      build : ['.build'] //清除.build文件
          // }
     });
    
     grunt.loadNpmTasks('grunt-cmd-transport');
     grunt.loadNpmTasks('grunt-cmd-concat');
     // grunt.loadNpmTasks('grunt-contrib-uglify');
     // grunt.loadNpmTasks('grunt-contrib-clean');
    
     grunt.registerTask('default',['transport','concat'])
};