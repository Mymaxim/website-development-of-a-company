<?php
    require('connect.php');
    $name = isset($_POST['name']) ? $_POST['name'] : null;
    $pwd = isset($_POST['pwd']) ? $_POST['pwd'] : null;
    $newpwd = isset($_POST['newpwd']) ? $_POST['newpwd'] : null;

    // 密码md5加密
    // $pwd = md5($pwd);
    if($name != null && $pwd != null && $newpwd != null){
        $sql = $conn->query("select * from admin where name='$name' and password='$pwd'");
        // 获取查询结果
        // var_dump($sql->num_rows) ;
        if($sql->num_rows>0){
            // echo 'sdaad';
            $update = "update admin set password='$newpwd' where name='$name'";
            $set = $conn->query($update);
            if($set){
                echo 'success';
            }else{
                echo 'fail';
            }
        }
        
    }else{
        $result = $conn->query("select id,name from admin");
        $res = $result->fetch_all(MYSQLI_ASSOC);
        $result->close();
        $conn->close();
        echo json_encode($res,JSON_UNESCAPED_UNICODE);
        
    }


?>