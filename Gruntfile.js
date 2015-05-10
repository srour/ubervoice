module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      main: {
        files: [
          {src: ['views/*.html'], dest: 'build/',flatten:true,expand:true}
        ]
      }
    },
    clean: ["build/*"],
    asciify: { 
      banner:{
        text: 'ubervoice',
        // Add the awesome to the console, and use the best font.
        options:{ 
          font:'graffiti',
          log:true
        }
      }
    },
    bower: {
      install: {
        options: {
          targetDir: 'build/lib',
          layout: 'byType',
          install: true,
          verbose: true,
          cleanTargetDir: true,
          cleanBowerDir: true
          }
      }
    },
    clean: ["build/*"],
  });

  grunt.loadNpmTasks('grunt-asciify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['asciify','copy']);
  grunt.registerTask('heroku', ['bower','copy']);
};