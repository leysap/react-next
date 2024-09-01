"use client"
import { useEffect, useState } from 'react';

function UserGreeting() {
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        console.log("el nombre es:"+ storedUsername)
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    return (
        <div className="user-greeting text-lg text-gray-900">
            {username ? `Bienvenido/a, ${username}!` : 'Cargando...'}
        </div>
    );
}

export default UserGreeting