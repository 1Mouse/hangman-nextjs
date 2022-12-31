type HangmanWordProps = {
    wordToGuess: string,
    guessedLetters: string[],
    reveal: boolean
}

const HangmanWord = ({ wordToGuess, guessedLetters, reveal = false }: HangmanWordProps) => {

    return (
        <div
            style={
                {
                    display: 'flex',
                    gap: '0.25em',
                    fontSize: '5rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    fontFamily: 'monospace',

                }
            }
        >
            {wordToGuess.split('').map((letter, index) =>
                <span
                    key={index}
                    style={
                        {
                            borderBottom: '.1em solid black'
                        }
                    }
                >
                    <span
                        style={
                            {
                                visibility: guessedLetters.includes(letter) || reveal ? 'visible' : 'hidden',
                                color: !guessedLetters.includes(letter) && reveal ? "red" : "black"
                            }
                        }
                    >

                        {letter}
                    </span>
                </span>
            )}
        </div>
    )
}

export default HangmanWord;