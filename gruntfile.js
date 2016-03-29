module.exports = function(grunt) {
 // Project configuration.
 grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  sass: {
   interior: {
    options: {
     style: 'expanded',
     sourcemap: 'auto',
     precision: 4
    },
    files: {
     'dist/css/interior.css': 'src/scss/style.scss'
    }
   }
  },
  postcss: {
   options: {
    map: true,
    processors: [
     require('autoprefixer')({
      browsers: ['last 2 versions']
     })
    ]
   },
   interior: {
    src: 'dist/css/*.css'
   }
  },
  watch: {
   sass: {
    files: ['src/scss/*.scss', 'src/scss/**/*.scss'],
    tasks: 'sass',
    options: {
     spawn: false,
     livereload: true
    }
   },
   css: {
    files: ['dist/*.css'],
    tasks: 'postcss',
    options: {
     spawn: false,
     livereload: true
    }
   },
   nunjucks: {
    options: {
     data: grunt.file.readJSON('data.json'),
     paths: 'src'
    },
    dev: {
     files: [{
      expand: true,
      cwd: "src/",
      src: [
       'templates/**/*.html',
       'partials/**/*.html'
      ],
      dest: "build/",
      ext: ".html"
     }],
    }
   },
  },
 });

 // Load the plugins to run your tasks
 require('load-grunt-tasks')(grunt, {
  scope: 'devDependencies'
 });
 require('time-grunt')(grunt);

 // Default task(s).
 grunt.registerTask('default', [
  'sass',
  'nunjucks',
  'postcss',
  'watch'
 ]);
};
