jQuery(function($){
    var show = $('.show');
    var section = $('.section');
    var $li = section.find('li');
    var num = 0;
    //左边菜单
    $('.chapter').on('click','p',function(){
        if($(this).next('.section').css('display') === 'none'){
            $(this).next('.section').slideDown(300);
        }
        else{
            $(this).next('.section').slideUp(200);
        }
    })

    $li[0].className = 'active';
    $('.section')[0].style.display = 'block';
    $('.section').on('click','li',function(){
        $li.removeClass("active");
        $(this).addClass("active");
        num =$li.index($(this));
        // console.log(num);
        xhr.open('get','../api/about.php?num='+num,true);
        xhr.send();
    });

    //获取数据
    var xhr = new XMLHttpRequest();
    var status = [200,304];
    xhr.onload = function(){
        if(status.includes(xhr.status)){
            var res = JSON.parse(xhr.responseText);
            show.html('');
            show.html(res.map(item => {
                if(item.cont.length === 0){
                    return `<h3>${item.title}</h3>
                            <p>${item.content}</p>`;
                }else if(item.title.length === 0){
                    return `<p>${item.content}</p>
                            <p>${item.cont}</p>`;
                }else if(item.content.length === 0){
                    return `<h3>${item.title}</h3>
                            <p>${item.cont}</p>`;
                }else{
                    return`<h3>${item.title}</h3>
                            <p>${item.content}</p>
                            <p>${item.cont}</p>`;
                } 
            }).join('')); 
        }
    }
    show.append($('<span class = more>加载更多……</span>'));
    xhr.open('get','../api/about.php?num='+num,true);
    xhr.send();
});