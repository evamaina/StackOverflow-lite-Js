let profile = document.getElementById('profile1')
profile.addEventListener('load', fetchUserQuestionsData());
function fetchUserQuestionsData() { 
    let token = localStorage.getItem('token')
    fetch('http://127.0.0.1:5000/api/v2/question/', {
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
                let parentElement = document.getElementById('UserQuestions')
                let parentElementRecent = document.getElementById('recentQuestions')

                for (let question in response.Questions){
                    let title = document.createElement('h3');
                    lenquest= document.getElementById('len-quest')
                    lenquest.innerHTML='Questions asked '+'['+response.Questions.length+']';
                    title.innerHTML = response.Questions[question].title;
                    let question_id = response.Questions[question].question_id;
                    delButton = document.createElement('input');
                    delButton.addEventListener('click', function callback(){
                        deleteMyQuestion(question_id)
                    })
                    delButton.setAttribute('type', 'button')
                    delButton.setAttribute('value', 'Delete')
                    delButton.setAttribute('id', 'del' + question_id);
                    parentElement.appendChild(title)
                    parentElement.appendChild(delButton)
                    title.addEventListener('click', function callback(){
                        localStorage.setItem('clickedId', question_id);
                        fetchSpecificQuestionData()
                        window.location = 'fetch-specific-question.html'
                    });
                }
                for (let recent in response.user_recent){
                    let title = document.createElement('h3');
                    let lenrecent= document.getElementById('len-recent')
                    lenrecent.innerHTML='Recently asked '+'['+response.user_recent.length+']';
                    title.innerHTML = response.user_recent[recent].title;
                    let question_id = response.user_recent[recent].question_id;
                    parentElementRecent.appendChild(title)
                    title.addEventListener('click', function callback(){
                        localStorage.setItem('clickedId', question_id);
                        fetchSpecificQuestionData()
                        window.location = 'fetch-specific-question.html'
                    });
                }
            }
            if (statusCode == 401){
                alert(response.Message)
                //window.location = 'profile.html'
            }

            console.log(response)
        })
        .catch((err) => console.log('Eve says '+err))   
}

function deleteMyQuestion(question_id) { 
    let token = localStorage.getItem('token')
    fetch('http://127.0.0.1:5000/api/v2/question/'+ question_id, {
        method: 'DELETE',
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
                alert(response.Message)
            }
            if (statusCode == 401){
                alert(response.Message)
            }
        
            console.log(response.Message)
        })
        .catch((err) => console.log('Eve says '+err))   
}