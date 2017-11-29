module.exports = {
  css: {
    src: ['../server/public/css/*.**', '!../server/public/css/*.min.css'],
    dest: '../server/public/css'
  },
  img: {
    src: '../server/public/img/**/*.**',
    dest: '../server/public/img'
  },
  js: {
    src: ['../server/public/js/**/*.js', '!../server/public/js/**/*.min.js', '!../server/public/js/vendor/**/*.js'],
    dest: '../server/public/js'
  },
  clean: {
    src: ['../server/public/+(js|css)/**/*.min.**', '!../server/public/js/vendor/**/*.js']
  },
  watch: {
    src: ['../server/public/+(js|css)/**/*.**', '!../server/public/+(js|css)/**/*.min.**']
    //src: ['../server/public/css/style.**']
  }
}
