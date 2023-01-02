import AuthContext from "../context/AuthProvider";
import { useContext } from "react";

const Profile = () => {
    // @ts-ignore
    const { auth } = useContext(AuthContext);

    return (
        <>
            <section>
                <div
                    style={{
                        display: "flex",
                        maxWidth: "500px",
                        margin: "0 auto",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "center",
                    }}
                >
                    <div className="paper container">

                        <article className="article">
                            <h1 className="article-title">Profile</h1>
                            <p className="text-lead">Hi {auth.firstName+' '+auth.lastName}</p>
                        </article><p>I hope you're enjoying our games. Enjoy your stay at porto games and don't forget to visit us to take a break every once in a while</p>
                        <p>Your high score is: {auth.highestScore? auth.highestScore:'0'}</p>
                        </div>
                </div>
            </section>
        </>
    )
}

export default Profile;