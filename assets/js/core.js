/* API DEBUG TOOLS. Script by Misaka. 2015 */;

function _(argument) {
    console.log(argument);
};
(function (argument) {
    (function (argument) {
        window.APITOOL = window.APITOOL || {};
        // 全局DUBUG模式
        APITOOL.debug = !1;
        // 错误码
        APITOOL.EXTRA = {
            jsonpA: {
                n: 'fuck',
                url: 'http://192.168.188.128:9114/help'
            }
        }
        String.prototype.encodeURIComponentx = function (argument) {
            // body...
            return argument;
        }

        function encodeURIComponentx(argument) {
            return argument;
        };
        /* Array */
        String.prototype.genArray = function (sp, ifEncode) {
            // body...
            if ($.trim(this) == '') {
                return [];
            } else {
                var sp = sp || ',';
                var ifEncode = ifEncode || true;
                var tempArray = this.replace(/[，]/g, ',').split(sp);
                if (ifEncode) {
                    for (x in tempArray) {
                        tempArray[x] = encodeURIComponentx(tempArray[x])
                    }
                }
                return tempArray;
            }
        }


        APITOOL.constant = {
            readyState: function (argument) {
                // body...
                var errorString = 'XMLHttpRequest：';
                switch (argument) {
                    case 0:
                        errorString += '未初始化';
                        break;
                    case 1:
                        errorString += '载入中,正在发送请求';
                        break;
                    case 2:
                        errorString += '载入完成';
                        break;
                    case 3:
                        errorString += '正在解析响应内容';
                        break;
                    case 4:
                        errorString += '响应内容解析完成';
                        break;
                }
                return errorString.toString();
            }
        }

        APITOOL.success = function (data, textStatus, request, activeTypeButton) {
            $('.simple-console').log('Success.');
            // $('.simple-console').log(request.getAllResponseHeaders().replace(/\r\n/g, '<br>'));
            // $('.simple-console').log('status: ' + request.status);
            // $('.simple-console').log('statusText: ' + request.statusText);


            // _(data)
            // _(textStatus)
            // _(request)
            // data = data.replace(/'/g, '"');
            // _($.parseJSON(data.toString()))

            $('.http-response-text code').text(request.getAllResponseHeaders() + 'Status: ' + request.status + '\r\n' + 'StatusText: ' + request.statusText + '\r\n' + 'ReadyState: ' + request.readyState + '\r\n' + 'Method: ' + activeTypeButton.text());
            // alert(request.getResponseHeader('Access-Control-Expose-Headers'))
            $('.response-text code').text(decodeURIComponent(JSON.stringify(data, null, '       ')));
            // alert(JSON.stringify(data, null, '            ').replace(/\r\n/g, '<br>'))

            $('.api-panel code').each(function (i, block) {
                hljs.highlightBlock(block);
            });


            // hljs.initHighlightingOnLoad();
        }



        APITOOL.error = function (request, textStatus, errorThrown, activeTypeButton) {
            // alert('挂彩了。。。。。' + request.responseText + errorThrown)
            $('.simple-console').log('Error.');
            // $('.simple-console').log(request.getAllResponseHeaders().replace(/\r\n/g, '<br>'));
            // $('.simple-console').log('status: ' + request.status);
            // $('.simple-console').log('statusText: ' + request.statusText);
            console.log(request)
            console.log(textStatus)
            console.log(errorThrown)



            if (request.responseText) {
                if (request.responseText.indexOf('<html><head>') != -1) {
                    $('.response-text code').text(JSON.stringify(eval('(' + (request.responseText || 'null') + ')'), null, '       '));
                    $('.http-response-text code').text(request.getAllResponseHeaders() + 'Status: ' + request.status + '\r\n' + 'StatusText: ' + request.statusText + '\r\n' + 'ReadyState: ' + request.readyState + '\r\n' + 'Method: ' + activeTypeButton.text());
                } else {
                    $('.response-text code').text(request.status);
                }
                // _(2)
                $('.api-panel code').each(function (i, block) {
                    hljs.highlightBlock(block);
                });
            }

            // $('.response-text').text(JSON.stringify(request.responseText, null, '            '));
            // $('.simple-console').log('ErrorThrown: ' + errorThrown);
            // _(request.responseText)
        }
        APITOOL.closeCV = function (argument) {
            // body...
            $('#my-pop').modal('close');
            APITOOL.notAtt = argument;
        }
        APITOOL.notAtt = 0;
        APITOOL.checkversion = function (argument) {
            // body...
            var versionUrl = 'json/checkversion.json';
            $.ajax({
                url: versionUrl,
                dataType: 'JSON',
                contentType: 'text/html',
                success: function (data, textStatus, request) {
                    // 判断是否更新
                    var userVersion = $('body').attr('version');
                    if (userVersion) {
                        var currentVersion = data['currentver'];
                        // alert(1)
                        if (parseInt(currentVersion) > parseInt(userVersion)) {
                            // $('body').append('')
                            var detailSpan = '';

                            if (data['upd_details'].length == 0) {
                                detailSpan = '<span>无</span>';
                            } else {
                                for (o in data['upd_details']) {
                                    detailSpan += '<span>' + (parseInt(o) + 1) + '. ' + data['upd_details'][o] + '</span>'
                                }
                            }

                            if (data['req'] == 1) {
                                // 强制更新
                                $('#upd-type-text').html('强制更新');
                                $('#upd-detail-text').html(detailSpan);
                                $('#my-pop').prev().remove();
                                $('#my-pop').modal({
                                    closeViaDimmer: false
                                });
                            } else if (APITOOL.notAtt != parseInt(currentVersion)) {
                                // 不强制更新
                                $('#upd-type-text').html('可选更新');
                                $('#upd-detail-text').html(detailSpan);
                                $('.opt-area-p').append('<button type="button" class="lb-btn lb-btn-default" onclick="APITOOL.closeCV(' + parseInt(currentVersion) + ')">本次更新不再提醒</button>')
                                $('#my-pop').modal({
                                    closeViaDimmer: true
                                });
                            }
                        }
                    }

                }
            })
        }
        APITOOL.init = function (argument) {
            // public $.fn
            $.fn.extend({
                switch: function (className) {
                    var a = $(this);
                    var className = className || 'active';
                    a.on('click', function () {
                        $(this).addClass(className).siblings().removeClass(className);
                    });
                },
                log: function (argument) {
                    if (argument) {
                        $(this).append('<p>' + argument + '</p>');
                    } else {
                        return $(this);
                    }

                },
                logXHR: function (request) {
                    // body...
                    var t = $(this);
                    if (argument) {


                        var xhrs = ['Content-Type'];
                        var a;
                        for (i in xhrs) {
                            t.append('<p>' + request.getResponseHeader(xhrs[i]) + '</p>');
                            // status
                        }
                    } else {
                        return $(this);
                    }
                }
            });

            ////////////////////////////////////////////////////////////////////////////////////////////////////


            // $.ajax({
            //     type: 'POST',
            //     // type: $('.api-request-method span.active').attr('method'),
            //     url: '',
            //     data: {
            //         sfdv: '123123'
            //     },
            //     jsonp: 'jsonp',
            //     beforeSend: function(req) {
            //         req.setRequestHeader("Accept", "application/json");
            //     },
            //     // headers: {
            //     //     "X-Requested-Accept": 'application/json'
            //     // },
            //     headers: {
            //         "X-Requested-Accept": 'application/json',
            //         "X-Service-App": 12312,
            //         "X-Service-Timestamp": 123,
            //         "X-Service-Token": 13123
            //     },
            //     // contentType: 'application/x-www-form-urlencoded',
            //     processData: true,
            //     cache: false,
            //     success: function(argument) {
            //         // body...
            //         console.log(argument);
            //     },
            //     error: function(argument) {
            //         // body...
            //         console.log(argument);
            //     }
            // })

            $('.loading-log').log('Connecting API Server ...');

            // var apiListUrl = 'http://192.168.12.242:8080/ApiTest/apis/random';
            var apiListUrl = '../ApiDebugging/json/get.json';
            var leftList = [];
            var leftListTitle = [];
            var listMap = new Object();

            var callback = function (data, appendAraay) {

                // success回调 注意JSON格式不要错了否则……
                $('.viewc').show();
                $('.loading-log').remove();
                listMap = data;


                if (appendAraay) {
                    // console.log(appendAraay);
                    var appendAraayL = appendAraay.length;
                    for (var m = 0; m < appendAraayL; m++) {
                        var appendAraayDataL = appendAraay[m].length
                        for (var n = 0; n < appendAraayDataL; n++) {
                            listMap.push(appendAraay[m][n]);
                        }

                    }
                }
                // console.log(listMap)

                $.each(listMap, function (i, field) {
                    var index = i;
                    var PStatus = true;
                    for (i = 0; i < leftListTitle.length; i++) {
                        if (leftListTitle[i] == field['modules']) {
                            PStatus = false;

                            for (i = 0; i < leftList.length; i++) {

                                if (leftList[i]['title'] == field['modules']) {
                                    leftList[i]['content'] += '<li md="' + index + '">' + field['title'] + '</li>';
                                    break;
                                }
                            }
                            break;

                        }
                    }
                    if (PStatus) {
                        // 新增一个大分类
                        leftList.push({
                            'title': field['modules'],
                            'content': '<li md="' + index + '">' + field['title'] + '</li>',
                            'active': false
                        })
                        leftListTitle.push(field['modules']);
                        // _(leftList)
                    }
                });

                // 构建列表，模板
                var $tpl = $('#my-tpl'),
                    tpl = $tpl.text(),
                    template = Handlebars.compile(tpl),
                    data = {
                        accordionData: {
                            "theme": "gapped",
                            "content": leftList
                        }
                    },
                    html = template(data);

                $tpl.before(html);

                // _(leftList)
                $.each(['accordion'], function (i, m) {
                    var module = $.AMUI[m];
                    module && module.init && module.init();
                });
                // 点击
                $('.lb-accordion').on('click', function (event) {
                    // APITOOL.checkversion();
                    // 判定是否是有效的API
                    if (event.target.nodeName != 'LI') {
                        // 滚
                    } else {
                        $('.api-panel').show();
                        var target = $(event.target); // 目标
                        var currentApiObj = listMap[target.attr('md')] // 当前API的对象

                        // 注意这边！！！！！！！！！！！！！！！！！！！！！！！！！！！
                        // 这边根据工具的地址自适应重定向了
                        // 会忽视配置中的baseUrl
                        // var currentUrl = location.origin + '/api' + currentApiObj['api'] // api地址
                        var currentUrl = currentApiObj['baseUrl'] + currentApiObj['api'] // api地址
                        var trueURL = currentUrl;

                        // 判定是否進行代理


                        ClearRight();
                        // _(data)
                        $('.api-name span').text(currentApiObj['title']);
                        $('.api-url a').html('<a href="' + trueURL + '" target="_blank">' + trueURL + '</a>');
                        $('.api-ver span').text(currentApiObj['version']);
                        $('.desc-sub').text(currentApiObj['description']);

                        // 需要改进
                        for (i in currentApiObj['methods']) {
                            var ifActive;
                            if (i == 0) {
                                ifActive = ' active';
                            } else {
                                ifActive = '';
                            }
                            // i = 0 ? ifActive = ' active' : ifActive = '';
                            $('.api-request-method').append('<span method="' + currentApiObj['methods'][i] + '" class="lb-badge lb-badge-secondary lb-text-default' + ifActive + '">' + currentApiObj['methods'][i] + '</span>');

                        }


                        // 显示参数
                        var parameters = currentApiObj['parameters']; // 参数对象

                        // console.log(DATAtype);
                        for (x in parameters) {


                            var prarLength = parameters[x].subpara || 1; // 对象个数 0=普通 >0 为对象
                            if (prarLength == 1) {
                                var options = parameters[x]['options'];
                                var optionsContents = '';

                                for (y in options) {
                                    y == 0 && (optionsContents = '参考值：');
                                    optionsContents += '<a opt="121">' + options[y] + '</a>';
                                    // _(options)
                                }
                                $('.api-panel-forum').append('<div class="lb-form-group">' +
                                    '<label for="doc-ipt-3" class="lb-u-sm-2 lb-form-label ' + (parameters[x]['required'] ?
                                        'req' : '') + '">' + parameters[x]['name'] + '</label>' +
                                    '<div class="lb-u-sm-10">' +
                                    '<i class="data-type">' + parameters[x]['type'] + '</i>' +
                                    '<input type="text" id="doc-ipt-3" class="input-box" placeholder="" value="' + parameters[x]['defaults'] + '">' +
                                    '<div class="options-text">' + optionsContents + '</div>' +
                                    '<div class="desc-text">' + (parameters[x]['description'] || '没有描述...跟着感觉走吧') + '</div>' +
                                    '</div>' +
                                    '</div>');
                            } else {

                                $('.api-panel-forum').append('<div class="lb-form-group">' +
                                    '<label for="doc-ipt-3" class="lb-u-sm-2 lb-form-label ' + (parameters[x]['required'] ?
                                        'req' : '') + '">' + parameters[x]['name'] + '</label>' +
                                    '<div class="lb-u-sm-10" style="padding:0"></div></div>');
                                // console.log()
                                var loopNum = parameters[x]['num'] || 1;
                                for (var v = 0; v < loopNum; v++) {

                                    // v > 0 && $('.api-panel-forum>.lb-form-group:last>.lb-u-sm-10').append('<div style="">一个组</div>');
                                    for (z in parameters[x]['subpara']) {
                                        var options = parameters[x]['subpara'][z]['options'];
                                        var optionsContents = '';

                                        for (y in options) {
                                            y == 0 && (optionsContents = '参考值：');
                                            optionsContents += '<a opt="121">' + options[y] + '</a>';
                                            // _(options)
                                        };

                                        // 允许有多个的情况

                                        // for(var z in ){

                                        // }

                                        $('.api-panel-forum>.lb-form-group:last>.lb-u-sm-10').append('<div class="lb-form-group">' +
                                            '<label for="doc-ipt-3" class="lb-u-sm-2 lb-form-label ' + (parameters[x]['subpara'][z]['required'] ?
                                                'req' : '') + '">' + parameters[x]['subpara'][z]['name'] + '</label>' +
                                            '<div class="lb-u-sm-10">' +
                                            '<i class="data-type">' + parameters[x]['subpara'][z]['type'] + '</i>' +
                                            '<input type="text" id="doc-ipt-3" class="input-box" placeholder="" value="' + parameters[x]['subpara'][z]['defaults'] + '">' +
                                            '<div class="options-text">' + optionsContents + '</div>' +
                                            '<div class="desc-text">' + (parameters[x]['subpara'][z]['description'] || '没有描述...跟着感觉走吧') + '</div>' +
                                            '</div>' +
                                            '</div>');

                                    }


                                    // 每一个包一个
                                    $('.api-panel-forum>.lb-form-group:last>.lb-u-sm-10>.lb-form-group').wrapAll('<div style="background:#eee;padding:10px 0; margin:10px 0;" />')
                                }
                            }


                            // ==============================
                        }


                        _LOADAPI();
                        // 请求

                        $('.api-submit-btn').off('click').on('click', function (argument) {



                            // body...
                            // APITOOL.checkversion();
                            var requestPartString = '';
                            // 判定type
                            var activeTypeButton = $('.api-request-method span.active');
                            // false 走代理
                            var DATAtype = ((currentApiObj['jsonp'] && activeTypeButton.text() == 'GET') ? currentApiObj['jsonp'] : false) || false;
                            var t = $(this);
                            var _currentUrl = trueURL;

                            var isProxy = false;

                            if ($('#proxy-options').val() != 0) {
                                isProxy = true;
                            }

                            (isProxy && !DATAtype) ? (currentUrl = location.href + 'utils/') : trueURL;
                            var requestPart;
                            var requestPart_origin = '';
                            // var userInput =
                            if (activeTypeButton.text() == 'GET') {
                                _currentUrl += '?';
                                requestPart = '';
                                for (x in parameters) {
                                    $('.lb-form-group').eq(x).find('input').val() != '' && (requestPart += parameters[x]['name'] + '=' + (parameters[x]['type'] == 'array' ? ($('.lb-form-group').eq(x).find('input').val().genArray()) : (encodeURIComponent($('.lb-form-group').eq(x).find('input').val()))) + '&');
                                }
                                // requestPart_origin = requestPart;


                                // requestPartString = requestPart = requestPart.substring(0, requestPart.length - 1);
                                // _('=========' + requestPartString)
                                requestPart = requestPartString = requestPart.replace(/(.*)&/, '$1')

                                _currentUrl += requestPart;

                                // console.log(_currentUrl)

                            } else if (activeTypeButton.text() == 'POST') {
                                requestPart = new Object();
                                for (x in parameters) {
                                    // requestPart += parameters[x]['name'] + '=' + encodeURIComponent($('.lb-form-group').eq(x).find('input').val()) + '&';
                                    // 依旧是判断含有N多个对象
                                    var prarLength = parameters[x]['subpara'] || 1;
                                    if (prarLength == 1) {
                                        $('.lb-form-group').eq(x).find('input').val() != '' && (requestPart["" + parameters[x]['name'] + ""] = (parameters[x]['type'] == 'array' ? ($('.lb-form-group').eq(x).find('input').val().genArray()) : (encodeURIComponentx($('.lb-form-group').eq(x).find('input').val()))));
                                    } else {

                                        // 获取个数
                                        var loopNum = parameters[x]['num'] || 1;

                                        if (loopNum == 1) {
                                            // console.log(requestPart);
                                            requestPart["" + parameters[x]['name'] + ""] = new Object();
                                            // console.log(requestPart);

                                            for (y in parameters[x]['subpara']) {

                                                if ($('form.api-panel-forum>.lb-form-group').eq(x).find('.lb-u-sm-10').children('div').children('.lb-form-group').eq(y).find('input').val()) {
                                                    // __LENGTH = true;

                                                    (requestPart["" + parameters[x]['name'] + ""]["" + parameters[x]['subpara'][y]['name'] + ""] = (parameters[x]['subpara'][y]['type'] == 'array' ? ($('form.api-panel-forum>.lb-form-group').eq(x).find('.lb-u-sm-10').children('div').children('.lb-form-group').eq(y).find('input').val()) : (encodeURIComponentx($('form.api-panel-forum>.lb-form-group').eq(x).find('.lb-u-sm-10').children('div').children('.lb-form-group').eq(y).find('input').val()))))

                                                }

                                            }
                                            (Object.keys(requestPart["" + parameters[x]['name'] + ""]) == 0) && (delete requestPart["" + parameters[x]['name'] + ""]);
                                        } else {
                                            requestPart["" + parameters[x]['name'] + ""] = new Array();
                                            var requestPartTempArray = new Array();


                                            for (var j = 0; j < loopNum; j++) {
                                                // requestPart["" + parameters[x]['name'] + ""][j]
                                                // 新的数组对象
                                                // requestPartTempArray[j] = new Object();
                                                requestPartTempArray[j] = new Object();
                                                // var _LENGTH = parameters[x]['subpara'].length;
                                                var __LENGTH = false;
                                                // var
                                                for (y in parameters[x]['subpara']) {

                                                    if ($('form.api-panel-forum>.lb-form-group').eq(x).find('.lb-u-sm-10').children('div').eq(j).children('.lb-form-group').eq(y).find('input').val()) {
                                                        __LENGTH = true;

                                                        (requestPartTempArray[j]["" + parameters[x]['subpara'][y]['name'] + ""] = (parameters[x]['subpara'][y]['type'] == 'array' ? ($('form.api-panel-forum>.lb-form-group').eq(x).find('.lb-u-sm-10').children('div').eq(j).children('.lb-form-group').eq(y).find('input').val()) : (encodeURIComponentx($('form.api-panel-forum>.lb-form-group').eq(x).find('.lb-u-sm-10').children('div').eq(j).children('.lb-form-group').eq(y).find('input').val()))))

                                                    }

                                                }
                                                if (!__LENGTH) {
                                                    // requestPart["" + parameters[x]['name'] + ""].splice(j, 1);
                                                    //delete requestPartTempArray[j]

                                                    //requestPartTempArray = requestPartTempArray.splice(j, 1);
                                                }
                                            }



                                            // 移除空元素

                                            // console.log(requestPartTempArray)
                                            for (var p in requestPartTempArray) {

                                                if (Object.keys(requestPartTempArray[p]) != 0) {
                                                    requestPart["" + parameters[x]['name'] + ""].push(requestPartTempArray[p]);
                                                }
                                                //requestPart["" + parameters[x]['name'] + ""][p] = requestPartTempArray[p];
                                            }
                                            // console.log(requestPart["" + parameters[x]['name'] + ""])
                                        }


                                    }

                                }

                                // # tag Proxy 備份

                                //if (parameters[x]['type'] == 'objectArray') {
                                //    requestPart = [requestPart];
                                //}
                                requestPartString = JSON.stringify(requestPart)
                            }


                            // _('请求开屎-------------------------------------------')
                            // _('类型：' + typeof(requestPartString))
                            //     // requestPartString = requestPartString.toString()+"12123";
                            // _(requestPartString)
                            // _('---------------------------------------------------')

                            // _('{}')
                            // alert()
                            // _(currentUrl);
                            // huoqucanshu


                            // var URLcontents = $.load(currentUrl)

                            var URLstatusText = '';
                            // console.log(activeTypeButton.text())

                            // 安全校验
                            // var XServiceTimestamp = Math.round(new Date().getTime() / 1000);
                            var XServiceTimestamp = Math.round(new Date().getTime());

                            var XServiceApp = $.trim($('#X-Service-App').val());
                            var XServiceKey = $.trim($('#X-Service-Key').val());
                            // console.log(XServiceApp, XServiceKey);
                            // $.ajax({
                            //     type: activeTypeButton.text(),
                            //     url: currentUrl,
                            //     async: false,
                            //     beforeSend: function(req) {
                            //         req.setRequestHeader("Accept", "application/json");
                            //     },
                            //     headers: {
                            //         "X-Requested-Accept": 'application/json',
                            //         "X-Service-App": XServiceApp,
                            //         "X-Service-Timestamp": XServiceTimestamp,
                            //         "X-Service-Token": $.md5(XServiceApp + '\n' + XServiceKey + '\n' + XServiceTimestamp)
                            //     },

                            //     complete: function(a, b, c) {
                            //         URLstatusText = b;
                            //         // console.log(b)
                            //     }
                            // });
                            // console.log((XServiceApp + '\n' + XServiceKey + '\n' + XServiceTimestamp));
                            // _(URLcontents)

                            // 判定方法
                            if (activeTypeButton.length == 1) {
                                // console.log
                                // api-panel
                                $('.api-panel code').show();
                                if (activeTypeButton.text() == 'GET') {
                                    $('.request-url-text code').text(decodeURIComponent(_currentUrl));
                                    if (isProxy && !DATAtype) {
                                        requestPart += '&url=' + $('#proxy-options').val() + currentApiObj['api'];
                                    }
                                } else {
                                    $('.request-url-text code').text(encodeURIComponentx(JSON.stringify(requestPart, null, '       ')));
                                    if (isProxy && !DATAtype) {
                                        requestPart['url'] = $('#proxy-options').val() + currentApiObj['api'];
                                        // requestPart += 'url=' + $('#proxy-options').val() + currentApiObj['api'] + '&';
                                    }
                                }
                                $('.simple-console').log('请求发送中...');
                                // _()



                                ////////


                                if (URLstatusText == 'error') {
                                    $('.simple-console').log('Error.');
                                    // $('.response-text code').text(JSON.stringify(eval('(' + (request.responseText || 'null') + ')'), null, '       '));
                                    $('.response-text code').text(URLstatusText);
                                    $('.api-panel code').each(function (i, block) {
                                        hljs.highlightBlock(block);
                                    });
                                } else {
                                    // console.log(activeTypeButton.text())
                                    // var XServiceTimestamp = Math.round(new Date().getTime() / 1000);
                                    var XServiceTimestamp = Math.round(new Date().getTime());
                                    var XServiceApp = $.trim($('#X-Service-App').val());
                                    var XServiceKey = $.trim($('#X-Service-Key').val());
                                    // console.log(XServiceApp, XServiceKey);


                                    if (!DATAtype) {

                                        $.ajax({
                                            type: activeTypeButton.text(),
                                            // type: $('.api-request-method span.active').attr('method'),
                                            url: currentUrl,
                                            data: isProxy ? requestPart : requestPartString,
                                            // DATAtype
                                            // dataType: 'JSON',
                                            dataType: 'JSON',
                                            beforeSend: function (req) {
                                                req.setRequestHeader("Accept", "application/json");
                                            },
                                            headers: {
                                                "X-Requested-Accept": 'application/json'
                                            },
                                            headers: {
                                                "X-Requested-Accept": 'application/json',
                                                "X-Service-App": XServiceApp,
                                                "X-Service-Timestamp": XServiceTimestamp,
                                                "X-Service-Token": $.md5(XServiceApp + '\n' + XServiceKey + '\n' + XServiceTimestamp)
                                            },
                                            contentType: 'application/json',
                                            processData: isProxy ? false : false,
                                            cache: false,
                                            success: function (data, textStatus, request) {
                                                APITOOL.success(data, textStatus, request, activeTypeButton);
                                            },
                                            error: function (request, textStatus, errorThrown) {
                                                APITOOL.error(request, textStatus, errorThrown, activeTypeButton)
                                            }
                                        });


                                    } else {
                                        $.ajax({
                                            type: activeTypeButton.text(),
                                            // type: $('.api-request-method span.active').attr('method'),
                                            url: currentUrl,
                                            data: isProxy ? requestPart : requestPartString,
                                            // DATAtype
                                            // dataType: 'JSON',
                                            jsonp: 'jsonp',
                                            dataType: (DATAtype ? DATAtype : 'JSON'),
                                            beforeSend: function (req) {
                                                req.setRequestHeader("Accept", "application/json");
                                            },
                                            headers: {
                                                "X-Requested-Accept": 'application/json'
                                            },
                                            headers: {
                                                "X-Requested-Accept": 'application/json',
                                                "X-Service-App": XServiceApp,
                                                "X-Service-Timestamp": XServiceTimestamp,
                                                "X-Service-Token": $.md5(XServiceApp + '\n' + XServiceKey + '\n' + XServiceTimestamp)
                                            },
                                            contentType: 'application/json',
                                            processData: isProxy ? false : false,
                                            cache: false,
                                            success: function (data, textStatus, request) {
                                                APITOOL.success(data, textStatus, request, activeTypeButton);
                                            },
                                            error: function (request, textStatus, errorThrown) {
                                                APITOOL.error(request, textStatus, errorThrown, activeTypeButton)
                                            }
                                        });
                                    }
                                    // proxy-options
                                    // console.log(requestPart);

                                }


                                // switch ($('.api-request-method span.active').attr('method')) {
                                //     case 'GET':
                                //         // $.getJSON(_currentUrl, function(data, status, xhr) {
                                //         //     t.text('发送请求');
                                //         //     // console.log(data)
                                //         //     $('.response-text').text(JSON.stringify(data));
                                //         // }).error(function(data, status, e) {
                                //         //     alert('挂彩了。。。。。')
                                //         // }).complete(function(data, status, xhr) {
                                //         //     // body...
                                //         //     // console.log(_currentUrl);
                                //         //     // _(response.getResponseHeader('Content-Encoding'))

                                //         // }).success(function(data, status, xhr) {
                                //         //     // body...
                                //         //     _(data, status, xhr)
                                //         // })
                                //         break;
                                //     case 'POST':
                                //         ///

                                //         break;
                                // }
                            } else {
                                alert('醉了。。。')
                            }
                            return !1;
                        })

                        // _(currentUrl)
                    }

                })
            }
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////
            $.getJSON(apiListUrl, function (argument) {
                // body...
                var realUrl = APITOOL.EXTRA.jsonpA.url + '?jsonp=' + APITOOL.EXTRA.jsonpA.n;

                $.ajax({
                    url: realUrl,
                    dataType: "jsonp",
                    jsonpCallback: 'fuck',
                    // jsonp: APITOOL.EXTRA.jsonpA.n,
                    success: function (jsonpCBData) {
                        // $.each(data, function(i, v) {

                        // });
                        var _data = jsonpCBData.data;
                        callback(argument, [_data]);
                    }
                });

            }).error(function (data, status, e) {
                // body...
                $('.loading-log').log('Error：' + APITOOL.constant.readyState(data.readyState));
                console.log(APITOOL.constant.readyState(data.readyState))
            })

            // 获取



            // 载入一个API时的事件
            function _LOADAPI(argument) {
                // 请求方法的事件
                $('.api-request-method span').switch('active');
                // alert(21)
                $('.options-text a').on('click', function () {
                    // APITOOL.checkversion();
                    // body...
                    var t = $(this);
                    var text = t.text();
                    // alert(text)
                    t.parent().siblings().val(text);

                });
                // $('.api-request-method span').on('click',function(argument) {
                //   // body...
                //   console.log($(this))
                // })
            }

            function ClearRight(argument) {
                $('.api-name span').empty();
                $('.api-url a').empty();
                $('.api-ver span').empty();
                $('.desc-sub').empty();
                $('.api-request-method span:gt(0)').remove();
                $('.api-panel-forum').empty();
                $('.api-panel code').empty().hide();

                // api-ver
            }
            _LOADAPI();
        }
        APITOOL.console = {
            initBottom: parseInt($('body').css('padding-bottom')),
            init: function (height) {
                // 初始化控制台
                // 记录BODY初始值
                this.height = height || 200;
                $('.simple-console').remove();
                $('body').css('padding-bottom', (parseInt($('body').css('padding-bottom')) + (height || 200)));
                $('body').append('<div class="simple-console" setheight="' + (height || 200) + '" style="background:#fff;overflow-y:scroll;width:100%;height:' + (height || 200) + 'px;border-top:1px solid #000;position:fixed;bottom:0;left:0;"></div>');
            },
            toggle: function () {
                // body...
                var console = $('.simple-console');
                // console.length < 1 && return !1;
                var setHeight = $('.simple-console').attr('setheight');
                if (console.is(":hidden")) {
                    // 隐藏的
                    $('.simple-console').show();
                    $('body').css('padding-bottom', (parseInt(APITOOL.console.initBottom + (this.height)))).scrollTop(9999999)
                } else {
                    $('.simple-console').hide();
                    $('body').css('padding-bottom', APITOOL.console.initBottom);
                }
            }
        }
        APITOOL.reset = function (argument) {
            // body...
            // alert(0);
            $('.api-panel-forum')[0].reset();
            $('.simple-console').log('Reset.');
        }
        APITOOL.dataFilter = {
            init: 0
        }
    })();


    $(function () {
        if (!('WebkitAppearance' in document.documentElement.style)) {
            $('.chrome,script').remove();
            return false;
        }
        APITOOL.init();
        APITOOL.console.init(200);
        APITOOL.console.toggle();
        $('.api-console-btn').on('click', function (argument) {
            // body...
            // APITOOL.checkversion();
            APITOOL.console.toggle();
        })

        $('.api-reset-btn').on('click', function (argument) {
            // body...
            // APITOOL.checkversion();
            APITOOL.reset();
        })

        // APITOOL.checkversion();

        function _AJUST(argument) {
            // body...
            var size = $(window).width();
            var containerPaddingRight = $('.lb-container').css('padding-right');
            var optPaddingRight = $('.opt-area').css('right');
            if (size <= 1280) {
                // $('.opt-area').css('right')
                // _(containerPaddingRight)
                $('.opt-area').css('right', containerPaddingRight)
            } else {
                $('.opt-area').css('right', (size - 1280) / 2 + parseInt(containerPaddingRight) + 'px')
            }
        }
        _AJUST();
        $(window).on('resize', function (argument) {
            _AJUST();
        })


        // var testObj = {
        //     "game_id": "A1558"
        // };
        // _(testObj)
        // $.ajax({
        //     type: 'POST',
        //     url: 'http://192.168.70.121/api/get_goods_list',
        //     data: testObj,
        //     contentType: 'application/json',
        //     success: function(argument, argument2, argument3) {
        //         // body...
        //         _(argument)
        //         _(argument2)
        //         _(argument3)
        //     }
        // })



        // 、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、
        $('.api-data-filter').on('click', function (argument) {
            // body...

            // if (APITOOL.dataFilter.init == 0) {
            //     var t = $(this);
            //     t.text('载入测试数据...')

            //     // var extraResource = new Image();
            //     // extraResource.onload = function(argument) {
            //     //     // body...
            //     //     alert(1)
            //     //     console.log(1)
            //     // }
            //     // extraResource.src = 'json/game_base_info.js';

            //     var url = 'json/game_base_info.js';
            //     extraResource = document.createElement('object');
            //     extraResource.setAttribute('data', url);

            //     document.body.appendChild(extraResource);
            //     extraResource.onload = function() {
            //         // 载入完毕
            //         APITOOL.dataFilter.init = 1;
            //         t.text('数据筛选');
            //         $('head').append("<script src='" + url + "'><\/script>");

            //     };


            // } else {
            //     console.log(allgames)
            // }

            // $('#data-filter-pop').modal({
            //     closeViaDimmer: true
            // });
            // for (i in allgames[0]) {

            // }
            // return false;
            // location.href = "filter.html";
            // alert('这个功能正在开发中');
            location.href = 'edit.php';
            return !1;
        })

        var $modal = $('#proxy-list-edit');


        var editList = '';
        $('#a-adit-list').on('click', function () {
            //
            var list = '';
            var option = $('#proxy-options option');
            var L = option.length;
            for (var g = 1; g < L; g++) {
                list += option[g].value + (g == L - 1 ? '' : '\r\n');
            }
            // console.log(list);
            $modal.find('textarea').html(list);
            $modal.modal({
                closeViaDimmer: true,
                width: 400
            });
            return false;
        })



        $modal.find('button').on('click', function () {


            editList = $modal.find('textarea').val();

            editList = editList.replace(/(^\s*)|(\s*$)/g, "");
            // console.log(editList);
            $.ajax({
                type: 'POST',
                url: 'utils/editProxyList.php',
                data: {
                    word: editList
                },
                success: function (a, b) {
                    var content = '<option value="0">禁用，不代理</option>';
                    var c = a.split('#0#0#');
                    var cL = c.length;
                    for (var i = 0; i < cL; i++) {
                        content += '<option value="' + c[i] + '">' + c[i] + '</option>'
                    }
                    $('#proxy-options').html(content);
                    $modal.modal('toggle');
                }
            })
            return false;
        })
    });
    // hljs.initHighlightingOnLoad();
})();