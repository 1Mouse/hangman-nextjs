
import AuthContext from "../context/AuthProvider";
import { useEffect, useContext, useState } from "react";
import axios from "axios";

const Profile = () => {
    // @ts-ignore
    const { auth } = useContext(AuthContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get('https://hangman-api-production.up.railway.app/users',
                    {
                        headers: {
                            Authorization: `Bearer ${auth.accessToken}`,
                        }
                    }
                );
                // console.log(JSON.stringify(response?.data));
                setUsers(response.data)
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
        getUsers();
    }, []);

    return (
        <>
            <table style={
                {
                    marginTop: '1rem',
                    marginBottom: '9rem'
                }
            }>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Highest Score</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: any) => (
                        <tr key={user._id}>
                            {/* @ts-ignore */}
                            <td>{users.indexOf(user) + 1}</td>
                            <td>{user.firstName + ' ' + user.lastName}</td>
                            <td>{user.highestScore}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </>
    )
}

export default Profile;