/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',

    neuter: {
      app: {
        files: {'build/app.js': ['lib/app/**/*.js']}
      },
      test: {
        files: {'build/tests.js': ['test/spec_helper.js', 'test/support/**/*.js', 'test/specs/**/*.js']}
      }
    },

    concat: {
      test_vendor: {
        files: {'build/test_vendor.js': ['test/vendor/**/*.js']}
      },
      vendor: {
        files: {'build/vendor.js': [
          'lib/vendor/js/jquery.js',
          'lib/vendor/js/handlebars.js',
          'lib/vendor/js/ember.js',
          'lib/vendor/js/ember-data.js'
        ]}
      }
    },

    watch: {
      files: ['Gruntfile.js', 'lib/**/*', 'test/**/*'],
      tasks: ['app', 'test']
    },

    copy: {
      app: {
        options: {cwd: 'lib'},
        files: {'build/': 'index.html'}
      },
      css: {
        options: {cwd: 'lib/css'},
        files: {'build/': 'app.css'}
      },
      test: {
        options: {cwd: 'test'},
        files: {'build/': 'test.html'}
      }
    },

    jshint: {
      options: {
        curly:   true,
        eqeqeq:  true,
        immed:   true,
        latedef: true,
        newcap:  true,
        noarg:   true,
        sub:     true,
        undef:   true,
        boss:    true,
        eqnull:  true,
        browser: true,
        devel:   true,
        globals: {
          jQuery:  true,
          Ember:   true,
          Em:      true,
          require: true,
          App:     true
        }
      },

      app:  ['Gruntfile.js', 'lib/app/**/*.js'],
      test: ['test/spec_helper.js', 'test/support/**/*.js', 'test/specs/**/*.js']
    },

    ember_templates: {
      app: {
        options: {
          templateName: function(libFile) {
            return libFile.replace(/lib\/app\/templates\//, '');
          }
        },
        files: {'build/templates.js': ['lib/app/templates/**/*.hbs']}
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-neuter');
  grunt.loadNpmTasks('grunt-ember-templates');

  grunt.registerTask('app', ['jshint:app', 'neuter:app', 'ember_templates:app', 'copy:app', 'copy:css']);
  grunt.registerTask('test', ['jshint:test', 'neuter:test', 'copy:test']);
  grunt.registerTask('vendor', ['concat:vendor', 'concat:test_vendor']);

  grunt.registerTask('default', ['app', 'test', 'vendor', 'watch']);

};
