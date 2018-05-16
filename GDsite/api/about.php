<?php
require('connect.php');
    $num = isset($_GET['num']) ? $_GET['num'] : 0;
    $about = $conn->query("select * from about where num = $num");
    $res = $about->fetch_all(MYSQLI_ASSOC);
    $about->close();
    $conn->close();
    // $arr = array(
    //         "total" => count($res),
    //         "data" => array_slice($res,$idx,$len),
    //         "len" => $len*1,
    //         "page" => $page*1
    //     );
    echo json_encode($res,JSON_UNESCAPED_UNICODE);
?>