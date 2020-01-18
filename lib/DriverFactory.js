
const { Builder } = require('selenium-webdriver');
require('chromedriver');

class DriverFactory {
    async build(testName) {
        this.testName = testName;
        this.driver = await new Builder().forBrowser('chrome').build();
        return this.driver;
    };

    async quit() {
        await this.driver.quit();
    };
};

module.exports = DriverFactory;
