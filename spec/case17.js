const { remote } = require("webdriverio");
const { capabilities, wdOpts } = require("../config");
const { WelcomePage, LoginPage } = require("../pages/pages");

async function runCase17() {
  wdOpts.capabilities = capabilities;
  const driver = await remote(wdOpts);

  try {
    await driver.pause(10000);
    // 17. 正しい会員番号・暗証番号の組み合わせ - ログインできること - Login with valid creds

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

    // Login with valid creds
    await loginPage.loginWithCredentials(driver, "50096347429", "ibg123456"); //Male account
    const loginButton = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/fragment_login_btn_login")'
    );
    await loginButton.click();

    // Navigated to Home Page
    const dialogFrame = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/common_yesnodialog_frame")'
    );
    await dialogFrame.waitForDisplayed({ timeout: 60000 });
    await driver
      .$(
        'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/common_yesnodialog_tv_yes")'
      )
      .click();

    await loginPage.allowLocationPermission(driver);
    await loginPage.allowNotificationPermission(driver);

    await dialogFrame.waitForDisplayed({ timeout: 60000 });
    await driver.pause(30000); //home page
  } catch (error) {
    console.error("Error occurred in runCase17:", error);
  } finally {
    await driver.pause(30000);
    await driver.deleteSession();
  }
}

runCase17()
  .then(() => console.log("runCase17 success"))
  .catch((error) => console.error("Error in runCase17:", error));

module.exports = runCase17;