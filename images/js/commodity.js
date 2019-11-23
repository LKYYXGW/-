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

//商品图片放大镜
    //选择下面的小图片使大图片变成相对应的图片
    function change(){
        $("#switchover").on("click", "span", function(){
            $(this).css("border", "2px solid red").siblings("span").css("border", "2px solid #ccc");
            $("#bigpicture").find("img").eq($(this).index()).show().stop(true).animate({
                opacity:1
            }, 1000).siblings("img").css("opacity", "0").hide()
            // alert($(this).index());
           $("#magnifying").find("img").attr("src", $(this).find("img").attr("src"))
        })
        


        $("#bigpicture").mouseenter(function(){
                    $("#shade, #magnifying").show();
                });
                $("#bigpicture").mouseleave(function(){
                    $("#shade, #magnifying").hide();
                }).mousemove(function(ev){
                    var l = ev.pageX - $(this).offset().left - 50;
                    if(l < 0){
                        l = 0;
                    }                     
                    if(l >= 354){
                        l = 354
                    }
                    var t = ev.pageY - $(this).offset().top - 50;
                    if(t < 0){
                        t = 0;
                    }
                    if(t >= 354){
                        t = 354
                    }
                    $("#shade").css({
                        left:l,
                        top:t
                    })
                    $("#magnifying").find("img").eq($(this).index()).css({
                        
                        left:-3 * l,
                        top: -3 * t
                    }).siblings("img").css("display", "none");
                    
                })
    }

    function particular(){

        $.ajax({
            url:"./json/particular.json",
            success:function(arr){
                // alert(arr);
                for(var i = 1; i < 5; i++){
                    $(`<ul class = "particularul">
                        <li>${arr[i].title}</li>
                        <li>${arr[i].title}</li>
                        <li>${arr[i].title}</li>
                        <li>${arr[i].title}</li>
                        <li>${arr[i].title}</li>
                        <li>${arr[i].title}</li>
                    </ul>`).appendTo(".particular")
                }
            }
        })

        $("#sitespan").hover(function(){
            $(".conceal").css("display", "block");
            $(".conceal").animate({
                height:274
            }, 500)
        }, function(){
            $(".conceal").css("display", "none");
            $(".conceal").animate({
                height:0
            }, 500)
        })
    }

    return{
        appear:appear,
        appear1:appear1,
        navigation:navigation,
        change:change,
        particular:particular
        // magnifying:magnifying
    }

})