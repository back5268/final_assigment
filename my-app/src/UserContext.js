import { useState, createContext } from 'react';
const UserContext = createContext();

function UserProvider({ children }) {
    const [ user, setUser ] = useState({});
    const [ moviesData, setMoviesData ] = useState([]);   

    return (
        <UserContext.Provider value={{ user, setUser, moviesData, setMoviesData }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider };