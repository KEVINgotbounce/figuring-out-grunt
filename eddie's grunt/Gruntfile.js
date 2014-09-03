module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    emailBuilder: {
      emailTest : {
        files: { 'dest/output.html' : 'src/input.html' },
        options: {
          emailTest: {
            subject: 'Testing via grunt',
            email: 'YOUR EMAIL',
            transport: {
              type: 'SMTP',
              options: {
                service: 'gmail',
                auth: {
                  user: 'YOUR EMAIL',
                  pass: 'YOUR PASSWORD'
                }
              }
            }
          }
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-email-builder');

  grunt.registerTask('default', [ 'emailBuilder' ]);
};
