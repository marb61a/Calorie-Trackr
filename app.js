"use strict"

// Storage Controller
const StorageCtrl = (function(){
    // Public methods
    return {
        storeItem: function(item){
            let items;
            
            // Check if there are any items in local storage
            if(localStorage.getItem('items' === null)){
                items = [];
                
                // Push new item
                items.push(item);
                
                // Set local storage
                localStorage.setItem('items', JSON.stringify(items));
            } else {
                // Get what is already in local storage
                items = JSON.parse(localStorage.getItem('items'));
                
                // Push new item
                items.push(item);
                
                // Set local storage
                localStorage.setItem('items', JSON.stringify(items));
            }
        },
        getItemsFromStorage: function(){
            let items;
            if(localStorage.getItem('items' === null)){
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem('items'));
            }
            
            return items;
        },
        updateItemStorage: function(updatedItem){
            let items = JSON.parse(localStorage.getItem('items'));
            
            items.forEach(function(item, index){
                if(updatedItem.id === item.id){
                    items.splice(index, 1, updatedItem);
                }
            });            
            
            localStorage.setItem('items', JSON.stringify(items));
        },
        deleteItemFromStorage: function(id){
            let items = JSON.parse(localStorage.getItem('items'));
        
            items.forEach(function(item, index){
                if(id === item.id){
                    items.splice(index, 1);
                }
            });
        
            localStorage.setItem('items', JSON.stringify(items));
        },
        clearItemsFromStorage: function(){
            localStorage.removeItem('items');
        }
    };
})();


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
        // items: [
        //     {id: 0, name: 'Steak Dinner', calories: 1200},
        //     {id: 1, name: 'Chocolate', calories: 300},
        //     {id: 2, name: 'Eggs', calories: 400}
            
        // ],
        
        items: StorageCtrl.getItemsFromStorage(),
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
            let newItem = new Item(ID, name, calories);
            
            // Push the new item to the data structure
            data.items.push(newItem);
            
            return newItem;
        },
        getItemById: function(id){
            let found = null;
            
            // Loop through items
            data.items.forEach(function(item) {
                if(item.id === id){
                    found = item;
                }
            });
            
            return found;
        },
        updateItem: function(name, calories){
            calories = parseInt(calories); 
            let found = null;
            
            data.items.forEach(function(item) {
                if(item.id === data.currentItem.id){
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            });
            
            return found;
        },
        getTotalCalories: function(){
            let total = 0;
            
            // Loop through items and add calories
            data.items.forEach(function(item){
                total += item.calories;    
            });
            
            // Sets the total calories in the data structure
            data.totalCalories = total;
            
            return data.totalCalories;
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
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        clearBtn: '.clear-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories'
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
        showTotalCalories: function(totalCalories){
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },
        clearEditState: function(){
            UICtrl.clearInput();
            
            // Hide buttons when editing
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },
        showEditState: function(){
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
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
        
        // Disable submit on enter
        document.addEventListener('keypress', function(e){
            if(e.keyCode === 13 || e.which === 13){
                e.preventDefault();
                return false;
            }
        });
        
        // Edit icon click event
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);
    
        // Update item event
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);
    
        // Delete item event
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);
    
         // Back button event
         document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);
    
         // Clear items event
        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
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
            
            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            
            // Add the total calories to the UI
            UICtrl.showTotalCalories(totalCalories);
            
            // Store in local storage
            StorageCtrl.storeItem(newItem);
            
            // Clear input fields
            UICtrl.clearInput();
        }
        
        e.preventDefault();
        
    };
    
    // Click item edit
    const itemEditClick = function(e){
        if(e.target.classList.contains('edit-item')){
            // Get the list item id
            const listId = e.target.parentNode.parentNode.id;
            
            // Split into an array
            const listIdArr = listId.split('-');
            
            // Get the actual id
            const id = parseInt(listIdArr[1]);
            
            // Get item
            const itemToEdit = ItemCtrl.getItemById(id);
            
            // Set the current item
            ItemCtrl.setCurrentItem(itemToEdit);
            
            // Add the item to the form
             UICtrl.addItemToForm();
        }
        
        e.preventDefault();
    };
    
    // Update item submit
    const itemUpdateSubmit = function(e){
        
    };
    
    // Public Methods
    return {
        init: function(){
            // Clear edit state (or set initial state)
            UICtrl.clearEditState();
            
            // Fetches items from the data structure
            const items = ItemCtrl.getItems();
            
            // Check if any items
            if(items.length === 0){
                UICtrl.hideList();
            } else {
                // Populate list with items
                UICtrl.populateItemList(items);
            }
            
            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            
            // Add the total calories to the UI
            UICtrl.showTotalCalories(totalCalories);
            
            // Load event listeners
            loadEventListeners();
            
        }
    };
    
})(ItemCtrl, StorageCtrl, UICtrl);

// Initialise the app
App.init();