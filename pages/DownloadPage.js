
const url = require("url");
const BasePage = require('./BasePage');

const FILE_DOWNLOADER_TEXT = { xpath: "//*[contains(text(),'File Downloader')]" };

class DownloadPage extends BasePage {
    constructor(driver) {
        super(driver);
    }

    async load() {
        await this.visit('/download');
        if (!(await this.isDisplayed(FILE_DOWNLOADER_TEXT)))
            throw new Error('File Downloader form not loaded');
    }

    /**
     * Helper function to create the options we'll use to perform the HTTP request.
     * @param {string} target URL
     * @returns An object with necessary values.
     */
    getHttpOptions(target) {
        const _url = url.parse(target);
        return {
            method: "HEAD",
            protocol: _url.protocol,
            hostname: _url.hostname,
            path: _url.path
        };
    }

};

module.exports = DownloadPage;
