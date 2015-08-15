function input_change(event)
{
    var length = event.target.value.length;
    var num_of_input = document.getElementById('num_of_input');
    num_of_input.innerHTML = "已输入:" + length + "/140";
    if ( length > 140 )
    {
        num_of_input.style.color = "#F00";  // red   
    }
    else
    {
        num_of_input.style.color = "#000000";   // black
    }
}
function input_validate()
{
   // check if input is bigger than 3
    var value = document.getElementById('newcontent').value;
     if (value.length > 140) 
     {
        alert('too long');
        return false; // keep form from submitting
     }

     // else form is good let it submit, of course you will 
     // probably want to alert the user WHAT went wrong.

     return true;
}
