import './SearchArea.css';
import { SearchBar } from './SearchBar';
import { Filter } from './Filter';
import { MobileFilter } from './MobileFilter';

export function SearchArea(props) {
    return (
        <div className="search-area">
            <SearchBar search={props.search} />
            <Filter filter={props.filter} />
            <MobileFilter filter={props.filter} />
        </div>
    )
}