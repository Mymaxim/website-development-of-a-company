<?php
    require('connect.php');
    $username=isset($_POST['name']) ? $_POST['name'] : null;
    $password=isset($_POST['pwd']) ? $_POST['pwd'] : null;
    // 密码md5加密
    // $password = md5($password);
    
    $sql = "select * from admin where name='$username' and password='$password'";

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