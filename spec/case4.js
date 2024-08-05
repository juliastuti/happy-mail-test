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

    // Check if any image is displayed
    const images = [
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/img_login_tutorial_01")'
      // 'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/img_login_tutorial_02")',
      // 'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/img_login_tutorial_03")',
    ];

    async function checkImages() {
      let foundImages = 0;
      const maxRetries = 2;
      let retries = 0;

      while (foundImages < images.length && retries < maxRetries) {
        for (const image of images) {
          try {
            await driver.$(image);
            foundImages++;
            console.log(`Image ${foundImages} displayed`);
          } catch (error) {
            console.error(`Error finding image ${image}:`, error);
          }

          if (foundImages === images.length) {
            console.log("All images displayed");
            return;
          }
        }
        retries++;
        console.log(`Waiting for remaining images (retry: ${retries})`);
        await driver.pause(4000);
      }
      throw new Error(`Not all images are found after ${retries} retries`);
    }
    await checkImages();
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
