module.exports = function (grunt) {

	grunt.initConfig({

		fixture: {
			dev: 'development',
			test: 'test'
		},

		jshint: {
			all: [
				'data/**/*.js', 'Gruntfile.js', 'index.js', 'route/**/*.js',
				'test/**/*.js', 'task/**/*.js'
			],
			options: {
				camelcase: false,
				es3: false,
				indent: 4,
				latedef: false,
				maxcomplexity: 4,
				maxdepth: 2,
				maxlen: 100,
				maxparams: 4,
				maxstatements: 10,
				node: true,
				quotmark: 'single'
			}
		},

		mochaTest: {
			functional: {
				src: ['test/functional/*.js'],
				options: {
					reporter: 'spec'
				}
			}
		}

	});

	grunt.registerMultiTask('fixture', 'Load fixtures into the database.', function () {
		var done = this.async();
		require('./data/fixture/load')(this.data, function (err) {
			if (err) {
				grunt.log.error(err.message);
				return done(false);
			}
			grunt.log.writeln('Fixtures added');
			done();
		});
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-mocha-test');

	grunt.registerTask('lint', ['jshint']);
	grunt.registerTask('test', ['mochaTest']);
	grunt.registerTask('default', ['lint', 'test']);

};