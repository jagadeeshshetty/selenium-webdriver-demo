
const { Builder } = require('selenium-webdriver');
const { Eyes } = require('@applitools/eyes-selenium');
require('chromedriver');
const assert = require('assert');

describe('Verify Login', function () {
    // by default, 2sec will be mocha timeout. so explicitly set to 30sec timeout.
    this.timeout(30000);
    let driver;
    let eyes;

    beforeEach(async function () {
        eyes = new Eyes();
        eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
        driver = await new Builder().forBrowser('chrome').build();
        driver = await eyes.open(driver, 'the-internet', this.currentTest.fullTitle(), { width: 1024, height: 768 });
    });

    afterEach(async function () {
        await driver.quit();
        await eyes.abortIfNotClosed();
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
        await eyes.checkWindow('Logged in');
        await eyes.close();
    });
});
