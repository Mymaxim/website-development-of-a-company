<?php
    require('connect.php');

    $idx = isset($_POST['idx']) ? $_POST['idx'] : null;
    $all = isset($_POST['all']) ? $_POST['all'] : null;
    if($all != null){
        $sql = "delete from products";
    }
    $sql = "delete from products where id='$idx'";
    $res = $conn->query($sql);


    $result = $conn->query("select * from products");
    $res = $result->fetch_all(MYSQLI_ASSOC);
    $result->close();
    $conn->close();
    echo json_encode($res,JSON_UNESCAPED_UNICODE);
?>