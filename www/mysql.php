<?php

    $weibo_database = 'weibo';
    $weibo_up_table = 'up';
    $weibo_content_table = 'content';

    function exec_sql_on_db($db, $sql)
    {
        $conn = mysql_connect('localhost', 'root', 'jialin,0204') or die ('connect failed' . mysql_error());
        mysql_query("set character set 'utf8'", $conn);  // fucking encoding
        mysql_select_db($db, $conn) or die ('select db failed' . mysql_error());
        $result = mysql_query($sql, $conn) or die ('query failed' . mysql_error());

        return $result;
    }
?>
