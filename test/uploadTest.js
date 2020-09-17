
require('./spec_helper');
const assert = require('assert');
const UploadFile = require('../pages/UploadFilePage');

describe('Verify file upload functionality @upload', function () {

    beforeEach(async function () {
        uploadFile = new UploadFile(this.driver);
        await uploadFile.load();
    })

    it('with valid text file @sanity @P1 @textFileUpload', async function () {
        let filename = 'text_file.txt';
        assert.strictEqual(await uploadFile.upload(filename), filename);
    });
});
