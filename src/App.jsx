import { useRef, useState } from "react";

const data = [
  {
    id: 1,
    question: "question1",
    answers: ["a1", "b1", "c1", "d1"],
    correctAnswer: "b1",
  },
  {
    id: 2,
    question: "question2",
    answers: ["a2", "b2", "c2", "d2"],
    correctAnswer: "c2",
  },
];

function App() {
  const [getAnswer, setGetAnswer] = useState([]);
  const handleAnswer = (answer, id) => {
    if (getAnswer.map((ans) => ans.id).includes(id)) {
      const newAns = getAnswer.map((ans) =>
        ans.id == id ? { ...ans, answer } : ans
      );
      setGetAnswer(newAns);
    } else {
      setGetAnswer((prev) => [...prev, { answer, id }]);
    }
  };
  console.log(getAnswer);
  return (
    <div className="container">
      <form>
        {data.map((item) => {
          return (
            <div className="question" key={item.id}>
              <p>{item.question}</p>
              <div className="answers">
                {item.answers.map((ans, index) => {
                  return (
                    <div>
                      <input
                        type="radio"
                        name={item.id}
                        id={index}
                        value={ans}
                        onClick={(e) => handleAnswer(e.target.value, e.target.name)}
                      />
                      <label htmlFor={index}>{ans}</label>
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
