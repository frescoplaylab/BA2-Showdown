module.exports = function(grunt) {
  grunt.config.set('mocha_istanbul', {
    coverage: {
      src: 'test',
      options: {
        coverageFolder: 'coverage',
        thresholds: {
          'statements': 90,
          'branches': 90,
          'lines': 100,
          'functions': 100
        },
        mask: '**/*.test.js',
        root: 'api/'
      }
    },
    makeReport: {
      src: 'test/**/*.js',
      options: {
        type: 'lcov',
        dir: 'coverage/reports',
        print: 'detail'
      }
    }
  });
  grunt.loadNpmTasks('grunt-mocha-istanbul');
};
