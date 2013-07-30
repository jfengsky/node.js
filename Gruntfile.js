module.exports = function(grunt) {
  grunt.initConfig({
    pkg : grunt.file.readJSON('package.json'),
    compass: {
      dist: {
        options: {
          sassDir: 'assets/sass',
          cssDir: 'assets/css'
        }
      }
    },
    cssmin: {
      options: {
        banner: '/* <%= grunt.template.today("yyyy-mm-dd HH:MM") %> */'
      },
      combine: {
        files: {
          'assets/css/combo-min.css':[
            'assets/css/reset.css',
            'assets/css/a.css',
            'assets/css/b.css'
          ]
        }
      }
    },
    concat: {
      dist: {
        src: [
          'assets/js/c.js',
          'assets/js/d.js'
        ],
        dest: 'assets/js/combo.js'
      }
    },
    jshint: {
      beforeconcat: [
        'assets/js/c.js',
        'assets/js/d.js'
      ],
      afterconcat: [
        'assets/js/combo.js'
      ]
    },
    uglify: {
      options: {
        banner: '/* <%= grunt.template.today("yyyy-mm-dd HH:MM") %> */ \n'
      },
      my_target: {
        files: {
          'assets/js/combo-min.js': [
            'assets/js/combo.js'
          ]
        }
      }
    },
    watch: {
      files: '**/*',
      tasks: ['default']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['compass', 'cssmin', 'concat', 'jshint', 'uglify', 'watch']);
}; 