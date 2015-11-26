[TOC]

### API Debugging Tools for Team

团队用API测试工具，旨在提升测试效率，可配置的API Options

#### 接口配置

所有的接口配置需要预先定义在`get.json`中，格式为
```javascript
[{
    "title": "接口名称",
    "version": "v587",
    "modules": "模块，这里决定了接口工具如何分类",
    "description": "",
    "baseUrl": "http://192.168.70.121/api",
    "api": "/ping",
    "contentType": "application/x-www-form-urlencoded",
    "dataType": "json",
    "methods": [
      "GET",
      "POST"
    ],
    "parameters": [
      {
        "name": "game_id",
        "type": "string",
        "description": "参数描述",
        "required": true,
        "defaults": "",
        "validator": "",
        "options": [ ]
      }
    ]
}]
```
该json为一个`Array`，每一个接口的配置为其一个元素
#### 子参数

如果一个接口具有子参数，则配置中增加一条`subpara`即可
```javascript
"subpara": [
          {
            "name": "face_value_title",
            "type": "string",
            "description": "",
            "required": false,
            "defaults": "",
            "validator": "",
            "options": [ ]
          }
]
```
### 版本

测试工具默认的版本功能十分有限，诸如子参数最多嵌套到2级，不可向下扩展，不可为对象数组自定义个数等，为此v2版本正在开发中，参见`v2.html`

### 用到的框架
[amazeui](https://github.com/amazeui/amazeui "amazeui")
[Semantic-UI](https://github.com/Semantic-Org/Semantic-UI "Semantic-UI")

**待续**