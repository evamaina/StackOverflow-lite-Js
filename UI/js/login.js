document.getElementById('loginData').addEventListener('submit', loginData);
function loginData(event) {
            event.preventDefault();        
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;
        
            let user_data = JSON.stringify({
                "username":username,
                "password":password,  
                })

            fetch('https://stack-overflow-lit-api-heroku.herokuapp.com/api/v2/login', {
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
                        document.getElementById("msg").style.backgroundColor = '#d4edda';
                        document.getElementById("msg").style.color = 'black';
                        token = response.token
                        user_id = response.user_id
                        localStorage.setItem('token',token)
                        localStorage.setItem('user_id_own', user_id)
                        console.log(localStorage.getItem('token'));
                        var msg=document.getElementById("msg");
                        msg.innerHTML=response.Message;
                        window.setTimeout(() => window.location = 'home.html', 1200);
                    }
                    if (statusCode == 401){
                        document.getElementById("msg").style.backgroundColor = 'red';
                        document.getElementById("msg").style.color = 'white';
                        document.getElementById("msg").innerHTML = response.Message;
                    }
                    if (statusCode == 400){
                        document.getElementById("msg").style.backgroundColor = 'red';
                        document.getElementById("msg").style.color = 'white';
                        document.getElementById("msg").innerHTML = response.Message;
                    }
                    console.log(response.Message)
                })
                .catch((err) => console.log('Eve says '+err))
                
                
                
        }