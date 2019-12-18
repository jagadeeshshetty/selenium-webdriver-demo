
const { Builder } = require('selenium-webdriver');
require('chromedriver');
const assert = require('assert');
const LoginPage = require('../pages/LoginPage');

describe('Verify Login', function () {
    // by default, 2sec will be mocha timeout. so explicitly set to 30sec timeout.
    this.timeout(30000);
    let driver;
    let login;

    beforeEach(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        login = new LoginPage(driver);
        await login.load();
    })

    afterEach(async function () {
        await driver.quit();
    })

    it('with valid credentials', async function () {
        await login.authenticate('tomsmith', 'SuperSecretPassword!');
        assert(await login.successMessagePresent(), 'Success message not displayed');
    });

    it('with invalid credentials', async function () {
        await login.authenticate('invalid', 'invalid')
        assert(await login.failureMessagePresent(), 'Failure message not displayed');
    });
});
