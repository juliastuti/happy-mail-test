const { remote } = require("webdriverio");
const { capabilities, wdOpts } = require("../config");
const { WelcomePage, LoginPage } = require("../pages/pages");

async function runCase21() {
  wdOpts.capabilities = capabilities;
  const driver = await remote(wdOpts);

  try {
    await driver.pause(10000);
    // 21. 「会員番号とは？」リンクをタップ

    // Navigate to welcome page
    const welcomePage = new WelcomePage();
    await welcomePage.waitForWelcomePage(driver);
    console.log("Welcome page is displayed");

    // Go to Login Page
    const loginPage = new LoginPage();
    await loginPage.goToLoginPage(driver);
    console.log("navigated to login page");

    // Check all login elements
    await loginPage.checkLoginElements(driver);
    console.log("all login elements are displayed");
    await driver.pause(7000);

    // click "what is a membership number?"
    const membershipNumber = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/fragment_login_tv_what_memberNo")'
    );
    await membershipNumber.waitForDisplayed({ timeout: 20000 });
    await membershipNumber.click();

    // Check all elements
    const webView = await driver.$(
      'android=new UiSelector().text("お問い合わせ|ﾊｯﾋﾟｰﾒｰﾙ")'
    );
    await webView.waitForDisplayed(5000);
    await driver.pause(10000);
  } catch (error) {
    console.error("Error occurred runCase21:", error);
  } finally {
    await driver.pause(30000);
    await driver.deleteSession();
  }
}

// runCase21()
//   .then(() => console.log("runCase21 success"))
//   .catch((error) => console.error("Error in runCase21:", error));

module.exports = runCase21;