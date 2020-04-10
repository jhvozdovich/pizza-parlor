// Business Logic -------------------------------------------
function Pizza(size) {
  this.size = size,
  this.toppings = []
}

Pizza.prototype.addToppings = function(topping) {
  this.toppings.push(topping);
}

Pizza.prototype.sizePrice = function() {
  if (this.size === "small") {
    return 7.00;
  } else if (this.size === "medium") {
    return 9.00;
  } else if (this.size === "large") {
    return 11.00;
  }
}

Pizza.prototype.toppingPrice = function() {
  totalToppingPrice = 0.00;
  this.toppings.forEach(function(topping) {
    if (topping === "pepperoni" || topping === "mushrooms") {
      totalToppingPrice += 1.00;
      console.log("adding topping prices" + totalToppingPrice);
    } else {
      totalToppingPrice += 2.00;
      console.log("adding topping prices" + totalToppingPrice);
    }
    return totalToppingPrice;
  })
}

Pizza.prototype.totalPrice = function() {
  var totalPrice = 0
  totalPrice += this.sizePrice();
  console.log("add size price" + totalPrice);
  totalPrice += this.toppingPrice();
  console.log("add total topping price" + totalPrice);
  return totalPrice;
}


// User Interface Logic -------------------------------------
$(document).ready(function() {
  $("form#pizza-input").submit(function(event) {
    event.preventDefault();

    
    var size = $("#size").val();
    var pizza = new Pizza(size);

    $("input:checkbox[name=toppings]:checked").each(function() {
      var topping = $(this).val();
      pizza.addToppings(topping);
    })

    var pizzaPrice = pizza.totalPrice();
    console.log(pizzaPrice);

  })
})