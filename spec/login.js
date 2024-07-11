const { remote } = require("webdriverio");
const { capabilities, wdOpts } = require("../config");
const { WelcomePage, LoginPage } = require("../pages/pages");

async function runTest() {
  wdOpts.capabilities = capabilities;
  const driver = await remote(wdOpts);

  try {
    await driver.pause(10000);

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
    await loginPage.loginDomain(driver);
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

    await driver
      .$(
        'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/common_header_view_btn_back_frame")'
      )
      .click();

    // Back to welcome page
    await welcomePage.waitForWelcomePage(driver);
    console.log("Welcome page is displayed");

    // Go to Login Page
    await loginPage.goToLoginPage(driver);
    console.log("navigated to login page");

    // Check all login elements
    await loginPage.checkLoginElements(driver);
    console.log("all login elements are displayed");

    // Login with valid creds
    await loginPage.loginWithCredentials(driver, "50029963276", "juli123");
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

    // Fails to open Home Page
    const failedDialog = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/common_yesnodialog_tv_no_style2")'
    );
    await failedDialog.click();
    await welcomePage.waitForWelcomePage(driver); //navigated to welcome page
  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    await driver.pause(30000);
    await driver.deleteSession();
  }
}

runTest().catch(console.error);
