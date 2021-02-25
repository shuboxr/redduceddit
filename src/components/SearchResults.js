import './SearchResults.css';
import { Post } from './Post';

export function SearchResults(props) {
    return (
        <div className="search-results">
            <p>Showing {props.posts.length} Results From <a href="https://www.reddit.com" >Reddit</a> for <em>{props.term}</em> :</p>
            {props.filter != 0 ? <div><span className="filter-text"> with over <span className="number">{props.filter}</span> ups </span></div> : ''}
            <hr/>
            <div className="posts">
                {props.posts.map(post => {
                    return <Post post={post} key={post.id} activate={props.activate}/>
                })}
            </div>
        </div>
    )
}