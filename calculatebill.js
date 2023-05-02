function calculateBill(billStringElement) {
  var billStrings = billStringElement.split(",");

  var billTotal = 0;

  for (var i = 0; i < billStrings.length; i++) {
    var total = billStrings[i].trim().toLowerCase();
    if (total == "sms") {
      billTotal += 0.75;
    } else if (total == "call") {
      billTotal += 2.75;
    }

    var overallTotal = billTotal.toFixed(2);
  }
  return "R" + overallTotal;
}
console.log(calculateBill("sms,call,sms,call"))