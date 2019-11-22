require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "parabola": "parabola",
        "index":"index",
    },
    shim: {
        //设置依赖关系  先引入jquery.js  然后在隐去jquery-cookie
        "jquery-cookie": ["jquery"],
        //声明当前模块不遵从AMD
        "parabola": {
			exports: "_"
		}
    }
})

require(["index"], function(index){
    index.appear();
    index.appear1();
    index.naviagtion();
    index.loop();
    index.banner();
    index.sildebar();
    index.homepage();
    index.scroll();
    index.nadao();
    index.slide();
})