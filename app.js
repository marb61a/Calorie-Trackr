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
            {id: 0, name: 'Steak Dinner', calories: 1200},
            {id: 1, name: 'Chocolate', calories: 300},
            {id: 2, name: 'Eggs', calories: 400}
            
        ],
        currentItem: null,
        totalCalories: 0
    };
    
    // Public Methods
    return {
        getItems: function(){
            return data.items;    
        },
        
        logData: function(){
            return data;    
        }
    };
    
})();


// Ui Controller
// Function uses the IIFE pattern
const UICtrl = (function(){
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
            document.querySelector('#item-list').innerHTML = html;
        }
    };
    
})();

// App Controller
// Function uses the IIFE pattern
const App = (function(ItemCtrl, UICtrl){
    // Public Methods
    return {
        init: function(){
            // Fetches items from the data structure
            const items = ItemCtrl.getItems();
            
            // Populate list with items
            UICtrl.populateItemList(items);
        }
    };
    
})(ItemCtrl, UICtrl);

// Initialise the app
App.init();