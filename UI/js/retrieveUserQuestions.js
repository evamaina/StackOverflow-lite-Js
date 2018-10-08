let profile = document.getElementById('profile1')
profile.addEventListener('click', fetchUserQuestionsData());
function fetchUserQuestionsData() { 
    let token = localStorage.getItem('token')
    fetch('https://stack-overflow-lit-api-heroku.herokuapp.com/api/v2/question/', {
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
                MostAnsweredQuestion(response)
                userAnswers(response)

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
    var result = confirm(" Are you sure you want delete this?");
    if (result) {
        fetch('https://stack-overflow-lit-api-heroku.herokuapp.com/api/v2/question/'+ question_id, {
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
                    location.reload()
                }
                if (statusCode == 401){
                    alert(response.Message)
                }
            
                console.log(response.Message)
            })
            .catch((err) => console.log('Eve says '+err)) 
    }
}

const MostAnsweredQuestion = (data) => {
    let table = document.getElementById('MostAnsweredQuestion')
    for (let question in data.most_answered) {
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        let questionNode = document.createTextNode(data.most_answered[question].title);
        let h4 = document.createElement('h4');
        h4.setAttribute('id', 'h4' + data.most_answered[question].question_id);
        h4.addEventListener('click', () => {
            question_id = data.mostAnswered[question].question_id;
            fetchQuestion(question_id);
        })
        h4.appendChild(questionNode);
        td.appendChild(h4);
        tr.appendChild(td);
        let answerData = document.createElement('td');
        let answerElement = document.createElement('a');
        let answervalue = `<a>Answers
                        <i id="count">${data.most_answered[question].answer}</i>
                    </a>`
        answerElement.innerHTML = answervalue;
        answerData.appendChild(answerElement)
        tr.appendChild(answerData)
        table.appendChild(tr);
    }

}
const userAnswers = (data) => {
    let table = document.getElementById('answersGiven')
    document.getElementById('len-answers').innerHTML = 'Answers given'+'['+ data.my_answers.length+']'
    console.log(data.my_answers.length)
    for (let question in data.my_answers) {
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        let questionNode = document.createTextNode(data.my_answers[question].myanswer);
        let h4 = document.createElement('h4');
        h4.setAttribute('id', 'h4' + data.my_answers[question].question_id);
        h4.addEventListener('click', () => {
            question_id = data.my_answers[question].question_id;
            fetchQuestion(question_id);
        })
        h4.appendChild(questionNode);
        td.appendChild(h4);
        tr.appendChild(td);
        table.appendChild(tr);
    }
    console.log(data)
}