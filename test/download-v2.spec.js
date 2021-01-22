
const assert = require("assert");
const { Builder, By } = require("selenium-webdriver");
const http = require("http");
const DownloadPage = require("../pages/DownloadPage");

describe("File download v2", () => {
    let download;

    beforeEach(async function () {
        download = new DownloadPage(this.driver);
        await download.load();
    });

    it("verify a file download by inspecting its head request @downloadHeader", async function () {
        const download_url = await this.driver
            .findElement(By.css(".example a"))
            .getAttribute("href");
        const request = http.request(download.getHttpOptions(download_url), response => {
            assert(response.headers["content-type"] === "application/octet-stream");
            assert(Number(response.headers["content-length"]) > 0);
        });
        request.end();
    });
});

