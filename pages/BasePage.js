
/**
 * Selenium comes with an until module which is a collection of functions that can be used with
 * Selenium's wait function. We require and store it in a variable.
 * https://selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/lib/until.html
 */
const Until = require('selenium-webdriver').until;

class BasePage {
    constructor(driver) {
        this.driver = driver;
    }

    async visit(url) {
        await this.driver.get(url);
    };

    find(locator) {
        return this.driver.findElement(locator);
    };

    async type(locator, inputText) {
        await this.find(locator).sendKeys(inputText);
    };

    async click(locator) {
        await this.find(locator).click();
    };

    async isDisplayed(locator, timeout = 6000) {
        if (timeout) {
            await this.driver.wait(Until.elementLocated(locator), timeout);
            await this.driver.wait(Until.elementIsVisible(this.find(locator)), timeout);
            return true;
        } else {
            try {
                return await this.find(locator).isDisplayed();
            } catch (error) {
                return false;
            }
        }
    };
}

module.exports = BasePage;
