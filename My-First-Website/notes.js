function emptyCheck(){
    var nametyped = document.getElementById("input1").value;
    var msgtyped = document.getElementById("input2").value;
    if (nametyped=="" || msgtyped==""){
        var confirmmsg = confirm("Do you want to leave no input?");
        if (confirmmsg)
            alert("Ok Then!");
        else{
            if (nametyped==""){
                 document.getElementById("input1").focus();
                alert("Please type something under Name: or else leave everything blank.");
                return false;
            }
            else {
                document.getElementById("input2").focus();
                alert("Please type something under Message: or else leave everything blank.");
               return false;
            }
        }
    }
    else{
        alert("Thank you for your input " + nametyped + " !");
    }
}
