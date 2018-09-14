let profile = document.getElementById('profile1')
profile.addEventListener('click', fetchUserQuestionsData());
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

                for (let question in response.Questions){
                    let title = document.createElement('h3');
                    title.innerHTML = response.Questions[question].title;
                    parentElement.appendChild(title)
                    title.addEventListener('click', function callback(){
                        let question_id = response.Questions[question].question_id;
                        localStorage.setItem('clickedId', question_id)
                        fetchSpecificQuestionData()
                        console.log(profile)
                        window.location = 'fetch-specific-question.html';
                    })
                }
            }
            if (statusCode == 401){
                alert(response.Message)
            }
        
            console.log(response.Message)
        })
        .catch((err) => console.log('Eve says '+err))     
}