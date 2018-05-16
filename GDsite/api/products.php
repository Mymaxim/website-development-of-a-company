<?php
    require('connect.php');

    $page = isset($_GET['page']) ? $_GET['page'] : 1;
    $qty = isset($_GET['qty']) ? $_GET['qty'] : 9;
    $classes = isset($_GET['classes']) ? $_GET['classes'] : 1;
    $idx = ($page-1)*$qty;
    
    $result = $conn->query("select * from products where classes='$classes'");
    $cla = $conn->query("select * from classes");

    $res = $result->fetch_all(MYSQLI_ASSOC);
    $cla = $cla->fetch_all(MYSQLI_ASSOC);

    $result->close();

    $conn->close();

    $arr = array(
            "total" => count($res),
            "data" => array_slice($res,$idx,$qty),
            "qty" => $qty*1,
            "page" => $page*1
        );
    $products = array(
            "prod" => $arr,
            "clas" => $cla,
        );
    echo json_encode($products,JSON_UNESCAPED_UNICODE);
?>