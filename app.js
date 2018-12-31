
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
    var calculateTotal = function(type){
      var sum = 0;
      data.allItems[type].forEach(function(cur){
        sum += cur.value;
      });
      data.totals[type] = sum;
      };
    var data = {
           allItems:{
                     exp : [],
                     inc : [],
           },
           totals:{
                     exp: 0,
                     inc: 0,
                  },
           budget: 0,
           percentage:-1
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
      deleteItem:function(type, id){
                       var index, ids;
                       ids = data.allItems[type].map(function(current){
                          return current.id;
                       });
                       index = ids.indexOf[id];
                       if (index !== -1 ) {
                         data.allItems[type].splice(index, 1);
                       }
      },
      calculateBudget: function(){
                      //calculate our income and expenses
                      calculateTotal('exp');
                      calculateTotal('inc');
                      //calculate the budgeut : income - expenses
                      data.budget = data.totals.inc - data.totals.exp;
                      //calculate the percentage of income that we spent
                      if (data.totals.inc > 0) { // we can't devide by zero
                        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
                        //exp = 100; inc= 200 => percentage = 100/ 200 <==> 1/2  = 0.5 * 100 => spent = 50%
                      }else{
                        data.percentage = -1;
                      }

      },
      getBudget: function(){
                 return{
                   budget: data.budget,
                   totalInc: data.totals.inc,
                   totalExp: data.totals.exp,
                   percentage: data.percentage,
                 };
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
    budgetLabel:'.budget__value',
    incomeLabl:'.budget__income--value',
    expensesLabel:'.budget__expenses--value',
    percentageLabel :'.budget__expenses--percentage',
    container : '.container',
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
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"> <div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
             }else if (type === 'exp') {
               element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
             }
             // Replace the placeholder text with some actual data
             newHtml = html.replace('%id%', obj.id);
             newHtml = newHtml.replace('%description%', obj.description);
             newHtml = newHtml.replace('%value%', obj.value);
            //Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        deletListItem: function(selectorID){
                       var el;
                       el = document.getElementById(selectorID);
                       el.parentNode.removeChild(el);
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
        displayBudget: function(obj){
         document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
         document.querySelector(DOMstrings.incomeLabl).textContent = obj.totalInc;
         document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
         if (obj.percentage > 0) {
              document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + ' %';
         }else {
               document.querySelector(DOMstrings.percentageLabel).textContent = '__';
         }
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
    document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);

  };
  var updateBudget = function(){
    //1. Calculate the Budget
    budgetCtrl.calculateBudget();
    //2.Return the budget
    var budget = budgetCtrl.getBudget();
    //3.Display the Budget on the UI
    uiController.displayBudget(budget);
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
   var ctrlDeleteItem = function(event){
     var itemid, splitID, type, id;
      itemid = event.target.parentNode.parentNode.parentNode.parentNode.id;
      if (itemid) {
         splitID = itemid.split('-');
         type = splitID[0];
         id = parseInt(splitID[1]);
          //1. Delete the Item From the Data Structer
          budgetCtrl.deleteItem(type, id);
         //2. Delete the Item From the UI
         uiController.deletListItem(itemid);
         //3. Update and show the new budget
          updateBudget();
      }
   };
  return {
    init: function(){
      console.log("application has started.");
      setUpEventListeners();
      uiController.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1,
      });
    }
  };
})(budgetController, uiController);
controller.init();
