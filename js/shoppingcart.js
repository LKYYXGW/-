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

    function switchover(){
        $(".iconfont").click(function(){
            if($(".iconfont").html() == "&#xe677;"){
                alert(1);
            }
        })
    }
//最上面购物车内的总数
    function sc_num(){
                var cookieStr = $.cookie("goods");
                if(cookieStr){
                    var cookieArr = JSON.parse(cookieStr);
                    var sum = 0;
                    for(var i = 0; i < cookieArr.length; i++){
                        sum += Number(cookieArr[i].num);
                    }
                    $("#dlspan").html(sum);
                }else{
                    $("#dlspan").html(0);
                }
        
            }
//获取购物车内部的数据
    function information(){
        $.ajax({
            url:"./json/single.json",
            success:function(arr){
                var cookieStr = $.cookie("goods");
                if(cookieStr){
                    var cookieArr = JSON.parse(cookieStr);
                    var newArr = [];
                    for(var i = 0; i < arr.length; i++){
                        for(var j = 0; j < cookieArr.length; j++){
                            if(arr[i].id == cookieArr[j].id){
                                arr[i].num = cookieArr[j].num;
                                newArr.push(arr[i]);
                            }
                        }
                        
                    }
                    // console.log(newArr);
                    var cg = $("#aggregate");
                    var cgcg = 0;
                    for(var i = 0; i < newArr.length; i++){
                        var subtotal = Number(newArr[i].num) * parseInt(newArr[i].span3);
                        var node = $(` <div class = "commodity" id = "${newArr[i].id}">
                                <div> <i class = "iconfont">&#xe677;</i></div>
                                <div><img src="${newArr[i].img}" alt=""></div>
                                <div>${newArr[i].span1}</div>
                                <div id = "univalence">${newArr[i].span3}</div>
                                <div>
                                    <span class = "add">-</span>
                                    <span id = "change">${newArr[i].num}</span>
                                    <span class = "add">+</span>
                                </div>
                                <div class = "total">${subtotal}</div>
                                <div><i id = "without" class = "iconfont">&#xe665;</i><i class = "iconfont">&#xe63a;</i></div>
                            </div>`)
                            node.appendTo("#hide");
                            cgcg += subtotal;
                    }
                    $("#aggregate").html(cgcg);
                }
            }
        })
        sc_num();
        // sc();
    }
//清空购物车内部所有内容
    function empty(){
        $("#empty").click(function(){
            $.cookie("goods", null);
            $("#hide").empty();
            sc_num();
        })
    }
//删除单个购物车
    function minus(){
        $("#hide").on("click", "#without", function(){
            var id = $(this).closest(".commodity").remove().attr("id");
            // alert(id);
            // for(var i = 0; i < cookie)
            var cookieArr = JSON.parse($.cookie("goods"));
            for(var i = 0; i < cookieArr.length; i++){
                if(cookieArr[i].id == id){
                    // alert(cookieArr.length);
                    cookieArr.splice(i, 1);
                    break;
                }
            }

            //判断是否时空数组
            if(!cookieArr.length){
                $.cookie("goods", null);
            }else{
                $.cookie("goods", JSON.stringify(cookieArr),{
                    expires:7
                })
            }
            
        })
        sc_num();
        money();
    }

//点击加减号进行加减
    function add(){
        // $(".commodity").empty();
        
        $("#hide").on("click", ".add", function(){
            

            var id = $(this).closest(".commodity").attr("id");
            // alert(id);
            //找出这个数据
            var cookieArr = JSON.parse($.cookie("goods"));
            for(var i = 0; i < cookieArr.length; i++){
                if(cookieArr[i].id == id){
                    if(this.innerHTML === "+"){
                        cookieArr[i].num++;
                        
                    }else if(cookieArr[i].num == 1 && this.innerHTML == "-"){
                        alert("不买不行");
                    }else{
                        cookieArr[i].num--;
                    }
                        var a = $(this).siblings("#change").html();
                        var b = parseInt($(this).closest("div").siblings("#univalence").html());
                        // alert(b);
                        var c = a * b;
                        $(this).closest("div").siblings(".total").html(c);

                        // alert(b);

                        $(this).siblings("#change").html(cookieArr[i].num);
                        // $("#dlspan").html(cookieArr[i].num);
                        $.cookie("goods", JSON.stringify(cookieArr), {
                            expires:7
                        })
                    }
                }
                var a = $(this).siblings("#change").html();
                var b = parseInt($(this).closest("div").siblings("#univalence").html());
                // alert(b);
                var c = a * b;
                $(this).closest("div").siblings(".total").html(c);
                
               
            sc_num();
            money();
            
        })
        
    }

    // function count() {
    //             var sum = 0;
    //             $(".total").each(function(index, item) {
    //                 // alert(parseInt($(item).html()));
    //                 sum += parseInt($(item).html());
    //                 // alert(sum);
    //                 $(".money").html(sum + "元");
    //             })
    //         }
    function money(){
        var sum = 0;
        $(".total").each(function(index, item){
            sum  +=  parseInt($(item).html());
            $("#aggregate").html(sum);
        })
    }   

    // function sc(){
    //     $.ajax({
    //         url:"../json/single.json",
    //         success:function(arr){
    //             var cookieStr = $.cookie("goods");
    //             if(cookieStr){
    //                 var cookieArr = JSON.parse(cookieStr);
    //                 var newArr = [];
    //                 for(var i = 0; i < arr.length; i++){
    //                     for(var j = 0; j < cookieArr.length; j++){
    //                         if(arr[i].id == cookieArr[j].id){
    //                             arr[i].num = cookieArr[j].num;
    //                             newArr.push(arr[i]);
    //                         }
    //                     }
                        
    //                 }
    //                 // console.log(newArr);
    //                 // var cg = $("#aggregate");
    //                 // var cgcg = 0;
    //                 for(var i = 0; i < newArr.length; i++){
    //                     var cg = $("#aggregate");
    //                     var cgcg = 0;
    //                 }
    //                 $("#aggregate").html(cgcg);
    //             }
    //         }
    //     })
    //     sc_num();
    // }
    return{
        appear:appear,
        appear1:appear1,
        switchover:switchover,
        information:information,
        sc_num:sc_num,
        empty:empty,
        minus:minus,
        add:add,
        // sc:sc
    }
})