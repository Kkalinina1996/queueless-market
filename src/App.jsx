import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { questions } from "./data/questions";

function App() {
  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem("surveyAnswers");

    return saved
      ? JSON.parse(saved)
      : {
          shoppingTime: {},
          serviceType: {},
          store: {},
          fee: {},
        };
  });

  useEffect(() => {
    localStorage.setItem("surveyAnswers", JSON.stringify(answers));
  }, [answers]);

  const handleVote = (questionId, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [option]: (prev[questionId][option] || 0) + 1,
      },
    }));
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.badge}>Startup MVP Concept</p>

        <h1>QueueLess Market</h1>

        <p className={styles.subtitle}>
          Reduce supermarket queues and make grocery pickup faster and easier
          in Germany.
        </p>

        <div className={styles.questions}>
          {questions.map((question) => (
            <div key={question.id} className={styles.questionCard}>
              <h2>{question.title}</h2>

              <div className={styles.options}>
                {question.options.map((option) => (
                  <button
                    key={option}
                    className={styles.optionBtn}
                    onClick={() => handleVote(question.id, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className={styles.results}>
                {question.options.map((option) => (
                  <p key={option}>
                    {option}: {answers[question.id][option] || 0}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;