var budgetController = (function(){
    var x = 23;
    var add = function(a){
      return x + a;
    }
    return {
      publicTest : function(b){
        console.log(add(b));
      }
    }
})();

var uiController = (function(){

})();

var controller = (function(budgetCtrl, uiCtrl){
  var z = budgetCtrl.publicTest(5);
})(budgetController, uiController);
