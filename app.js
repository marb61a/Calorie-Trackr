"use strict"

// Storage Controller


// Item Controller
// Function uses the IIFE pattern
const ItemCtrl = (function(){
    // Item Constructor
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    };
    
    // Data Structure, similar to state in React applications
    const data = {
        items: [
            // {id: 0, name: 'Steak Dinner', calories: 1200},
            // {id: 1, name: 'Chocolate', calories: 300},
            // {id: 2, name: 'Eggs', calories: 400}
            
        ],
        currentItem: null,
        totalCalories: 0
    };
    
    // Public Methods
    return {
        getItems: function(){
            return data.items;    
        },
        addItem: function(name, calories){
            let ID;
            
            // Create ID for the items
            if(data.items.length > 0){
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            // Parsing calories to number
            calories = parseInt(calories);
            
            // Create a new item
            newItem = new Item(id, name, calories);
            
            // Push the new item to the data structure
            data.items.push(newItem);
            
            return newItem;
        },
        logData: function(){
            return data;    
        }
    };
    
})();


// Ui Controller
// Function uses the IIFE pattern
const UICtrl = (function(){
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '#add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories'
    };
    
    // Public Methods
    return {
        populateItemList: function(items){
            let html = '';
            
            items.forEach(function(item){
                html += `<li class="collection-item" id="item-${item.id}">
                    <strong>${item.name} : </strong> <em> ${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>
                </li>`;
            });
            
            // Insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getItemInput: function(){
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }; 
        },
        addListItem: function(item){
            // Show items
            document.querySelector(UISelectors.itemList).style.display= 'block';
            
            // Create an li element
            const li = document.createElement('li');
            
            // Add a class
            li.className = 'collection-item';
            
            // Add the id
            li.id = `item-${item.id}`;
            
            // Add HTML
            li.innerHTML = `<strong>${item.name} : </strong> <em> ${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>`;
            
            // Insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
        },
        clearInput: function(){
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        hideList: function(){
            document.querySelector(UISelectors.itemList).style.display = 'none';    
        },
        getSelectors: function(){
            return UISelectors;
        }
    };
    
})();

// App Controller
// Function uses the IIFE pattern
const App = (function(ItemCtrl, UICtrl){
    // Loads event listeners
    const loadEventListeners = function(){
        // Get UI selectors
        const UISelectors = UICtrl.getSelectors();
        
        // Add an item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
    };
    
    // Add item submit
    const itemAddSubmit = function(e){
        // Get form input from UI controller
        const input = UICtrl.getItemInput();
        
        // Ensure that meal and calories have values to be input
        if(input.name !== '' && input.calories !== ''){
            // Add an item
            const newItem = ItemCtrl.addItem(input.name, input.calories);
            
            // Add an item to the UI list
            UICtrl.addListItem(newItem);
            
            // Clear input fields
            UICtrl.clearInput();
        }
        
        e.preventDefault();
        
    };
    
    // Public Methods
    return {
        init: function(){
            // Fetches items from the data structure
            const items = ItemCtrl.getItems();
            
            // Check if any items
            if(items.length === 0){
                UICtrl.hideList();
            } else {
                // Populate list with items
                UICtrl.populateItemList(items);
            }
            
            // Load event listeners
            loadEventListeners();
            
        }
    };
    
})(ItemCtrl, UICtrl);

// Initialise the app
App.init();