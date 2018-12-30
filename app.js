
//Budget Controller
var budgetController = (function(){
    var Expense = function(id, description, value){
      this.id = id;
      this.description = description;
      this.value = value;
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
    };
    var Income = function(id, description, value){
      this.id = id;
      this.description = description;
      this.value = value;
    };
    var totalIncome = 0;
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
    incomeContainer: '.income__list',
    expensesContainer:'.expenses__list',
  }

   return {
     getInput: function(){
       return {
         type : document.querySelector(DOMstrings.inputType).value,//will be either inc or exp
         description : document.querySelector(DOMstrings.inputDescription).value,
         value : parseFloat(document.querySelector(DOMstrings.inputValue).value),
              };
            },
        addListItem: function(obj, type){
             var html, element;
             if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"> <div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
             }else if (type === 'exp') {
               element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
             }
             // Replace the placeholder text with some actual data
             newHtml = html.replace('%id%', obj.id);
             newHtml = newHtml.replace('%description%', obj.description);
             newHtml = newHtml.replace('%value%', obj.value);
            //Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        clearFields : function(){
             var fields, fieldsArr;
             fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
             fieldsArr = Array.prototype.slice.call(fields);
             fieldsArr.forEach(function(current, index, array){
               current.value = "";
             });
             fieldsArr[0].focus();
        },
        getDOMstrings : function(){
        return DOMstrings;
      },
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
  var updateBudget = function(){
    //1. Calculate the Budget

    //2.Return the budget

    //3.Display the Budget on the UI
  };

  var ctrlAddItem = function(){
         var input, newItem;
    // 1. Get the field input data
          input = uiCtrl.getInput();
          if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            //2. Add the Item to budget Controller
                   newItem = budgetCtrl.addItem(input.type, input.description, input.value);
             //3. Add Item to UI
                  uiController.addListItem(newItem, input.type);
             //4. Clear Fields
                   uiController.clearFields();
             //5.Calculate and Update Budget
                   updateBudget();
          }
   };
  return {
    init: function(){
      console.log("application has started.");
      setUpEventListeners();
    }
  };
})(budgetController, uiController);
controller.init();
