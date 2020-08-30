
let submit_button = document.getElementById("regbutton");

submit_button.addEventListener("click", function () {

    //get data from Form
    let username = document.getElementById('user_email').value;
    let password = document.getElementById('user_pass_one').value;
     let password_two = document.getElementById('user_pass_two').value;
    let firstname = document.getElementById('firstname').value;
    let lastname = document.getElementById('lastname').value;
    let email = document.getElementById('email').value;
    

    let data = {'email':email,'password':password,'firstname':firstname,'lastname':lastname,'username':username};

    let url = '/addUser'; //

    console.log(data);

    fetch(url,{
       method: 'POST',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify(data),
    })

    .then(function (response) {
        console.log(response.status);
        
        if(response.status == 200){
         
          document.getElementById("message").innerHTML = "Success";
        }else{
          
           document.getElementById("message").innerHTML = "Failed";
        }else{
        }
    })
    .then(data => {console.log("success");} );
});
