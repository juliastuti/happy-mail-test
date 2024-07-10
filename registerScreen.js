const { remote } = require("webdriverio");

const selectorById = (id) => {
  return `android=new UiSelector().resourceId("${id}")`;
};

const { capabilities, wdOpts } = require("./config");

wdOpts.capabilities = capabilities;

async function runTest() {
  const driver = await remote(wdOpts);
  try {
    await driver.pause(10000);

    //check welcome page until exist
    const welcomePage = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/activity_default_container")'
    );
    await welcomePage.waitForDisplayed({ timeout: 80000 });
    console.log("welcome");

    //go to register page
    const selector_regis =
      'new UiSelector().className("android.widget.ImageButton").resourceId("jp.co.i_bec.suteki_happy:id/fragment_start_btn_register")';
    const button_regis = await driver.$(`android=${selector_regis}`);
    await button_regis.waitForDisplayed({ timeout: 100000 });
    await button_regis.click();
    console.log("success");
  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    await driver.pause(30000);
    await driver.deleteSession();
  }
}

runTest().catch(console.error);
