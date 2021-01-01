// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function(config) {
  const configuration = {
    basePath : '',
    frameworks : [ 'jasmine', '@angular-devkit/build-angular' ],
    plugins : [
      require('karma-jasmine'),
      require('karma-coverage'),
      require('karma-junit-reporter'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client : {
      clearContext : false, // leave Jasmine Spec Runner output visible in browser
      jasmine : {
        random : false
      }
    },
    coverageReporter: {
      dir: require('path').join(__dirname, 'coverage'),
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' }
      ],
      fixWebpackSourcePaths: true
    },
    angularCli : {
      environment : 'dev'
    },
    reporters : [ 'progress', 'kjhtml', 'junit', 'coverage' ],
    junitReporter : {
      outputDir : 'coverage',
      outputFile : 'test-results.xml'
    },
    port : 9876,
    colors : true,
    logLevel : config.LOG_INFO,
    autoWatch : true,
    browsers : [ 'ChromeHeadless' ],
    captureTimeout : 600000,
    browserDisconnectTolerance : 0,
    browserDisconnectTimeout : 80000,
    browserNoActivityTimeout : 80000,
    flags : [ '--disable-web-security', '--disable-gpu', '--no-sandbox',
      '--disable-setuid-sandbox' ],
    customLaunchers : {
      Chrome_travis_ci : {
        base : 'Chrome',
        flags : [ '--no-sandbox' ]
      }
    },
    singleRun : true
  };

  if (process.env.TRAVIS) {
    configuration.browsers = [ 'Chrome_travis_ci' ];
  }

  config.set(configuration);
};
