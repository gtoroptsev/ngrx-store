// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const {SpecReporter, StacktraceOption} = require('jasmine-spec-reporter');
const jasmineReporters = require('jasmine-reporters');
const HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

const reporter = new HtmlScreenshotReporter({
  dest: 'coverage/screenshots',
  filename: 'screens.html'
});

exports.config = {
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
  capabilities: {
    browserName: 'chrome',
    name: 'E2E test chrome',
    chromeOptions: {
      args: [ "--headless", "--disable-gpu", "--window-size=1600,1000" ]
    },
    acceptInsecureCerts: true
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    timeoutInterval: 30000,
    defaultTimeoutInterval: 30000,
    print: function () {
    }
  },
  getPageTimeout: 30000,
  allScriptsTimeout: 30000,
  beforeLaunch() {
    return new Promise(function (resolve) {
      reporter.beforeLaunch(resolve);
    });
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
    jasmine.getEnv().addReporter(
      new jasmineReporters.JUnitXmlReporter({
        savePath: require('path').join(__dirname, '../coverage/e2e'),
        filePrefix: 'test-results'
      })
    );
    jasmine.getEnv().addReporter(
      new SpecReporter({spec: {displayStacktrace: StacktraceOption.RAW}})
    );
    jasmine.getEnv().addReporter(reporter);
  },
  afterLaunch(exitCode) {
    return new Promise(function (resolve) {
      reporter.afterLaunch(resolve.bind(this, exitCode));
    });
  }
};
