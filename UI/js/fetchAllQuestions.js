window.addEventListener('load', fetchQuestionData);
function fetchQuestionData() { 
    let token = localStorage.getItem('token')

    fetch('http://127.0.0.1:5000/api/v2/questions', {
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
                //alert(response.Questions)
                let  parentElement = document.getElementById('all-quests');
                console.log(response.Questions)
                for (let question in response.Questions){
                    let title = document.createElement('h3');
                    title.addEventListener('click', function titleClick(){
                        let clikedId = response.Questions[question].question_id;
                        localStorage.setItem('clickedId',clikedId)
                        localStorage.setItem('user_who_posted_question', response.Questions[question].user_id)
                        var details = {'username':response.Questions[question].username,'date':response.Questions[question].posted_date};
                        let user_details = JSON.stringify(details)
                        localStorage.setItem('user_details', user_details)
                        window.location = 'fetch-specific-question.html';
                    })
                    let author = document.createElement('p');
                    let date = document.createElement('a');
                    let titleText = document.createTextNode(response.Questions[question].title);
                    let authorText = document.createTextNode('posted_by: '+ response.Questions[question].username
                                                             + ' on: '+ response.Questions[question].posted_date);
                    
                    title.setAttribute('class','wrapT');
                    parentElement.setAttribute('class','center1');
                    author.style.color='blue';
                    author.style.fontSize='11px'
                    author.style.fontStyle='italic';
                    author.appendChild(authorText)
                    title.appendChild(titleText);
                    title.appendChild(author)
                    title.appendChild(date)
                    parentElement.appendChild(title)


                }
            }
            if (statusCode == 401){
                alert(response.Message)
            }
        
        })
        .catch((err) => console.log('Eve says '+err))
        
        
        
}