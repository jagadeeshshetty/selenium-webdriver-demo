
require('./spec_helper');
const assert = require('assert');
const LoginPage = require('../pages/LoginPage');

describe('Verify Login @authentication', function () {
    let login;

    beforeEach(async function () {
        login = new LoginPage(this.driver);
        await login.load();
    })

    it('with valid credentials @sanity @P1 @validLogin', async function () {
        await login.authenticate('tomsmith', 'SuperSecretPassword!');
        assert(await login.successMessagePresent(), 'Success message not displayed');
    });

    it('with invalid credentials @P3', async function () {
        await login.authenticate('invalid', 'invalid')
        assert(await login.failureMessagePresent(), 'Failure message not displayed');
    });

    // it('generate screenshot for failed test case @generateScreenshot', async function () {
    //     await login.authenticate('invalid', 'invalid')
    //     assert(await login.successMessagePresent(), 'Success message not displayed');
    // });

    it('capture complete page and element screenshot @P3 @elementScreenshot', async function () {
        let subheaderLocator = login.find({ xpath: "//*[@class='subheader']" });
        // let subheaderLocator =  this.driver.findElement(By.xpath("//*[@class='subheader']"));

        // Returns base64 encoded string
        let encodedString = await this.driver.takeScreenshot();
        // Capture and save the screenshot of the current page.
        require('fs').writeFileSync('./test-screenshots/fullpage.png', encodedString, 'base64');

        // Capture and save the screenshot of the subheader element.
        encodedString = await subheaderLocator.takeScreenshot(true);
        require('fs').writeFileSync('./test-screenshots/subheader.png', encodedString, 'base64');
    });
});
