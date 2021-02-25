import './Filter.css';

export function MobileFilter(props) {
    const handleChange = ({target}) => {
        props.filter(target.value);
    }

    return (
        <div className="mobile-filter">
                <label htmlFor="filter">Apply Filter:</label>
                <select name="filter" id="filter" onChange={handleChange}>
                    <option value={0}>no filter</option>
                    <option value={1000}>1k+ ups</option>
                    <option value={10000}>10k+ ups</option>
                    <option value={20000}>20k+ ups</option>
                </select>
        </div>
    )
}