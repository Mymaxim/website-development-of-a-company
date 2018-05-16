<?php
require('connect.php');

    $banner = $conn->query("select * from banner");

    // 获取数据（使用查询结果集）
    $res = $banner->fetch_all(MYSQLI_ASSOC);

    //释放查询结果集，避免资源浪费
    $banner->close();

    // 关闭数据库，避免资源浪费
    $conn->close();

    echo json_encode($res,JSON_UNESCAPED_UNICODE);
?>