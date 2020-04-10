// Business Logic -------------------------------------------
function Pizza(size) {
  this.size = size,
  this.toppings = []
}

Pizza.prototype.addToppings = function(topping) {
  this.toppings.push(topping);
}

Pizza.prototype.sizePrice = function() {
  if (this.size === small) {
    return 7.00;
  } else if (this.size === medium) {
    return 9.00;
  } else if (this.size === large) {
    return 11.00;
  }
}

Pizza.prototype.totalPrice = function() {
  totalPrice += this.sizePrice();
  this.toppings.forEach(function(topping){
    totalPrice += toppingPrice(topping);
  })
}

function Topping() {
  this.pepperoni = pepperoni,
  this.extraCheese = extraCheese,
  this.mushrooms = mushrooms
}

Topping.prototype.toppingPrice = function(topping) {
  if (topping === pepperoni || topping === mushrooms) {
    return 1.00;
  } else {
    return 2.00;
  }
}


// User Interface Logic -------------------------------------