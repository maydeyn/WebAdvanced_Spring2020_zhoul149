$(document).ready(function() {
  // List of questions, answers and images
  var qna = $("#qnaContainer");
  var startNum = 30;
  var questions = [
    {
      question:
        "What happened to British street artist Banksy’s “Girl with Balloon” when it sold for $1.4 million at Sotheby’s auction house in 2018?",
      answers: [
        "It was set on fire",
        "It was splashed with ink",
        "It was cut in half",
        "It shredded"
      ],
      image: ["assets/images/girlwithballoon.jpg"],
      correctAnswer: "It shredded"
    },
    {
      question:
        "How many paintings did Vincent Van Gogh sell during his lifetime?",
      answers: ["1", "48", "183", "94"],
      image: ["assets/images/1.jpg"],
      correctAnswer: 1
    },
    {
      question:
        "English artist Andy Brown created a portrait of Queen Elizabeth II using what?",
      answers: ["Socks", "Tea Bag", "Fish Bones", "Gum"],
      image: ["assets/images/teabag.jpg"],
      correctAnswer: "Tea Bag"
    },
    {
      question: "What is the main visual element in Impressionist painting?",
      answers: ["Shape", "Color", "Pattern", "Line"],
      image: ["assets/images/impressionist.jpg"],
      correctAnswer: "Color"
    },
    {
      question:
        "How long did it take Leonardo da Vinci to paint the Mona Lisa's lips?",
      answers: ["12 months", "12 days", "12 weeks", "12 years"],
      image: ["assets/images/smile.jpg"],
      correctAnswer: "12 years"
    },
    {
      question:
        "What is the term for an artistic process that involves shooting ink at a blank piece of paper?",
      answers: ["Splashism", "Bulletism", "Blobism", "Inkism"],
      image: ["assets/images/bulletism.jpg"],
      correctAnswer: "Bulletism"
    },
    {
      question: "What artist's work has been stolen more than any other's?",
      answers: [
        "Pablo Picasso",
        "Edvard Munch",
        "Rembrandt",
        "Leonardo Da Vinci"
      ],
      image: ["assets/images/picasso.jpg"],
      correctAnswer: "Pablo Picasso"
    },
    {
      question: "Which of the following is a famous work of pointillism?",
      answers: [
        "American Gothic",
        "A Sunday Afternoon on the Island of La Grande Jatte",
        "The Scream",
        "Girl with a Pearl Earring"
      ],
      image: ["assets/images/pointillism.jpg"],
      correctAnswer: "A Sunday Afternoon on the Island of La Grande Jatte"
    }
  ];

  // Buttons
  // Restart game
  $(document).on("click", "#start-over", function(e) {
    game.reset();
  });

  // Click answer
  $(document).on("click", ".answer-button", function(e) {
    game.clicked(e);
  });

  //start button trigger countdown on timer
  $("#start").on("click", function(e) {
    $("#subwrapper").prepend(
      '<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>'
    );
    game.loadQuestion();
  });

  var game = {
    questions: questions,
    currentQuestion: 0,
    counter: startNum,
    correct: 0,
    incorrect: 0,
    countdown: function() {
      game.counter--;
      $("#counter-number").html(game.counter);

      if (game.counter === 0) {
        console.log("TIME UP");
        game.timeUp();
      }
    },

    loadQuestion: function() {
      timer = setInterval(game.countdown, 1000);
      qna.html("<h2>" + questions[this.currentQuestion].question + "</h2>");
      for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
        qna.append(
          '<button class="answer-button" id="button"' +
            'data-name="' +
            questions[this.currentQuestion].answers[i] +
            '">' +
            questions[this.currentQuestion].answers[i] +
            "</button>"
        );
      }
    },

    // Set timer
    nextQuestion: function() {
      game.counter = startNum;
      $("#counter-number").html(game.counter);
      game.currentQuestion++;
      game.loadQuestion();
    },

    // Time's up
    timeUp: function() {
      clearInterval(timer);
      $("#counter-number").html(game.counter);

      qna.html("<h2>Out of Time!</h2>");
      qna.append(
        "<h3>The Correct Answer was: " +
          questions[this.currentQuestion].correctAnswer
      );
      qna.append('<img src="' + questions[this.currentQuestion].image + '" />');

      if (game.currentQuestion === questions.length - 1) {
        setTimeout(game.results, 3000);
      } else {
        setTimeout(game.nextQuestion, 3000);
      }
    },

    // Results
    results: function() {
      clearInterval(timer);

      qna.html("<h2>All done, heres how you did!</h2>");
      $("#counter-number").html(game.counter);
      qna.append("<h3>Correct Answers: " + game.correct + "</h3>");
      qna.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
      qna.append(
        "<h3>Unanswered: " +
          (questions.length - (game.incorrect + game.correct)) +
          "</h3>"
      );
      qna.append('<br><button id="start-over">Start Over?</button>');
    },

    clicked: function(e) {
      clearInterval(timer);

      if (
        $(e.target).data("name") ===
        questions[this.currentQuestion].correctAnswer
      ) {
        this.answeredCorrectly();
      } else {
        this.answeredIncorrectly();
      }
    },

    answeredIncorrectly: function() {
      game.incorrect++;
      clearInterval(timer);
      qna.html("<h2>Wrong!</h2>");
      qna.append(
        "<h3>The Correct Answer was: " +
          questions[game.currentQuestion].correctAnswer +
          "</h3>"
      );
      qna.append('<img src="' + questions[game.currentQuestion].image + '" />');

      if (game.currentQuestion === questions.length - 1) {
        setTimeout(game.results, 3000);
      } else {
        setTimeout(game.nextQuestion, 3000);
      }
    },

    answeredCorrectly: function() {
      clearInterval(timer);
      game.correct++;
      qna.html("<h2>Correct!</h2>");
      qna.append('<img src="' + questions[game.currentQuestion].image + '" />');

      if (game.currentQuestion === questions.length - 1) {
        setTimeout(game.results, 3000);
      } else {
        setTimeout(game.nextQuestion, 3000);
      }
    },

    reset: function() {
      this.currentQuestion = 0;
      this.counter = startNum;
      this.correct = 0;
      this.incorrect = 0;
      this.loadQuestion();
    }
  };
});
