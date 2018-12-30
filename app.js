
//Budget Controller
var budgetController = (function(){
    var Expense = function(id, description, value){
      this.id = id;
      this.description = description;
      this.value = value;
    };
    var Income = function(id, description, value){
      this.id = id;
      this.description = description;
      this.value = value;
    };
    var totalExpenses = 0;
    var data = {
           allItems:{
                     exp : [],
                     inc : [],
           },
           total:{
                     exp: 0,
                     inc: 0,
                  }
    };
    return {
      addItem: function(type, des, val){
                        var newItem, id;
                        //Create a new ID
                        if (data.allItems[type].length > 0) {
                          id = data.allItems[type][data.allItems[type].length - 1].id + 1;
                        }else {
                          id = 0;
                        }

                        //Create a new Item based on inc or exp
                        if (type === 'exp') {
                            newItem = new Expense(id, des, val);
                        }else if (type === 'inc') {
                            newItem = new Income(id, des, val);
                        }
                        //Push it into our data structure
                        data.allItems[type].push(newItem);
                        // return the new element
                        return newItem;
      },
      testing: function(){
        console.log(data);
      }
    };
})();

//UI Controller
var uiController = (function(){
  var DOMstrings ={
    inputType : '.add__type',
    inputDescription : '.add__description',
    inputValue : '.add__value',
    inputBtn : '.add__btn',
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
  var setUpEventListeners = function(){
    var DOM = uiCtrl.getDOMstrings();
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', function(event){
         if (event.keyCode === 13 || event.wich === 13) {
           ctrlAddItem();
         };
    });

  };
  var ctrlAddItem = function(){
         var input, newItem;
    // 1. Get the field input data
          input = uiCtrl.getInput();
   //2. Add the Item to te budget Controller
          newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    //3. Add th Item to thr UI

    //4. Calculate the Budget

    //5.Display the Budget on the UI
  };
  return {
    init: function(){
      console.log("application has started.");
      setUpEventListeners();
    }
  };
})(budgetController, uiController);
controller.init();
