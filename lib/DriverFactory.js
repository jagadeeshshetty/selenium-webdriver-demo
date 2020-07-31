
const { Builder } = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');
// require('chromedriver');

class DriverFactory {
    async build(testName) {

        let options = new chrome.Options();
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        options.addArguments("--headless");

        this.testName = testName;
        this.driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
        return this.driver;
    };

    async quit() {
        await this.driver.quit();
    };
};

module.exports = DriverFactory;
