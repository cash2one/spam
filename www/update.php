<?php
header("Content-Type: text/html; charset=utf-8");

require('validate.php');
require('mysql.php');
function main()
{
    if ( !isset($_COOKIE['username']) or !isset($_COOKIE['password']) or !validate($_COOKIE['username'], $_COOKIE['password']) )
    {
        header('Location:login.php');
        return;
    }

    $json = file_get_contents("php://input");
    $data = json_decode($json, true); # $data is a php object
    $username = $data['username'];
    $newcontent = json_encode($data['newcontent'], JSON_UNESCAPED_UNICODE);
    ##debug 
    #    $fp = @fopen("/tmp/weibo", "w+");
    #    $result = @fwrite($fp, $newcontent);
    #    @fclose($fp);
    ##debug
    $username = addslashes($username);
    $newcontent = addslashes($newcontent);
    $sql = "update content set weibo_content=\"$newcontent\" where username=\"$username\"";
    $result = exec_sql_on_db('weibo', $sql);
}

main();
?>
