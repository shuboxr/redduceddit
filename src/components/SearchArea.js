import './SearchArea.css';
import { SearchBar } from './SearchBar';
import { Filter } from './Filter';

export function SearchArea(props) {
    return (
        <div className="searchArea">
            <SearchBar search={props.search} />
            <Filter filter={props.filter} />
        </div>
    )
}