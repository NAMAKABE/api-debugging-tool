/* global $ */
/* global Vue */
;
(function () {
    // 载入事件
    var vLoading = new Vue({
        el: '#v-loader',
        data: {
            message: '载入配置文件数据中'
        }
    })
    /* constructListHtml 传入一个 objArray，进行递归遍历，传入incNumber(num)，生成临时Array */
    function constructListHtml(objArray, incNumber, incArray) {
        var objArray = objArray;
        var listHtml = '';
        _.each(objArray, function (element, index) {
            // console.log(_.has(element, 'subpara'), element);
            var inner = '';
            var _index = '';
            var objectArrayText = '';
            if (_.has(element, 'subpara')) {

                if (element['type'] == 'objectArray') {
                    objectArrayText = '<a style="cursor:pointer"> [+]</a>';
                    inner = '<ul><li><span>Object <1></span>' + constructListHtml(element['subpara'], incNumber, incArray) + '</li></ul>';
                } else {
                    inner = constructListHtml(element['subpara'], incNumber, incArray);

                }
                _index = '';

            } else {
                _index = ' index="' + incNumber + '"';
                (incArray.push(element), incNumber++);
            }

            listHtml += '<li' + _index + '><span>' + element['name'] + objectArrayText + '</span>' + inner + '</li>';
        })
        return '<ul class="ui list">' + listHtml + '</ul>';

    }

    // vLoading.message = 'OK';

    /* 载入AJAX */
    var mainList = []; // 分类Array
    var mainListMap = []; // 分类Array
    // var mainListCat = []; // 归类Array

    var mainData = []; // 全局缓存的json对象全局
    var cat, api_name, api_info, parameter_property;

    var incNum = 0; // 索引
    var incArr = [];// 索引数组


    $.ajax({
        url: "json/get.json",
        success: function (data) {
            mainData = data;
            _.each(data, function (element, index) {
                (!_.contains(mainListMap, element.modules)) ? (mainListMap.push(element.modules), mainList.push({
                    "name": element.modules,
                    "children": [{
                        'api_name': element.title,
                        'ori_index': index
                    }]
                })) : mainList[_.indexOf(mainListMap, element.modules)]['children'].push({
                    'api_name': element.title,
                    'ori_index': index
                });
            });
            // console.log(mainList)
            $(vLoading.$el).hide();
            cat = new Vue({
                el: '#cat',
                data: {
                    catList: mainList
                }
            });


            api_name = new Vue({
                el: '#api-name',
                data: {
                    apiname: '',
                    apiurl: ''
                }
            });
            api_info = new Vue({
                el: '#api-info',
                data: {
                    ver: '',
                    contentType: 'application/x-www-form-urlencoded',
                    dataType: 'json',
                    module: '',
                    api: '',
                    get: false,
                    post: false
                }
            });

            parameter_property = new Vue({
                el: '#parameter_property',
                data: {
                    name: '',
                    type: '',
                    desc: '',
                    require: '',
                }
            });
            // 绑定列表点击事件
            $('#parameters').on('click', 'li', function (e) {
                var t = $(this);
                if (t.attr('index') === void 0) {
                    console.warn('[v2.js Warning]: ' + '无效的输入');
                    return false;
                } else {
                    console.log(t.attr('index'));
                    var tempArr = incArr; // 临时Array，copy索引数组
                    var temnpIndex = t.attr('index');
                    parameter_property.name = tempArr[temnpIndex]['name'];
                    parameter_property.type = tempArr[temnpIndex]['type'];
                    parameter_property.desc = tempArr[temnpIndex]['description'];
                    tempArr[temnpIndex]['required'] ? (parameter_property.require = '<strong style="color:#B03060 !important">是</strong>') : '否';

                }
            })
            //api - name
        }
    });
    var b = true;
    var api;
    $('#api .ui.dropdown').dropdown({
        onChange: function (value, text, $selectedItem) {
            // 打开API面板，读取选择的API
            var currentAPI = mainData[value];
            //console.log(currentAPI['title']);

            api_name.apiname = currentAPI['title'] || '未知';
            api_name.apiurl = currentAPI['baseUrl'] + currentAPI['api'];

            api_info.ver = currentAPI['version'] || '未知';
            api_info.ercontentType = currentAPI['ercontentType'] || '未知';
            api_info.dataType = currentAPI['dataType'] || '未知';
            api_info.module = currentAPI['modules'] || '未知';
            api_info.api = currentAPI['api'];

            _.contains(currentAPI['methods'], 'GET') && (api_info.get = true);
            _.contains(currentAPI['methods'], 'POST') && (api_info.post = true);

            // 显示面板
            $('.api-panel').show();

            // 开始解析para
            var currentPara = currentAPI['parameters'] || false;
            if (currentPara) {
                // <ol class="ui list">
                // 遍历para数组
                var listHtml = constructListHtml(currentPara, incNum, incArr);
                leftListComponent.content = listHtml;
                // console.log(listHtml, incNum, incArr);
            }

        }
    });
    $('#cat .ui.dropdown').dropdown({
        onChange: function (value, text, $selectedItem) {
            // custom action
            $('#api .ui.dropdown').dropdown('set text', '选择一个接口')
            $('#api .ui.dropdown').dropdown('restore default text')
            b ? (api = new Vue({
                el: '#api',
                data: {
                    apiList: mainList[value - 1]['children']
                }
            }), b = false) : (api.apiList = mainList[value - 1]['children']);
            // _.once($('#api option')[0].remove());
            // console.log(this)


        }
    });
    var leftListComponent = new Vue({
        el: '#parameters',
        data: {
            content: ''
        }
    })



    // $('li').popup({
    // 	inline: true,
    // 	hoverable: true,
    // 	position: 'bottom left',
    // 	delay: {
    // 		show: 50,
    // 		hide: 50
    // 	}
    // });

    $('.ui.checkbox')
  .checkbox()
    ;
})()