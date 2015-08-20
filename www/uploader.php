<?php
    header("Content-Type: text/html; charset=utf-8");
?>

<html>
    <head>
        <script src="jquery.js" type="text/javascript">
        </script>
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
        <p>
            usage: single weibo user, multiple weibo content supported.
            there are two buttons down there.
            press "add more weibo" to add a new weibo content.
            press "submit" to submit to server.
            also, you can click "del" next to the text area to delete the correspoding weibo.
        </p>
        <ul class="banner">
            <li><a href="uploader.php?username=Subham@sina.com">subham</a></li>
        </ul>
        <br />
<?php

require('validate.php');
require('mysql.php');
function main()
{
    if ( !isset($_COOKIE['username']) or !isset($_COOKIE['password']) or !validate($_COOKIE['username'], $_COOKIE['password']) )
    {
        header('Location:login.php');
        return;
    }
    if(empty($_GET['username']))
    {
        // nothing
        return;
    }
    // else username set
    if(empty($_POST['newcontent']))
    {
        $username = $_GET['username'];
        $sql = "select * from content where username=\"$username\"";
        $result = exec_sql_on_db('weibo', $sql);
        $row = mysql_fetch_array($result, MYSQL_ASSOC); 
        $data = json_decode($row['weibo_content']);
        echo '<div class="InputsWrapper">';
        foreach($data as $this_weibo)
        {
            echo '<div>';
            echo '<font class="num_of_input" color="#000000"> 0 </font>';
            echo '<br> </br>';
            echo '<textarea class="newcontent" cols="60" rows="10" >';
            echo $this_weibo;
            echo '</textarea>';
            echo '<a href="#" class="removeclass">del</a>';
            echo '</div>';
            echo '<br></br>';
        }
        echo '
        <button type="button" id="addmoreweibo">Add more weibo</button>
        <button type="button" id="postnewcontent">Submit</button>
        </div>';
    }
    else  // $_POST['newcontent'] not empty
    {
        $username = $_GET['username'];
        $newcontent = $_POST['newcontent'];

        $sql = "update content set weibo_content=\"$newcontent\" where username=\"$username\"";
        $result = exec_sql_on_db('weibo', $sql);
        echo $_POST['newcontent'];
	    echo "edit ok.";
    }
}

main();
?>
    </body>
</html>
