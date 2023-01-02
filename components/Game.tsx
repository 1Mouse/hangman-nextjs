import { useState, useEffect, useContext } from "react";
import HangmanDrawing from "./HangmanDrawing";
import HangmanWord from "./HangmanWord";
import Keyboard from "./Keyboard";
import Timer from "./Timer"
import getWord from "../lib/getWord";
import axios from "axios"
import AuthContext from "../context/AuthProvider";

import { difficultyAtom } from "../lib/atoms";
import { useAtomValue } from "jotai";
import classifiedWords from "../public/classifiedWords.json"
import { useRouter } from 'next/router';

export default function Game() {
    // @ts-ignore
    const { auth, setAuth } = useContext(AuthContext);


    const router = useRouter();
    const [wordToGuess, setWordToGuess] = useState<string>('test');

    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

    const [gameEnded, setGameEnded] = useState<boolean>(false);

    const [score, setScore] = useState<number>(0);

    const difficulty: string = useAtomValue(difficultyAtom);

    useEffect(() => {
        setWordToGuess(() => getWord(localStorage.getItem("difficulty") || difficulty, classifiedWords));
    }, []);

    function addGuessedLetter(letter: string) {
        if (guessedLetters.includes(letter) || isLoser || isWinner) return;
        setGuessedLetters(currentLetters => [...currentLetters, letter])
    }

    console.log(wordToGuess);
    
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

    const handleEnd = () => {
        setGameEnded(true);
    }

    const updateHighScore = async () => {
        try {
            const response = await axios.put('https://hangman-api-production.up.railway.app/users', {
                "highestScore": score,
            },
                {
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`,
                    }
                }
            );
            // console.log(JSON.stringify(response?.data));
            setAuth({ ...auth, highestScore: response?.data?.highestScore });
            // console.log(auth);
        } catch (err: any) {
            console.log(err);
            if (!err?.response) {
                console.log("no server response");
            } else if (err.response?.status === 401) {
                console.log('invalid token');
            }
            else {
                console.log(err);
            }
        }
    }

    const repeat = () => {
        setWordToGuess(getWord(difficulty, classifiedWords));
        setGuessedLetters([]);
        setScore((prevScore) => prevScore + 1)
    }

    if (isWinner) {
        repeat();
    }

    if (gameEnded || isLoser) {
        // send score here
        if (auth.accessToken&&score > auth.highestScore) {
            updateHighScore();
        }

        return (
            <>
                <div className='paper row flex-center' style={{
                    margin: '0',
                    height: '100vh',
                    overflow: 'hidden',
                    paddingBottom: '150px'
                }}>
                    <p className="col-12 col" style={{ textAlign: "center", fontSize: "4rem", marginBottom: "0px" }}>Your score is:{" "}{score}</p>
                    <button className="btn-success-outline col-6 col" style={{ marginRight: '20px', fontSize: "2rem" }}
                        onClick={
                            () => {
                                router.push('/hangman')
                            }
                        }
                    >
                        Play Again
                    </button>
                    <button className="btn-danger-outline col-6 col" style={{ marginLeft: '20px', fontSize: "2rem" }}
                        onClick={
                            () => {
                                router.push('/')
                            }
                        }
                    >
                        Go to Home
                    </button>
                </div>
            </>
        );
    }
    else {
        return (
            <div
                style={{
                    maxWidth: "800px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                    margin: "0 auto",
                    alignItems: "center",
                    height: '100vh',
                    overflow: 'hidden',
                    paddingBottom: "15px"
                }}
            >
                <Timer reset={handleEnd} />
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
}