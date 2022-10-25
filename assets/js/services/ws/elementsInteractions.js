const receiveQuestion = function(obj) {
    return obj;
    // console.log(obj);
    // console.log('receiveQuestion');
    // var questionReceiverFront = document.getElementById('js-questions');
    // // var objReceived = JSON.parse(obj);
    // var objReceived = obj;
    // if (questionReceiverFront) {
    //     questionReceiverFront.innerHTML += "<div class='question' style='display: "+ questionStatus +";' id='question-"+ objReceived.questionId +"'><h4>"+ objReceived.questionPrenom +" "+ objReceived.questionNom.substring(0, 1) +".</h4><span>"+ objReceived.questionSent +"</span><div id='js-answers-"+objReceived.questionId +"'></div>";
    // }
}

const receiveAnswer = function(answer) {
    console.log('receiveAnswer');
    var answerReceived = JSON.parse(answer);
    if (document.getElementById("question-"+answerReceived.answerQuestionId)) {
        document.getElementById("question-"+answerReceived.answerQuestionId).style.display = answerReceived.answerSetStatus;
    }
    if (document.getElementById("js-answers-"+answerReceived.answerQuestionId)) {
        document.getElementById("js-answers-"+answerReceived.answerQuestionId).innerHTML += "<div class='answer' id='anwser-"+ answerReceived.answerId +"'>"+ answerReceived.answerText +"</div>";
    }
}

const receiveDeleteQuestion = function(questionToDelete) {
    console.log('receiveDeleteQuestion');
    document.getElementById("question-"+questionToDelete).remove();
}

const receiveTotalVotes = function(totalVotesObj) {
    console.log('receiveTotalVotes');
    totalVotesReceived = JSON.parse(totalVotesObj);
    $("#total-vote-"+totalVotesReceived.pollID).html(totalVotesReceived.totalVotes[1])
}

const changePollVisibility = function(pollVisibility) {
    console.log('changePollVisibility');
    pollVisibilityReceived = JSON.parse(pollVisibility);
    if (pollVisibilityReceived.pollVisibility == true) {
        document.getElementById('poll-'+pollVisibilityReceived.pollID).style.display = "block";
    }
    else {
        document.getElementById('poll-'+pollVisibilityReceived.pollID).style.display = "none";
    }
}

const showPollResults = function(pollID) {
    console.log('showPollResults');
    checkOptionTotal();
    if ($('#poll-resultats-'+pollID).hasClass('d-none')) {
        $('#poll-resultats-'+pollID).removeClass('d-none');
        $('#poll-options-'+pollID).addClass('d-none');
    }
    else {
        $('#poll-resultats-'+pollID).addClass('d-none');
        $('#poll-options-'+pollID).removeClass('d-none');
    }
}

function checkOptionTotal() {
    console.log('checkOptionTotal')
    $('.js-option').each(function(index, item) {
        var optionId =item.id;
        var url = "/poll-option-total/id/"+optionId;
        axios.get(url)
        .then(response => {
            item.innerHTML = response.data.total[1];
            totalVotes = response.data.totalVotes[1];
            if (totalVotes == null) {
                totalVotes = 0;
            }
            $('#total-vote-'+response.data.pollId).html(" "+totalVotes);
        })
        .catch(function(error) {
            if(error) {
                console.log(error);
            }
        })
    })
}

export default {
    receiveQuestion: receiveQuestion,
    receiveAnswer: receiveAnswer,
    receiveDeleteQuestion: receiveDeleteQuestion,
    changePollVisibility: changePollVisibility,
    receiveTotalVotes: receiveTotalVotes,
    showPollResults: showPollResults
};