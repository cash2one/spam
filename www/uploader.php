<?php

function main()
{
    header("Content-Type: text/html; charset=utf-8");
    $weibo_database = 'weibo';
    $weibo_up_table = 'up';
    $weibo_content_table = 'content';
    echo '
    <html>
        <head>
            <script src="uploader.js" type="text/javascript">
            </script>
            <style>
                ul.banner
                {
                    list-style-type:none;
                    margin:0;
                    padding:0;
                    text-align:left;
                    color:#384850;
                    background-color:gray;
                    font-size:20px;
                    font-weight:bold;
                }
                li
                {
                    display:inline;
                }
            </style>
        </head>
        <body>
            <ul class="banner">
                <li><a href="uploader.php?username=Subham@sina.com">subham</a></li>
                <li><a href="uploader.php?username=Subham@sina.com">subham2</a></li>
            </ul>
            <br />
    ';

    if(empty($_GET['username']))
    {
        // nothing
        return;
    }
    // else username set
    if(empty($_POST['newcontent']))
    {
        $username = $_GET['username'];
        $conn = mysql_connect('localhost', 'root', 'jialin,0204') or die ('connect failed' . mysql_error());
        mysql_query("set character set 'utf8'", $conn);  // fucking encoding
        mysql_select_db($weibo_database, $conn);
        $sql = "select * from $weibo_content_table where username=\"$username\"";
        $result = mysql_query($sql, $conn);
        if ( ! $result )
        {
            echo "query failed";
        }
        else
        {
            $row = mysql_fetch_array($result, MYSQL_ASSOC);
            $data = $row['weibo_content'];
            echo '<font id="num_of_input" color="#000000"> 0 </font>';
            echo '<form onsubmit="input_validate()" action="" method="post">';
            echo '<textarea oninput="input_change(event)" id="newcontent" name="newcontent" cols="60" rows="10" >';
            echo $data;
            echo '</textarea>
            <input type="submit" value="Submit"/>
            </form>';
        }
        mysql_free_result($result);
        mysql_close($conn);
    }
    else  // $_POST['newcontent'] not empty
    {
        $username = $_GET['username'];
        $newcontent = $_POST['newcontent'];

        $conn = mysql_connect('localhost', 'root', 'jialin,0204') or die ('connect failed' . mysql_error());
        mysql_query("set names 'utf8'", $conn);  // fucking encoding
        mysql_select_db($weibo_database, $conn);

        $sql = "update $weibo_content_table set weibo_content=\"$newcontent\" where username=\"$username\"";
        $result = mysql_query($sql, $conn);
		if ( ! $result )
        {
			echo "edit failed.";
		}
		else 
        {
			echo "edit ok.";
        }
        mysql_free_result($result);
        mysql_close($conn);
    }
    echo '
        </body>
    </html>
    ';
}

main();
?>
