
import React, { useState } from 'react';
import { Difficulty, fetchQuizQuestions, QuestionState } from './Api';
import QuestionCard from './Components/QuestionCard/QuestionCard';
import img1 from '../src/img/quiz-logo.png'
export type AnswerObject={
  question:string;
  answer:string;
  correct:boolean;
  correctAnswer:string;
};
 

const Total_Questions=10;
function App() {

 
  const [loading,setLoding]=useState(false);
  const [questions,setQuestions]=useState<QuestionState[]>([]);
  const[number,SetNumber]=useState(0);
  const[userAnswers,setUserAnswers]=useState<AnswerObject[]>([]);
  const[score,SetScore]=useState(0);
  const[gameOver,setGameOver]=useState(true);

  // console.log(questions);
  
  const startTrivia =async () => {
    setLoding(true);
    setGameOver(false);
    const newQuestion= await fetchQuizQuestions( Total_Questions,Difficulty.EASY);
    setQuestions(newQuestion);
    SetScore(0);
    setUserAnswers([]);
    SetNumber(0);
    setLoding(false);

  };
  console.log(questions);
  
   const checkAnswer = (e:React.MouseEvent<HTMLButtonElement>) => {
   if(!gameOver){
    // user answer
      const answer=e.currentTarget.value;
      console.log(answer);
      // check answer
      const correct=questions[number].correct_answer === answer;
      // add score if answer is correct
      if(correct){ SetScore((prev)=> prev +1 );
      
      }
      // save answers in the array of userAnswers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,   
      };
      setUserAnswers((prev) => [...prev, answerObject]);
      
   }
 };

 const nextQuestion = () => {
    const nextQuestion=number+1;
    if(nextQuestion==Total_Questions){
      setGameOver(true);
    }else{
      SetNumber(nextQuestion);
    }
}
  return (
    <>
  <section id='home' className='py-5'>
  <div className="container ">
  <div className="row d-flex justify-content-center">
    <div className="col-lg-6">
    <img src={img1} className='py-5 w-50' alt="" />
 {gameOver || userAnswers.length === Total_Questions? 
 (<div><button className={`start btn px-4 py-1`}  onClick={startTrivia}>Start </button></div>):null}
   
    {!gameOver? <p className='score text-light fs-3 fw-bold pt-2' >Score : {score}</p> :null}
    {loading && <p className='text-light'>Loading Questions .....</p>}
    {!loading&&!gameOver &&(
     <div className="item m-auto py-4 px-3 rounded">
        <QuestionCard 
       questionNr={number+1}
       totalQuestions={Total_Questions}
       question={questions[number].question}
       answers={questions[number].answers}
       userAnswer={userAnswers ? userAnswers[number]: undefined}
       callback={checkAnswer}
       
       />
     </div>
    )}
   {!loading &&!gameOver && userAnswers.length == number+1 && userAnswers.length !== Total_Questions  ? 
   <button className='btn next my-3' onClick={nextQuestion}>Next Question</button>:null}
    </div>
  </div>
   
  </div>
  </section>
  
    </>
  );
}

export default App;
