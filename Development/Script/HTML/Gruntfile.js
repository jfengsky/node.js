/**
 * TODO:
 *      1. 合并压缩assets/mods/目录下的js和css文件
 *      2. 把assets目录（包括本目录）下所有图片，.min.js, .min.css拷贝到build目录下
 *      
 * @param  {[type]} grunt
 * @return {[type]}
 */
 
 var path = require("path");
 
 var pRoot = path.resolve(__dirname, '../..');
 var pDeployment = path.resolve(pRoot, 'Deployment/Workstation/HTML');
 var pCode = path.resolve(pRoot, 'Code/HTML');
 var pCodeAssets = path.resolve(pCode, 'assets');
 var pCodeMods = path.resolve(pCodeAssets, 'mods');
 var pOutput = path.resolve(__dirname, '../../_output');
 var pOutputAssets = path.resolve(pOutput, 'HTML/assets');
 var pOutputMediate = path.resolve(pOutput, '_temp/HTML/assets/res');
 var pOutputRes = path.resolve(pOutputAssets, 'res');
 var compile = require(path.resolve(pCodeAssets, 'compile.js'));
 
module.exports = function(grunt) {
  grunt.initConfig({
    pkg : grunt.file.readJSON(path.resolve(pDeployment, 'package.json')),

    compass: {
      dist: {
        options: {
           sassDir: pCodeMods,
            cssDir: pCodeMods
          // config: 'doc/demo/sasstest/config.rb'
        }
      }
    },
	
    concat: {
      dist: {
        files: compile.jsContatFiles(pOutputMediate)
      }
    },

    cssmin: {
      combine: {
        files: compile.cssMinifyFiles(pOutputMediate)
      },
      options: {
        banner: '/* <%= grunt.template.today("yyyy-mm-dd HH:MM") %> */ \n'
      },
      minify: {
        expand: true,
        cwd: pOutputMediate,
        src: ['**/*.css', '**/!*.min.css'],
        dest: pOutputMediate,
        ext: '.min.css'
      }
    },

    uglify : {
      options : {
        banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      my_target: {
        expand: true,
        cwd: pOutputMediate,
        src: ['**/*.js'],
        dest: pOutputMediate,
        ext: '.min.js'
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, cwd: pOutputMediate, src: ['**/*.min.js'], dest: pOutputRes},
          {expand: true, cwd: pOutputMediate, src: ['**/*.min.css'], dest: pOutputRes},
          {expand: true, cwd: pCodeAssets, src: ['imgs/**/*.*'], dest: pOutputAssets},
          {expand: true, cwd: pCodeAssets, src: ['libs/**/*.*'], dest: pOutputAssets}
        ]
      }
    }
//      ,
//    watch: {
//      livereload: {
//        options: { livereload: true },
//        files: ['**/*']
//      }
//    }

  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
//  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['compass', 'concat', 'cssmin', 'uglify', 'copy']);
  
};