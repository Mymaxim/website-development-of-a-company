$('.login').on('click',function(){

            $.get({url:'../api/register.php',data:{"type":"login","user":$('.user').val(),"pass":$('.pass').val()},success:function(res){
                if(res == 'success'){
                    $('.user').next('p').remove();
                    $('.tipWindow').fadeIn(500,function(){

                        $(this).fadeOut(500,function(){
                            // 请求修改登录状态
                            $.get({url:'../api/isLogin.php',data:{"type":"set","status":1,"user":$('.user').val()}})
                            if((window.location.search).length<4){
                                window.location.href = '../index.html';
                            }else{
                                window.location.href = window.location.search.slice(1);
                                
                            }
                        });
                    })
                }else{
                    $('.user').next('p').remove();
                    $('.user').after(createTip('用户不存在或密码不正确'));
                         
                }

            }})
        })

        $('input').change(function(){
                 
            $(this).siblings('p').remove();
        })
             
    })
    // 提示消息
    function createTip(val){

        let $tip = $('<p/>').addClass('error');
        $tip.text(val);

        return $tip;
    }