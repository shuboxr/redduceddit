import React, { useState, useEffect } from 'react';
import { SearchArea } from './components/SearchArea';
import { SearchResults } from './components/SearchResults';
import { PostDetail } from './components/PostDetail';
import './App.css';

function App() {

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

  const search = async (term) => {
    const response = await fetch(term ==='popular' ? 'http://www.reddit.com/r/popular.json' : `http://www.reddit.com/search.json?q=${term}`);
    const jsonResponse = await response.json();
    const newPosts = await jsonResponse.data.children.map(child => {
      let img = '';
      if (child.data.is_reddit_media_domain && child.data.secure_media === null && !child.data.crosspost_parent_list) {
        img = child.data.url_overridden_by_dest
      } else {
        if (child.data.thumbnail != 'default') {
          img = child.data.thumbnail;
        };
      }
      return {
        title: child.data.title,
        author: child.data.author,
        selftext: child.data.selftext.replace(/&amp;#x200B;/g, ' '),
        permalink: `http://reddit.com/${child.data.permalink}`,
        thumbnail: img,
        ups: child.data.ups,
        subreddit: child.data.subreddit,
        created: child.data.created_utc,
        id: child.data.id
      };
    });
    setActivePost(null);
    setSearchTerm(term);
    setPosts(newPosts);
  }

  useEffect(() => {
    filter(activeFilter);
  }, [posts]);

  const activatePost = (id) => {
    if (activePost && activePost.id === id) {
      setActivePost(null);
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
        {activePost ? <PostDetail deactivate={activatePost} post={activePost} /> : ''}
      </main>
    </div>
  );
}

export default App;
