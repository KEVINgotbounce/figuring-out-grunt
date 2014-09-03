/*

TO DO

1) Reduce CSS duplication
   - Ideally just a single build - global.scss turns into /build/global.css
   - Can Autoprefixer output minified?
   - If it can, is it as good as cssmin?
   - Could Sass be used again to minify instead?
   - If it can, is it as good as cssmin?

2) Better JS dependency management
   - Require js?
   - Can it be like the Asset Pipeline where you just do //= require "whatever.js"

3) Is HTML minification worth it?

4) Set up a Jasmine test just to try it.

5) Can this Gruntfile.js be abstracted into smaller parts?
   - https://github.com/cowboy/wesbos/commit/5a2980a7818957cbaeedcd7552af9ce54e05e3fb

*/

module.exports = function(grunt) {

  // Utility to load the different option files
  // based on their names
  function loadConfig(path) {
    var glob = require('glob');
    var object = {};
    var key;

    glob.sync('*', {cwd: path}).forEach(function(option) {
      key = option.replace(/\.js$/,'');
      object[key] = require(path + option);
    });

    return object;
  }

  // Initial config
  var config = {
    pkg: grunt.file.readJSON('package.json'),

    uncss: {
      dist: {
        src: ['test.html'],
        dest: 'css/style.css',
        options: {
          report: 'min' // optional: include to report savings
        }
      }
    },

    mandrill: {
      mailer: {
        options: {
          key: 'YLcsX3M8pGNa6MoxpVYb-Q',
          sender: 'kevin@litmus.com',
          recipient: 'kevin@litmus.com',
          subject: 'This is a test email'
        },
        src: ['test-inline.html']
      }
    },

    emailBuilder: {
      litmus: {
        options: {
          encodeSpecialChars: true,
          litmus: {
            subject: 'OH HAI',
            username: 'kevin@litmus.com',
            password: 'theconsequence',
            url: 'https://litmus64.litmus.com',
            applications: ['gmailnew', 'ffgmail', 'chromegmailnew']
          }
        },
        files: {
          'wtf.html': ['test-inline.html']
        }
      }
    },

    emailBuilder : {
      emailTest : {
      files: { 'dest/output.html' : 'src/input.html' },
      options: {
        emailTest: {
          subject: 'Testing via grunt',
          email: 'kevin@litmus.com',
          transport: {
            type: 'SMTP',
            options: {
              service: 'gmail',
              auth: {
                user: 'kevin@litmus.com',
                pass: 'theconsequence'
              }
            }
          }
        }
      }
    }
  }

  // Load tasks from the tasks folder
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-email-builder');


  // Load all the tasks options in tasks/options base on the name:
  // watch.js => watch{}
  grunt.util._.extend(config, loadConfig('./tasks/options/'));

  grunt.initConfig(config);

  require('load-grunt-tasks')(grunt);

  // Default Task is basically a rebuild
  grunt.registerTask('default', ['uncss','emailBuilder']);

  // Moved to the tasks folder:
  // grunt.registerTask('dev', ['connect', 'watch']);

};
