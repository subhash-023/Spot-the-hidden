import { Link } from "react-router-dom";
import styles from "./LevelPicker.module.css";

function LevelPicker({ name, level, id }) {
  return (
    <Link to={`/level/${id}`} className={styles.level__card}>
      <img src={`/levels/${level}/level${level}.jpeg`} alt="level" />
      <h2>{name}</h2>
    </Link>
  );
}

export default LevelPicker;
