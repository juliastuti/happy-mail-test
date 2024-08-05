const { remote } = require("webdriverio");
const { capabilities, wdOpts } = require("../config");

async function runCase1And2() {
  wdOpts.capabilities = capabilities;
  const driver = await remote(wdOpts);

  try {
    // 1. アプリ名 - app name
    // 2. アプリアイコン - app logo

    await driver.pause(10000);
    // home page
    await driver.pressKeyCode(3);
    await driver.pause(5000);

    // to menu page on my device - samsung galaxy A14
    const screenSize = await driver.getWindowRect();
    const startX = screenSize.width / 2;
    const startY = screenSize.height * 0.9;
    const endY = screenSize.height * 0.2;

    await driver.touchAction([
      { action: 'press', x: startX, y: startY },
      { action: 'moveTo', x: startX, y: endY },
      'release'
    ]);
    await driver.pause(2000);

    // app name
    const appName = await driver.$(
      'android=new UiSelector().text("ハッピーメール")'
    );
    const isAppNameDisplayed = await appName.isDisplayed();
    console.log(`APP NAME DISPLAYED: ${isAppNameDisplayed}`);

    // app icon
    const appIcon = await driver.$("~ハッピーメール");
    const isAppIconDisplayed = await appIcon.isDisplayed();
    console.log(`app icon displayed: ${isAppIconDisplayed}`);

  } catch (error) {
    console.error("Error occurred in runCase1And2:", error);
  } finally {
    await driver.deleteSession();
  }
}

// runCase1And2()
//   .then(() => console.log('runCase1And2 success'))
//   .catch(error => console.error('Error in runCase1And2:', error));

module.exports = runCase1And2;
