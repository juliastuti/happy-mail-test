const { remote } = require("webdriverio");
const { capabilities, wdOpts } = require("../config");
const { WelcomePage, LoginPage } = require("../pages/pages");

async function runTest() {
  wdOpts.capabilities = capabilities;
  const driver = await remote(wdOpts);

  try {
    await driver.pause(10000);
    // 19. 「パスワードをお忘れですか？」Webviewへ遷移すること
    // 20. サポートへお問い合わせはこちら →お問い合わせボタンをタップ

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

    //19. clcik forgot password
    const forgotPassword = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/fragment_login_tv_forget_password")'
    );
    await forgotPassword.waitForDisplayed({ timeout: 20000 });
    await forgotPassword.click();

    const webViewFP = await driver.$(
      'android=new UiSelector().text("パスワードお問い合わせ｜理想の出会いならハッピーメール")'
    );
    await webViewFP.waitForDisplayed(7000);

    //20. constact us
    await driver.$(
      'android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("※必須項目を全て入力のうえ送信してください。")'
    );

    const contactUs = await driver.$(
      'android=new UiSelector().description("お問い合わせ").instance(1)'
    );
    await contactUs.click();

    const webViewCU = await driver.$(
      'android=new UiSelector().text("パスワードお問い合わせ｜理想の出会いならハッピーメール")'
    );
    await webViewCU.waitForDisplayed(10000);
    await driver.pause(10000);

    await driver
      .$(
        'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/common_header_view_btn_back_frame")'
      )
      .click();

    await driver
      .$(
        'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/common_header_view_btn_back_frame")'
      )
      .click();

  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    await driver.pause(30000);
    await driver.deleteSession();
  }
}

runTest().catch(console.error);
