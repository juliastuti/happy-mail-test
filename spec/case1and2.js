const { remote } = require("webdriverio");
const { capabilities, wdOpts } = require("../config");

async function runTest() {
  wdOpts.capabilities = capabilities;
  const driver = await remote(wdOpts);

  try {
    // 1. アプリ名 - app name
    // 2. アプリアイコン - app logo

    // Navigate to the home screen my device
    await driver.pressKeyCode(3);

    await driver.pause(5000);
    
    // app name
    const appName = await driver.$('android=new UiSelector().text("ハッピーメール")');
    const isAppNameDisplayed = await appName.isDisplayed();
    console.log(`APP NAME DISPLAYED: ${isAppNameDisplayed}`);

    // app icon
    const appIcon = await driver.$('~ハッピーメール');
    const isAppIconDisplayed = await appIcon.isDisplayed();
    console.log(`app icon displayed: ${isAppIconDisplayed}`);

  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    await driver.deleteSession();
  }
}

runTest();
