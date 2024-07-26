const { remote } = require("webdriverio");
const { capabilities, wdOpts } = require("../config");
const { WelcomePage } = require("../pages/pages");

async function runTest() {
  wdOpts.capabilities = capabilities;
  const driver = await remote(wdOpts);

  try {
    await driver.pause(10000);
    //4. 背景画像
    //5. ハッピーメールロゴ
    //6. ボタン
    //7. 18歳未満はご利用できません

    // Navigate to welcome page
    const welcomePage = new WelcomePage();
    await welcomePage.waitForWelcomePage(driver);
    console.log("Welcome page is displayed");

    // Check all welcome page elements
    await welcomePage.checkWelcomeElements(driver);
    console.log("all welcome page elements are displayed");

  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    await driver.pause(30000);
    await driver.deleteSession();
  }
}

runTest().catch(console.error);
