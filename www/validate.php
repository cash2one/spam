<?php

function validate($user, $pass)
{
    $users = array('zhangliping' => 'zhangliping',
                   'root' => 'jialin,0204'
                   );
    if ( isset($users[$user]) && ($users[$user]==$pass) )
    {
        return true;
    }
    else
    {
        return false;
    }
}

?>
