const { remote } = require("webdriverio");
const { capabilities, wdOpts } = require("../config");
const { WelcomePage } = require("../pages/pages");

async function runCase12() {
  wdOpts.capabilities = capabilities;
  const driver = await remote(wdOpts);

  try {
    await driver.pause(10000);
    //12. - 会員規約（WEBVIEW）に遷移すること - - Membership Agreement Web Page

    // Navigate to welcome page
    const welcomePage = new WelcomePage();
    await welcomePage.waitForWelcomePage(driver);
    console.log("Welcome page is displayed");

    // Go to Membership Agreement Web Page
    const membershipAgreement = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/fragment_start_tv_rule")'
    );
    await membershipAgreement.waitForDisplayed({ timeout: 20000 });
    await membershipAgreement.click();

    // Check all elements
    const webView = await driver.$(
      'android=new UiSelector().className("android.view.View").instance(1)'
    );
    await webView.waitForDisplayed(3000);

    await driver.$(
      'android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("改定日　2024年05月21日")'
    );
  } catch (error) {
    console.error("Error occurred in runCase12:", error);
  } finally {
    await driver.pause(30000);
    await driver.deleteSession();
  }
}

runCase12()
  .then(() => console.log("runCase12 success"))
  .catch((error) => console.error("Error in runCase12:", error));

module.exports = runCase12;