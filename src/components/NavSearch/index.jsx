import { useEffect, useState } from "react";
import "./styles.sass";

export const NavSearch = ({ handleSearch }) => {
    const [search, setSearch] = useState('');

    useEffect(() => {
        handleSearch(search)
    }, [search])

    return (
        <div className="search_input-wrapper">
            <input
                type="text"
                className="search-input"
                placeholder="Find the book you need"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            />
            <button className="clear-input" onClick={() => setSearch("")}></button>
        </div>
    )
};
