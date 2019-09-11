module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.initConfig({
        jshint: {
            all: ['Gruntfile.js','api/**/*.js', 'test/**/*.js'],
            strict: "global"
        }
    });
}
