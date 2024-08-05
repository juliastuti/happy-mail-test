const { remote } = require("webdriverio");
const { capabilities, wdOpts } = require("../config");
const { WelcomePage } = require("../pages/pages");

async function runCase7() {
  wdOpts.capabilities = capabilities;
  const driver = await remote(wdOpts);

  try {
    await driver.pause(10000);
    //7. 18歳未満はご利用できません

    // Navigate to welcome page
    const welcomePage = new WelcomePage();
    await welcomePage.waitForWelcomePage(driver);
    console.log("Welcome page is displayed");

    // Check attention
    const logo = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/top_age_attention_btn")'
    );
    await logo.waitForDisplayed(10000);
    console.log("18歳未満はご利用できません is displayed");
  } catch (error) {
    console.error("Error occurred runCase7:", error);
  } finally {
    await driver.pause(10000);
    await driver.deleteSession();
  }
}

runCase7()
  .then(() => console.log("runCase7 success"))
  .catch((error) => console.error("Error in runCase7:", error));

module.exports = runCase7;
