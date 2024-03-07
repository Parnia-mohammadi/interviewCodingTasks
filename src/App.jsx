import { useEffect, useRef, useState } from "react";

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
  const [leftTime, setLeftTime] = useState(10);
  const [resultTest, setResultTest] = useState(null);
  const interval = useRef();
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
  const handleSubmit = () => {
    clearInterval(interval.current);
    for (let i = 0; i < data.length; i++) {
      var correctAnswers =
        getAnswer.map((ans) => ans.answer)[i] == data[i].correctAnswer;
      if (correctAnswers) {
        setResultTest((c) => c + 1);
      }
    }
    if(resultTest==null && !correctAnswers){setResultTest(0)};
  };
  useEffect(() => {
    if (getAnswer.length != 0 && leftTime > 0) {
      interval.current = setInterval(() => {
        setLeftTime((t) => t - 1);
      }, 1000);
      return () => {
        clearInterval(interval.current);
      };
    }
  }, [leftTime, getAnswer]);
  if (resultTest != null)
    return (
      <div>
        <h1>{`You have answered ${resultTest} out of ${data.length} questions correctly.`}</h1>
      </div>
    );
  return (
    <div className="container">
      <h1>{leftTime}</h1>
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
                        key={index}
                        required
                        onClick={(e) =>
                          handleAnswer(e.target.value, e.target.name)
                        }
                      />
                      <label htmlFor={index}>{ans}</label>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        {leftTime > 0 ? (
          <button onClick={handleSubmit}>Submit</button>
        ) : (
          <h3>Your time to answer these questions is over. Game Over!!!</h3>
        )}
      </form>
    </div>
  );
}

export default App;
