<?php
    require('connect.php');
    $data = isset($_GET['data']) ? $_GET['data'] : 0;
    $page = isset($_GET['page']) ? $_GET['page'] : 1;
    $theme = isset($_POST['theme']) ? $_POST['theme'] : null;
    $cont = isset($_POST['cont']) ? $_POST['cont'] : null;
    $user = isset($_POST['user']) ? $_POST['user'] : null;

    $idx = ($page-1)*10;

    $result;$total;

    if($theme != null && $cont != null){
        $sql = "insert into theme(username,theme,content) values('$user','$theme','$cont')";
        $res = $conn->query($sql);
        if($res){
            $result = $conn->query("select id,username,theme,time,likeqty,comqty from theme order by id desc limit 1");
            $res = $result->fetch_all(MYSQLI_ASSOC);
        }else{
            echo "fail";
        }
    }else{
        if($data != 0){
            $result = $conn->query("select * from theme where id='$data' order by time desc");
            $res = $result->fetch_all(MYSQLI_ASSOC);
        }else{
            $result = $conn->query("select id,username,theme,time,likeqty,comqty from theme order by id desc limit $idx,10");
            $total = $conn->query("select count(id) from theme");
            $count = $total->fetch_all(MYSQLI_ASSOC);
            $total->close();
            $data = $result->fetch_all(MYSQLI_ASSOC);
            $res = array(
                "total" => $count,
                "data" => $data
            );
        }
    }
    // $res = $result->fetch_all(MYSQLI_ASSOC);
    $result->close();
    $conn->close();
    echo json_encode($res,JSON_UNESCAPED_UNICODE);
    // echo  json_encode($total,JSON_UNESCAPED_UNICODE);

?>