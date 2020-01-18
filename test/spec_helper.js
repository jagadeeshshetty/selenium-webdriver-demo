
const DriverFactory = require('../lib/DriverFactory');
const driverFactory = new DriverFactory();

beforeEach(async function() {
    const testName = this.currentTest.fullTitle();
    this.driver = await driverFactory.build(testName);
});

afterEach(async function() {
    await driverFactory.quit();
});
