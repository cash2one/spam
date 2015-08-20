<?php

require('validate.php');
function main()
{
    header("Content-Type: text/html; charset=utf-8");
    $weibo_database = 'weibo';
    $weibo_up_table = 'up';
    $weibo_content_table = 'content';
    echo '
    <html>
        <head>
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
    ';
    if ( !isset($_POST['username']) or !isset($_POST['password']) )
    {
        echo '
            <form method="post" action="login.php">
            username: <input type="text" name="username" /> <br>
            password: <input type="password" name="password" /> <br>
            <input type="submit" value="Login" />
            </form>
            ';
    }
    else
    {
        if ( validate($_POST['username'], $_POST['password']) )
        {
            setcookie('username',$_POST['username']);
            setcookie('password',$_POST['password']);
            header('Location:uploader.php');
        }
        else
        {
            echo '
                validate fail
                ';
        }
    }

    echo '
        </body>
    </html>
    ';
}

main();
?>
