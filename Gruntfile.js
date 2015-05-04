module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      main: {
        files: [
          {src: ['views/*'], dest: 'build/views/',flatten:true,expand:true}
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
    }
  });

  grunt.loadNpmTasks('grunt-asciify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  //grunt.registerTask('default', ['asciify','clean', 'bower', 'uglify','copy']);
  grunt.registerTask('default', ['asciify','copy']);
  grunt.registerTask('heroku', ['copy']);
};
