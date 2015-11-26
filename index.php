<!doctype html>
<html class="no-js">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="description" content="">
		<meta name="keywords" content="">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
		<title>API Debugging Tools - LBUI</title>
		<meta name="renderer" content="webkit">
		<meta http-equiv="Cache-Control" content="no-siteapp"/>
		<meta name="msapplication-TileColor" content="#0e90d2">
		<link rel="stylesheet" href="assets/css/liebaoui.min.css">
		<link rel="stylesheet" href="assets/css/monokai.css">
		<link rel="stylesheet" href="assets/css/core.css">
		<link rel="stylesheet" href="assets/css/fuck.css">
	</head>
	<body version="1027">
		<div class="chrome">
			<div class="lb-container">
				<h1>API Debugging Tools for Team</h1>
				<div class="loading-log"></div>
				<div class="api-debug-wrap lb-cf viewc">
					<!-- LEFT MENU -->
					<div class="lb-left">
						<script type="text/x-handlebars-template" id="my-tpl">
						{{>accordion accordionData}}
						</script>
						<div class="lb-panel lb-panel-default help">
							<div class="lb-panel-hd">Server Proxy</div>
							<div class="lb-panel-bd">
								<p><b>免工具进行跨域访问任意Api</b></p>
								<p><b>选择目标地址</b><a href="" id="a-adit-list">编辑</a></p>
								<select id="proxy-options" style="max-width:100%;overflow:hidden;">
									<option value="0">禁用，不代理</option>
									<?php
echo xcache_get('proxy_list');
foreach (explode("\n", xcache_get('proxy_list')) as $key => $value) {
	# code...
	echo '<option value="' . $value . '">' . $value . '</option>';
}
?>
								</select>
								<code>实验性功能，如有问题请优先使用Fiddler</code>
								<code>注意！该功能实际上发送请求的源是70.121服务器，注意鉴权问题。</code>
							</div>
						</div>
						<div class="lb-panel lb-panel-default">
							<div class="lb-panel-hd">当前配置</div>
							<div class="lb-panel-bd">
								<p>Fiddler AutoResponder Rule</p>
								<p>Case 1</p>
								<code>regex:^http://192\.168\.70\.121/api/(.*)$</code>
								<code>http://192.168.70.126:9114/api/$1</code>
								<p>Case 2</p>
								<code>regex:^http://192\.168\.70\.121/order/(.*)$</code>
								<code>http://121.207.251.149:10005/order/$1</code>
							</div>
						</div>
						<div class="lb-panel lb-panel-default">
							<div class="lb-panel-hd">Request 相关</div>
							<div class="lb-panel-bd">
								<p></p>
								<code>X-Service-App: <input type="text" id="X-Service-App" value="test17173"></code>
								<code>X-Service-Key: <input type="text" id="X-Service-Key" value="test17173"></code>
								<code>数据类型: String(GET) / JSON.stringify(POST)</code>
								<code>dataType: JSON</code>
								<code>contentType: application/json</code>
							</div>
						</div>
						<div class="lb-panel lb-panel-default help">
							<div class="lb-panel-hd">帮助</div>
							<div class="lb-panel-bd">
								<p>
									<b>获取Fiddler？</b>
									<a target="_blank" href="/tools/dev/fiddler/">下载地址</a>
								</p>
								<p>
									<b>Fiddler AutoResponder不生效？</b>
									请检查是否启用了非系统代理的其他代理工具，如SwichyOmega
								</p>
								<p>
									<b>API返回结果是200？</b>
									请检查返回的格式正不正确什么回车少引号什么的……
								</p>
								<p>
									<b>需要提交一个空的value？</b>
									工具默认检测到value为空时不传送该key，如有特殊需要，请填写空格
								</p>
								<p>
									<b>一些用得到的玩意</b>
									<a target="_blank" href="/tools/common/chrome/">Chrome(46.0.2490.86)</a><br>
									<a target="_blank" href="/tools/common/chrome/extensions">SwitchyOmega</a>
								</p>
							</div>
						</div>
					</div>
					<div class="api-panel">
						<ul class="api-panel-list lb-list lb-list-static">
							<li class="api-name">接口描名称：<span></span></li>
							<li class="api-url">接口地址：<a href="" target="_blank"></a></li>
							<li class="api-ver">版本：<span></span></li>
							<li class="lb-cf desc">
								<span>描述：</span>
								<p class="desc-sub"></p>
							</li>
							<li class="api-request-method">
								<span>请求方法：</span>
								<span class="lb-badge lb-badge-secondary lb-text-default active">GET</span>
								<span class="lb-badge lb-badge-secondary lb-text-default">POST</span>
							</li>
						</ul>
						<form class="api-panel-forum lb-form lb-cf lb-form-horizontal">
							<div class="lb-form-group">
								<label for="doc-ipt-3" class="lb-u-sm-2 lb-form-label req">name</label>
								<div class="lb-u-sm-10">
									<input type="text" id="doc-ipt-3" placeholder="" value="默认值1">
								</div>
							</div>
							<div class="lb-form-group">
								<label for="doc-ipt-3" class="lb-u-sm-2 lb-form-label">sex</label>
								<div class="lb-u-sm-10">
									<input type="text" id="doc-ipt-3" placeholder="" value="默认值1">
								</div>
							</div>
							<div class="lb-form-group">
								<label for="doc-ipt-3" class="lb-u-sm-2 lb-form-label">birthdate</label>
								<div class="lb-u-sm-10">
									<input type="text" id="doc-ipt-3" placeholder="" value="默认值1">
								</div>
							</div>
						</form>
						<!-- OTHER SETTINGS -->
						<form class="lb-form">
							<div class="lb-form-group">
								<label for="doc-ta-1">API请求参数：</label>
								<p class="request-url-text" rows="5" id="doc-ta-1"><code class="json"></code></p>
							</div>
							<div class="lb-form-group">
								<label for="doc-ta-1">API返回结果：</label>
								<p class="response-text" rows="5" id="doc-ta-1"><code class="json"></code></p>
							</div>
							<div class="lb-form-group">
								<label for="doc-ta-1">HTTP Response：</label>
								<p class="http-response-text" rows="5" id="doc-ta-1"><code class="http"></code></p>
							</div>
						</form>
					</div>
				</div>
				<!-- OPT -->
				<div class="placeholder">
				</div>
				<div class="opt-area lb-cf viewc">
					<!-- DEFAULT -->
					<button type="button" class="lb-btn lb-btn-default api-console-btn">控制台</button>
					<!-- <button type="button" class="lb-btn lb-btn-success api-data-filter">数据筛选</button> -->
					<button type="button" class="lb-btn lb-btn-warning api-data-filter">配置编辑</button>
					<button type="button" class="lb-btn lb-btn-default api-reset-btn">重置表单</button>
					<button type="button" class="lb-btn lb-btn-primary api-submit-btn">发送请求</button>
				</div>
			</div>
			<div class="lb-modal lb-modal-alert pop-md" tabindex="-1" id="my-pop">
				<div class="lb-popup-hd">
					<h4 class="lb-popup-title">发现新的更新</h4>
				</div>
				<div class="lb-popup-bd">
					<div class="lb-cf">
						<b>更新类型</b>
						<div id="upd-type-text"></div>
					</div>
					<div class="lb-cf">
						<b>更新内容</b>
						<div id="upd-detail-text">
						</div>
					</div>
					<div class="opt-area-p">
						<button type="button" class="lb-btn lb-btn-primary" onclick="javascript:location.reload()">更新</button>
					</div>
				</div>
			</div>
			<div class="lb-modal lb-modal-alert" tabindex="-1" id="proxy-list-edit">
				<div class="lb-modal-dialog">
					<div class="lb-modal-hd">编辑目标地址列表
						<a href="javascript: void(0)" class="lb-close lb-close-spin" data-lb-modal-close>&times;</a>
					</div>
					<div class="lb-modal-bd">
						一行一个，永久生效
					</div>
					<textarea style="border:0;display:blcok;width:100%;" rows="5"></textarea>
					<button type="button" class="lb-btn lb-btn-default">确认</button>
				</div>
			</div>
			<div class="lb-modal lb-modal-alert pop-md" tabindex="-1" id="data-filter-pop">
				<div class="lb-popup-hd">
					<h4 class="lb-popup-title">数据自动筛选工具</h4>
				</div>
				<div class="lb-popup-bd">
					<div class="lb-cf">
						<b>注入的字段</b>
						<div id="upd-type-text">
							<div class="lb-dropdown" data-lb-dropdown>
								<button class="lb-btn lb-btn-primary lb-dropdown-toggle" data-lb-dropdown-toggle>下拉列表 <span class="lb-icon-caret-down"></span></button>
								<ul class="lb-dropdown-content">
									<li><a href="#">快乐的方式不只一种</a></li>
								</ul>
							</div>
						</div>
					</div>
					<div class="opt-area-p">
						<button type="button" class="lb-btn lb-btn-primary" onclick="javascript:location.reload()">更新</button>
					</div>
				</div>
			</div>
		</div>
		<p class="fuck"><strong>Your browser is not supported. Please use Chrome, Safari or Opera(14 or higher) instead.</strong></p>
		<script src="assets/js/jquery.min.js" defer></script>
		<script src="assets/js/liebaoui.min.js" defer></script>
		<script src="assets/js/handlebars.min.js" defer></script>
		<script src="assets/js/underscore-min.js" defer></script>
		<script src="assets/js/liebaoui.helper.min.js" defer></script>
		<script src="assets/js/highlight.min.js" defer></script>
		<script src="assets/js/md5.js" defer></script>
		<script src="assets/js/core.js" defer></script>
	</body>
</html>