import { useRouter } from 'next/router';

const GameCard = () => {
    const router = useRouter();

    return (
        <div className="card" style={{ width: "20rem" }}>
            <img src="hangman.png" alt="Hangman" />

            <div className="card-body">
                <h4 className="card-title">Hangman</h4>
                <p className="card-text">Hangman is a classic pen and paper game where You try to guess words with very few attempts</p>
                <button className="btn-success-outline" onClick={() => router.push('/hangman')}>Let play!</button>
            </div>
        </div>
    )
}

export default GameCard