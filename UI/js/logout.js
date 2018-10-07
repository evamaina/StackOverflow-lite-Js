function logoutUser() {       
           
            fetch('http://127.0.0.1:5000/api/v2/logout', {
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
                        window.location.replace('index.html')
                    } 
                    
                    console.log(response.Message)
                })
                .catch((err) => console.log('Eve says '+err))
                
                          
        }