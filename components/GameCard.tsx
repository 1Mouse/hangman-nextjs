import { useRouter } from 'next/router';
import AuthContext from "../context/AuthProvider";
import { useContext } from "react";

const GameCard = () => {
    const router = useRouter();
    // @ts-ignore
    const { auth } = useContext(AuthContext);

    return (
        <div className="card" style={{ width: "20rem" }}>
            <img src="hangman.png" alt="Hangman" />

            <div className="card-body">
                <h4 className="card-title">Hangman</h4>
                <p className="card-text">Hangman is a classic pen and paper game where You try to guess words with very few attempts</p>
                <button 
                    className="btn-success-outline"
                    onClick={
                        () => { 
                            if(auth.accessToken){
                                router.push('/hangman')
                        } else{
                                router.push('/register')
                            } 
                        }
                    }

                >
                    Let play!
                </button>
            </div>
        </div>
    )
}

export default GameCard