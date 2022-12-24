
import React from 'react'
import { AnswerObject } from '../../App'


type props={
  question:string;
  answers:string[];
  callback: (e:React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer:AnswerObject | undefined;
  questionNr:number;
  totalQuestions:number;
}

const QuestionCard:React.FC<props> =({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions})=> (
    
<> 

<p className='number'>Question:{questionNr}/{totalQuestions}</p>
<p dangerouslySetInnerHTML={{__html:question}}></p>
<div>{answers.map((answer) => <div key={answer}>
  <button  className={`btn choose mt-2 text-light ${userAnswer?.correctAnswer==answer? "correct":userAnswer?.correctAnswer != answer&&userAnswer?.answer==answer ? "incorrect":'choose'}`} disabled={userAnswer ? true :false} value={answer} onClick={callback}>
  <span dangerouslySetInnerHTML={{__html:answer}}></span></button> </div>)} </div>
</>
);
export default QuestionCard;
