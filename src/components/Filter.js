import './Filter.css';

export function Filter(props) {
    const handleChange = ({target}) => {
        props.filter(target.value);
    }

    return (
        <div className="filter">
            <form>
                <div className="filter-option">
                    <input name="filter" onChange={handleChange} defaultChecked value={0} id="0k" type="radio" />
                    <label htmlFor="0k">no filter</label>
                </div>
                <div className="filter-option">
                    <input name="filter" onChange={handleChange} value={1000} id="1k" type="radio" />
                    <label htmlFor="1k">1k+ ups</label>
                </div>
                <div className="filter-option">
                    <input name="filter" onChange={handleChange} value={10000} id="10k" type="radio" />
                    <label htmlFor="10k">10k+ ups</label>
                </div>
                <div className="filter-option">
                    <input name="filter" onChange={handleChange} value={20000} id="20k" type="radio" />
                    <label htmlFor="20k">20k+ ups</label>
                </div>
            </form>
        </div>
    )
}