import './Post.css';

export function Post(props) {

    const handleClick = () => {
        props.activate(props.post.id);
    }

    const getTime = () => {
        let postUTC = props.post.created;
        if (!postUTC) return '';
        let now = new Date(Date.now());
        let diff = Math.floor(now/1000) - postUTC;
        
        if (diff < 60) return diff + "s ago";
        if (diff < 3600) return Math.floor(diff / 60) + "m ago";
        if (diff < 86400) return Math.floor(diff / 3600) + "h ago";

        let postDate = new Date(postUTC*1000);

        let yearsAgo = now.getFullYear() - postDate.getFullYear();
        if (yearsAgo > 0) return yearsAgo + "y ago";

        let monthsAgo = now.getMonth() - postDate.getMonth();
        if (monthsAgo > 0) return monthsAgo + "mo ago";

        return Math.floor(diff / 86400) + "d ago";
    }

    const ago = getTime();

    return (
        <div className="post" onClick={handleClick}>
            <span className="ups">&uarr;{props.post.ups < 10000 ? props.post.ups : (props.post.ups/1000).toFixed(1)+"K"}</span>
            <span className="title">{props.post.title}</span>
            <span className="time">{ago}</span>
            {props.post.selftext ? <span className="body">"{props.post.selftext}"</span> : ''}
        </div>
    )
}