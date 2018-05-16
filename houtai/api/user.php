<?php
    require('connect.php');
    $idx = isset($_POST['idx']) ? $_POST['idx'] : 0;
    $sql = "delete from user where id='$idx'";
    $res = $conn->query($sql);
    $result = $conn->query("select id,username from user");
    $res = $result->fetch_all(MYSQLI_ASSOC);
    $result->close();
    $conn->close();
    echo json_encode($res,JSON_UNESCAPED_UNICODE);
?>