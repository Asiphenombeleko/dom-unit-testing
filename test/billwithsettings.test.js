describe("the billWithSettings factory function", function () {
  it("should be able to set the call cost", function () {
    let settingsBill = BillWithSettings();

    settingsBill.setCallCost(1.85);
    assert.equal(1.85, settingsBill.getCallCost());

    let settingsBill2 = BillWithSettings();
    settingsBill2.setCallCost(2.75);
    assert.equal(2.75, settingsBill2.getCallCost());
  });

  it("should be able to set the sms cost", function () {
    let settingsBill = BillWithSettings();

    settingsBill.setSmsCost(0.85);
    assert.equal(0.85, settingsBill.getSmsCost());

    let settingsBill2 = BillWithSettings();
    settingsBill2.setSmsCost(0.75);
    assert.equal(0.75, settingsBill2.getSmsCost());
  });

  it("should be able to set the sms and call cost", function () {
    let settingsBill = BillWithSettings();

    settingsBill.setCallCost(2.75);
    settingsBill.setSmsCost(0.85);
    assert.equal(0.85, settingsBill.getSmsCost());
    assert.equal(2.75, settingsBill.getCallCost());
  });

  it("should be able to set the warning level and call cost", function () {
    let settingsBill = BillWithSettings();

    settingsBill.setWarningLevel(20);
    settingsBill.setCallCost(2.75);
    assert.equal(20, settingsBill.getWarningLevel());
    assert.equal(2.75, settingsBill.getCallCost());
  });

  it("should be able to set the critical level ", function () {
    let settingsBill = BillWithSettings();

    settingsBill.setCriticalLevel(30);

    assert.equal(30, settingsBill.getCriticalLevel());
  });

  it("should be able to set the warning level and critical", function () {
    let settingsBill = BillWithSettings();

    settingsBill.setWarningLevel(25);
    settingsBill.setCriticalLevel(40);
    assert.equal(25, settingsBill.getWarningLevel());
    assert.equal(40, settingsBill.getCriticalLevel());
  });
});

describe("Use Values", function () {
  it("should be able to use the call cost set", function () {
    let settingsBill = BillWithSettings();

    settingsBill.setCallCost(2.0);
    settingsBill.setSmsCost(1.5);
    settingsBill.setCriticalLevel(20);

    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.sendSms();
    settingsBill.sendSms();
    settingsBill.sendSms();
    settingsBill.sendSms();
    settingsBill.sendSms();

    assert.equal(10.0, settingsBill.getTotalCallCost());
    assert.equal(7.5, settingsBill.getTotalSmsCost());
    assert.equal(17.5, settingsBill.getTotalCost());
  });
  it("should be able to use the call cost set for 3 calls at 3.0 each", function () {
    let settingsBill = BillWithSettings();
    settingsBill.setCriticalLevel(20);
    settingsBill.setCallCost(3.0);
    settingsBill.setSmsCost(1.0);

    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();

    assert.equal(9.0, settingsBill.getTotalCallCost());
    assert.equal(0.0, settingsBill.getTotalSmsCost());
    assert.equal(9.0, settingsBill.getTotalCost());
  });

  it("should be able to use the sms cost set for 3 sms's at 1.0 each", function () {
    let settingsBill = BillWithSettings();

    settingsBill.setCallCost(3.0);
    settingsBill.setSmsCost(1.0);
settingsBill.setCriticalLevel(10);
    settingsBill.sendSms();
    settingsBill.sendSms();
    settingsBill.sendSms();

    assert.equal(0.0, settingsBill.getTotalCallCost());
    assert.equal(3.0, settingsBill.getTotalSmsCost());
    assert.equal(3.0, settingsBill.getTotalCost());
  });
  it("should be able to send  2 sms's at 1.0 each & make 1 call at 2.0", function () {
    let settingsBill = BillWithSettings();
    settingsBill.setCriticalLevel(20);
    settingsBill.setCallCost(2.0);
    settingsBill.setSmsCost(1.0);

    settingsBill.makeCall();
    settingsBill.sendSms();
    settingsBill.sendSms();

    assert.equal(2.0, settingsBill.getTotalCallCost());
    assert.equal(2.0, settingsBill.getTotalSmsCost());
    assert.equal(4, settingsBill.getTotalCost());
  });
});

describe("warning & critcal level", function () {
  it("should return a class name of 'warning' if warning level is reached", function () {
    let settingsBill = BillWithSettings();

    settingsBill.setCallCost(2.0);
    settingsBill.setSmsCost(1.0);
    settingsBill.setWarningLevel(5);
    settingsBill.setCriticalLevel(10);

    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.sendSms();
    settingsBill.sendSms();

    assert.equal("warning", settingsBill.totalClassName());
  });
  it("should return a class name of 'critical'if critical level has been reached", function () {
    let settingsBill = BillWithSettings();

    settingsBill.setCallCost(2.0);
    settingsBill.setSmsCost(1.0);
    settingsBill.setCriticalLevel(10);

    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.sendSms();
    settingsBill.sendSms();
    settingsBill.sendSms();
    settingsBill.sendSms();
    assert.equal("critical", settingsBill.totalClassName());
  });
  it("should  allow the total to increase after reaching the critical level & then increase the critical level", function () {
    let settingsBill = BillWithSettings();

    settingsBill.setCallCost(2.0);
    settingsBill.setSmsCost(1.0);
    settingsBill.setWarningLevel(8);
    settingsBill.setCriticalLevel(10);

    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.sendSms();
    settingsBill.sendSms();
    settingsBill.sendSms();
    settingsBill.sendSms();

    assert.equal("critical", settingsBill.totalClassName());
    assert.equal(10, settingsBill.getTotalCallCost());

    settingsBill.setCriticalLevel(20);
    assert.equal("warning", settingsBill.totalClassName());

    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
  });
});
