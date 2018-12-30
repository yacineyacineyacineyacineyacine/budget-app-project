
//Budget Controller
var budgetController = (function(){

    //Some code

})();

//UI Controller
var uiController = (function(){
  var DOMstrings ={
    inputType : '.add__type',
    inputDescription : '.add__description',
    inputValue : '.add__value',
    inputBtn : '.add__btn,
  }

   return {
     getInput: function(){
       return {
         type : document.querySelector(DOMstrings.inputType).value,//will be either inc or exp
         description : document.querySelector(DOMstrings.inputDescription).value,
         value : document.querySelector(DOMstrings.inputValue).value,
              };
            },
      getDOMstrings : function(){
        return DOMstrings;
      }
         };
})();

// Controller
var controller = (function(budgetCtrl, uiCtrl){
  var DOM = uiCtrl.getDOMstrings();
  var ctrlAddItem = function(){

    // 1. Get the field input data
         var input = uiCtrl.getInput();
         console.log(input);
    //2. Add the Item to te budget Controller

    //3. Add th Item to thr UI

    //4. Calculate the Budget

    //5.Display the Budget on the UI

  };
  document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);


  document.addEventListener('keypress', function(event){
       if (event.keyCode === 13 || event.wich === 13) {
         ctrlAddItem();
       }
  });

})(budgetController, uiController);
