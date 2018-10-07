document.getElementById('postQuest-button').addEventListener('click', postQuestionData);
function postQuestionData() {        
let title = document.getElementById("title").value;
let content = document.getElementById("content").value;
let token = localStorage.getItem('token')
let question_data = JSON.stringify({
    "title":title,
    "content":content,  
    })

fetch('http://127.0.0.1:5000/api/v2/question', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
        
    },
    body: question_data
})
.then((response) => {
        statusCode = response.status
        return response.json()
    })
    .then((response) => {
        if (statusCode == 201){
            document.getElementById("msg").style.backgroundColor = '#d4edda';
            document.getElementById("msg").style.color = 'black';
            var msg=document.getElementById("msg");
            msg.innerHTML=response.Message;
            window.setTimeout(() => window.location = 'home.html', 1200);
            // alert(response.Message)
            document.getElementById('quest-title').innerHTML=response.response[0].title;
            document.getElementById('quest-body').innerHTML=response.response[0].content;

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
        if (statusCode == 409){
            document.getElementById("msg").style.backgroundColor = 'red';
            document.getElementById("msg").style.color = 'white';
            document.getElementById("msg").innerHTML = response.Message;
        }
        console.log(response.Message)
    })
    .catch((err) => console.log('Eve says '+err))
    
    
    
}