<?php
    require('connect.php');
    $confirmname = isset($_POST['confirmname']) ? $_POST['confirmname'] : null;
    $password = isset($_POST['password']) ? $_POST['password'] : null;
    // 判断用户名是否存在
    $data = $conn->query("select * from user where username ='$confirmname '");
    if($data->num_rows == 0){
            // 密码md5加密
            $password = md5($password);
            // 写入数据sql语句
            $sql = "insert into user(username ,password) values('$confirmname','$password')";

            $res = $conn->query($sql);

            if($res){
                echo "success";
            }else{
                echo "fail";
            }
        }

?>