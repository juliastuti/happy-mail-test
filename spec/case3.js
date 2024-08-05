const { remote } = require("webdriverio");
const { capabilities, wdOpts } = require("../config");
const { SplashScreen } = require("../pages/pages");

async function runCase3() {
  wdOpts.capabilities = capabilities;
  const driver = await remote(wdOpts);

  try {
    await driver.pause(10000);
    //3. 起動時のスプラッシュ画像のデザイン - splash screen

    // Navigate to splash screen
    const splashScreen = new SplashScreen();
    await splashScreen.waitForSplashScreen(driver);
    console.log("SplashScreen is displayed");

    // Check all splash screen elements
    await splashScreen.checkSplashElements(driver);
    console.log("all splash page elements are displayed");
    
  } catch (error) {
    console.error("Error occurred in runCase3:", error);
  } finally {
    await driver.pause(30000);
    await driver.deleteSession();
  }
}

runCase3()
  .then(() => console.log('runCase3 success'))
  .catch(error => console.error('Error in runCase3:', error));

module.exports = runCase3;
