document.addEventListener('DOMContentLoaded',function(){
    //吸顶菜单
    var W_nav = document.getElementById('GD_nav');
    window.onscroll =function(){
        var scrollTop = window.scrollY;
        if(scrollTop >= W_nav.offsetHeight){
            W_nav.className = 'fixed' ;
        }else{
            W_nav.className = '';
        }
    }


    //轮播图
    var W_ban = document.getElementById('GD_banner');
    var Imgul = W_ban.children[0];
    var radul = W_ban.children[1];

    //创建接口
    var xhr = new XMLHttpRequest();
    var status = [200,304];
    xhr.onload = function(){
       if(status.includes(xhr.status)){
            var res = JSON.parse(xhr.responseText);
            Imgul.innerHTML = res.map(function(item){
                return `<li><img src='${item.banner}'></li>`;  
            }).join('')
            
            var list = Imgul.children;
            var rad = radul.children;
            list[0].className = 'opa';
            rad[0].className = 'bg';

            var index = 0;
            var timer;

            var play = function(){
                timer = setInterval(function(){
                    nextMove();
                },3000);
            };
            var nextMove = function(){
                index ++ ;
                if(index >= 4){
                    index = 0
                }
                moveImg(list,index);
            };
            play();
            function moveImg(li,index) {
                for(var i=0;i<li.length;i++){
                    if(li[i].className == 'opa'){
                        //清除li的透明度样式
                        li[i].className = '';
                    }
                    if(rad[i].className == 'bg'){//清除li的背景样式
                        rad[i].className = '';
                    }
                }
                list[index].className = 'opa';
                rad[index].className = 'bg';
            }
            
            W_ban.onmousemove = function(){
                clearInterval(timer);
            }
            W_ban.onmouseout = function(){
                play();
            }
            for(var i=0;i<rad.length;i++){
                rad[i].index = i;
                rad[i].onclick = function () {
                    var clickIndex = parseInt(this.index);
                    index = clickIndex;
                    moveImg(list,index);
                    clearInterval(timer);
                };
            }
       }
    }
    xhr.open('get','../api/index.php',true);
    xhr.send();


    //格调数据tab标签切换
    var W_ul = document.querySelector('.W_change');
    var W_cont = document.querySelector('.W_content');
    var W_li =  W_ul.children;
    var W_div = W_cont.children;
    W_li[0].className = 'active';
    for(var i=0;i<W_li.length;i++){
        if(i>0){
            W_div[i].style.display = 'none';
        }
        W_li[i].onclick = function(){ 
            var idx;
            for(var i=0;i<W_li.length;i++){
                if(W_li[i]===this){
                    idx = i;
                }
                W_li[i].className = '';
                W_div[i].style.display = 'none';
            }
            this.className = 'active';
            W_div[idx].style.display = 'block';
        }
    }
})