import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { questions } from "./data/questions";
import { supabase } from "./lib/supabase";

function App() {
  const [answers, setAnswers] = useState({
    shoppingTime: {},
    serviceType: {},
    store: {},
    fee: {},
  });

  const fetchVotes = async () => {
    const { data, error } = await supabase
      .from("votes")
      .select("*");

    if (error) {
      console.log(error);
      return;
    }

    const grouped = {
      shoppingTime: {},
      serviceType: {},
      store: {},
      fee: {},
    };

    data.forEach((vote) => {
      grouped[vote.question][vote.answer] =
        (grouped[vote.question][vote.answer] || 0) + 1;
    });

    setAnswers(grouped);
  };

  useEffect(() => {
    // schedule fetch on next tick to avoid calling setState synchronously within the effect
    const id = setTimeout(() => {
      fetchVotes();
    }, 0);
    return () => clearTimeout(id);
  }, []);

  const handleVote = async (questionId, option) => {
    const { error } = await supabase
      .from("votes")
      .insert([
        {
          question: questionId,
          answer: option,
        },
      ]);

    if (error) {
      console.log(error);
      return;
    }

    fetchVotes();
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.badge}>
          Startup MVP Concept
        </p>

        <h1>QueueLess Market</h1>

        <p className={styles.subtitle}>
          Reduce supermarket queues and make
          grocery pickup faster and easier
          in Germany.
        </p>

        <div className={styles.questions}>
          {questions.map((question) => (
            <div
              key={question.id}
              className={styles.questionCard}
            >
              <h2>{question.title}</h2>

              <div className={styles.options}>
                {question.options.map((option) => (
                  <button
                    key={option}
                    className={styles.optionBtn}
                    onClick={() =>
                      handleVote(
                        question.id,
                        option
                      )
                    }
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className={styles.results}>
                {question.options.map((option) => (
                  <p key={option}>
                    {option}:{" "}
                    {answers[question.id]?.[
                      option
                    ] || 0}
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