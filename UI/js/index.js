window.addEventListener('load', fetchQuestionData);
function fetchQuestionData() { 
    let token = localStorage.getItem('token')  
    localStorage.setItem('isLoggedIn', false) 
    fetch('https://stack-overflow-lit-api-heroku.herokuapp.com/api/v2/recent-questions', {
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
            console.log(response.Recently_asked)
            //alert(response.Questions)
            let  parentElement = document.getElementById('all-quests');
            for (let question in response.Recently_asked){
               let title = document.createElement('h3');
               title.addEventListener('click', function titleClick(){
               let clikedId = response.Recently_asked[question].question_id;
               localStorage.setItem('clickedId',clikedId)
               window.location = 'fetch-specific-question.html'
                })
               let author = document.createElement('p');
               let date = document.createElement('a');
               let titleText = document.createTextNode(response.Recently_asked[question].title);
               let authorText = document.createTextNode('posted_by: '+ response.Recently_asked[question].username
                                                        + ' on: '+ response.Recently_asked[question].posted_date);
               author.style.color='blue';
               author.style.fontSize='11px'
               author.style.fontStyle='italic';
               author.appendChild(authorText)
               title.appendChild(titleText);
               title.appendChild(date)
               title.appendChild(author)
               title.setAttribute('class','wrapT');
               parentElement.setAttribute('class','center1');
               parentElement.appendChild(title)

            
                
            }
        }
        if (statusCode == 401){
            alert(response.Message)
        }
    
    })
    .catch((err) => console.log('Eve says '+err))
}