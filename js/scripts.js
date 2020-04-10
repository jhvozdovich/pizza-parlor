// Business Logic -------------------------------------------
function Pizza(size) {
  this.size = size,
  this.toppings = []
  this.addOns = []
}

Pizza.prototype.addToppings = function(topping) {
  this.toppings.push(topping);
}

Pizza.prototype.addAddOns = function(addOn) {
  this.addOns.push(addOn);
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
  this.toppings.forEach(function(topping) {
    if (topping === "pepperonis" || topping === "mushrooms" || topping === "extra cheese" || topping === "nutritional yeast") {
      toppingPrice += 2;
    } else if (topping === "beef" || topping === "feta" || topping === "vegan cheese") {
      toppingPrice += 3
    } else {
      toppingPrice += 1; 
    }
  })
  return toppingPrice;
}

Pizza.prototype.totalAddOnPrice = function() {
  addOnPrice = 0.00;
  this.addOns.forEach(function(addOn) {
    if (addOn === "cheesy bread" || addOn === "garlic rolls") {
      addOnPrice += 5;
    } else {
      addOnPrice += 2; 
    }
  })
  return addOnPrice;
}

Pizza.prototype.totalPrice = function() {
  var totalPrice = 0;
  var totalToppings = this.totalToppingPrice();
  var totalAddOns = this.totalAddOnPrice();
  var sizePrice = this.sizePrice();

  totalPrice += sizePrice;
  totalPrice += totalToppings;
  totalPrice += totalAddOns;
  return totalPrice;
}


// User Interface Logic -------------------------------------
function displayOrder(size, toppings, addOns, price) {
  $(".size").html(size);
  $(".price").html("$" + price.toFixed(2));

  if (toppings.length > 2) {
    var lastTopping = toppings.pop();
    $(".toppings").html("with " + toppings.join(", ") + ", and " + lastTopping);
  } else if (toppings.length === 2) {
    $(".toppings").html("with " + toppings[0] + " and " + toppings[1]);
  } else if (toppings.length === 1) {
    $(".toppings").html("with " + toppings);
  }

  if (addOns.length > 2) {
    var lastAddOn = addOns.pop();
    $(".addOns").html("with sides of " + addOns.join(", ") + ", and " + lastAddOn);
    addOns.push(lastAddOn);
  } else if (addOns.length === 2) {
    $(".addOns").html("with sides of " + addOns[0] + " and " + addOns[1]);
  } else if (addOns.length === 1) {
    $(".addOns").html("with a side of " + addOns);
  }

  $("#order-screen").hide();
  $("#final-screen").show();
  $("#pizza-gif").show();
  $("#cheeza-gif").hide();

  if (addOns.includes("our speciality, the leaning tower of cheeza,")) {
    $("#pizza-gif").hide();
    $("#cheeza-gif").show();
  }
}

$(document).ready(function() {
  $("#delivery").click(function(){
    $("#delivery-screen").show();
    $("#welcome-screen").hide();
  })

  $("#pickup").click(function(){
    $("#order-screen").show();
    $("#welcome-screen").hide();
  })

  $("#fix-order").click(function() {
    $("#order-screen").show();
    $("#final-screen").hide();
  })

  $(".refresh").click(function() {
    window.location.reload();
  })

  $(".select.topping").click(function() {
    if (this.id === "meat-options"){
      $(".meat.options").slideToggle();
    } else if (this.id === "vegetarian-options") {
      $(".vegetarian.options").slideToggle();
    } else if (this.id === "vegan-options") {
      $(".vegan.options").slideToggle();
    } else if (this.id === "goofy-options") {
      $(".goofy.options").slideToggle();
    }
  })

  $("form#address-input").submit(function(event) {
    event.preventDefault();

    $("#delivery-screen").hide();
    $("#order-screen").show();
  })

  $("form#pizza-input").submit(function(event) {
    event.preventDefault();

    var size = $("#size").val();
    var pizza = new Pizza(size);

    $("input:checkbox[name=toppings]:checked").each(function() {
      var topping = $(this).val();
      pizza.addToppings(topping);
    })

    $("input:checkbox[name=addOns]:checked").each(function() {
      var addOn = $(this).val();
      pizza.addAddOns(addOn);
    })

    var pizzaPrice = pizza.totalPrice();

    displayOrder(size, pizza.toppings, pizza.addOns, pizzaPrice);
  })
})