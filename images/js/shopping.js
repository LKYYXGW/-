require.config({
    paths:{
        "jquery":"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
        "parabola": "parabola",
        "shoppingcart":"shoppingcart"
    },
    shim:{
        "jquery-cookie":["jquery"],
        "parabola":{
            exports:"_"
        }
    }
})

require(["shoppingcart"], function(shoppingcart){
    shoppingcart.appear();
    shoppingcart.appear1();
    shoppingcart.switchover();
    shoppingcart.information();
    shoppingcart.sc_num();
    shoppingcart.empty();
    shoppingcart.minus();
    shoppingcart.add();
    // shoppingcart.sc();
})