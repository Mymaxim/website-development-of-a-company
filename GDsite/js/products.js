document.addEventListener('DOMContentLoaded',function(){
    
    var pd_main = document.querySelector('#pd_main');
    var menu = document.querySelector('.menu');
    var menuLi = menu.querySelectorAll('li');
    var p = menu.querySelectorAll('p');
    var content = document.querySelector('.content');
   
    var qty = 9;
    var classes = 1;
    var page = document.createElement('div');
    page.className = 'page';

    //创建接口
    var xhr = new XMLHttpRequest();
    var status = [200,304];
    xhr.onload = function(){
        if(status.includes(xhr.status)){
            var res = JSON.parse(xhr.responseText);
            pd_main.className = 'main';
            var ul = document.createElement('ul');
            ul.className = 'clearfix';
            ul.innerHTML = res.prod.data.map(item => {
                return `<li data-id="${item.id}">
                        <img src="${item.img}"/>
                        <p>${item.name}</p>
                        </li>`
            }).join('');
            content.innerHTML = '';
            content.appendChild(ul);

            menu.classList.add('bg');
            p[0].innerText = '苗木产品';
            p[1].innerText = '花卉产品';
            for(var i=0;i<res.clas.length;i++){
                menuLi[i].innerText = res.clas[i].classes;
            }
            
            //分页
            var pageLen = Math.ceil(res.prod.total/res.prod.qty);
            page.innerHTML = '';
            if(pageLen != 1){
                for(var i=0;i<pageLen;i++){
                    var span = document.createElement('span');
                    span.innerText = i+1;
                    if(i==res.prod.page-1){
                        span.className = 'active';
                    }
                    page.appendChild(span);
                    content.appendChild(page);
                }  
            }
        }
    }
    xhr.open('get','../api/products.php?qty='+qty+'&classes='+classes,true);
    xhr.send();

    page.onclick = function(e){
        if(e.target.tagName.toLowerCase() === 'span'){
            var pageNum = e.target.innerText;
            xhr.open ('get','../api/products.php?qty='+qty+'&page='+pageNum);
            xhr.send();
        }
    }

    menuLi[0].classList.add('active');
    for(var i=0;i<menuLi.length;i++){
        menuLi[i].onclick = function (num){
            return function(){
                for(var j=0;j<menuLi.length;j++){
                    menuLi[j].classList.remove('active');
                }    
                menuLi[num].classList.add('active');
                classes = num+1;
                xhr.open ('get','../api/products.php?qty='+qty+'&classes='+classes,true);
                xhr.send();
            }
        }(i);
    }
})