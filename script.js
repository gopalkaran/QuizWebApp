const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame) // it will start the game
nextButton.addEventListener('click', () => {  // clicking the next button will cause to next question
  currentQuestionIndex++ // increment the question index.
  setNextQuestion() // "setNextQuestion" call will bring the next question on the screen.
})

function startGame() {
  startButton.classList.add('hide') //hiding the start button
  shuffledQuestions = questions.sort(() => Math.random() - .5) // shuffling the question array
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')// showing the question section
  setNextQuestion()
}

function setNextQuestion() {
  resetState() // reset the whole page before setting new question 
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question //set the question in the question element
  question.answers.forEach(answer => { //loop through the answer array and for each answer, create a button and set the button text
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct //if the particular button is correct then add correct property as true in the dataset of button
    }
    button.addEventListener('click', selectAnswer) // add eventlistener on each button
    answerButtonsElement.appendChild(button) //attach the newly created button on the "answerbuttonelement" div element 
  })
}

function resetState() { 
  clearStatusClass(document.body) // clear status from the html body, this occurs when we click on "Next" button to see next question
  nextButton.classList.add('hide') //hiding the next button 
  while (answerButtonsElement.firstChild) { // looping the all the children one by one on "answerbuttonselement"
    answerButtonsElement.removeChild(answerButtonsElement.firstChild) //removing each children one by one 
  }
}

function selectAnswer(e) {
  const selectedButton = e.target // store that button which is clicked on 
  const correct = selectedButton.dataset.correct // store the correct property value inside correct variable
  setStatusClass(document.body, correct) // set status class to the body that will change the color of the body based on status.
  Array.from(answerButtonsElement.children).forEach(button => { // converting a collections of button element into an array. then looping through array
    setStatusClass(button, button.dataset.correct) // for each button we are setting status based on the correct property of the button's dataset. 
  })                                               // green for correct option , red for wrong options
  if (shuffledQuestions.length > currentQuestionIndex + 1) {//if the currentQuestionIndex is at the question before last question, we will display "Next". (currentQuestionIndex+1) because we started our indexing at 0. [(currentQuestionIndex+1)<shuffledQuestions.length] because we are going till the questions before last questions.
    nextButton.classList.remove('hide') // Remove the "hide" class from the nextButton's classlist to display nextButton on the screen as "Next" 
  } else { // if the currentQuestionIndex is at the last question, we will display "Restart"
    startButton.innerText = 'Restart' // Change the text to "Restart" from "Start".
    startButton.classList.remove('hide') // Remove the "hide" class from the startButton's classlist to display startButton on the Screen as "Restart".
  }
}

function setStatusClass(element, correct) { // set status to particular html element
  clearStatusClass(element) //clear status if it exists, this occurs when we change our options for a particular questions.
  if (correct) { // if the correct value is true (ie. the option selected is correct) then set status to the particular element
    element.classList.add('correct') // add "correct" class to the element's classlist 
  } else {
    element.classList.add('wrong') // add "wrong"  class to the element's classlist
  }
}

function clearStatusClass(element) { // clear status from a particular element
  element.classList.remove('correct') // remove "correct" class from the element's classlist if exists
  element.classList.remove('wrong') // remove "wrong" class from the elements's classlist if exists
}

const questions = [ //questions array contains questions , options , {correct flag indicates true/false}
  {
    question: 'What is 2 + 2?',
    answers: [
      { text: '4', correct: true },
      { text: '22', correct: false }
    ]
  },
  {
    question: 'Who is the best YouTuber?',
    answers: [
      { text: 'Web Dev Simplified', correct: true },
      { text: 'Traversy Media', correct: true },
      { text: 'Dev Ed', correct: true },
      { text: 'Fun Fun Function', correct: true }
    ]
  },
  {
    question: 'Is web development fun?',
    answers: [
      { text: 'Kinda', correct: false },
      { text: 'YES!!!', correct: true },
      { text: 'Um no', correct: false },
      { text: 'IDK', correct: false }
    ]
  },
  {
    question: 'What is 4 * 2?',
    answers: [
      { text: '6', correct: false },
      { text: '8', correct: true }
    ]
  }
]