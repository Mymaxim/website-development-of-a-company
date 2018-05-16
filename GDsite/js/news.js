jQuery(function($){
    // 根据url发起ajax请求
    var par=location.search;
    par=decodeURI(par);
    var url=par.substring(1);
    url=url.split('=');
    par=url[1];
    console.log(par);
    $.ajax({
        url:'../api/news.php',
        dataType:'json',
        data:{id:par},
        success:function(res){
           $('.current').text(res[0].remarks);
            $('#main .container').load(res[0].url);
        }
    })       
})