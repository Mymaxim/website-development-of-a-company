jQuery(function($){
    //随机验证码
    function randomCode(){
        var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';//15
        var res = '';
        for(var i=0;i<6;i++){
            res += str[parseInt(Math.random()*str.length)];
        }
        return res;
    }

    $('.code').html(randomCode());

    var checkLength=0;
    $('.reg').on('blur','input',function(e){
        var namecheck;
        // 注册检验
        switch(e.target.id){
            // 用户名验证
            case 'username':
                if($(this).val().trim().length === 0){
                   $(this).next().next(".tips").css('display','block').text('用户名不能为空');
                }else{
                   $(this).next().next(".tips").css('display','none');
                    //用户名是否被占用验证
                    var username = $(this).val();
                    $.ajax({
                        url:'../api/check.php',
                        type:'post',
                        data:{'username':username},
                        success:function(data){
                            if(data == 'exsit'){
                                $('#username').next().next(".tips").text('此名字已被有缘人注册，请换一个吧！').css('display','block');
                            }else{
                                checkLength=1;
                            }
                        }
                    })
                }
                checkLength++;
                break;
            // 密码验证
            case 'pwd':
                if($(this).val().trim().length === 0){
                    $(this).next().next(".tips").css('display','block').text('密码不能为空');
                }else if($(this).val().length<6){
                    $(this).next().next(".tips").css('display','block').text('密码不能少于6位');           
                }else{
                    checkLength++;
                     $(this).next().next(".tips").css('display','none');
                }
                break;
                
            // 确认密码
            case 'confirm':
                if($(this).val().trim().length === 0){
                    $(this).next().next(".tips").css('display','block').text('请再次输入密码');
                }else if($('#confirm').get(0).value.trim() !== $('#pwd').get(0).value.trim()){
                    $(this).next().next(".tips").css('display','block').text('两次密码不一致')
                }else{
                    checkLength++;
                    $(this).next().next(".tips").css('display','none');
                }
                break;

            // 校验验证码
            case 'vCode':
                if($(this).val().trim().length === 0){
                    $(this).next().next().next(".tips").css('display','block').text('验证码不能为空');
                }else if($(this).val().toLowerCase()!== $('.code').text().toLowerCase()){
                    $(this).next().next().next(".tips").css('display','block').text('验证码不正确');
                }else{
                    checkLength++;
                    $(this).next().next().next(".tips").css('display','none');
                }
                break;
        }        
    }).on('click','.code',function(){
         // 获取验证码
         $('.code').html(randomCode());
    }).on('click','#btn_reg',function(){
        if(checkLength == $('.reg input').length){
            var confirmname = $('#username').val();
            var password = $('#pwd').val();
            $('.code').html(randomCode());
            $.ajax({
                url:'../api/register.php',
                type:'post',
                data:{'confirmname':confirmname ,'password':password},
                success:function(res){
                    if(res == 'success'){
                        // alert(confirmname+',恭喜你成为格调会员!')
                        window.location = 'bbs.html';
                        $('.reg input').val('');
                    }
                }
            }) 
        }
    })
})