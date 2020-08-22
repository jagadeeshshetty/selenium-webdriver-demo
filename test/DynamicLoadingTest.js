
require('./spec_helper');
const assert = require('assert');
const DynamicLoadingPage = require('../pages/DynamicLoadingPage');

describe('Verify Dynamic Loading @dynamicLoad', function () {
    let dynamicLoading;

    beforeEach(async function () {
        dynamicLoading = new DynamicLoadingPage(this.driver);
    })

    it('hidden element @P2', async function () {
        await dynamicLoading.loadExample('1');
        assert(await dynamicLoading.isFinishTextPresent(), true, 'Finish text not displayed.');
    });
});
