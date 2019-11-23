require.config({
    paths:{
        "jquery":"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
        "parabola": "parabola",
        "commodity":"commodity"
    },
    shim:{
        "jquery-cookie":["jquery"],
        "parabola":{
            exports:"_"
        }
    }
})

require(["commodity"], function(commodity){
    commodity.appear();
    commodity.appear1();
    commodity.navigation();
    commodity.change();
    commodity.particular();
    // commodity.magnifying();
})