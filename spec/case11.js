const { remote } = require("webdriverio");
const { capabilities, wdOpts } = require("../config");
const { WelcomePage, RegisterPage } = require("../pages/pages");

async function runCase11() {
  wdOpts.capabilities = capabilities;
  const driver = await remote(wdOpts);

  try {
    await driver.pause(10000);
    // 11. - 表示されていないこと - - Go to Register Page

    // Navigate to welcome page
    const welcomePage = new WelcomePage();
    await welcomePage.waitForWelcomePage(driver);
    console.log("Welcome page is displayed");

    // Go to Register Page
    const registerPage = new RegisterPage();
    await registerPage.goToRegisterPage(driver);

    const yesNoDialog = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/common_yesnodialog_frame")'
    );
    if (await yesNoDialog.isDisplayed()) {
      const yesButton = await driver.$(
        'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/common_yesnodialog_tv_ok")'
      );
      await yesButton.click();
      console.log(
        "user already registered on local device, navigate to login page"
      );
    } else {
      await driver.pause(30000);
      console.log("success open register page");
    }
  } catch (error) {
    console.error("Error occurred in runCase11:", error);
  } finally {
    await driver.pause(30000);
    await driver.deleteSession();
  }
}

// runCase11()
//   .then(() => console.log("runCase11 success"))
//   .catch((error) => console.error("Error in runCase11:", error));

module.exports = runCase11;