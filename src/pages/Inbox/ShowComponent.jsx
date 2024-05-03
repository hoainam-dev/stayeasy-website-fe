import React, { useState, createContext } from 'react';
export const ShowContext = createContext();


export default function ShowComponent({ children }) {
    const [active, setActive] = useState(true)
    function changeActive(params) {
        setActive(!active)
    }
    return (
        <ShowContext.Provider value={{ active ,changeActive }}>
            {children}
        </ShowContext.Provider>
    )
}
