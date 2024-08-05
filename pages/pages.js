class SplashScreen {
  async waitForSplashScreen(driver) {
    const splashScreen = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/activity_default_container")'
    );
    await splashScreen.waitForDisplayed({ timeout: 20000 });
  }

  async checkSplashElements(driver) {
    const splashElement = await driver.$(
      'android=new UiSelector().className("android.widget.ImageView")'
    );
    if (!(await splashElement.isDisplayed())) {
      throw new Error(`Element ${splashElement} is not displayed`);
    }
  }
}

class WelcomePage {
  async waitForWelcomePage(driver) {
    const welcomePage = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/activity_default_container")'
    );
    await welcomePage.waitForDisplayed({ timeout: 60000 });
  }

  async checkWelcomeElements(driver) {
    const welcomeElements = [
      "jp.co.i_bec.suteki_happy:id/fragment_start_txr_hpm", // happy mail logo
      "jp.co.i_bec.suteki_happy:id/fragment_start_btn_register", //button register
      "jp.co.i_bec.suteki_happy:id/fragment_start_btn_login", //button login
      "jp.co.i_bec.suteki_happy:id/top_age_attention_btn", //18歳未満はご利用できません
      "jp.co.i_bec.suteki_happy:id/fragment_start_tv_rule", //membershipAgreement
      "jp.co.i_bec.suteki_happy:id/fragment_start_tv_policy", //privacyPolicy
    ];

    for (const welcomeElementId of welcomeElements) {
      const welcomeElement = await driver.$(
        'android=new UiSelector().resourceId("${welcomeElementId}")'
      );
      if (!(await welcomeElement.isDisplayed())) {
        throw new Error(`Element with ID ${welcomeElementId} is not displayed`);
      }
    }
  }
}

class RegisterPage {
  async goToRegisterPage(driver) {
    const registerPageButton = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/fragment_start_btn_register")'
    );
    await registerPageButton.waitForDisplayed({ timeout: 60000 });
    await registerPageButton.click();
  }
}

class LoginPage {
  async goToLoginPage(driver) {
    const loginPageButton = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/fragment_start_btn_login")'
    );
    await loginPageButton.waitForDisplayed({ timeout: 60000 });
    await loginPageButton.click();
  }

  async checkLoginElements(driver) {
    const elements = [
      "jp.co.i_bec.suteki_happy:id/fragment_login_id_input",
      "jp.co.i_bec.suteki_happy:id/fragment_login_btn_domain",
      "jp.co.i_bec.suteki_happy:id/fragment_login_pw_input",
      "jp.co.i_bec.suteki_happy:id/fragment_login_tv_forget_password",
      "jp.co.i_bec.suteki_happy:id/fragment_login_tv_what_memberNo",
      "jp.co.i_bec.suteki_happy:id/fragment_login_policy_link",
      "jp.co.i_bec.suteki_happy:id/fragment_login_btn_login",
    ];

    for (const elementId of elements) {
      const element = await driver.$(
        'android=new UiSelector().resourceId("${elementId}")'
      );
      if (!(await element.isDisplayed())) {
        throw new Error(`Element with ID ${elementId} is not displayed`);
      }
    }
  }

  async emptyCredentials(driver) {
    const loginId = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/fragment_login_id_input")'
    );
    await loginId.click();
    await loginId.clearValue();
    await driver.hideKeyboard();

    const password = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/fragment_login_pw_input")'
    );
    await password.click();
    await password.clearValue();
    await driver.hideKeyboard();
  }

  async loginWithCredentials(driver, email, pass) {
    const loginId = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/fragment_login_id_input")'
    );
    await loginId.click();
    await loginId.setValue(email);
    await driver.hideKeyboard();

    const password = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/fragment_login_pw_input")'
    );
    await password.click();
    await password.setValue(pass);

    const seePassword = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/fragment_login_pw_display")'
    );
    await seePassword.click();
    await driver.hideKeyboard();
  }

  async loginDomain(driver) {
    const loginDomain = await driver.$(
      'android=new UiSelector().resourceId("jp.co.i_bec.suteki_happy:id/fragment_login_btn_domain")'
    );
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
  }

  async allowLocationPermission(driver) {
    const allowLocationButton = await driver.$(
      'android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_one_time_button")'
    );
    if (await allowLocationButton.isDisplayed()) {
      await allowLocationButton.click();
    } else {
      console.log("Location permission already allowed or button not found.");
    }
  }

  async allowNotificationPermission(driver) {
    const allowNotificationButton = await driver.$(
      'android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_button")'
    );
    if (await allowNotificationButton.isDisplayed()) {
      await allowNotificationButton.click();
    } else {
      console.log(
        "Notification permission already allowed or button not found."
      );
    }
  }
}

module.exports = {
  SplashScreen,
  WelcomePage,
  LoginPage,
  RegisterPage,
};
