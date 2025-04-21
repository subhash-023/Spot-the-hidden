import styles from "./LeaderBoardRow.module.css";

function LeaderboardRow({ name, time, index }) {
  return (
    <li className={styles.field}>
      <span className={styles.position}>{index + 1}.</span>
      <span className={styles.name}>{name}</span>
      <span className={styles.time}>{time}</span>
    </li>
  );
}

export default LeaderboardRow;
