const { Builder } = require("selenium-webdriver");
let chrome = require("chromedriver");
let _chrome = require('selenium-webdriver/chrome');
let firefox = require("geckodriver");
let _firefox = require('selenium-webdriver/firefox');
const config = require("./config");

class DriverFactory {
    async build(testName) {
        this.testName = testName;
        this.browser = config.browser;
        this.options = null;

        switch (this.browser) {
            case "chrome":
                this.driver = await new Builder().forBrowser(this.browser).build();
                break;
            case "chromeHeadless":
                this.options = new _chrome.Options();
                this.options.addArguments("--no-sandbox");
                this.options.addArguments("--disable-dev-shm-usage");
                this.options.addArguments("--headless");

                this.driver = await new Builder()
                    .forBrowser("chrome")
                    .setChromeOptions(this.options)
                    .build();
                break;
            case "firefox":
                this.driver = await new Builder().forBrowser(this.browser).build();
                break;
            case "firefoxHeadless":
                this.options = new _firefox.Options();
                this.options.addArguments("--no-sandbox");
                this.options.addArguments("--disable-dev-shm-usage");
                this.options.addArguments("--headless");

                this.driver = await new Builder()
                    .forBrowser("firefox")
                    .setFirefoxOptions(this.options)
                    .build();
                break;
            default:
                console.log(`    [ERROR] No proper browser.`);
                break;
        }

        return this.driver;
    }

    async quit() {
        await this.driver.quit();
    }
}

module.exports = DriverFactory;
