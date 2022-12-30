import { useState, useEffect, useCallback } from "react";
import words from '../public/wordList.json'
import HangmanDrawing from "./HangmanDrawing";
import HangmanWord from "./HangmanWord";
import Keyboard from "./Keyboard";

export default function Game() {
    const [wordToGuess, setWordToGuess] = useState<string>('test');

    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

    useEffect(() => {
        setWordToGuess(() => { return words[Math.floor(Math.random() * words.length)]; });
    }, []);

    function addGuessedLetter(letter: string) {
        if (guessedLetters.includes(letter)||isLoser||isWinner) return;
        setGuessedLetters(currentLetters => [...currentLetters, letter])
    }

    useEffect(() => {
        console.log(guessedLetters);

        const handler = (e: KeyboardEvent) => {
            const key = e.key;
            if (!key.match(/^[a-z]$/)) return;
            e.preventDefault();
            addGuessedLetter(key);
        }
        document.addEventListener('keypress', handler);

        return () => {
            document.removeEventListener('keypress', handler);
        }
    }, [guessedLetters])

    const wrongLetters: string[] = guessedLetters.filter(
        letter => !wordToGuess.includes(letter)
    )

    const rightLetters: string[] = guessedLetters.filter(letter => wordToGuess.includes(letter));

    const isLoser: boolean = wrongLetters.length >= 6;
    const isWinner: boolean = wordToGuess.split('').every(letter => guessedLetters.includes(letter));

    return (
        <div
            style={{
                maxWidth: "800px",
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                margin: "0 auto",
                alignItems: "center"
            }}
        >
            <div style={{
                fontSize: '2rem',
                textAlign: 'center'
            }}>
                {isWinner && 'Winner ! - refresh to try again'}
                {isLoser && 'You Lost ! - refresh to try again'}

            </div>
            <HangmanDrawing wrongLetters={wrongLetters} />
            <HangmanWord
                guessedLetters={guessedLetters}
                wordToGuess={wordToGuess}
                reveal={isLoser}
            />
            <Keyboard
                rightLetters={rightLetters}
                wrongLetters={wrongLetters}
                addGuessedLetter={addGuessedLetter}
                disabled={isWinner || isLoser}
            />
        </div>
    );
}