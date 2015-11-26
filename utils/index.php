<?php
header('Content-type:application/json;charset=UTF-8');
class Utils {
	public static function removeKey($array, $key_name = "") {
		$keys = array_keys($array);
		$key_position = array_search($key_name, $keys);
		array_splice($array, $key_position, 1);
		return $array;
	}
}
if (isset($_GET['url'])) {
	$html = file_get_contents($_GET['url'] . '?' . http_build_query(Utils::removeKey($_GET, 'url'), '', '&', PHP_QUERY_RFC3986));
	echo $html;
} elseif (isset($_POST)) {

	parse_str(file_get_contents('php://input', 'r'), $arr);
	$uri = $arr['url'];
	$data = Utils::removeKey($arr, 'url');
	$ch = curl_init();
	$headers = array("Content-type: application/json", "Accept: application/json", "Cache-Control: no-cache", "Pragma: no-cache");
	curl_setopt($ch, CURLOPT_URL, $uri);
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
	$return = curl_exec($ch);
	curl_close($ch);

	echo ($return);
} else {
	echo 'Method not supported';
}
?>