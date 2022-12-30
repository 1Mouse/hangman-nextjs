import styles from '../styles/Keyboard.module.css'
const KEYS = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
]

type KeyboardProps = {
    rightLetters: string[],
    wrongLetters: string[],
    addGuessedLetter: (letter: string) => void,
    disabled:boolean
}

const Keyboard = ({ rightLetters, wrongLetters, addGuessedLetter,disabled=false }: KeyboardProps) => {
    return (
        <div
            style={
                {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit,minmax(75px,1fr))',
                    gap: '.5rem',
                    alignSelf: 'stretch'
                }
            }
        >
            {KEYS.map(key => {
                const isActive=rightLetters.includes(key);
                const isInactive = wrongLetters.includes(key);
                return (
                    <button
                        key={key}
                        onClick={()=>addGuessedLetter(key)}
                        className={`${styles.btn} ${isActive ? styles.active : ""} ${isInactive ? styles.inactive : ""}`}
                        disabled={isActive||isInactive||disabled}
                    >
                        {key}
                    </button>
                )
            })}
        </div>
    )
}

export default Keyboard;