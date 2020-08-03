
const DriverFactory = require('../lib/DriverFactory');
const driverFactory = new DriverFactory();
const fs = require('fs');
const addContext = require('mochawesome/addContext');
const path = require('path');

beforeEach(async function () {
    const testName = this.currentTest.fullTitle();
    this.driver = await driverFactory.build(testName);
});

afterEach(async function () {
    if (this.currentTest.state === 'failed') {
        let fileName = (this.currentTest.title + '-' + new Date().getTime()).replace(/\s+/g, '-') + '.jpg';
        let dir = await path.join(__dirname, '..', 'mochawesome-report', 'screenshots');
        if (!fs.existsSync(dir)) {
            await fs.mkdirSync(dir);
        }
        await fs.writeFileSync(await path.join(dir, fileName), await this.driver.takeScreenshot(), 'base64');
        await addContext(this, await path.join(__dirname, '..', 'mochawesome-report', 'screenshots', fileName));
    }
    await driverFactory.quit();
});
