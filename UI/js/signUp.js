document.getElementById('postData').addEventListener('submit', postData);

function postData(event) {
            event.preventDefault();
            let first_name = document.getElementById("Fname").value;
            let last_name = document.getElementById("Lname").value;
            let username = document.getElementById("username").value;
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            let confirm_password = document.getElementById("confirm_password").value;

            let user_data = JSON.stringify({
                "first_name":first_name,
                "last_name":last_name,
                "username":username,
                "email":email,
                "password":password,
                "confirm_password":confirm_password   
                })

            fetch('http://127.0.0.1:5000/api/v2/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: user_data
            })
                .then((response) => {
                    statusCode = response.status
                    return response.json()
                })
                .then((response) => {
                    if (statusCode == 201){
                        alert(response.Message)
                        window.location = 'login.html';
                    }
                    if (statusCode == 400){
                        alert(response.Message)
                    }
                    if (statusCode == 409){
                        alert(response.Message)
                    }
                    console.log(response.Message)
                })
                .catch((err) => console.log('Eve says '+err))
                 
        }
                
        
        