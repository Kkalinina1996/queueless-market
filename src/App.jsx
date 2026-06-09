import styles from "./styles.module.css";

function App() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.badge}>Startup MVP Concept</p>

        <h1>QueueLess Market</h1>

        <p className={styles.subtitle}>
          Reduce supermarket queues and make grocery pickup faster and easier in Germany.
        </p>

        <div className={styles.buttons}>
          <button className={styles.primaryBtn}>Join Waitlist</button>
          <button className={styles.secondaryBtn}>Learn More</button>
        </div>

        <div className={styles.stats}>
          <div className={styles.card}>
            <h2>127</h2>
            <p>Interested Users</p>
          </div>

          <div className={styles.card}>
            <h2>68%</h2>
            <p>Prefer Pickup</p>
          </div>

          <div className={styles.card}>
            <h2>18:00–21:00</h2>
            <p>Peak Shopping Time</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;