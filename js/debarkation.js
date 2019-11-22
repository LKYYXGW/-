require.config({
    paths:{
        "jquery":"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
        "parabola": "parabola",
        "debarkationcart":"debarkationcart",
        "MQuery":"MQuery.js"
    },
    shim:{
        "jquery-cookie":["jquery"],
        "parabola":{
            exports:"_"
        }
    }
})

require(["debarkationcart"], function(debarkationcart){
    debarkationcart.tabPage();
    debarkationcart.verUsername();
    debarkationcart.Stroke();
    debarkationcart.login();
})