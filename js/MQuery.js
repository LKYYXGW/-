function MQuery(vArg){
    //构造添加一个属性，记录查询到的所有的元素节点
    this.elements = [];
    
    //判断传入变量数据类型
    switch(typeof vArg){
        case "function":
            addEvent(window, "load", vArg);
            break;
        case "object":
            //document  window
            this.elements.concat(vArg);
            // alert(this.elements.length)
            break;
        case "string":
            switch(vArg[0]){
                case "#": //#id
                    var node = document.getElementById(vArg.substring(1));
                    this.elements.push(node);
                    break;
                case ".":
                    var nodes = elementsByClassName(document, vArg.substring(1));
                    this.elements = nodes;
                    break;
                case "[": //[name=hello]
                    var nodes = document.getElementsByName(vArg.substring(6, vArg.length - 1));
                    this.elements = nodes;
                    break;
                default: 
                    //div
                    var nodes = document.getElementsByTagName(vArg);
                    this.elements = nodes;
                    break;
            }
            // alert(this.elements.length)
            break;
        default: 
            console.log("error");
            break;
    }
}

//事件绑定
MQuery.prototype.click = function(funcName){
    for(var i = 0; i < this.elements.length; i++){
        addEvent(this.elements[i], "click", funcName);
    }
    return this;
}

//封装一个获取当前有效样式的跨浏览器兼容的方法
function getStyle(node, cssStyle){
	if(node.currentStyle){
		return node.currentStyle[cssStyle];
	}else{
		return getComputedStyle(node)[cssStyle];
	}
}

MQuery.prototype.on = function(){
    switch(arguments.length){
        case 1:
            var obj = arguments[0];
            for(var i = 0; i < this.elements.length; i++){
                for(var eventName in obj){
                    addEvent(this.elements[i], eventName, obj[eventName]);
                }
            }
            break;
        case 2: //click mouseover 函数
            var arr = arguments[0].split(" ");
            for(var i = 0; i < this.elements.length; i++){
                for(var j = 0; j < arr.length; j++){
                    addEvent(this.elements[i], arr[j], arguments[1]);
                }
            }

            break;
        case 3:
            for(var i = 0; i < this.elements.length; i++){

                var _arguments = arguments;
                addEvent(this.elements[i], arguments[0], function(ev){
                    var e = ev || window.event;
                    var target = e.target || window.event.srcElement;

                    if(target.nodeName.toLowerCase() == _arguments[1]){
                        _arguments[2].call(target);
                    }
                });
            }
            break;
        default: 
            break;
    }
}
MQuery.prototype.html = function(name){
    switch(arguments.length){
        case 1:
            return this.elements[0].innerHTML;
            break;
        case 2:
            for(var i = 0; i < this.elements.length; i++){
                this.elements[i].innerHTML = arguments[1];
            }
            break;
        default:
            break;
    }
}

MQuery.prototype.css = function(vArg){
    switch(arguments.length){
        case 1:
            if(typeof vArg == "object"){
                for(var i = 0; i < this.elements.length; i++){
                    for(var attr in vArg){
                        vArg[attr] =  typeof vArg[attr] == "number" ? vArg[attr] + "px" : vArg[attr];
                        this.elements[i].style[attr] = vArg[attr];
                    }
                }
    
            }else{
                return getStyle(this.elements[0], vArg);
            }
            
            break;
        case 2:
            
            for(var i = 0; i < this.elements.length; i++){
                arguments[1] = typeof arguments[1] == "number" ? arguments[1] + "px" : arguments[1];
                this.elements[i].style[vArg] = arguments[1];
            }
            
            break;
        default: 
            console.log("css传参错误");
            break;
    }
    return this;
}

function $(vArg){
    return new MQuery(vArg);
}

function addEvent(node, eventType, funcName){
	if(node.addEventListener){
		node.addEventListener(eventType, funcName, false);
	}else{
		node.attachEvent("on" + eventType, funcName);
	}
}

function removeEvent(node, eventType, funcName){
	if(node.removeEventListener){
		node.removeEventListener(eventType, funcName);
	}else{
		node.detachEvent("on" + eventType, funcName);
	}
}

/*
	node 从哪个节点开始去找
	classStr 获取class的名字

 */
function elementsByClassName(node, classStr){
	var result = [];
	var nodes = node.getElementsByTagName("*");
	for(var i = 0; i < nodes.length; i++){
		if(nodes[i].className == classStr){
			result.push(nodes[i]);
		}
	}
	return result;
}