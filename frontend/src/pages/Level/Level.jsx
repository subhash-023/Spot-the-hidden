import { useState, useEffect } from "react";
import { useParams, Link, useNavigate} from "react-router-dom"
import Confetti from "react-confetti";
import { getLevel, addToLeaderBoard} from "../../api/api"
import styles from "./Level.module.css"

function Level() {
    const { id } = useParams();
    const [level, setLevel] = useState([]);
    const [levelStarted, setLevelStarted] = useState(false)
    const [loading, setLoading] = useState(true)
    const [selectedCoords, setSelectedCoords] = useState(null)
    const [targetCoords, setTargetCoords] = useState([])
    const [clicked, setClicked] = useState(false)
    const [foundTargets, setFoundTargets] = useState([]);
    const [timer, setTimer] = useState(0)
    const [intervalId, setIntervalID] = useState(null)
    const [correctAudio] = useState(new Audio("/correct.mp3"))
    const [wrongAudio] = useState(new Audio("/wrong.mp3"))
    const [winAudio] = useState(new Audio("/win.mp3"));
    const [gameEnded, setGameEnded] = useState(false)
    const [name, setName] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const fetchLevel = async (id) => {
            try {
                setLoading(true);
                const data = await getLevel(id);
                setLevel(data.level)
                setTargetCoords([
                    {x: data.level.obj1X, y: data.level.obj1Y},
                    {x: data.level.obj2X, y: data.level.obj2Y},
                    {x: data.level.obj3X, y: data.level.obj3Y}
                ])
            } catch (error) {
                console.error("Error fetching level data")
                throw error
            } finally {
                setTimeout(() => {
                    setLoading(false)
                }, 500)
            }
        }
        fetchLevel(id)
    }, []);

    const startLevel = () => {
        setLevelStarted(true);
        setTimer(0);

        const newIntervalId = setInterval(() => {
            setTimer((prev) => prev + 1)
        }, 1000)
        setIntervalID(newIntervalId)
    };

    useEffect(() => {
        if(foundTargets.length === targetCoords.length && intervalId) {
            clearInterval(intervalId)
            setIntervalID(null)
            setGameEnded(true)
            winAudio.play()
        }
    }, [foundTargets]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60)
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`
    }

    const handleImageClick = (e) => {
        const rect = e.target.getBoundingClientRect()
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        const xPercent = clickX / rect.width;
        const yPercent = clickY / rect.height;
        console.log("x:", xPercent, "y:", yPercent)
        const selectorWidth = 140;
        const selectorHeight = 204;
        const padding = 50;

        let posX = e.pageX;
        let posY = e.pageY;

        if(posX + selectorWidth > window.innerWidth) {
            posX = window.innerWidth - selectorWidth - padding;
        }

        if(posY + selectorHeight > window .innerHeight + window.scrollY) {
            posY = window.innerHeight + window.scrollY - selectorHeight - padding;
        }

        setSelectedCoords({
            xPercent,
            yPercent,
            x: posX,
            y: posY
        })
    }

    const toggleSelector = () => {
        setClicked((prev) => !prev);
    };

    const selectObj = (n) => {
        setClicked(false);
        compareCoords(n)
        console.log(foundTargets)
    }

    const compareCoords = (n) => {
        const target = targetCoords[n - 1]
        const isXMatch = Math.abs(selectedCoords.xPercent - target.x) <= 0.05;
        const isYmatch = Math.abs(selectedCoords.yPercent - target.y) <= 0.05;
        if(isXMatch && isYmatch) {
            setFoundTargets((prev) => [...prev, n]);
            correctAudio.play()
            return
        }
        wrongAudio.play()
    }

    const handleSubmitScore = async (e) => {
        e.preventDefault()
        if (name.length >= 1) {
            try {
                await addToLeaderBoard(id, name, formatTime(timer))
                navigate(`/leaderboard/${id}`)
            } catch (error) {
                console.error("Error adding to leaderboard:", error)
            }
        }
    }

    return (
        <section className={styles.main__cont}>
      {loading && <span className={styles.loader}></span>}
      {!levelStarted && !loading && (
        <div className={styles.preLevel__cont}>
          <h1>{level.name}</h1>
          <span>Items to find:</span>
          <div className={styles.field}>
            <img src={`/levels/${level.level}/obj1.png`} alt="object" />
            <h2>{level.obj1Name}</h2>
          </div>
          <div className={styles.field}>
            <img src={`/levels/${level.level}/obj2.png`} alt="object" />
            <h2>{level.obj2Name}</h2>
          </div>
          <div className={styles.field}>
            <img src={`/levels/${level.level}/obj3.png`} alt="object" />
            <h2>{level.obj3Name}</h2>
          </div>
          <button onClick={() => startLevel()} className={styles.button}>
            Start
          </button>
        </div>
      )}
      {levelStarted && !loading && !gameEnded && (
        <div className={styles.image__cont}>
          <div className={styles.timer}>{formatTime(timer)}</div>
          <div className={styles.previews}>
            <div className={styles.preview}>
              <img src={`/levels/${level.level}/obj1.png`} alt="object" />
              <h3 className={foundTargets.includes(1) ? styles.found : ""}>
                {level.obj1Name}
              </h3>
            </div>
            <div className={styles.preview}>
              <img src={`/levels/${level.level}/obj2.png`} alt="object" />
              <h3 className={foundTargets.includes(2) ? styles.found : ""}>
                {level.obj2Name}
              </h3>
            </div>
            <div className={styles.preview}>
              <img src={`/levels/${level.level}/obj3.png`} alt="object" />
              <h3 className={foundTargets.includes(3) ? styles.found : ""}>
                {level.obj3Name}
              </h3>
            </div>
          </div>
          <img
            src={`/levels/${level.level}/level${level.level}.jpeg`}
            alt="level"
            onClick={(e) => {
              handleImageClick(e);
              toggleSelector();
            }}
          />
          <Link to="/" className={styles.button}>
            Exit
          </Link>
        </div>
      )}
      {clicked && !loading && (
        <div
          className={styles.selector__cont}
          style={{
            left: selectedCoords.x + 30 + "px",
            top: selectedCoords.y + 30 + "px",
          }}
        >
          <div
            onClick={() => {
              selectObj(1);
            }}
          >
            <img src={`/levels/${level.level}/obj1.png`} alt="object" />
            <h3 className={foundTargets.includes(1) ? styles.found : ""}>
              {level.obj1Name}
            </h3>
          </div>
          <div
            onClick={() => {
              selectObj(2);
            }}
          >
            <img src={`/levels/${level.level}/obj2.png`} alt="object" />
            <h3 className={foundTargets.includes(2) ? styles.found : ""}>
              {level.obj2Name}
            </h3>
          </div>
          <div
            onClick={() => {
              selectObj(3);
            }}
          >
            <img src={`/levels/${level.level}/obj3.png`} alt="object" />
            <h3 className={foundTargets.includes(3) ? styles.found : ""}>
              {level.obj3Name}
            </h3>
          </div>
        </div>
      )}
      {gameEnded && !loading && (
        <section className={styles.winCont}>
          <Confetti />
          <h2>Good job!</h2>
          <p>
            You finished {level.name} in {formatTime(timer)}!
          </p>
          <p>
            Enter your name for the leaderboards:{" "}
            <input
              type="text"
              className={styles.input}
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </p>
          <button
            className={styles.button}
            disabled={name.length < 1}
            onClick={handleSubmitScore}
          >
            Continue
          </button>
        </section>
      )}
    </section>
    );
}

export default Level;
