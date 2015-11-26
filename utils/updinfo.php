<?php
header('Content-type:text/javascript;charset=UTF-8');

$ver = @$_GET['ver'];

echo 1;
$versionObeject = [
	'start_time' => '123',
	'end_time' => '456',
];
$json = Array();

$res = json_encode($json, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
echo $res;
exit();
?>