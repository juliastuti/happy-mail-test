//config.js
module.exports = {
    capabilities: {
      "appium:platformName": "Android",
      "appium:automationName": "UiAutomator2",
      "appium:app": "/Users/juliastuti/Automation/Happy-Mail-Apps/ハッピーメール-出会い_マッチングアプリでハッピーな出逢いを_9.23.7_APKPure.apk",
      "appium:deviceName": "SM A146P",
    },
    wdOpts: {
      hostname: process.env.APPIUM_HOST || "localhost",
      port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
      logLevel: "info",
    },
  };
  