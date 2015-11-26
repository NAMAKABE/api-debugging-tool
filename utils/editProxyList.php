<?php

$text = preg_replace('/\n+/', "\n", trim($_POST['word']));
xcache_set('proxy_list', $text, 0);

echo preg_replace('/\n/', "#0#0#", $text);

?>