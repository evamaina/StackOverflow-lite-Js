window.addEventListener('load', fetchSpecificQuestionData);
function fetchSpecificQuestionData() { 
    let question_id = localStorage.getItem('clickedId')
    let token = localStorage.getItem('token')
    fetch('http://127.0.0.1:5000/api/v2/question/' + question_id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token       
        },   
    })
    .then((response) => {
            statusCode = response.status
            return response.json()
        })
        .then((response) => {
            if (statusCode == 200){
                let  parentElement = document.getElementById('all-quests');
                console.log(response.Question)
                let title = document.createElement('h3');
                let titleText = document.createTextNode(response.Question.title);
                let content = document.createElement('p');
                let contentText = document.createTextNode(response.Question.content);
                let textarea = document.createElement('textarea');
                let answerButton = document.createElement('input');
                let br = document.createElement('BR');
                textarea.setAttribute('class', 'textarea');
                textarea.setAttribute('rows', '2');
                textarea.setAttribute('cols', '60');
                answerButton.setAttribute('class', 'submit_q')
                textarea.setAttribute('placeholder', 'Your Answer');
                answerButton.setAttribute('type', 'button');
                answerButton.setAttribute('value', 'Reply');
                content.appendChild(contentText);
                title.appendChild(titleText);
                parentElement.appendChild(title)
                parentElement.appendChild(content);
                parentElement.appendChild(textarea);
                parentElement.appendChild(br);
                parentElement.appendChild(answerButton);
            }
            if (statusCode == 401){
                alert(response.Message)
            }
        
            console.log(response.Message)
        })
        .catch((err) => console.log('Eve says '+err))
        
        
        
}