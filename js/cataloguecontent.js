// 头部导航
define(["parabola", "jquery", "jquery-cookie"], function(parabola, $){
    function appear(){
    
        $("#arise").hover(function(){
            $("#header-RQ").css("display", "block");
        }, function(){
            $("#header-RQ").css("display", "none");
        })
    }
    
    function appear1(){
       
        $("#ul1, #ul2").on("mouseover","a",function () {
         
            $(this).css("color", "white");
        })
        $("#ul1, #ul2").on("mouseout","a",function () {
         
            $(this).css("color", "#cccccc");
        })
    }
// 商品导航
    function navigation(){
        $.ajax({
            url:"./json/ajain.json",
            success:function(arr){
                // alert(arr);
                for(var i = 1; i < arr.length; i++){
                    var node = $(`<li class = "start">${arr[i].title}
                        <div class = "startdiv">
                            
                        </div>
                    </li>`);
                    node.appendTo("#navigationul1");
                    var oHi = arr[i].child;
                    for(var j = 0; j < oHi.length; j++){
                        var node1 = $(` <ul class = "startul">
                            <li><img src="${oHi[j].img}" alt=""></li>
                            <li>${oHi[j].title}</li>
                            <li>${oHi[j].price}</li>
                        </ul>`);
                        node1.appendTo(node.find(".startdiv"));

                    }
                }
            }
        })

        $("#navigationul1").on("mouseover", "li", function(){
            $(this).find(".startdiv").css("display", "block")
        })
        $("#navigationul1").on("mouseout", "li", function(){
            $(this).find(".startdiv").css("display", "none")
        })
    }
//轮播图
    function slideshow(){
        $.ajax({
            url:"./json/slideshow.json",
            success:function(arr){
                // alert(arr);
                for(var i = 0; i < arr.length; i++){
                    $(`<li class = "slideshowli"><img src="${arr[i].img}" alt=""></li>`).appendTo("#slideshowul")
                }
            }
        })

        var aBtns = $("#slideshow").find("#select").find("span");
        
        var timer = null;
        var iNow = 0;

        aBtns.click(function(){
            iNow = $(this).index();
            tab();
        })

        timer = setInterval(function(){
            iNow++;
            tab();
        }, 2000)

        function tab(){
            var oimg = $("#slideshow").find("#slideshowul").find(".slideshowli");
            // alert(iNow);
            aBtns.removeClass("active").eq(iNow).addClass("active");

            if(iNow == aBtns.size()){
                aBtns.eq(0).addClass("active");
            }

            if(iNow == aBtns.size()){
                iNow = 0;
                oimg.eq(iNow).css("opacity", "0")
            }
            // alert(iNow);nininininininin
            oimg.eq(iNow).animate({
                opacity:1
            }, 1000).siblings("li").css("opacity", "0");

            $("#slideshow").mouseenter(function(){
                clearInterval(timer);
            })
            $("#slideshow").mouseleave(function(){
                clearInterval(timer);
                timer = setInterval(function(){
                    iNow++;
                    tab();
                }, 2000)
            })
        }
    }

    function characteristic(){
       $(".unaware").on("mouseover", "span", function(){
           $(this).css("background", "red");
           $(this).css("color", "white");
       })
       $(".unaware").on("mouseout", "span", function(){
        $(this).css("background", "white");
        $(this).css("color", "rgb(102, 102, 102)");
        })


        $("#pendant").click(function(){
            if($(this).html() == "﹀"){
                // alert(1);
                $("#particulars3").css("display", "block");
                $("#pendant").html("︿");
            }else{
                // alert(2)
                $("#particulars3").css("display", "none");
                $("#pendant").html("﹀");
            }
        })
    }

    function single(){
        $.ajax({
            url:"./json/single.json",
            success:function(arr){
                // alert(arr);
                for(var i = 0; i < arr.length; i++){
                    $(`<div class = "single">
                        <a href=""><img src="${arr[i].img}" alt=""></a>
                        <span id = "span1">${arr[i].span1}</span>
                        <span id = "span2">${arr[i].span2}</span>
                        <span id = "span3">${arr[i].span3}</span>
                        <span id = "span4"><a id = "${arr[i].id}" class = "a1" href="">加入购物车</a></span>
                    </div>`).appendTo("#center");
                }
            }
        })

        $("#center").on("mouseover", ".a1", function(){
            $(this).css("background", "red");
            $(this).css("color","white");
        })
        $("#center").on("mouseout", ".a1", function(){
            $(this).css("background", "white");
            $(this).css("color","red");
        })

        $("#center").on("click", ".a1", function(){
            // alert($(this).attr("id"));
             var id = this.id; //购物车按钮所在商品id；
            // alert(id);
            var first = $.cookie("goods") == null ? true : false;
            if(first){
                var obj = [{id: id, num:1}];
                $.cookie("goods", JSON.stringify(obj),{
                    expires:7
                })
            }else{
                var cookieStr = $.cookie("goods");
                var cookieArr = JSON.parse(cookieStr);
                var same = false;
                for(var i = 0; i < cookieArr.length; i++){
                    if(id == cookieArr[i].id){
                        cookieArr[i].num++;
                        same = true;
                        break;
                    }
                }

                if(!same){
                    var obj = {id: id, num: 1};
                    cookieArr.push(obj);
                }
                $.cookie("goods", JSON.stringify(cookieArr),{
                    expires:7
                })
            }
            ballMove(this);
            // alert($.cookie("goods"));
            return false;
        })
    }
    function ballMove(node){
        $("#boll").css({
            left:$(node).offset().left,
            top:$(node).offset().top,
            display:"block"
        })

        var X = $("#dl").offset().left - $(node).offset().left;
        var Y = $("#dl").offset().top - $(node).offset().top;

        var bool = new Parabola({
            el:"#boll",
            offset:[X, Y],
            duration:5000,
            curvature:0.0005,
            callback:function(){
                $("#boll").hide();
            }
        })
        bool.start();
    }
    
    return{
        appear:appear,
        appear1:appear1,     
        navigation:navigation,
        slideshow:slideshow,
        characteristic:characteristic,
        single:single
    }
})
