// 遵从AMD规范
define(["parabola", "jquery", "jquery-cookie"], function (parabola, $) {

    function appear() {

        $("#arise").hover(function () {
            $("#header-RQ").css("display", "block");
        }, function () {
            $("#header-RQ").css("display", "none");
        })
    }

    function appear1() {

        $("#ul1, #ul2").on("mouseover", "a", function () {

            $(this).css("color", "white");
        })
        $("#ul1, #ul2").on("mouseout", "a", function () {

            $(this).css("color", "#cccccc");
        })
    }

    function naviagtion() {
        $("#navigationul1").on("mouseover", "a", function (e) {

            $("#Under").stop().animate({
                width: $(this).closest("li").width() + 30,
                height: 5,
                bottom: 10,
                left: $(this).offset().left - 15

            }, 100)
            $(this).css("color", "red")

        })

        $("#navigationul1").on("mouseout", "a", function () {

            $("#Under").stop().animate({
                width: 0,
                height: 0,
                bottom: 0
            }, 100)
            $(this).css("color", "#333333")

        })


    }

    function loop() {
        $.ajax({
            url: "./json/data.json",
            success: function (arr) {
                // alert(msg)
                // var childLi = $(".loopul");
                //数据总数为30，一个标签下面有五个数据，所以当总数除以5等于零的时候就创建一个div
                for (var i = 0; i < arr.length; i++) {
                    if (i % 5 == 0) {
                        var node = $(` <div class = "loop">
                            <ul class = "loopul">
                            </ul>
                        </div> `);

                        node.appendTo("#navigationul1");

                    } //把li标签插入ul标签中，  因为有if判断的存在所以可以一个ul标签下插入五个
                    $(` <li class = "loopli">
                        <div class = "pictorial">
                            <img src="${arr[i].img}" alt="">
                        </div>
                        <span style = "white-space:nowrap;">${arr[i].title}</span><br>
                        <span style = "color:red">${arr[i].price}</span>
                    </li>`).appendTo(node.find(".loopul"));

                }
                // $("#navigationul1").on("mouseout","a", function(){
                //     for(var i = 0; i < 8; i++){

                //     }
                // })

                $("#navigationul1").on("mouseover", "a", function () {
                    $("#navigationul1").find(".loop").eq(this.id).css("display", "block")
                })
                $("#navigationul1").on("mouseout", "a", function () {
                    $("#navigationul1").find(".loop").eq(this.id).css("display", "none")
                })

            },
            error: function (err) {

            }
        })




    }
    //轮播图
    function banner() {
        var aBtns = $("#play").find("ol").find("li");
        var oUl = $("#play").find("ul");
        var aLis = oUl.find("li");
        var timer = null; //定时器返回值
        var iNow = 0; //代表当前显示第几张图片

        // var oBtns = $("#play").find("span");

        // oBtns.eq(0).click(function(){
        //     animate({
        //         left:-1920
        //     }, 500)
        // })

        aBtns.click(function () {
            iNow = $(this).index();
            tab();
        })

        timer = setInterval(function () {
            iNow++;
            tab();
        }, 2000);

        $(".span1").click(function () {
            clearInterval(timer);
            // oUl.animate({left:iNow--}, 500)
            iNow++
            if (iNow == 2) {
                iNow = 2
            }



            tab();
        })

        $(".span2").click(function () {
            clearInterval(timer);
            // oUl.animate({left:iNow--}, 500)
            iNow--
            if (iNow == -1) {
                iNow = 1
            }



            tab();
        })

        function tab() {
            aBtns.removeClass("active").eq(iNow).addClass("active");
            if (iNow == aBtns.size()) {
                aBtns.eq(0).addClass("active");
            }

            oUl.animate({
                left: -iNow * 1920
            }, 500, function () {
                if (iNow == aBtns.size()) {
                    iNow = 0;
                    oUl.css("left", 0);
                }
            })

            $("#play").mouseenter(function () {
                clearInterval(timer);
            })
            $("#play").mouseleave(function () {
                clearInterval(timer);
                timer = setInterval(function () {
                    iNow++;
                    tab();
                }, 2000)
            })
        }

        //左点击

    }

    // function sildebar(){
    //     $.ajax({
    //         url:"../json/data.json",
    //         success:function(arr){
    //             $(ajax){

    //             }
    //         }
    // }

    //侧边栏循环拿数据
    function sildebar() {
        $.ajax({
            url: "./json/sildebar.json",
            success: function (arr) {
                for (var i = 0; i < arr.length; i++) {
                    var node = $(` <li class = "product">
                        ${arr[i].title}
                        <ul class = "productul">
                            
                        </ul>
                    </li>`);
                    node.appendTo("#sildebar");

                    var msg = arr[i].childs;
                    // alert(msg);
                    for (var j = 0; j < msg.length; j++) {
                        $(`<li class = "productli">
                            <div class = "productdiv1"><a href=""><img src=${msg[j].img} alt=""></a></div>
                            <div class = "productdiv2">${msg[j].title}</div>
                            <div class = "productdiv3">${msg[j].price}</div>
                        </li>`).appendTo(node.find(".productul"))
                    }
                }
            }
        })
        $("#sildebar").on("mouseenter", ".product", function () {
            $(this).find(".productul").css("display", "block")
        })
        $("#sildebar").on("mouseleave", ".product", function () {
            $(this).find(".productul").css("display", "none")
        })
    }
    //网页主数据
    function homepage() {
        $.ajax({
            url: "./json/AD.json",
            success: function (arr) {
                for (var i = 0; i < arr.length; i++) {
                    var node = $(`
                        <div id="header2">
                            <div id="header_title">
                                <h2 id="tv">${arr[i].h}</h2>
                            </div>
                            <div id="commodity">
                                <div id="tv_left">
                                    <a href=""><img src="${arr[i].left}" alt=""></a>
                                </div>
                                <ul id="tv_right">
                                    
                                </ul>
                            </div>
                        </div>
                    `)
                    node.appendTo($("#header_big"))
                    var oHi = arr[i].child;
                    for (var k = 0; k < oHi.length; k++) {
                        var oHoo = $(`
                            <a href="">${oHi[k].a}</a>
                        `)
                        oHoo.appendTo(node.find("#header_title"))
                    }
                    var oTe = arr[i].oli;
                    for (var j = 0; j < oTe.length; j++) {
                        var oChild = $(`
                            <li>
                                <a href="" id="pic">
                                    <img src="${oTe[j].img}" alt="">
                                    <div id="list">
                                        <p id="introduce">${oTe[j].title}</p>
                                        <p id="price">${oTe[j].title2}</p>
                                        <p>${oTe[j].money}</p>
                                    </div>
                                </a>
                            </li>
                        `)
                        oChild.appendTo(node.find("#commodity").find("#tv_right"));
                    }
                }
            },
            error: function (msg) {

            }
        })

        // $("#primary").on("mouseover", ".primaryli", function(){
        //     $(this).css("box-shadow", "5px 5px 5px 5px #888888")
        // })
        // $("#primary").on("mouseout", ".primaryli", function(){
        //     $(this).css("box-shadow", "none")
        // })
    }

    // 滑动一定距离出现的导航栏
    function scroll() {
        $(window).scroll(function () {
            var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
            // alert($(window).scrollTop())
            // var documentheight = parseFloat($(document).height());
            if (totalheight >= 1750 && totalheight <= 5500) {
                $('#scroll').css("display", "block")
            } else {
                $('#scroll').css("display", "none")
            }

        });
        $("#scroll").on("mouseover", "li", function () {
            $(this).css("color", "red");
        })
        $("#scroll").on("mouseout", "li", function () {
            $(this).css("color", "#9f9f9f");
        })
    }
    // <!-- 新闻（主数据下面的四张图片） -->
    function nadao() {
        $.ajax({
            url: "./json/four.json",
            success: function (arr) {
                for (var i = 0; i < arr.length; i++) {
                    $(`<div id = "nadao">
                    <img src="${arr[i].img}" alt="">
                    <ul>
                        <li><span>${arr[i].span1}</span><span>${arr[i].span2}</span></li>
                        <li>${arr[i].li1}</li>
                        <li>${arr[i].li2}</li>
                    </ul>
                </div>`).appendTo("#bigfour")
                }
            }
        })

        $("#base").hover(function () {
            $(this).css("color", "red");
        }, function () {
            $(this).css("color", "#333333")
        })
    }


    function slide() {
        $("#scroll").on("click", "li", function () {
            var node = $(this).index();
            $("#parties").find("#bigfour").eq(node);
        })
    }



    return {
        appear: appear,
        appear1: appear1,
        naviagtion: naviagtion,
        loop: loop,
        banner: banner,
        sildebar: sildebar,
        homepage: homepage,
        scroll: scroll,
        nadao: nadao,
        slide: slide
    }
})