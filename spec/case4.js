const { remote } = require("webdriverio");
const { capabilities, wdOpts } = require("../config");
const { WelcomePage } = require("../pages/pages");

async function runCase4() {
  wdOpts.capabilities = capabilities;
  const driver = await remote(wdOpts);

  try {
    await driver.pause(10000);

    // Navigate to welcome page
    const welcomePage = new WelcomePage();
    await welcomePage.waitForWelcomePage(driver);
    console.log("Welcome page is displayed");

    // Check image 1 is displayed
    const image = await driver.$('android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/img_login_tutorial_01")');
    await driver.waitUntil(
      async () => {
        try {
          const image1 = await driver.$(image);
          return await image1.isDisplayed();
        } catch (error) {
          return false;
        }
      },
      {
        timeout: 60000,
        interval: 1000,
        timeoutMsg: "Image 1 is not displayed within the timeout period",
      }
    );

    console.log("Image 1 is displayed");
  
  } catch (error) {
    console.error("Error occurred in runCase4:", error);
  } finally {
    await driver.pause(30000);
    await driver.deleteSession();
  }
}

runCase4()
  .then(() => console.log("runCase4 success"))
  .catch((error) => console.error("Error in runCase4:", error));

module.exports = runCase4;
