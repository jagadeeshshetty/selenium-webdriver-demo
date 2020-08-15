
const { Builder } = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');
let firefox = require('selenium-webdriver/firefox');
const config = require('./config');

class DriverFactory {
    constructor() {
        this.config = config;
    }

    _configure() {
        let builder = new Builder();
        switch (config.host) {
            case 'saucelabs':
                const url = 'http://ondemand.saucelabs.com:80/wd/hub';
                builder.usingServer(url);
                builder.withCapabilities(this.config.sauce);
                break;
            case 'localhost':
                // process.env.PATH += path.delimiter + path.join(__dirname, '..', 'vendor');
                this.browser = this.config.browser;
                this.options = null;

                switch (this.browser) {
                    case 'chrome':
                        builder
                            .forBrowser(this.browser)
                            .build();
                        break;
                    case 'chromeHeadless':
                        this.options = new chrome.Options();
                        this.options.addArguments("--no-sandbox");
                        this.options.addArguments("--disable-dev-shm-usage");
                        this.options.addArguments("--headless");

                        builder
                            .forBrowser('chrome')
                            .setChromeOptions(this.options)
                            .build();
                        break;
                    case 'firefox':
                        builder.forBrowser(this.config.browser).build();
                        console.log(builder);
                        break;
                    case 'firefoxHeadless':
                        this.options = new firefox.Options();
                        this.options.addArguments("--no-sandbox");
                        this.options.addArguments("--disable-dev-shm-usage");
                        this.options.addArguments("--headless");

                        builder
                            .forBrowser('firefox')
                            .setFirefoxOptions(this.options)
                            .build();
                        break;
                    default:
                        console.log(`    [ERROR] No proper browser.`);
                        break;
                }
                break;
        }
        return builder;
    }

    async build(testName) {
        this.testName = testName;
        this.driver = await this._configure().build();
        return this.driver;
    };

    async quit() {
        await this.driver.close();
        await this.driver.quit();
    };
};

module.exports = DriverFactory;
