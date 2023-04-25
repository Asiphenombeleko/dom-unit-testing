function BillWithSettings() {
  var theCallCost = 0;
  var theSmsCost = 0;
  var theWarningLevel = 0;
  var theCriticalLevel = 0;
  var theTotalSmsCost = 0;
  var theTotalCallCost = 0
  var callCostTotal = 0;
  var smsCostTotal = 0;

  function setCallCost(callCost) {
    theCallCost = callCost;
  }
  function setSmsCost(smsCost) {
    theSmsCost = smsCost;
  }

  function getCallCost() {
    return theCallCost;
  }

  function getSmsCost() {
    return theSmsCost;
  }
  function setWarningLevel(warningLevel) {
    theWarningLevel = warningLevel;
  }

  function getWarningLevel() {
    return theWarningLevel;
  }
  function setCriticalLevel(criticalLevel) {
    theCriticalLevel = criticalLevel;
  }

  function getCriticalLevel() {
    return theCriticalLevel;
  }
  function makeCall() {
    if (!reachedCriticalLevel()){
      callCostTotal += getCallCost();
    }
    
  }
  function sendSms() {
    if (!reachedCriticalLevel()){
      smsCostTotal += getSmsCost();
    }
    
  }

  function getTotalCost() {
    return callCostTotal + smsCostTotal;
  }

  function getTotalCallCost() {
    return callCostTotal;
  }
  function setTotalSmsCost(totalSmsCost) {
    theTotalSmsCost += totalSmsCost;
  }
  function getTotalSmsCost() {
    return smsCostTotal;
  }

  function reachedCriticalLevel() {
    return getTotalCost() >= getCriticalLevel();
  }
  function totalClassName() {
    if (reachedCriticalLevel()) {
      return "critical";
    }

    if (getTotalCost() >= getWarningLevel()) {
      return "warning";
    }
  };

  return {
    setCallCost,
    getCallCost,
    getSmsCost,
    setSmsCost,
    setCriticalLevel,
    getCriticalLevel,
    setWarningLevel,
    getWarningLevel,
    theTotalSmsCost,
    theTotalCallCost,
    getTotalCallCost,
    setTotalSmsCost,
    getTotalSmsCost,
    getTotalCost,
    makeCall,
    sendSms,
    totalClassName,
    reachedCriticalLevel,
  };
}
