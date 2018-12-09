
var questions = [
  {
    question: "What is Kanye's middle name?",
    answers: [
      { answer: "Omari", value: true },
      { answer: "Rufus", value: false },
      { answer: "Johnathan", value: false },
      { answer: "Shawn", value: false }
    ]
  },
  {
    question: "What city was Kanye West born in?",
    answers: [
      { answer: "Philadelphia", value: false },
      { answer: "Chicago", value: false },
      { answer: "Memphis", value: false },
      { answer: "Atlanta", value: true }
    ]
  },
  {
    question: "Which of these is not one of Kanye's nicknames?",
    answers: [
      { answer: "Yeezy", value: false },
      { answer: "K-Roc", value: false },
      { answer: "Strawberry Parfait Ye", value: true },
      { answer: "The Louis Vitton Don", value: false }
    ]
  },
  {
    question: "What was the name of Kanye's first album?",
    answers: [
      { answer: "Yeezus", value: false },
      { answer: "The College Dropout", value: true },
      { answer: "Ye", value: false },
      { answer: "The Life of Pablo", value: false },
    ]
  },
  {
    question: "Which of these is not the title of a Kanye album?",
    answers: [
      { answer: "808's and Heartbreak", value: false },
      { answer: "Kids See Ghosts", value: false },
      { answer: "Slavery and Other Bad Decisions", value: true },
      { answer: "My Beautiful Dark Twisted Fantasy", value: false }
    ]
  },
 
];


var game;
var counter = 0;
var clock;
var timer = 30;
var correctCounter = 0;
var incorrectCounter = 0;
var unansweredCounter = 0;

$(document).ready(function() {
  
  $('.answers').css('visibility', 'hidden');
  $('body').on('click', '.start-btn', function(event) {
    event.preventDefault();
    startGame();
    $('.answers').css('visibility', 'visible');
  });

  $('body').on('click', '.answer', function(event) {
    
    chosenAnswer = $(this).text();
    var answerCounter = questions[counter].answers;

    var answer = $('.answer');
    for (var i = 0; i < answerCounter.length; i++) {
      if (chosenAnswer === answerCounter[i].answer && answerCounter[i].value === true) {
        clearInterval(clock);
        var right = $(this).attr('class', 'right-answer answer');
        rightAnswer();
      } else if (chosenAnswer === answerCounter[i].answer && answerCounter[i].value === false) {
        clearInterval(clock);
        $(this).attr('class', 'wrong-answer answer');
        $('.first-answer').css('background-color', 'hsl(194, 100%, 64%)');
        $('.first-answer').css('color', 'white');
        wrongAnswer();
      }
    }
  });

  $('body').on('click', '.reset-button', function(event) {
    event.preventDefault();
    resetGame();
  });
});

function rightAnswer() {
  correctCounter++;
  $('.time').html(timer);
  $('.right').html('<p>Right answers: ' + correctCounter + '</p><br>');
  setTimeout(questionCounter, 1000);
}

function wrongAnswer() {
  incorrectCounter++;
  $('.time').html(timer);
  $('.wrong').html('<p>Wrong answers: ' + incorrectCounter + '</p>');
  setTimeout(questionCounter, 1000);
}

function unanswered() {
  unanswered++;
  $('.main').append("<p class='times-up'>Time's up!</p>");
  $('.right-answer').css('background-color', 'green');
  $('.times-up')
    .delay(2000)
    .fadeOut(400);
  setTimeout(questionCounter, 1000);
}

// Start the game
function startGame() {
  $('.start-page').css('display', 'none');
  $('.questions-page').css('visibility', 'visible');
  $('.timer').html('<p>Time remaining: <span class="time">30</span></p>');

  $('.question').html(questions[counter].question);
  var showingAnswers =
    '<p class="answer first-answer">' +
    questions[counter].answers[0].answer +
    '</p><p class="answer">' +
    questions[counter].answers[1].answer +
    '</p><p class="answer">' +
    questions[counter].answers[2].answer +
    '</p><p class="answer">' +
    questions[counter].answers[3].answer +
    '</p>';

  $('.answers').html(showingAnswers);

  timerHolder();
}

function questionCounter() {
  if (counter < 4) {
    counter++;
    startGame();
    timer = 30;
    timerHolder();
  } else {
    finishGame();
  }
}

function timerHolder() {
  clearInterval(clock);
  clock = setInterval(seconds, 1000);
  function seconds() {
    if (timer === 0) {
      clearInterval(clock);
      unanswered();
    } else if (timer > 0) {
      timer--;
    }
    $('.time').html(timer);
  }
}

function finishGame() {
  var final = $('.main')
    .html("<p>OMG! We've learned so much about Kanye! Here's how you did!<p><br><br>")
    .append('<p>Correct Answers: ' + correctCounter + '</p><br>')
    .append('<p>Wrong Answers: ' + incorrectCounter + '</p>');
  $(final).attr('<div>');
  $(final).attr('class', 'final');
  $('.final').append('<p><a class="btn btn-primary btn-lg reset-button" href="#">Restart the game!</a></p>');
}



function resetGame() {
  counter = 0;
  correctCounter = 0;
  incorrectCounter = 0;
  unansweredCounter = 0;
  timer = 30;
  startGame();
  
}
