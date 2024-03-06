import { useRef, useState } from "react";

const data = [
  {
    id: 1,
    question: "why1",
    answers: ["a", "b", "c", "d"],
    correctAnswer: 2,
  },
  {
    id: 2,
    question: "why2",
    answers: ["a", "b", "c", "d"],
    correctAnswer: 3,
  },
];

function App() {
  const [getAnswer, setGetAnswer] = useState([]);
  // const [startTime,setStartTime] = useState(null);
  // const [now]
  return (
    <div className="container">
      <Timer />
      <form action="">
        {data.map((item) => {
          return (
            <div key={item.id} className="question">
              <p>{item.question}</p>
              <div className="answers">
                {item.answers.map((ans, index) => {
                  return (
                    <div key={index}>
                      <input
                        type="radio"
                        name="answer"
                        id="answer"
                        value={ans}
                        onClick={(e)=>handleAnswers(item.id,e.target.value)}
                      />
                      <label htmlFor="answer">{ans}</label>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </form>
    </div>
  );
}

export default App;

function Timer() {
  return <div></div>;
}
