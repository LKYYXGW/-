require.config({
    paths:{
        "jquery":"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
        "parabola": "parabola",
        "cataloguecontent":"cataloguecontent",
        "MQuery":"MQuery.js"
    },
    shim:{
        "jquery-cookie":["jquery"],
        "parabola":{
            exports:"_"
        }
    }
})

require(["cataloguecontent"], function(cataloguecontent){
    cataloguecontent.appear();
    cataloguecontent.appear1();
    cataloguecontent.navigation();
    cataloguecontent.slideshow();
    cataloguecontent.characteristic();
    cataloguecontent.single();
})