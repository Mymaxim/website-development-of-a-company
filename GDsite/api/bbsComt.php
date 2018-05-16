<?php
    require('connect.php');
    $data = isset($_POST['data']) ? $_POST['data'] : 0;
    $user = isset($_POST['user']) ? $_POST['user'] : 123;
    $idx = isset($_POST['theme_id']) ? $_POST['theme_id'] : 0;
    $txt = isset($_POST['comt']) ? $_POST['comt'] : null;

    
    $sql = "insert into comment(user,content,theme_id) values('$user','$txt','$idx')";
    $result = $conn->query($sql);
    

    $comt = $conn->query("select * from comment where theme_id='$data' order by time desc");
    $res = $comt->fetch_all(MYSQLI_ASSOC);
    $comt->close();
    $conn->close();
    echo json_encode($res,JSON_UNESCAPED_UNICODE);
?>