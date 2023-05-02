describe("the calculate bill function", function(){
it("should be able to calculate  the amount of sms's ", function(){
assert.equal("R2.25", calculateBill("sms,sms,sms"))

})
it("should be able to calculate  the amount of calls ", function(){
    assert.equal("R8.25", calculateBill("call,call,call"))


})
it("should be able to calculate  the amount of both sms's  and calls", function(){
    assert.equal("R10.50", calculateBill("call,call,call,sms,sms,sms"))


})
})