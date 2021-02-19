import './SearchBar.css';
import { useState } from 'react';

export function SearchBar(props) {

    const [ term, setTerm ] = useState("");

    const handleClick = (e) => {
        e.preventDefault();
        props.search(term);
    }

    const handleChange = ({target}) => {
        setTerm(target.value);
    }

    const handleEnter = (e) => {
        if (e.keyCode === 13 ) {
            props.search(term);
        }
    }

    return (
        <form className="search-bar">
            <input placeholder="Search Reddit" type="text" onChange={handleChange} onKeyPress={handleEnter} />
            <button className="search-button" onClick={handleClick} >Search</button>
        </form>
    )
}