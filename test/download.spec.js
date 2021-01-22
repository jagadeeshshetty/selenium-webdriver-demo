
const assert = require("assert");
const { Builder, By, Key } = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");
const fs = require("fs");
const path = require("path");

describe("File download", async function () {
    let driver;
    const tmpDir = path.join(__dirname, "tmp");

    beforeEach(async () => {
        if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

        let options = new firefox.Options()
            // should be an absolute path
            .setPreference("browser.download.dir", tmpDir)
            // It tells Firefox which download directory to use. 2 tells it to use a custom download path,
            // wheras 1 would use the browser's default path, and 0 would place them on the Desktop.
            .setPreference("browser.download.folderList", 2)
            .setPreference(
                "browser.helperApps.neverAsk.saveToDisk",
                "images/jpeg, application/pdf, application/octet-stream"
            )
            // This overrides the sensible default in Firefox that previews PDFs in the browser. It accepts a boolean.
            .setPreference("pdfjs.disabled", true);

        driver = await new Builder()
            .forBrowser("firefox")
            .setFirefoxOptions(options)
            .build();
    });

    function cleanupTmpDir() {
        if (fs.existsSync(tmpDir)) {
            const files = fs.readdirSync(tmpDir).map(file => path.join(tmpDir, file));
            files.forEach(file => fs.unlinkSync(file));
            fs.rmdirSync(tmpDir);
        }
    }

    afterEach(async () => {
        await driver.quit();
        cleanupTmpDir();
    });

    it("should automatically download to local disk @textFileDownload", async function () {
        await driver.get("http://the-internet.herokuapp.com/download");
        await driver.findElement(By.css(".example a")).click();
        const files = fs.readdirSync(tmpDir).map(file => path.join(tmpDir, file));
        assert(files.length);
        assert(fs.statSync(files[0]).size);
    });
});
