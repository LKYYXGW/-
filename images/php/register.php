<?php
    header("Content-type:text/html;charset=utf-8");
//设置一个统一的返回格式
    $responseData = array("code" => 0, "message" => "");
    // var_dump($_POST);
    $username = $_POST["username"];
    $password = $_POST["password"];
    $repassword = $_POST["repassword"];
    $createtime = $_POST["createtime"];

    //做一个简单的验证
    if(!$username){
        $responseData["code"] = 1;
        $responseData["message"] = "用户名不能为空";
        echo json_encode($responseData);
        exit;
    }
    if(!$password){
        $responseData["code"] = 2;
        $responseData["message"] = "密码不能为空";
        echo json_encode($responseData);
        exit;
    }
    if($password != $repassword){
        $responseData["code"] = 3;
        $responseData["message"] = "两次输入的密码不一致";
        echo json_encode($responseData);
        exit;
    }

    //天龙八部
    $link = mysql_connect("localhost", "root", "123456");
    if(!$link){
        $responseData["code"] = 4;
        $responseData["message"] = "服务器忙";
        echo json_encode($responseData);
        exit;
    }
    //设置utf-8格式  
    mysql_set_charset("uft8");
    // 选择数据库
    mysql_select_db("lkyyxgw");

    //准备sql语句，判断数据库是否有同名用户名
    $sql = "SELECT * FROM users	 WHERE username = '{$username}'";
    // echo $sql;
    $res = mysql_query($sql);
    // var_dump($res);
    $row = mysql_fetch_assoc($res);
    // var_dump($row);
    if($row){
        $responseData["code"] = 5;
        $responseData["message"] = "用户名已注册";
        echo json_encode($responseData);
        exit;
    }
//密码进行MD5加密
    $str = md5(md5($password)."lkyyxgw");
    $sql = "INSERT INTO users(username,password,create_time ) VALUES('{$username}', '{$str}',{$createtime})";

    // echo $sql;
    $res = mysql_query($sql);
    // var_dump($res);
    if(!$res){
        $responseData["code"] = 6;
        $responseData["message"] = "服务器又忙";
        echo json_encode($responseData);
        exit;
    }else{
        $responseData["message"] = "注册成功";
        echo json_encode($responseData);
    }
    mysql_close($link);
?>