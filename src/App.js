import React, { useState, useEffect } from 'react';
import { SearchArea } from './components/SearchArea';
import { SearchResults } from './components/SearchResults';
import { PostDetail } from './components/PostDetail';
import './App.css';

function App() {
  /*{
    title: "Christmas is Fun",
    author: "skwidward",
    body: "Christmas is fun because I said so.",
    permalink: "/",
    thumbnail: "../logo192.png",
    ups: 999,
    subreddit: "r/politics",
    created: 1203901243,
    id: "hwiute"
  },
  {
    title: "Christmas is NOT Fun",
    author: "padraig",
    body: "Christmas is NOT fun because I said so.",
    permalink: "/",
    thumbnail: "../logo192.png",
    ups: 9999,
    subreddit: "r/politics",
    created: 1613596000,
    id: "hxiuoe"
  },
  {
    title: "Halloween is Fun and I don't care what you have to say about Christmas you silly silly sea creatures oh my god leave it alone already for crying out loud",
    author: "spungbab",
    body: "Halloween is fun because I said so. Halloween is fun because I said so. Halloween is fun because I said so. Halloween is fun because I said so. Halloween is fun because I said so. Halloween is fun because I said so. Halloween is fun because I said so. Halloween is fun because I said so. Halloween is fun because I said so. Halloween is fun because I said so. Halloween is fun because I said so. ",
    permalink: "/",
    thumbnail: "../logo192.png",
    ups: 19999,
    subreddit: "r/politics",
    created: 1613596500,
    id: "hwiuoe"
  }*/

  const [ posts, setPosts ] = useState(['']);

  const [ filteredPosts, setFilteredPosts ] = useState([]);
  const [ activeFilter, setActiveFilter ] = useState(0);
  const [ activePost, setActivePost ] = useState(null);
  const [ searchTerm, setSearchTerm ] = useState('popular');

  useEffect(() => {
    search('popular');
  }, []);

  const filter = (fil) => {
    const postsToFilter = posts.filter(post => {
      return post.ups > fil;
    })
    setFilteredPosts(postsToFilter);
    setActiveFilter(fil);
  }

  const asyncSearch = async (term) => {
    const response = await fetch(term ==='popular' ? 'https://www.reddit.com/r/popular.json' : `https://www.reddit.com/search.json?q=${term}`);
    const jsonResponse = await response.json();
    const newPosts = await jsonResponse.data.children.map(child => {
      let img = child.data.secure_media === null ? child.data.url_overridden_by_dest : child.data.thumbnail;
      return {
        title: child.data.title,
        author: child.data.author,
        selftext: child.data.selftext,
        permalink: `http://reddit.com/${child.data.permalink}`,
        thumbnail: img,
        ups: child.data.ups,
        subreddit: child.data.subreddit,
        created: child.data.created_utc,
        id: child.data.id
      };
    });
    setPosts(newPosts);
    console.log(newPosts);
  }

  const search = (term) => {
    asyncSearch(term).then(() => {
      setSearchTerm(term);
    });
  }

  useEffect(() => {
    filter(activeFilter);
  }, [posts]);

  const activatePost = (id) => {
    if (activePost) {
      setActivePost(null);
    }
    if (activePost && activePost.id === id) {
      return;
    }
    const foundPost = filteredPosts.find(post => {
      return post.id == id;
    })
    setActivePost(foundPost);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Reduceddit</h1>
        <SearchArea filter={filter} search={search} />
      </header>
      <main>
        <SearchResults posts={filteredPosts} term={searchTerm} filter={activeFilter} activate={activatePost} />
        {activePost ? <PostDetail post={activePost} /> : ''}
      </main>
    </div>
  );
}

export default App;
