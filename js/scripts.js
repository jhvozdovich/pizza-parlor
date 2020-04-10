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
    return 7;
  } else if (this.size === "medium") {
    return 9;
  } else if (this.size === "large") {
    return 11;
  }
}

Pizza.prototype.totalToppingPrice = function() {
  toppingPrice = 0.00;
  console.log(this.toppings);
  this.toppings.forEach(function(topping) {
    if (topping === "pepperoni" || topping === "mushrooms") {
      toppingPrice += 1;
      console.log("adding topping prices " + toppingPrice);
    } else {
      toppingPrice += 2; 
      console.log("adding topping prices " + toppingPrice);
    }
    console.log("total topping price " + toppingPrice + " " + typeof(toppingPrice));
  })
  return toppingPrice;
}

Pizza.prototype.totalPrice = function() {
  var totalPrice = 0;
  var totalToppings = this.totalToppingPrice();
  console.log(totalToppings);
  var sizePrice = this.sizePrice();
  console.log("size price " + sizePrice);
  totalPrice += sizePrice;
  totalPrice += totalToppings;
  return totalPrice;
  // console.log("add size price " + totalPrice);
  // console.log("call method " + totalToppings)
  // console.log("data type of topping price" + typeof(totalToppings))
  // totalPrice += totalToppings;
  // console.log("add total topping price " + totalPrice);
  // return totalPrice;
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
      console.log(pizza.toppings);
    })

    var pizzaPrice = pizza.totalPrice();
    console.log(pizzaPrice);

  })
})