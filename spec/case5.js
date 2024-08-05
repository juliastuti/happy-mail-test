const { remote } = require("webdriverio");
const { capabilities, wdOpts } = require("../config");
const { WelcomePage } = require("../pages/pages");

async function runCase5() {
  wdOpts.capabilities = capabilities;
  const driver = await remote(wdOpts);

  try {
    await driver.pause(10000);
    //5. ハッピーメールロゴ

    // Navigate to welcome page
    const welcomePage = new WelcomePage();
    await welcomePage.waitForWelcomePage(driver);
    console.log("Welcome page is displayed");

    // Check all welcome page elements
    const logo = await driver.$(
        'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/fragment_start_txr_hpm")'
      );
    await logo.waitForDisplayed(10000);
    console.log("logo is displayed");

  } catch (error) {
    console.error("Error occurred runCase5:", error);
  } finally {
    await driver.pause(30000);
    await driver.deleteSession();
  }
}

// runCase5()
//   .then(() => console.log('runCase5 success'))
//   .catch(error => console.error('Error in runCase5:', error));

module.exports = runCase5;