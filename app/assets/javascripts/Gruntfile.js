'use strict';

module.exports = function(grunt) {

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


    // configurable paths
    var paths = {
        dist: 'public/assets',
        tmp: 'tmp/grunt_tasks/',
        vendor: 'vendor/',
        src: {
            common: 'vendor/common',
            mainApp: 'vendor/main-app/',
            marketing: 'vendor/marketing'
        }
    };

    var fileLists = {
        mainApp: [
            '<%= paths.src.mainApp %>/bower_components/angular/angular.js',
            '<%= paths.src.mainApp %>/bower_components/angular-resource/angular-resource.js',
            '<%= paths.src.mainApp %>/bower_components/angular-route/angular-route.js',
            '<%= paths.src.mainApp %>/bower_components/a-class-above/dist/a_class_above.js',
            '<%= paths.src.mainApp %>/bower_components/super-model/dist/super_model.js',
            '<%= paths.src.mainApp %>/bower_components/iguana/dist/iguana.js',
            '<%= paths.src.mainApp %>/scripts/**/*.js',
            '<%= paths.src.mainApp %>/components/*/scripts/**/*.js',
            '<%= paths.src.mainApp %>/scripts/views.js'
        ]
    };


    try {
        paths.vendor = require('./bower.json').appPath || paths.vendor;
    } catch (e) {}


    //--------------------------------
    // Grunt Config
    //--------------------------------


    grunt.initConfig({
        paths: paths,

        rails: {
            options: {
                port: '3000',
                environment: 'development'
            }
        },
        open: {
            dev: {
                path: 'http://localhost:3000/browse'
            }
        },
        clean: {
            all: {
                options: {
                    force: true
                },
                files: [{
                    dot: true,
                    src: [
                        '.sass-cache',
                        '<%= paths.tmp %>',
                        '<%= paths.dist %>'
                    ]
                }]
            },
            vendorSymlink: {
                options: {
                    force: true
                },
                files: [{
                    dot: true,
                    src: [
                        'public/vendor'
                    ]
                }]
            },
            common: {
                options: {
                    force: true
                },
                files: [{
                    dot: true,
                    src: [
                        '{<%= paths.tmp %>,<%= paths.dist %>}/scripts/common*.{js,map}'
                    ]
                }]
            },
            mainApp: {
                options: {
                    force: true
                },
                files: [{
                    dot: true,
                    src: [
                        '{<%= paths.tmp %>,<%= paths.dist %>}/scripts/main-app*.{js,map}'
                    ]
                }]
            },
            marketing: {
                options: {
                    force: true
                },
                files: [{
                    dot: true,
                    src: [
                        '{<%= paths.tmp %>,<%= paths.dist %>}/scripts/marketing*.{js,map}'
                    ]
                }]
            },
            styles: {
                options: {
                    force: true
                },
                files: [{
                    dot: true,
                    src: [
                        '.sass-cache',
                        '{<%= paths.tmp %>,<%= paths.dist %>}{,/**}/*.{css,scss,sass}',
                        '{<%= paths.tmp %>,<%= paths.dist %>}{,/**}/*.{png,jpg,gif,svg}',
                    ]
                }]
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= paths.src.mainApp %>/scripts/{,**/}*.js',
                '<%= paths.src.mainApp %>/components/*/scripts/**/*.js',
                '<%= paths.src.mainApp %>/components/*/tests/**/*.js' // FIXME: Should be 'spec'
            ]
        },
        compass: {
            // FIXME: Break these targets into separate configs
            options: {
                sassDir: '<%= paths.src.mainApp %>/styles/main',
                cssDir: '<%= paths.dist %>/styles',
                generatedImagesDir: '<%= paths.dist %>/images/generated',
                imagesDir: '<%= paths.src.mainApp %>/images',
                javascriptsDir: '<%= paths.src.mainApp %>/scripts',
                fontsDir: '<%= paths.src.mainApp %>/fonts',
                importPath: [
                    '<%= paths.src.common %>/bower_components',
                    '<%= paths.src.mainApp %>/bower_components',
                    '<%= paths.src.mainApp %>/components',
                    '<%= paths.src.mainApp %>/styles'
                ],
                httpImagesPath: '/assets/images',
                httpGeneratedImagesPath: '/assets/images/generated',
                httpFontsPath: '/assets/fonts',
                sourcemap: true,
                relativeAssets: false,
                noLineComments: true,
                debugInfo: false,
                outputStyle: 'compressed'
            },
            dist: {},
            test: {
                options: {
                    cssDir: '<%= paths.tmp %>/styles',
                    generatedImagesDir: '<%= paths.tmp %>/images/generated',
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 versions'],
                map: true
            },
            multiple_files: {
                expand: true,
                flatten: true,
                src: '<%= paths.dist %>/styles/*.css',
                dest: '<%= paths.dist %>/styles/'
            }
        },
        filerev: {
            scripts: {
                src: [
                    '<%= paths.dist %>/scripts/{,*/}*.js',
                ]
            },
            styles: {
                src: [
                    '<%= paths.dist %>/scripts/{,*/}*.js',
                    '<%= paths.dist %>/styles/{,*/}*.css',
                    '<%= paths.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%= paths.dist %>/fonts/*'
                ]
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    flatten: true,
                    filter: 'isFile',
                    cwd: '<%= paths.vendor %>',
                    src: '**/images/*.{png,jpg,jpeg}',
                    dest: '<%= paths.dist %>/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    flatten: true,
                    filter: 'isFile',
                    cwd: '<%= paths.vendor %>',
                    src: '**/images/*.svg',
                    dest: '<%= paths.dist %>/images'
                }]
            }
        },
        copy: {
            images: {
                files: [{
                    expand: true,
                    flatten: true,
                    filter: 'isFile',
                    cwd: '<%= paths.vendor %>',
                    dest: '<%= paths.dist %>',
                    src: ['**/fonts/*']
                }, {
                    expand: true,
                    cwd: '<%= paths.dist %>/images',
                    dest: '<%= paths.dist %>/images',
                    src: ['generated/*']
                }]
            },
            
            mainApp: {
                files: [
                    {src: fileLists.mainApp, dest: '<%= paths.dist %>}/scripts'}
                ]
            }

        },
        concurrent: {
            test: ['compass:test'],
            dist: ['compass:dist', 'imagemin', 'svgmin']
        },
        karma: {
            // grunt test defaults to karma:unit
            unit: {
                configFile: 'karma/karma.conf.js'
            },

            // dist for minified code
            dist: {
                configFile: 'karma/karma.conf.dist.js'
            },

            // for CI builds, run `grunt test-ci`
            continuous: {
                configFile: 'karma/karma.conf.dist.js',
                reporters: ['junit'],
                junitReporter: {
                    outputFile: '../test-results/main-app.xml',
                    suite: ''
                }
            },
        },
        jsbeautifier: { // https://npmjs.org/package/grunt-jsbeautifier
            default: {
                src: [
                    'Gruntfile.js',
                    'karma.conf.js',
                    'karma.conf.dist.js',
                    '<%= paths.vendor %>/*/scripts/{,*/}*.js',
                    '<%= paths.vendor %>/*/components/*/scripts/**/*.js'
                ]
            },
            validate: {
                src: [
                    'Gruntfile.js',
                    'karma.conf.js',
                    'karma.conf.dist.js',
                    '<%= paths.vendor %>/*/scripts/{,*/}*.js',
                    '<%= paths.vendor %>/*/components/*/scripts/**/*.js'
                ],
                options: {
                    mode: 'VERIFY_ONLY'
                }
            }
        },
        ngtemplates: {
            mainApp: {
                src: '<%= paths.src.mainApp %>/**/views/**/*.html',
                dest: '<%= paths.src.mainApp %>/scripts/views.js',
                options: {
                    url: function(url) {
                        // TODO: We may wish to revisit this when adding multiple angular apps
                        return url.replace(paths.src.mainApp, '');
                    },
                    module: 'mainApp', // use angular.module('mainApp')
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true, // only if you don't use comment directives!
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    }
                }
            }
        },
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';'
            },
            mainApp: {
                // the files to concatenate
                src: fileLists.mainApp,
                // the location of the resulting JS file
                dest: '<%= paths.dist %>/scripts/main-app.js'
            }
        },
        uglify: {
            common: {
                options: {
                    sourceMap: '<%= paths.dist %>/scripts/common.js.map',
                    sourceMappingURL: 'common.js.map',
                    sourceMapRoot: '/vendor/',
                    sourceMapPrefix: 1,
                    mangle: true
                },
                files: {
                    '<%= paths.dist %>/scripts/common.js': [
                        '<%= paths.src.common %>/bower_components/jquery/jquery.js',
                        '<%= paths.src.common %>/bower_components/bootstrap-sass/dist/js/bootstrap.js',
                        '<%= paths.src.common %>/scripts/*.js'
                    ]
                }
            },
            mainApp: {
                options: {
                    sourceMap: '<%= paths.dist %>/scripts/main-app.js.map',
                    sourceMappingURL: 'main-app.js.map',
                    sourceMapRoot: '/vendor/',
                    sourceMapPrefix: 1,
                    mangle: false // mangle breaks angular conventions
                },
                files: {
                    '<%= paths.dist %>/scripts/main-app.js': fileLists.mainApp
                }
            },
            marketing: {
                options: {
                    sourceMap: '<%= paths.dist %>/scripts/marketing.js.map',
                    sourceMappingURL: 'marketing.js.map',
                    sourceMapRoot: '/vendor/',
                    sourceMapPrefix: 1,
                    mangle: true
                },
                files: {
                    '<%= paths.dist %>/scripts/marketing.js': [
                        '<%= paths.src.marketing %>/scripts/*.js'
                    ]
                }
            }
        },
        cacheBust: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 16,
                rename: true,
                deleteOriginals: true,
                baseDir: '<%= paths.dist %>/../'
            },
            assets: {
                files: [{
                    src: ['app/views/{,**/}*.html*']
                }]
            }
        },
        // gzip assets 1-to-1 for production
        compress: {
            main: {
                options: {
                    mode: 'gzip'
                },
                expand: true,
                src: ['<%= paths.dist %>{,/**}/*'],
            }
        },
        shell: {
            testRails: {
                options: {
                    stdout: true
                },
                command: 'rake spec; rake cucumber;'
            }
        },
        todos: {
            options: {
                verbose: false
            },
            all: {
                files: [{
                    src: '<%= paths.vendor %>{,/**}/scripts/*.js'
                }, {
                    src: 'app{,/**}/*.rb'
                }, {
                    src: 'features{,/**}/*.feature'
                }]
            }

        }



    });

    //--------------------------------
    // Default Task
    //--------------------------------

    grunt.registerTask('default', ['jsbeautifier:default', 'jshint', 'build', 'test:dist']); // basic sanity checks

    //--------------------------------
    // Build Tasks
    //--------------------------------

    grunt.registerTask('build', ['clean:all', 'build-styles', 'build-scripts', 'cacheBust', 'compress']); // full dist build

    grunt.registerTask('build-scripts', ['build-common', 'build-mainApp', 'build-marketing']); // all javascript

    grunt.registerTask('build-dev-scripts', ['build-common', 'build-dev-mainApp', 'build-marketing']); // all javascript

    grunt.registerTask('build-styles', ['clean:styles', 'concurrent:dist', 'autoprefixer:multiple_files']); // css build

    grunt.registerTask('build-common', ['clean:common', 'uglify:common']); // common javascript

    grunt.registerTask('build-mainApp', ['clean:mainApp', 'ngtemplates', 'uglify:mainApp']); // main-app javascript
    
    grunt.registerTask('build-dev-mainApp', ['clean:mainApp', 'ngtemplates', 'concat:mainApp']); // main-app javascript

    grunt.registerTask('build-marketing', ['clean:marketing', 'uglify:marketing']); // marketing javascript

    //--------------------------------
    // Dev Tasks
    //--------------------------------

    // kicks off intial build and then continues to watch
    grunt.registerTask('server', ['rails:server:start', 'build-scripts', 'build-styles', 'open', 'watch:server']);

    // same as server, except concatenates front royal code without uglifying
    grunt.registerTask('devserver', ['rails:server:start', 'build-dev-scripts', 'build-styles', 'open', 'watch:devserver']);

    grunt.registerTask('beautify', ['jsbeautifier:default']); // easier to remember task name



    //--------------------------------
    // Test Tasks
    //--------------------------------

    grunt.registerTask('test', ['karma:unit']); // dev test runner

    grunt.registerTask('test-dist', ['build:all', 'karma:dist']); // dev minified source test runner

    grunt.registerTask('test-ci', ['karma:continuous']); // CI post-compile test runner

    
    //--------------------------------
    // Watch Tasks
    //--------------------------------

    var baseWatchConfig = {
        common: {
            files: [
                '<%= paths.src.common %>/{,**/}*.js'
            ],
            tasks: ['build-common'],
            options: {
                livereload: true
            }
        },
        marketing: {
            files: [
                '<%= paths.src.marketing %>/{,**/}*.js'
            ],
            tasks: ['build-marketing'],
            options: {
                livereload: true
            }
        },
        styles: {
            files: [
                '<%= paths.vendor %>/**/*.scss',
                '<%= paths.vendor %>/**/images/{,**}/*.{png,jpg,gif,svg}'
            ],
            tasks: ['build-styles'],
            options: {
                livereload: true
            }
        },
        mainApp: {
            files: [
                '<%= paths.src.mainApp %>/{,**/}*.js',
                '<%= paths.src.mainApp %>/{,components/*}/views/**/*.html'
            ],
            tasks: ['build-mainApp'],
            options: {
                livereload: true
            }
        },
        devFrontRoyal: {
            files: [
                '<%= paths.src.mainApp %>/{,**/}*.js',
                '<%= paths.src.mainApp %>/{,components/*}/views/**/*.html'
            ],
            tasks: ['build-dev-mainApp'],
            options: {
                livereload: true
            }
        }
    };
    
    grunt.registerTask('watch:server', function() {
        // Configuration for watch:test tasks.
        var config = {
            common: baseWatchConfig.common,
            marketing: baseWatchConfig.marketing,
            styles: baseWatchConfig.styles,
            mainApp: baseWatchConfig.mainApp
        };

        grunt.config('watch', config);
        grunt.task.run('watch');
    });
    
    grunt.registerTask('watch:devserver', function() {
        // Configuration for watch:test tasks.
        var config = {
            common: baseWatchConfig.common,
            marketing: baseWatchConfig.marketing,
            styles: baseWatchConfig.styles,
            devFrontRoyal: baseWatchConfig.devFrontRoyal
        };

        grunt.config('watch', config);
        grunt.task.run('watch');
    });

};
