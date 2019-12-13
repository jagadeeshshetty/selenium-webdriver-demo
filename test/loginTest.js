
const { Builder } = require('selenium-webdriver');
require('chromedriver');
const assert = require('assert');

describe('Verify Login', function () {
    // by default, 2sec will be mocha timeout. so explicitly set to 30sec timeout.
    this.timeout(30000);
    let driver;

    beforeEach(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    })

    afterEach(async function () {
        await driver.quit();
    })

    it('with valid credentials', async function () {
        await driver
            .get('http://the-internet.herokuapp.com/login');
        await driver
            .findElement({ id: 'username' })
            .sendKeys('tomsmith');
        await driver
            .findElement({ id: 'password' })
            .sendKeys('SuperSecretPassword!');
        await driver
            .findElement({ css: 'button' })
            .click();
        assert(await driver
            .findElement({ css: '.flash.success' })
            .isDisplayed(), 'Success message not displayed');
    });
});
