jQuery(function($){
    $.get('../api/infor.php',function(data){
        var res = JSON.parse(data);
        $.each($(res),function(idx,item){
            if(item.hot == 1){
                $(`<li data-id="${item.id}">${item.title}</li>`).appendTo('.hot')
            }
            if(item.recommend == 1){
                $(`<li data-id="${item.id}">${item.title}</li>`).appendTo('.recommend')
            }
            if(item.type == 1){
                $(`<p data-id="${item.id}">${item.title}<span>${item.time}</span></p>`).appendTo('.muNews')
            }else if(item.type == 2){
                $(`<p data-id="${item.id}">${item.title}<span>${item.time}</span></p>`).appendTo('.muTel')
            }else if(item.type == 3){
                $(`<p data-id="${item.id}">${item.title}<span>${item.time}</span></p>`).appendTo('.muData')
            }else if(item.type == 4){
                $(`<p data-id="${item.id}">${item.title}<span>${item.time}</span></p>`).appendTo('.huaNews')
            }else if(item.type == 5){
                $(`<p data-id="${item.id}">${item.title}<span>${item.time}</span></p>`).appendTo('.huaData')
            }else{
                $(`<p data-id="${item.id}">${item.title}<span>${item.time}</span></p>`).appendTo('.comment')
            }
        })
    })
    $('.mLeft').on('click','p',function(){
        let params = $(this).attr('data-id');
        params = encodeURI(params);
        window.location.href = 'news.html?id='+params;
    })
    
    $('.mRight').on('click','li',function(){
        let params = $(this).attr('data-id');
        params = encodeURI(params);
        window.location.href = 'news.html?id='+params;
    })
})
