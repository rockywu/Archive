<?php
$params = $_REQUEST;
$file = @$params['file'];
$result = @file_get_contents($file);
sleep(3);
if(@$params['callback']) {
    echo $_REQUEST['callback'] .'("'.urlencode($result).'")';
} else {
    if(strpos($file, '.css', 0)) {
        header("Content-type: text/css; charset=utf-8");
    }
    echo $result;
}
