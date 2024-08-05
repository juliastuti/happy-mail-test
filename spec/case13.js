const { remote } = require("webdriverio");
const { capabilities, wdOpts } = require("../config");
const { WelcomePage } = require("../pages/pages");

async function runCase13() {
  wdOpts.capabilities = capabilities;
  const driver = await remote(wdOpts);

  try {
    await driver.pause(10000);
    //13. - プライバシーポリシー（WEBVIEW）に遷移すること - - Privacy Policy Web Page

    // Navigate to welcome page
    const welcomePage = new WelcomePage();
    await welcomePage.waitForWelcomePage(driver);
    console.log("Welcome page is displayed");

    // Go to Privacy Policy Web Page
    const privacyPolicy = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/fragment_start_tv_policy")'
    );
    await privacyPolicy.waitForDisplayed({ timeout: 20000 });
    await privacyPolicy.click();

    const webView = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/fragment_webview_webview")'
    );
    await webView.waitForDisplayed(3000);

    await driver.$(
      'android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("logo_japhic")'
    );
  } catch (error) {
    console.error("Error occurred in runCase13:", error);
  } finally {
    await driver.pause(30000);
    await driver.deleteSession();
  }
}

runCase13()
  .then(() => console.log("runCase13 success"))
  .catch((error) => console.error("Error in runCase13:", error));

module.exports = runCase13;