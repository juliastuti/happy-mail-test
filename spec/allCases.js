const { remote } = require("webdriverio");
const { capabilities, wdOpts } = require("../config");
const {
  SplashScreen,
  WelcomePage,
  RegisterPage,
  LoginPage,
} = require("../pages/pages");

async function runCase1And2() {
  wdOpts.capabilities = capabilities;
  const driver = await remote(wdOpts);

  try {
    // 1. アプリ名 - app name
    // 2. アプリアイコン - app logo

    // Navigate to the home screen my device
    await driver.pressKeyCode(3);

    await driver.pause(5000);

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

async function runCase4Until7() {
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
    console.error("Error occurred in runCase4Until7:", error);
  } finally {
    await driver.pause(30000);
    await driver.deleteSession();
  }
}

async function runCase8And9() {
  wdOpts.capabilities = capabilities;
  const driver = await remote(wdOpts);

  try {
    await driver.pause(10000);
    // 8 - 通常ログインボタン - there is a login button
    // 9 - タップするとログイン画面に遷移すること - - Go to Login Page

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

    // Login with empty creds
    await loginPage.emptyCredentials(driver);
    const loginButton = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/fragment_login_btn_login")'
    );
    await loginButton.click();

    const yesNoDialog = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/common_yesnodialog_tv_ok")'
    );
    await yesNoDialog.waitForDisplayed(10000);
    await yesNoDialog.click();
    console.log("error empty login");
  } catch (error) {
    console.error("Error occurred in runCase8And9:", error);
  } finally {
    await driver.pause(30000);
    await driver.deleteSession();
  }
}

async function runCase11() {
  wdOpts.capabilities = capabilities;
  const driver = await remote(wdOpts);

  try {
    await driver.pause(10000);
    // 11. - 表示されていないこと - - Go to Register Page

    // Navigate to welcome page
    const welcomePage = new WelcomePage();
    await welcomePage.waitForWelcomePage(driver);
    console.log("Welcome page is displayed");

    // Go to Register Page
    const registerPage = new RegisterPage();
    await registerPage.goToRegisterPage(driver);

    const yesNoDialog = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/common_yesnodialog_frame")'
    );
    if (await yesNoDialog.isDisplayed()) {
      const yesButton = await driver.$(
        'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/common_yesnodialog_tv_ok")'
      );
      await yesButton.click();
      console.log(
        "user already registered on local device, navigate to login page"
      );
    } else {
      await driver.pause(30000);
      console.log("success open register page");
    }
  } catch (error) {
    console.error("Error occurred in runCase11:", error);
  } finally {
    await driver.pause(30000);
    await driver.deleteSession();
  }
}

async function runCase12() {
  wdOpts.capabilities = capabilities;
  const driver = await remote(wdOpts);

  try {
    await driver.pause(10000);
    //12. - 会員規約（WEBVIEW）に遷移すること - - Membership Agreement Web Page

    // Navigate to welcome page
    const welcomePage = new WelcomePage();
    await welcomePage.waitForWelcomePage(driver);
    console.log("Welcome page is displayed");

    // Go to Membership Agreement Web Page
    const membershipAgreement = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/fragment_start_tv_rule")'
    );
    await membershipAgreement.waitForDisplayed({ timeout: 20000 });
    await membershipAgreement.click();

    // Check all elements
    const webView = await driver.$(
      'android=new UiSelector().className("android.view.View").instance(1)'
    );
    await webView.waitForDisplayed(3000);

    await driver.$(
      'android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("改定日　2024年05月21日")'
    );
  } catch (error) {
    console.error("Error occurred in runCase12:", error);
  } finally {
    await driver.pause(30000);
    await driver.deleteSession();
  }
}

async function runCase13() {
  wdOpts.capabilities = capabilities;
  const driver = await remote(wdOpts);

  try {
    await driver.pause(10000);
    //13. - プライバシーポリシー（WEBVIEW）に遷移すること - - Privacy Policy Web Page

    // Navigate to welcome page
    const welcomePage = new WelcomePage();
    await welcomePage.waitForWelcomePage(driver);
    console.log("Welcome page is displayed");

    // Go to Privacy Policy Web Page
    const privacyPolicy = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/fragment_start_tv_policy")'
    );
    await privacyPolicy.waitForDisplayed({ timeout: 20000 });
    await privacyPolicy.click();

    const webView = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/fragment_webview_webview")'
    );
    await webView.waitForDisplayed(3000);

    await driver.$(
      'android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("logo_japhic")'
    );
  } catch (error) {
    console.error("Error occurred in runCase13:", error);
  } finally {
    await driver.pause(30000);
    await driver.deleteSession();
  }
}

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

async function runCase17() {
  wdOpts.capabilities = capabilities;
  const driver = await remote(wdOpts);

  try {
    await driver.pause(10000);
    // 17. 正しい会員番号・暗証番号の組み合わせ - ログインできること - Login with valid creds

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

    // Login with valid creds
    await loginPage.loginWithCredentials(driver, "50096347429", "ibg123456"); //Male account
    const loginButton = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/fragment_login_btn_login")'
    );
    await loginButton.click();

    // Navigated to Home Page
    const dialogFrame = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/common_yesnodialog_frame")'
    );
    await dialogFrame.waitForDisplayed({ timeout: 60000 });
    await driver
      .$(
        'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/common_yesnodialog_tv_yes")'
      )
      .click();

    await loginPage.allowLocationPermission(driver);
    await loginPage.allowNotificationPermission(driver);

    await dialogFrame.waitForDisplayed({ timeout: 60000 });

    // Fails to open Home Page
    const failedDialog = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/common_yesnodialog_tv_no_style2")'
    );
    await failedDialog.click();
    await welcomePage.waitForWelcomePage(driver); //navigated to welcome page
  } catch (error) {
    console.error("Error occurred in runCase17:", error);
  } finally {
    await driver.pause(30000);
    await driver.deleteSession();
  }
}

async function runCase18() {
  wdOpts.capabilities = capabilities;
  const driver = await remote(wdOpts);

  try {
    await driver.pause(10000);
    // 18. 間違った会員番号・暗証番号の組み合わせ - ログインできないこと - invalid credentials

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

    // Login with empty creds
    await loginPage.emptyCredentials(driver);
    const loginButton = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/fragment_login_btn_login")'
    );
    await loginButton.click();

    const yesNoDialog = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/common_yesnodialog_tv_ok")'
    );
    await yesNoDialog.waitForDisplayed(10000);
    await yesNoDialog.click();
    console.log("error empty login");

    // Login with invalid creds
    await loginPage.loginWithCredentials(driver, "hello@gmail.com", "12345678");
    // await loginPage.loginDomain(driver);
    await loginButton.click();
    await yesNoDialog.waitForDisplayed(10000);
    await yesNoDialog.click();
    console.log("error invalid login");

    await loginPage.loginWithCredentials(driver, "283432987", "123");
    await loginPage.loginDomain(driver);
    await loginButton.click();
    await yesNoDialog.waitForDisplayed(10000);
    await yesNoDialog.click();
    console.log("error invalid login 2");
  } catch (error) {
    console.error("Error occurred in runCase18:", error);
  } finally {
    await driver.pause(30000);
    await driver.deleteSession();
  }
}

async function runCase19and20() {
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
    console.error("Error occurred runCase19and20:", error);
  } finally {
    await driver.pause(30000);
    await driver.deleteSession();
  }
}

async function runCase21() {
  wdOpts.capabilities = capabilities;
  const driver = await remote(wdOpts);

  try {
    await driver.pause(10000);
    // 21. 「会員番号とは？」リンクをタップ

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
    await driver.pause(7000);

    // click "what is a membership number?"
    const membershipNumber = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/fragment_login_tv_what_memberNo")'
    );
    await membershipNumber.waitForDisplayed({ timeout: 20000 });
    await membershipNumber.click();

    // Check all elements
    const webView = await driver.$(
      'android=new UiSelector().text("お問い合わせ|ﾊｯﾋﾟｰﾒｰﾙ")'
    );
    await webView.waitForDisplayed(5000);
    await driver.pause(10000);
  } catch (error) {
    console.error("Error occurred runCase21:", error);
  } finally {
    await driver.pause(30000);
    await driver.deleteSession();
  }
}

async function runAllCases() {
  wdOpts.capabilities = capabilities;
  const driver = await remote(wdOpts);

  try {
    await runCase1And2(driver);
    await runCase3(driver);
    await runCase4Until7(driver);
    await runCase8And9(driver);
    await runCase11(driver);
    await runCase12(driver);
    await runCase13(driver);
    await runCase14And16(driver);
    await runCase15(driver);
    await runCase17(driver);
    await runCase18(driver);
    await runCase19and20(driver);
    await runCase21(driver);
  } catch (error) {
    console.error("Error during tests:", error);
  } finally {
    await driver.deleteSession();
    console.log("All tests completed.");
  }
}

runAllCases().catch(console.error);
