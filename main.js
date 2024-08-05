const runCase1And2 = require("./spec/case1and2.js");
const runCase3 = require("./spec/case3.js");
const runCase4 = require("./spec/case4.js");
const runCase5 = require("./spec/case5.js");
const runCase6 = require("./spec/case6.js");
const runCase7 = require("./spec/case7.js");
const runCase8And9 = require("./spec/case8and9.js");
const runCase11 = require("./spec/case11.js");
const runCase12 = require("./spec/case12.js");
const runCase13 = require("./spec/case13.js");
const runCase14and16 = require("./spec/case14and16.js");
const runCase15 = require("./spec/case15.js");
const runCase17 = require("./spec/case17.js");
const runCase18 = require("./spec/case18.js");
const runCase19and20 = require("./spec/case19and20.js");
const runCase21 = require("./spec/case21.js");

async function runAllCases() {
  await runCase1And2(),
  await runCase3(),
  await runCase4(),
  await runCase5(),
  await runCase6(),
  await runCase7(),
  await runCase8And9(),
  await runCase11(),
  await runCase12(),
  await runCase13(),
  await runCase14and16(),
  await runCase15(),
  await runCase17(),
  await runCase18(),
  await runCase19and20(),
  await runCase21();
  console.log("All cases completed");
}

runAllCases();