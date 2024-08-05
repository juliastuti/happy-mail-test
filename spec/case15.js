const { remote } = require("webdriverio");
const { capabilities, wdOpts } = require("../config");
const { WelcomePage, LoginPage } = require("../pages/pages");

async function runCase15() {
  wdOpts.capabilities = capabilities;
  const driver = await remote(wdOpts);

  try {
    await driver.pause(10000);
    // 15. 「ドメイン」をタップ →選択肢より選択 - (domain) to be able to make and reflect choices

    // Navigate to welcome page
    const welcomePage = new WelcomePage();
    await welcomePage.waitForWelcomePage(driver);
    console.log("Welcome page is displayed");

    // Go to Login Page
    const loginPage = new LoginPage();
    await loginPage.goToLoginPage(driver);
    console.log("navigated to login page");

    // Check all login elements
    await loginPage.checkLoginElements(driver);
    console.log("all login elements are displayed");

    // Click and select domain
    await loginPage.loginDomain(driver);
    await loginPage.loginDomain(driver);
  } catch (error) {
    console.error("Error occurred in runCase15:", error);
  } finally {
    await driver.pause(30000);
    await driver.deleteSession();
  }
}

// runCase15()
//   .then(() => console.log("runCase15 success"))
//   .catch((error) => console.error("Error in runCase15:", error));

module.exports = runCase15;