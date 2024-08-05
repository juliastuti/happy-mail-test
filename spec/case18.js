const { remote } = require("webdriverio");
const { capabilities, wdOpts } = require("../config");
const { WelcomePage, LoginPage } = require("../pages/pages");

async function runCase18() {
  wdOpts.capabilities = capabilities;
  const driver = await remote(wdOpts);

  try {
    await driver.pause(10000);
    // 18. 間違った会員番号・暗証番号の組み合わせ - ログインできないこと - invalid credentials

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

    // Login with empty creds
    await loginPage.emptyCredentials(driver);
    const loginButton = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/fragment_login_btn_login")'
    );
    await loginButton.click();

    const yesNoDialog = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/common_yesnodialog_tv_ok")'
    );
    await yesNoDialog.waitForDisplayed(10000);
    await yesNoDialog.click();
    console.log("error empty login");

    // Login with invalid creds
    await loginPage.loginWithCredentials(driver, "hello@gmail.com", "12345678");
    // await loginPage.loginDomain(driver);
    await loginButton.click();
    await yesNoDialog.waitForDisplayed(10000);
    await yesNoDialog.click();
    console.log("error invalid login");

    await loginPage.loginWithCredentials(driver, "283432987", "123");
    await loginPage.loginDomain(driver);
    await loginButton.click();
    await yesNoDialog.waitForDisplayed(10000);
    await yesNoDialog.click();
    console.log("error invalid login 2");
  } catch (error) {
    console.error("Error occurred in runCase18:", error);
  } finally {
    await driver.pause(30000);
    await driver.deleteSession();
  }
}

runCase18()
  .then(() => console.log("runCase18 success"))
  .catch((error) => console.error("Error in runCase18:", error));

module.exports = runCase18;