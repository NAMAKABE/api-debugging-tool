;
(function(argument) {
    // body...
    $(function(argument) {
        // body...
        $('button').on('click', function(argument) {
            // body...
            var t = $(this);
            var apiUrl = location.origin + '/api/' + t.attr('api');
            var vf = t.attr('vf');
            console.log(apiUrl)
            $('.stat').empty().append('<span>0</span>/' + allgames.length)

            // alert(1)
            var l = allgames.length;
            var j = 0;

            switch (t.attr('api')) {
                case 'get_game_info':
                    function function_get_game_info(arg) {
                        // body...
                        // alert(1)
                        $.ajax({
                            type: 'GET',
                            // type: $('.api-request-method span.active').attr('method'),
                            url: apiUrl,
                            data: vf + '=' + arg,
                            dataType: 'JSON',
                            contentType: 'application/json',
                            processData: false,
                            cache: false,
                            // async: false,
                            success: function(data, textStatus, request) {
                                if (
                                    data['data']['carriers'].length == 0 || data['data']['face_values'].length == 0 || data['data']['groups'].length == 0
                                ) {
                                    $('.result').append('<li>' + arg + '是有问题的</li>')
                                }
                            },
                            error: function(argument) {
                                // body...
                                $('.result').append('<li>' + arg + '检测失败</li>')
                            },
                            complete: function(argument) {
                                // body...
                                console.log(parseInt(j) + 1)
                                $('.stat span').text(parseInt(j) + 1)
                                j++;
                                function_get_game_info(allgames[j]['gameid']);
                            }
                        })
                    }
                    if (allgames) {

                        function_get_game_info(allgames[j]['gameid']);
                    } else {
                        alert('错误：未获取到游戏数据')
                    }
                case 'get_goods_list':
                    function function_get_goods_list(arg) {
                        // body...
                        // alert(1)
                        $.ajax({
                            type: 'GET',
                            // type: $('.api-request-method span.active').attr('method'),
                            url: apiUrl,
                            data: vf + '=' + arg,
                            dataType: 'JSON',
                            contentType: 'application/json',
                            processData: false,
                            cache: false,
                            // async: false,
                            success: function(data, textStatus, request) {
                                if (
                                    data['data']['total'].length == 0 || data['data']['goods_list'].length == 0
                                ) {
                                    $('.result').append('<li>' + arg + '是有问题的</li>')
                                }
                            },
                            error: function(argument) {
                                // body...
                                $('.result').append('<li>' + arg + '检测失败</li>')
                            },
                            complete: function(argument) {
                                // body...
                                console.log(parseInt(j) + 1)
                                $('.stat span').text(parseInt(j) + 1)
                                j++;
                                function_get_goods_list(allgames[j]['gameid']);
                            }
                        })
                    }
                    if (allgames) {

                        function_get_goods_list(allgames[j]['gameid']);
                    } else {
                        alert('错误：未获取到游戏数据')
                    }
            }



            return false;
        })
    })
})()