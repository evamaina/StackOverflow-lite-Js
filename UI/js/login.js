document.getElementById('loginData').addEventListener('submit', loginData);
function loginData(event) {
            event.preventDefault();        
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;
        
            let user_data = JSON.stringify({
                "username":username,
                "password":password,  
                })

            fetch('http://127.0.0.1:5000/api/v2/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    
                },
                body: user_data
            })
            .then((response) => {
                    statusCode = response.status
                    return response.json()
                })
                .then((response) => {
                    if (statusCode == 200){
                        alert(response.Message)
                        token = response.token
                        localStorage.setItem('token',token)
                        console.log(localStorage.getItem('token'))
                        window.location = 'home.html';
                    }
                    if (statusCode == 401){
                        alert(response.Message)
                    }
                    if (statusCode == 400){
                        alert(response.Message)
                    }
                    console.log(response.Message)
                })
                .catch((err) => console.log('Eve says '+err))
                
                
                
        }