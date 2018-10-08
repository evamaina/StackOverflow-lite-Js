function logoutUser() {       
           
            fetch('https://stack-overflow-lit-api-heroku.herokuapp.com/api/v2/logout', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'mode': 'no-cors',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')          
                }
            })
            .then((response) => {
                    statusCode = response.status
                    return response.json()
                })
                .then((response) => {
                    if (statusCode == 200){
                        window.location.replace('login.html')
                    } 
                    
                    console.log(response.Message)
                })
                .catch((err) => console.log('Eve says '+err))
                
                          
        }