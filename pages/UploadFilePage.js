
const path = require('path');
const BasePage = require('./BasePage');

const CHOOSE_FILE_BUTTON = { id: 'file-upload' };
const UPLOAD_BUTTON = { id: 'file-submit' };
const UPLOADED_FILES_CONTAINER = { xpath: "//*[@id='uploaded-files']" };

class UploadFilePage extends BasePage {
    constructor(driver) {
        super(driver);
    }

    async load() {
        await this.visit('/upload');
        if (!(await this.isDisplayed(CHOOSE_FILE_BUTTON)))
            throw new Error('File Uploader form not loaded');
    }

    async upload(filename) {
        let filePath = path.join(process.cwd(), 'test-assets', filename);
        await this.type(CHOOSE_FILE_BUTTON, filePath);
        await this.click(UPLOAD_BUTTON);
        return await this.getText(UPLOADED_FILES_CONTAINER);
    }

    // async authenticate(username, password) {
    //     await this.type(USERNAME_INPUT, username);
    //     await this.type(PASSWORD_INPUT, password);
    //     await this.click(SUBMIT_BUTTON);
    // }

    // successMessagePresent() {
    //     return this.isDisplayed(SUCCESS_MESSAGE);
    // }

    // failureMessagePresent() {
    //     return this.isDisplayed(FAILURE_MESSAGE);
    // }
}

module.exports = UploadFilePage;
