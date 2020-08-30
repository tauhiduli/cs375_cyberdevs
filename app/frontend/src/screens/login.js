
let submit_button = document.getElementById("logbutton");

submit_button.addEventListener("click", function () {

    //get data from Form
    let username = document.getElementById('email').value;
    let password = document.getElementById('username').value;
    

    let data = {'email':username,'password':password};

    let url = '/auth'; //

    console.log(data);

    fetch(url,{
       method: 'POST',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify(data),
    })

    .then(function (response) {
        console.log(response.status);
        
        if(response.status == 200){
          newText = document.createTextNode("Success");
          document.getElementById("message").innerHTML = "Success";
        }else{
          
           document.getElementById("message").innerHTML = "Failed";
        }else{
        }
    })
    .then(data => {console.log("success");} );
});
