
const { Builder } = require('selenium-webdriver');
require('chromedriver');
const assert = require('assert');
const DynamicLoadingPage = require('../pages/DynamicLoadingPage');

describe('Verify Dynamic Loading', function () {
    // by default, 2sec will be mocha timeout. so explicitly set to 30sec timeout.
    this.timeout(30000);
    let driver;
    let dynamicLoading;

    beforeEach(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        dynamicLoading = new DynamicLoadingPage(driver);
    })

    afterEach(async function () {
        await driver.quit();
    })

    it('hidden element', async function() {
        await dynamicLoading.loadExample('1');
        assert(await dynamicLoading.isFinishTextPresent(), true, 'Finish text not displayed.');
    });
});
