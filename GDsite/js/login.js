jQuery(function($){
    // 加载远程html文件，load取html结构
    $('#GD_footer').load('register.html #GD_footer p');

    function randomCode(){
        var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var res = '';
        for(var i=0;i<6;i++){
            res += str[parseInt(Math.random()*str.length)];
        }
        return res;
    }
    $('.code').html(randomCode());

    var checkLength = 0;
    $('.reg').on('blur','input',function(e){
        switch(e.target.id){
            case 'username':
            // 用户名是否注册验证
                var username = $(this).val();
                if(username.length > 0){
                    $.ajax({
                        url:'../api/check.php',
                        type:'post',
                        data:{'username':username},
                        success:function(data){
                            if(data !== 'exsit'){
                                $('#username').next().next(".tips").css('display','block').text('用户不存在');
                            }else{
                                $('#username').next().next(".tips").css('display','none')
                                checkLength = 1;
                                console.log(checkLength);
                            }
                        }
                    }) 
                }else{
                    $('#username').next().next(".tips").css('display','block').text('请输入用户名');
                }
            break; 
            case 'pwd':
                if($(this).val().trim().length === 0){
                    $(this).next().next(".tips").css('display','block').text('密码不能为空');           
                }else{
                    // checkLength++;
                    $(this).next().next(".tips").css('display','none');
                    console.log(checkLength);
                }
            break;
            case 'vCode':
                if($(this).val().trim().length === 0){
                    $(this).next().next().next(".tips").css('display','block').text('验证码不能为空');
                }else if($(this).val().toLowerCase()!== $('.code').text().toLowerCase()){
                    $(this).next().next().next(".tips").css('display','block').text('验证码不正确');
                }else{
                    // checkLength++;
                    console.log(checkLength);
                    $(this).next().next().next(".tips").css('display','none');
                }
            break;   
        }
   }).on('click','.code',function(){
         // 获取验证码
         $('.code').html(randomCode());
    }).on('click','#btn_login',function(){
        var username = $('#username').val();
        var password = $('#pwd').val();
        var code = $('#vCode').val();
        var checkCode = 0;
       
        if(code.trim().length === 0){
            $('#vCode').next().next().next(".tips").css('display','block').text('验证码不能为空');
        }else if(code.toLowerCase()!== $('.code').text().toLowerCase()){
            $('#vCode').next().next().next(".tips").css('display','block').text('验证码不正确');
        }else{
            $('#vCode').next().next().next(".tips").css('display','none');
            checkCode = 1;
        }

        $('.code').html(randomCode());
        console.log(checkLength,$('#pwd').val().trim().length);
        if(checkLength == 1 && $('#pwd').val().trim().length != 0 && checkCode == 1){
            $.ajax({
                url:'../api/login.php',
                type:'post',
                data:{'username':username,'password':password},
                success:function(data){
                    if(data == 'success'){
                        // alert(username+'您好，欢迎登录格调花卉，我们将竭诚为您服务！')
                        $('#pwd').next().next(".tips").css('display','none');
                        var now = new Date();
                        now.setMinutes(now.getMinutes()+30);
                        document.cookie = 'user=' + username + ';expires=' + now.toUTCString() + ';path=/';
                        window.location = 'bbs.html';
                        $('.reg input').val('');
                    }else{
                        $('#pwd').next().next(".tips").css('display','block').text('密码错误');
                    }
                }
            })   
        }
   })
})