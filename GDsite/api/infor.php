<?php
    require('connect.php');
    $about = $conn->query("select * from infor order by time desc");
    $res = $about->fetch_all(MYSQLI_ASSOC);
    $about->close();
    $conn->close();
    echo json_encode($res,JSON_UNESCAPED_UNICODE);
?>