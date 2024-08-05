const { remote } = require("webdriverio");
const { capabilities, wdOpts } = require("../config");
const { WelcomePage } = require("../pages/pages");

async function runCase6() {
  wdOpts.capabilities = capabilities;
  const driver = await remote(wdOpts);

  try {
    await driver.pause(10000);
    //6. ボタン

    // Navigate to welcome page
    const welcomePage = new WelcomePage();
    await welcomePage.waitForWelcomePage(driver);
    console.log("Welcome page is displayed");

    //check buttons on welcome page
    const buttons = [
      "jp.co.i_bec.suteki_happy:id/fragment_start_btn_register", //button register
      "jp.co.i_bec.suteki_happy:id/fragment_start_btn_login", //button login
    ];

    for (const buttonId of buttons) {
      const button = await driver.$(
        `android=new UiSelector().resourceId("${buttonId}")`
      );
      if (!(await button.isDisplayed())) {
        throw new Error(`button ${buttonId} is not displayed`);
      } else {
        console.log("ボタン are displayed");
      }
    }
  } catch (error) {
    console.error("Error occurred runCase6:", error);
  } finally {
    await driver.pause(10000);
    await driver.deleteSession();
  }
}

// runCase6()
//   .then(() => console.log("runCase6 success"))
//   .catch((error) => console.error("Error in runCase6:", error));

module.exports = runCase6;
