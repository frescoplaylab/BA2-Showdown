module.exports = function (grunt) {
	grunt.registerTask('test', [
		'mocha_istanbul:coverage','mocha_istanbul:makeReport'
	]);
};
