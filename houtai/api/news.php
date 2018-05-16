<?php
    require('connect.php');
    $idx = isset($_POST['idx']) ? $_POST['idx'] : 0;
    $all = isset($_POST['all']) ? $_POST['all'] : null;

    $name = isset($_POST['name']) ? $_POST['name'] : null;
    $url = isset($_POST['url']) ? $_POST['url'] : null;

    if($name != null && $url != null){ 
        $sql = "insert into news(new,content_url) values('$name','$url')";
        $res = $conn->query($sql);
    }

    if($all != null){
        $sql = "delete from news";
    }
    $sql = "delete from news where id='$idx'";
    $res = $conn->query($sql);

    // if ($conn->query($sql)) {
    // echo "新记录插入成功";
    // } else {
    // echo "Error: " . $sql . "<br>" . $conn->error;
    // }
    $result = $conn->query("select * from news");
    $res = $result->fetch_all(MYSQLI_ASSOC);
    $result->close();
    $conn->close();
    echo json_encode($res,JSON_UNESCAPED_UNICODE);
?>