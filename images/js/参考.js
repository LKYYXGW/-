define(["jquery","jquery.cookie"],function($){
    /* 这里是计算总和 */
    function sc_num(){
        var cookieStr = $.cookie("goods");
        if(cookieStr){
            var cookieArr = JSON.parse(cookieStr);
            var sum = 0;
            for(var i = 0; i < cookieArr.length; i++){
                sum += Number(cookieArr[i].num);
            }
            $(".top #top-right .po .op").html(sum);
        }else{
            $(".top #top-right .po .op").html(0);
        }
    }
/* 这里是加载购物车 */
    function shop_cart(){
        $.ajax({
            url: "../json/list.json",
            type: "get",
            success: function(arr){
                var cookieStr = $.cookie("goods");
                if(cookieStr){
                    var cookieArr = JSON.parse(cookieStr);
                    var newArr = [];
                    for(var i = 0; i < arr.length; i++){
                        for(var j = 0; j < cookieArr.length; j++){
                            if(arr[i].id == cookieArr[j].id){
                                arr[i].num = cookieArr[j].num
                                newArr.push(arr[i]);
                            }
                        }
                    }
                    for(var i = 0; i < newArr.length; i++){
                        var smallMoney = Number(newArr[i].num)*parseInt(newArr[i].money)
                        var node = $(`
                        <div class="shop" id="${newArr[i].id}">
                            <div class="article1">
                                <img src="${newArr[i].img}" alt="">
                                <p>${newArr[i].title}</p>
                            </div>
                            <div class="article2">${newArr[i].money}</div>
                            <div class="article3">
                                <span>-</span>
                                <input type="text" value="${newArr[i].num}" class="sum">
                                <span>+</span>
                            </div>
                            <div class="article4">${smallMoney}</div>
                            <div class="article5">
                                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574167402758&di=6843f04367ae694e5eb250fb94bf7d27&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic2%2Fcover%2F00%2F34%2F92%2F5811862f2ac4b_610.jpg" alt="">
                            </div>
                        </div>                            
                        `)
                        node.appendTo(".shop_box")
                    }
                    
                }
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }
    /* 在输入框里面输入数量进行改变计算 */
    $(".shop_box").on("blur",".sum",function(){
        /* 找到当前商品的id */
        var id = $(this).closest(".shop").attr("id");
        /* 获取商品的单价的div */
        var b = $(this).closest(".article3").prev();
        /* 获取商品的数量 */
        var amend = $(this).val()
        /* 计算商品的总价钱 */
        var a = amend * parseInt(b.html());
        /* 给小计内容赋值总价钱 */
        $(this).closest(".article3").next().html(a)
        var cookieStr = $.cookie("goods");
        var cookieArr = JSON.parse(cookieStr);
        for(var i = 0; i < cookieArr.length; i++){
            /* 跟cookie里面所有的商品id进行对比如果跟cookie商品id相同那证明是相同的商品 */
            if(id == cookieArr[i].id){
                /* 把商品的数量赋给cookie里面的num */
                cookieArr[i].num = amend;
                /* 最后把新的cookie转换成字符串保存到cookie */
                $.cookie("goods",JSON.stringify(cookieArr))
            }
        }
        sc_num()
    })
    /* 点击加减进行数量和合计的计算 */
    $(".shop_box").on("click",".article3 span",function(){
        /* 获取当前商品的id */
        var id = $(this).closest(".article3").prev().prev().attr("id")
        var cookieArr = JSON.parse($.cookie("goods"))
        /* 跟cookie里面所有的商品id进行对比如果跟cookie商品id相同那证明是相同的商品 */
        for(var i = 0; i < cookieArr.length; i++){
            if(id == cookieArr[i].id){
/* 如果找到了跟cookie里面的id相同的话， 命名一个变量这样下面的步骤不用麻烦一直写cookieArr[i] */
                var obg = cookieArr[i];
                break;
            }
        }
        if(this.innerHTML == "+"){
        /* 当这个点击的按钮等于+的时候cookieArr[i].num加 */
            obg.num++;
        }else{
            if(obg.num == 1){
                alert("数量已经见到最小了！");
            }else{
        /* 当这个点击的按钮不等于+的时候cookieArr[i].num减 */
                obg.num--;
            }
        }
        /* 让新的数量在存放数量的div中显示 */
        $(this).siblings(".sum").val(obg.num)
        /* 让新的数量重新存放在cookie中 */
        $.cookie("goods", JSON.stringify(cookieArr), {
            expires: 7
        });
        /* 获取到当前的数量 */
        var a = $(this).siblings(".sum").val();
        /* 获取到当前的单价 */
        var b = parseInt($(this).closest(".article3").prev().html());
        /* 计算小计 */
        var c = a * b;
        /* 将计算的小计赋值给存放小计的div中 */
        $(this).closest(".article3").next().html(c);
        /* 为了让右上角的购物车显示的数量能够实时刷新在这需要调用计算购物车数量的函数 */
        sc_num()
    })
    /* 删除商品 */
    $(".shop_box").on("click",".article5 img",function(){
        /* 获取到当前的商品id */
        var id = $(this).closest(".shop").remove().attr("id");
        var cookieArr = JSON.parse($.cookie("goods"));
        /* 循环cookie找id */
        for(var i = 0; i < cookieArr.length; i++){
            /* 判断cookie中某一个下标中的对象中id是否与当前的商品id相同 */
            if(id == cookieArr[i].id){
  /* 相同的话就删除当前的cookie[i]   cookie[i]也就是找到了相同的商品id所在的下标对象 */
                cookieArr.splice(i,1);
                break;
            }
        }
        /* 将新的cookie进行判断 */
        if(cookieArr.length){
            $.cookie("goods",JSON.stringify(cookieArr),{
                expires: 7
            })
        }else{
            $.cookie("goods",null);
        }
        /* 将删完以后的数量再进行同步刷新让右上角的购物车进行实时刷新 */
        sc_num()
    })
    return {
        shop_cart : shop_cart,
        sc_num : sc_num
    }
})







function banner_operation(){
    $.ajax({
        type:"get",
        url:"json/banner.json",
        success: function(arr){//拿到data.json里的数据是数组
        //创建轮播图整体结构
            $(` 
            <div class="img_box"></div>
            <div class="left_btn"></div>
            <div class="right_btn"></div>
            <ul class="b_nav">
                <li>真的有故事</li>
                <li>GOLF le FLEUR*</li>
                <li>PONY HAIR</li>
                <li>Forest Dimension</li>
            </ul>
            `).appendTo($(".banner"))
        //拿到图片数据，循环遍历渲染到页面中，此时页面中的图片都是绝对定位，重叠在一起，最后一张加入结构中的图片层级最高，显示在最上面
            for(var i = 0; i < arr.length;i++){
                $(`<img src="${arr[i].img}" alt="">`).prependTo($(".img_box"))
            }
        //初始化banner导航样式
            $(".b_nav li").eq(0).css({"text-decoration":"overline","color":"#000"}).attr("id","li_active");
            
        //定义图片及图片导航移动事件函数
            function play(num){
                $(".b_nav li").eq(num).css({"text-decoration":"overline","color":"#000"}).attr("id","li_active").siblings().css({"text-decoration":"none","color":"#999"}).attr("id",null);
                $(".img_box img").eq(3-num).stop().fadeIn(1000).siblings().stop().fadeOut(1000);

            }  
    
        //给banner导航添加移入事件，并设置鼠标移入某一个子导航时会显示对应的图片，且同时清除定时器
        //移出开启定时器
            $(".b_nav li").hover(function(){
                var index = $(this).index();
                play(index);   
                clearInterval(timer)
                },function(){
                    var index = $(this).index();
                    timer = setInterval(function(){
                        index++
                        play(index);
                        if(index == 3){
                            index = -1;
                        } 
                    },3000)
            })
        

        //给图片添加移入停止定时器，移出开启定时器
            $(".img_box img").hover(function(){
                clearInterval(timer)
            },function(){
                var index = 3 - $(this).index();
                timer = setInterval(function(){
                    index++
                    play(index);
                    if(index == 3){
                        index = -1;
                    } 
                },3000)
            })

        //设置一个定时器，让图片自动轮播
            var i = 0;
            var timer = setInterval(function(){
                i++
                play(i);
                if(i == 3){
                    i = -1;
                }
            },3000)
            
            //左右点击
            var ali = $(".b_nav").find("li");
            //左点击
            $(".left_btn").click(function(){
                clearInterval(timer);
                for(var i =0;i < ali.length;i++){
                    if(ali.eq(i).attr("id") == "li_active"){
                        index = i
                        i--;
                        if(i == -1){
                            i = 3;
                        }
                        play(i);
                        break
                    
                    }
                }
            });
            //右点击
            $(".right_btn").click(function(){
                clearInterval(timer);

                for(var i =0;i < ali.length;i++){
                    if(ali.eq(i).attr("id") == "li_active"){
                        i++;
                        if(i == 4){
                            i = 0;
                        }
                        play(i);
                        break;
                    }
                }
              
            })
            // $(".img_box img").on("mouseleave",function(){
            //     clearInterval(timer);
             
            // })
            

   

            
            
        },
        error:function(msg){
            console.log(msg);
           
        }
    })
}