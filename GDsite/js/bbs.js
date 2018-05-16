jQuery(function($){
    var cookies = document.cookie;
    if(cookies){
        var username = cookies.slice(cookies.indexOf('=')+1);
        $('.unlog').hide();
        $('.log').prepend(`<h4>楼主：<span class="bbs_user">${username}</span></h4>`).show();
    }else{
        $('.unlog').show();
        $('.log').hide();
    }
    
    $('.signOut').click(function(){
        var now = new Date();
        document.cookie = 'user=' + username + ';expires=' + now.toUTCString() + ';path=/';
        $('.unlog').show();
        $('.log').hide();
    })

    $('.page').on('click','span',function(){
        let page = $(this).text();
        
        $(this).addClass('active');
        $.get('../api/bbs.php',{page:page},function(res){
            var res = JSON.parse(res);
            $(".theme_list").html('');
            $(".theme_list").append(res.data.map(function(item){
                return`<li data-id="${item.id}">
                        <p class="title">${item.theme}</p>
                        <div class="auth_msg">
                            <span class="uname">${item.username}</span>
                            <span class="time">${item.time}</span>
                            <div class="like fr"><i>点赞：</i>${item.likeqty}</div>
                            <div class="comment fr"><i>评论：</i>${item.comqty}</div>
                        </div>
                    </li>`
            }).join(""))
        });
    })

    $.get('../api/bbs.php',function(res){
        var res = JSON.parse(res);
        //分页
        var pageLen = Math.ceil(res.total[0]['count(id)']*1/10);
        // $('.page').html('');
        if(pageLen != 1){
            for(var i=0;i<pageLen;i++){
                $('.page').append(`<span>${i+1}</span>`)
            }  
        }

        $(".theme_list").append(res.data.map(function(item){
            return`<li data-id="${item.id}">
                    <p class="title">${item.theme}</p>
                    <div class="auth_msg">
                        <span class="uname">${item.username}</span>
                        <span class="time">${item.time}</span>
                        <div class="like fr"><i>点赞：</i>${item.likeqty}</div>
                        <div class="comment fr"><i>评论：</i>${item.comqty}</div>
                    </div>
                </li>`
        }).join(""))
    })

    $('.theme_list').on('click','.title',function(){
        $('.newTheme').hide();
        $('.new_Theme').hide()
        $('.newReply').show();
        var id = $(this).parent().attr('data-id');
        $.get('../api/bbs.php',{data:id},function(res){
            console.log(res);
            var res = JSON.parse(res);
            // res = res.data;
            $(".theme_content").html('');
            $(".theme_content").append(res.map(function(item){
                return`<div class="theme_title" data-id="${item.id}">
                            <h2>${item.theme}</h2>
                            <div class="auth_msg">
                                <span class="uname">${item.username}</span>
                                <span class="time">${item.time}</span>
                                <div class="like fr"><i>点赞：</i>${item.likeqty}</div>
                                <div class="comment fr"><i>评论：</i>${item.comqty}</div>
                            </div>
                        </div>
                        <div class="theme_cont">
                            <p> ${item.content}</p>
                        </div>`
            }).join(""))
        })
        $('.newComment').show();
        $.post('../api/bbsComt.php',{data:id},function(data){
            var res = JSON.parse(data);
            $(".reply_list").append(res.map(function(item){
                return`<li class="clearfix">
                    <div class="reply_img fl">
                        <img src="../images/noavatar_small.gif" height="48" width="48"/>
                    </div>
                    <div class="reply_msg fl">
                        <span class='reply_name'>${item.user}</span><span>发表于 &nbsp;</span><span class='time'>${item.time}</span>
                        <p class="reply_txt">${item.content}</p>
                        <p class="reply_menu"><a href="#">举报</a><a href="#">回复</a></p>
                    </div>
                </li>`
            }).join(""))
        })
    })

    $('.myOpinion').on('click','#btn',function(){
        if($('#myView').val().trim().length > 0 && cookies){
            var txt = $('#myView').val();
            var user = $('.bbs_user').text();
            var idx = $('.theme_title').attr('data-id');
            $.post('../api/bbsComt.php',{user:user, theme_id:idx,comt:txt,data:idx},function(data){
                $(".reply_list").html('');
                var res = JSON.parse(data);
                $(".reply_list").append(res.map(function(item){
                    return`<li class="clearfix">
                        <div class="reply_img fl">
                            <img src="../images/noavatar_small.gif" height="48" width="48"/>
                        </div>
                        <div class="reply_msg fl">
                            <span class='reply_name'>${item.user}</span><span>发表于 &nbsp;</span><span class='time'>${item.time}</span>
                            <p class="reply_txt">${item.content}</p>
                            <p class="reply_menu"><a href="#">举报</a><a href="#">回复</a></p>
                        </div>
                    </li>`
                }).join(""))
            })
        }else if($('#myView').val().trim().length = 0){
            $('.tips').find('p').text('请输入评论')
            $('.tips').fadeIn('fast').fadeOut(2000);
        }else{
            $('.tips').find('p').text('请先登录')
            $('.tips').fadeIn('fast').fadeOut(2000);
        }
    })

    $('.back').on('click','.prev',function(){
        $('.newTheme').show();
        $('.newReply').hide();
        $('.newComment').hide();
        $('.new_Theme').hide()
    })
    $('.new_Theme').on('click','.prev',function(){
        $('.newTheme').show();
        $('.newReply').hide();
        $('.newComment').hide();
        $('.new_Theme').hide()
    })
    $('.issue').on('click',function(){
        if(cookies){
            $('.newTheme').hide();
            $('.newReply').hide();
            $('.newComment').hide();
            $('.new_Theme').show() 
        }else{
            $('.tips').find('p').text('请先登录')
            $('.tips').fadeIn('fast').fadeOut(2000);
        }

    })
    $('.tips').css({'left':(window.innerWidth-$('.tips')[0].offsetWidth)/2+'px','top':(window.innerHeight-$('.tips')[0].offsetHeight)/2+window.pageYOffset+'px','display':'none'});   
    $('#Ybtn').on('click',function(){
        console.log(766); 
        if(!cookies){
            $('.tips').fadeIn('fast').fadeOut(3000);
            return;  
        }
        var title = $('#Yinput').val();
        var cont = $('#Ytxt').val();
        var user = $('.bbs_user').text();

        if($('#Yinput').val().trim().length>0 && $('#Ytxt').val().trim().length>0){
            $.post('../api/bbs.php',{user:user,theme:title,cont:cont},function(res){
                if(res != 'fail'){
                    var res = JSON.parse(res);
                    $(".theme_list").prepend(res.map(function(item){
                        return`<li data-id="${item.id}">
                                <p class="title">${item.theme}</p>
                                <div class="auth_msg">
                                    <span class="uname">${item.username}</span>
                                    <span class="time">${item.time}</span>
                                    <div class="like fr"><i>点赞：</i>${item.likeqty}</div>
                                    <div class="comment fr"><i>评论：</i>${item.comqty}</div>
                                </div>
                            </li>`
                    }).join(""))
                    $('.tips').find('p').text('发布成功')
                    $('.tips').fadeIn('fast').fadeOut(2000);
                    setTimeout(function(){
                        $('.newTheme').show();
                        $('.new_Theme').hide();
                    }, 2500)
                }else{
                    $('.tips').find('p').text('发布失败')
                    $('.tips').fadeIn('fast').fadeOut(2000);
                }
            })
        }else if($('#Yinput').val().trim().length=0){
            $('.tips').find('p').text('请输入主题')
            $('.tips').fadeIn('fast').fadeOut(2000);
        }else if($('#Ytxt').val().trim().length=0){
            $('.tips').find('p').text('请输入内容')
            $('.tips').fadeIn('fast').fadeOut(2000);
        }
    })

})