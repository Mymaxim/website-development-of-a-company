<?php
    require('connect.php');
    $username=isset($_POST['username']) ? $_POST['username'] : null;
    $password=isset($_POST['password']) ? $_POST['password'] : null;
    // 密码md5加密
    $password = md5($password);
    
    $sql = "select * from user where username='$username' and password='$password'";

    // 获取查询结果
    $result = $conn->query($sql);
    if($result->num_rows>0){
        echo 'success';
    }else{
        echo 'fail';
    }
    $result->free();

    $conn->close();
?>