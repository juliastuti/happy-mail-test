const { remote } = require("webdriverio");
const { capabilities, wdOpts } = require("../config");
const { WelcomePage, LoginPage } = require("../pages/pages");

async function runCase14And16() {
  wdOpts.capabilities = capabilities;
  const driver = await remote(wdOpts);

  try {
    await driver.pause(10000);
    //14. -「会員番号、またはメールアドレス」を入力 - 入力できること - Membership number or email address
    //16. - 半角英数字の組み合わせ6～16文字で入力できること - Must be able to enter a combination of 6 to 16 single-byte alphanumeric characters.

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

    // Login with email address, membership number, and combine 6-16 pwd
    await loginPage.loginWithCredentials(driver, "hello@gmail.com", "123");
    await loginPage.loginWithCredentials(driver, "51394230233", "123");
    await loginPage.loginWithCredentials(
      driver,
      "283432987",
      "Ca$e4Gpass1234!!"
    );
  } catch (error) {
    console.error("Error occurred in runCase14And16:", error);
  } finally {
    await driver.pause(30000);
    await driver.deleteSession();
  }
}

// runCase14And16()
//   .then(() => console.log("runCase14And16 success"))
//   .catch((error) => console.error("Error in runCase14And16:", error));

module.exports = runCase14And16;