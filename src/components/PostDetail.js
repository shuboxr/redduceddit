import './PostDetail.css';

export function PostDetail(props) {

    const getTime = () => {
        let postUTC = props.post.created;
        let now = new Date(Date.now());
        let diff = Math.floor(now/1000) - postUTC;
        
        if (diff < 60) return diff + "s ago";
        if (diff < 3600) return Math.floor(diff / 60) + "m ago";
        if (diff < 86400) return Math.floor(diff / 3600) + "h ago";

        let postDate = new Date(postUTC);

        let yearsAgo = now.getFullYear() - postDate.getFullYear();
        if (yearsAgo > 0) return yearsAgo + "y ago";

        let monthsAgo = now.getMonth() - postDate.getMonth();
        if (monthsAgo > 0) return monthsAgo + "mo ago";

        return Math.floor(diff / 86400) + "d ago";
    }

    const ago = getTime();

    return (
        <div className="post-detail">
            <header className="detail-header">
                <h2>
                    {props.post.title}
                </h2>
            </header>
            <p className="detail-time">
                {ago + " by "}<a href={`http://reddit.com/u/${props.post.author}`}>{props.post.author}</a>{" "}
            </p>
            <p className="detail-time">
                <span className="detail-ups"> &uarr;{props.post.ups + " - "}</span>
                <a alt="" href={props.post.permalink} >View on Reddit</a>
            </p>
            {props.post.thumbnail != "self" ? <div className="thumbnail">
                    <a className="thumbnail-link" href={props.post.permalink} ><img src={props.post.thumbnail} /></a>
            </div> : ''}
            {props.post.selftext ? <pre className="detail-body">{props.post.selftext}</pre> : ''}
        </div>
    )
}