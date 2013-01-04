/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',

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
        debug:   true,
        globals: {
          // app
          App:        true,
          Todos:      true,
          // neuter
          require:    true,
          // jquery
          jQuery:     true,
          // ember
          Ember:      true,
          Em:         true,
          DS:         true,
          // mocha
          describe:   true,
          before:     true,
          after:      true,
          beforeEach: true,
          afterEach:  true,
          it:         true,
          done:       true,
          assert:     true,
          expect:     true,
          should:     true,
          setup:      true,
          teardown:   true,
          suite:      true,
          test:       true
        }
      },

      app:  ['Gruntfile.js', 'lib/app/**/*.js'],
      test: ['test/spec_helper.js', 'test/support/**/*.js', 'test/specs/**/*.js']
    },

    neuter: {
      app: {
        files: {'build/app.js': ['lib/app/**/*.js']}
      },
      test: {
        files: {'build/tests.js': ['test/spec_helper.js', 'test/support/**/*.js', 'test/specs/**/*.js']}
      }
    },

    copy: {
      app: {
        options: {cwd: 'lib'},
        files: {'build/': 'index.html'}
      },
      app_css: {
        options: {cwd: 'lib/css'},
        files: {'build/': 'app.css'}
      },
      app_images: {
        options: {cwd: 'lib/img'},
        files: {'build/images/': '*'}
      },
      test: {
        options: {cwd: 'test'},
        files: {'build/': ['test.html']}
      },
      test_css: {
        options: {cwd: 'test/vendor'},
        files: {'build/': 'mocha.css'}
      },
      test_images: {
        options: {cwd: 'test/vendor/images'},
        files: {'build/images/': '*'}
      }
    },

    concat: {
      test_vendor: {
        files: {'build/test_vendor.js': [
          'test/vendor/mocha.js',
          'test/vendor/chai.js',
          'test/vendor/chai-jquery.js',
          'test/vendor/sinon.js'
        ]}
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

    ember_templates: {
      app: {
        options: {
          templateName: function(libFile) {
            return libFile.replace(/lib\/app\/templates\//, '');
          }
        },
        files: {'build/templates.js': ['lib/app/templates/**/*.hbs']}
      }
    },

    notify : {
      build : {
        options: {
          message : 'Carry on ...',
          title : 'Build complete'
        }
      }
    },

    watch: {
      files: ['Gruntfile.js', 'lib/**/*', 'test/**/*'],
      tasks: ['app', 'test', 'notify:build']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-neuter');
  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-notify');

  grunt.registerTask('app', ['jshint:app', 'neuter:app', 'ember_templates:app', 'copy:app', 'copy:app_css', 'copy:app_images']);
  grunt.registerTask('test', ['jshint:test', 'neuter:test', 'copy:test', 'copy:test_css', 'copy:test_images']);
  grunt.registerTask('vendor', ['concat:vendor', 'concat:test_vendor']);

  grunt.registerTask('default', ['app', 'test', 'vendor', 'notify:build', 'watch']);

};
