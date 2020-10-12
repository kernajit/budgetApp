// BUDGET CONTROLLER
var budgetController = (function(){

	var Expenses = function(id, description, value){
		this.id = id;
		this.description = description;
		this.value = value;
	}

	var Income = function(id, description, value){
		this.id = id;
		this.description = description;
		this.value = value;
	}

	var data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		}
	};

    return {
    	addItem: function(type, des, val){
    		var newItem,ID;

    		//create ID
    		if(data.allItems[type].length > 0){
    			ID = data.allItems[type][data.allItems[type].length -1].id + 1;
    		}else{
    			ID = 0;
    		}
    		//create new element based on exp or inc
    		if(type === 'exp'){
    			newItem = new Expenses(ID, des, val);
    		}else if(type === 'inc'){
    			newItem = new Income(ID, des, val);
    		}

    		//push the new element to the data structure
    		data.allItems[type].push(newItem);

    		//return the newly created element
    		return newItem;
    	},

    	testing: function(){
    		console.log(data);
    	}
    }


})();


// UI CONTROLER
var UIControlller = (function(){

	var DomStrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn'
	}

	return{
		getInput: function(){
			return{
				type: document.querySelector(DomStrings.inputType).value,   //exp or inc
				description: document.querySelector(DomStrings.inputDescription).value,
				value: document.querySelector(DomStrings.inputValue).value
			};
		},

		getDomStrings: function(){
			return DomStrings;
		}

	}

})();


// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl){


	var setEventListener = function(){
		var Dom = UICtrl.getDomStrings();

		document.querySelector(Dom.inputBtn).addEventListener('click', ctrlAddItem);

		document.addEventListener('keypress', function(event){
			if(event.keyCode === 13 || event.which === 13){
				ctrlAddItem();
			}
		});
	}


	var ctrlAddItem = function(){

		var newItem, input;
		// 1. Get the field input data
		input = UICtrl.getInput();
		// console.log(input);
		// 2. Add the item to the budget controller
		newItem = budgetCtrl.addItem(input.type, input.description, input.value);
		// 3. Add the item to the UI

		// 4. Calculate the budget

		// 5. Display the budget on th UI 
	}

	return{
		Init: function(){
			console.log('Application started working');
			setEventListener();

		}
	}


})(budgetController, UIControlller);

controller.Init();



