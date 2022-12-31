import { useAtom } from "jotai";
import { difficultyAtom } from "../lib/atoms";
import { useRouter } from "next/router";

const SelectDifficulty = () => {
    const router = useRouter();
    const [difficulty, setDifficulty] = useAtom(difficultyAtom);

    return (
        <>
            <h1>Choose Difficulty</h1>
            <div className='row flex-center'>
                <button className="btn-secondary" style={{ width: '51%', marginTop: '20px' }}
                    onClick={
                        () => {
                            setDifficulty('easy');
                            // localStorage.setItem('difficulty','easy');
                            router.push('hangman/play')
                        }
                    }
                >
                    Easy
                </button>
                <button className="btn-warning" style={{ width: '51%', marginTop: '40px' }}
                    onClick={
                        () => {
                            setDifficulty('medium');
                            // localStorage.setItem('difficulty', 'medium');
                            router.push('hangman/play')
                        }
                    }
                >
                    Medium
                </button>
                <button className="btn-danger" style={{ width: '51%', marginTop: '40px' }}
                    onClick={
                        () => {
                            setDifficulty('hard');
                            // localStorage.setItem('difficulty', 'hard');
                            router.push('hangman/play')
                        }
                    }
                >
                    Hard
                </button>
            </div>
        </>
    )
}



export default SelectDifficulty