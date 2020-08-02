
const { Builder } = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');
let firefox = require('selenium-webdriver/firefox');
const config = require('./config');

class DriverFactory {
    async build(testName) {

        this.testName = testName;
        this.browser = config.browser;
        this.options = null;
        // console.log(`    [INFO] Tests running on '${this.browser}' browser.`);

        switch (this.browser) {
            case 'chrome':
                this.driver = await new Builder()
                    .forBrowser(this.browser)
                    .build();
                // this.driverVersion = (await (await this.driver.getCapabilities()).get('chrome')['chromedriverVersion']).split('(')[0];
                break;
            case 'chromeHeadless':
                this.options = new chrome.Options();
                this.options.addArguments("--no-sandbox");
                this.options.addArguments("--disable-dev-shm-usage");
                this.options.addArguments("--headless");

                this.driver = await new Builder()
                    .forBrowser('chrome')
                    .setChromeOptions(this.options)
                    .build();
                // this.driverVersion = (await (await this.driver.getCapabilities()).get('chrome')['chromedriverVersion']).split('(')[0];
                break;
            case 'firefox':
                this.driver = await new Builder()
                    .forBrowser(this.browser)
                    .build();
                // this.driverVersion = ((await (await this.driver.getCapabilities()).get('moz:geckodriverVersion')));
                break;
            case 'firefoxHeadless':
                this.options = new firefox.Options();
                this.options.addArguments("--no-sandbox");
                this.options.addArguments("--disable-dev-shm-usage");
                this.options.addArguments("--headless");

                this.driver = await new Builder()
                    .forBrowser('firefox')
                    .setFirefoxOptions(this.options)
                    .build();
                // this.driverVersion = ((await (await this.driver.getCapabilities()).get('moz:geckodriverVersion')));
                break;
            default:
                console.log(`    [ERROR] No proper browser.`);
                break;
        }

        // this.browserVersion = await (await this.driver.getCapabilities()).getBrowserVersion();
        // console.log(`    [INFO] Browser version: ${this.browserVersion}`);
        // console.log(`    [INFO] Driver version: ${this.driverVersion}`);
        return this.driver;
    };

    async quit() {
        await this.driver.quit();
    };
};

module.exports = DriverFactory;
