module.exports = function(grunt) {

  // Initial config
  var config = {
    pkg: grunt.file.readJSON('package.json'),

    uncss: {
      dist: {
        src: ['src/input.html'],
        dest: 'dest/output.css',
        options: {
          report: 'min' // optional: include to report savings
        }
      }
    },

    emailBuilder: {
      inline: {
        files: {
          'dest/output.html': 'src/input.html'
        }
      },
      litmus: {
        options: {
          encodeSpecialChars: true,
          litmus: {
            subject: 'Test Email',
            username: 'kevin@litmus.com',
            password: 'theconsequence',
            url: 'https://litmus64.litmus.com',
            applications: ['gmailnew', 'ffgmailnew', 'chromegmailnew']
          }
        },
        files: {
          'dest/output.html': ['src/input.html']
        }
      }
    }
  }

  // Load tasks
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-email-builder');

  grunt.initConfig(config);

  require('load-grunt-tasks')(grunt);

  // Default Task
  grunt.registerTask('default', ['uncss','emailBuilder']);

};
