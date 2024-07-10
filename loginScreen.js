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

    //go to login page
    const loginPageButton = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/fragment_start_btn_login")'
    );
    await loginPageButton.waitForDisplayed({ timeout: 80000 });
    await loginPageButton.click();
    console.log("success");

    const loginId = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/fragment_login_id_input")'
    );
    const loginDomain = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/fragment_login_btn_domain")'
    );
    const password = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/fragment_login_pw_input")'
    );
    const forgotPassword = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/fragment_login_tv_forget_password")'
    );
    const memberNo = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/fragment_login_tv_what_memberNo")'
    );
    const termCondition = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/fragment_login_policy_link")'
    );
    const loginButton = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/fragment_login_btn_login")'
    );

    if (
      (await loginId.isDisplayed()) &&
      (await loginDomain.isDisplayed()) &&
      (await password.isDisplayed()) &&
      (await forgotPassword.isDisplayed()) &&
      (await memberNo.isDisplayed()) &&
      (await termCondition.isDisplayed()) &&
      (await loginButton.isDisplayed())
    ) {
      console.log("semua elements muncul");
    } else {
      console.error("tidak semua muncul");
    }

    //empty login
    await loginButton.click();

    const emptyDialog = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/common_yesnodialog_tv_ok")'
    );
    await emptyDialog.waitForDisplayed(10000);
    await emptyDialog.click();

    //invalid creds
    await loginId.click();
    await loginId.setValue("hello@gmail.com");
    await driver.hideKeyboard();

    await loginDomain.click();
    await driver.$(
      'android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("PCｱﾄﾞﾚｽ")'
    );
    await driver.$(
      'android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("@gmail.com")'
    );
    await driver
      .$(
        'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/listrow_profileedit_normal_check").instance(0)'
      )
      .click();

    await driver
      .$(
        'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/common_header_view_btn_back_frame")'
      )
      .click();

    await password.click();
    await password.setValue("12345678");
    await driver.hideKeyboard();
    await loginButton.click();

    //valid creds


  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    await driver.pause(30000);
    await driver.deleteSession();
  }
}

runTest().catch(console.error);

