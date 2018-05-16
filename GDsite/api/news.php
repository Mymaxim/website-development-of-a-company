<?php
    require('connect.php');
    $id = isset($_GET['id']) ? $_GET['id'] : 1;
    $result = $conn->query("select * from infor where id='$id'");
    $res = $result->fetch_all(MYSQLI_ASSOC);
    $result->close();
    $conn->close();
    echo json_encode($res,JSON_UNESCAPED_UNICODE);
?>