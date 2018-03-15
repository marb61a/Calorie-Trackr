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
        
    };
    
})();

// App Controller
// Function uses the IIFE pattern
const App = (function(ItemCtrl, UICtrl){
    // Public Methods
    return {
        init: function(){
            console.log("Initialising App");
        }
    };
    
})(ItemCtrl, UICtrl);

// Initialise the app
App.init();