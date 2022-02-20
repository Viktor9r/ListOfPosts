import React, { useEffect, useState } from 'react';
import { getPosts } from './api';
import './App.scss';
import { PostsList } from './components/PostsList/PostsList';

export const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  /* const AddPost = (newPost: Post) => {
    if (!posts.some(post => post.id === newPost.id)) {
      setPosts([...posts, newPost]);
    }
  }; */

  const loadPosts = async () => {
    const postsArray = await getPosts();

    setPosts(postsArray);
  };

  useEffect(() => {
    loadPosts();
  }, [setPosts]);

  return (
    <div className="body">
      <div className="title">Posts List</div>
      <div className="page">
        <div className="page-content">
          <PostsList posts={posts} loadPosts={loadPosts} />
        </div>
      </div>
    </div>
  );
};
