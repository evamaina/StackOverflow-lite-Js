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
            alert(response.Message)
            document.getElementById('quest-title').innerHTML=response.response[0].title;
            document.getElementById('quest-body').innerHTML=response.response[0].content;

        }
        if (statusCode == 401){
            alert(response.Message)
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