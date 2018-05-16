<?php
    require('connect.php');
    $username = isset($_POST['username']) ? $_POST['username'] : null;
    // 判断用户名是否存在
    $test = $conn->query("select * from user where username ='$username'");
      if($test->num_rows !== 0){
            echo "exsit";    
       }
  ?>