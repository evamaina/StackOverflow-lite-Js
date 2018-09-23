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
                textarea.setAttribute('id','submit_q');
                answerButton.setAttribute('class', 'submit_q');
                answerButton.setAttribute('id','submitAnswer');
                textarea.setAttribute('placeholder', 'Your Answer');
                textarea.setAttribute('id', 'textarea');
                answerButton.setAttribute('id', 'submitAnswer');
                answerButton.setAttribute('value', 'Reply')
                answerButton.addEventListener('click',postAnswerData)
                content.appendChild(contentText);
                title.appendChild(titleText);
                parentElement.appendChild(title)
                parentElement.appendChild(content);
                parentElement.appendChild(textarea);
                parentElement.appendChild(br);
                parentElement.appendChild(answerButton);
                let heading = document.createElement('h3')
                heading.innerHTML='Answers:'
                content.appendChild(heading)
                for (let answer in response.Question.answers){
                    let elemH5 = document.createElement('h5');
                    let currentAnswer = response.Question.answers[answer];
                    let answerStatus = currentAnswer.accepted ? " - Accepted" : "";
                    let actionText = currentAnswer.accepted ? "Reject" : "Accept";
                    elemH5.innerHTML = currentAnswer.answer_body + answerStatus;
                    let updateButton = document.createElement('input');
                    updateButton.setAttribute('type', 'button')
                    let textarea = document.createElement('textarea');
                    let div = document.createElement('div');
                    textarea.setAttribute('class', 'textarea');
                    textarea.setAttribute('rows', '2');
                    textarea.setAttribute('cols', '60');
                    textarea.setAttribute('id', 'textarea' + response.Question.answers[answer].answer_id)
                    textarea.setAttribute('placeholder', response.Question.answers[answer].answer_body);
                    updateButton.addEventListener('click', function(event){
                        event.preventDefault();
                        localStorage.setItem('clickedUpdateId', response.Question.answers[answer].answer_id);
                        localStorage.setItem('action', "update");
                        updateAnswerData();
                    })
                    updateButton.setAttribute('value', 'Update')
                    updateButton.setAttribute('id', 'update')
                    div.appendChild(textarea)
                    div.appendChild(updateButton)
                    if (answerStatus == "") {
                        let acceptButton = document.createElement('input');
                        acceptButton.setAttribute('type', 'button')
                        acceptButton.setAttribute('value', "Accept")
                        acceptButton.setAttribute('id', 'accept')
                        acceptButton.addEventListener('click', function(event){
                            event.preventDefault();
                            localStorage.setItem('clickedAcceptId', response.Question.answers[answer].answer_id);
                            localStorage.setItem('action', "accept")
                            updateAnswerData();
                        })
                        div.appendChild(acceptButton)
                    }
                    content.appendChild(elemH5)
                    content.appendChild(div)
                }
            }
            if (statusCode == 401){
                alert(response.Message)
            }
        
        })
        .catch((err) => console.log('Eve says '+err))
           
}



function postAnswerData() { 
    let question_id = localStorage.getItem('clickedId')
    console.log(question_id)  
    let answer_body = document.getElementById("textarea").value;
    let token = localStorage.getItem('token')
    let answer_data = JSON.stringify({
        "answer_body":answer_body  
        })

    fetch('http://127.0.0.1:5000/api/v2/questions/' + question_id +'/answers', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
            
        },
        body: answer_data
    })
    .then((response) => {
            statusCode = response.status
            return response.json()
        })
        .then((response) => {
            if (statusCode == 200){
                alert(response.Message)
            }
            if (statusCode == 401){
                alert(response.Message)
            }
            if (statusCode == 400){
                alert(response.Message)
            }
            if (statusCode == 409){
                alert(response.message)
            }
            console.log(response.Message)
        })
        .catch((err) => console.log('Eve says '+err))     
        
}

function displayAnswers(){

}

function updateAnswerData() { 
    let question_id = localStorage.getItem('clickedId')
    let answer_id = localStorage.getItem('clickedUpdateId') || localStorage.getItem('clickedAcceptId')
    let action = localStorage.getItem('action');
    let answer_body = document.getElementById("textarea" + answer_id).value;
    console.log(answer_body)
    let token = localStorage.getItem('token')
    let answer_data = JSON.stringify({
        "answer_body":answer_body  
        })
    fetch('http://127.0.0.1:5000/api/v2/question/' + question_id +'/answers/' + answer_id + '/' + action, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
            
        },
        body: answer_data
    })
    .then((response) => {
            localStorage.removeItem('clickedUpdateId')
            localStorage.removeItem('clickedAcceptId')
            statusCode = response.status
            return response.json()
        })
        .then((response) => {
            if (statusCode == 200){
                alert(response.Message)
            }
            if (statusCode == 201){
                alert(response.Message)
            }
            if (statusCode == 401){
                alert(response.Message)
            }
            if (statusCode == 400){
                alert(response.Message)
            }
            // console.log(response.Message)
        })
        .catch((err) => console.log('Eve says '+err))
    }