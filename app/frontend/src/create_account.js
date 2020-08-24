
let submit_button = document.getElementById("submit");

submit_button.addEventListener("click", function () {

    //get data from Form
    let user_name = document.getElementById('user_name').value;
    let user_email= document.getElementById('user_email').value;
    let user_pass_one = document.getElementById('user_pass_one').value;
    let user_pass_two = document.getElementById('user_pass_two').value;
   

    let data = {'user_name':user_name,'user_email':user_email,'user_pass_one':user_pass_one,'user_pass_two':user_pass_two};

    let url = '/createAccount'; //

    console.log(data);

    fetch(url,{
       method: 'POST',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify(data),
    })

    .then(function (response) {
        console.log(response.status);
        var children =document.getElementById('message').childNodes;
        if(children.length > 0){
          var child = document.getElementById("message").childNodes[0];
          document.getElementById("message").removeChild(child);
        }

        var newText = "";

        if(response.status == 200){
          newText = document.createTextNode("Accunt Created Succesifully");
          document.getElementById("message").appendChild(newText);
        }else{
          newText = document.createTextNode("Account Creation Failed");
          document.getElementById("message").appendChild(newText);
        }
    })
    .then(data => {console.log("success");} );
});
