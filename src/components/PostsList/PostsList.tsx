import React, { useEffect, useState } from 'react';
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from '../../api';
import { PostInfo } from '../PostInfo/PostInfo';
import './PostList.scss';
import { UpdatePostForm } from '../UpdatePostForm/UpdatePostForm';

type Props = {
  posts: Post[],
  loadPosts: () => Promise<void>
};

export const PostsList: React.FC<Props> = (props) => {
  const { posts, loadPosts } = props;
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [updatedPostId, setUpdatedPostId] = useState(0);

  const clearForm = () => {
    setNewTitle('');
    setNewBody('');
  };

  const addPost = async (event: React.FormEvent) => {
    event.preventDefault();

    await createPost(newTitle, newBody);
    await getPosts();
    await updatePost(updatedPostId, newTitle, newBody);

    clearForm();
  };

  useEffect(() => {
    loadPosts();
  }, [updatedPostId]);

  const removePost = async (postId: number) => {
    await deletePost(postId);
    await loadPosts();
  };

  return (
    <div className="posts">
      <form className="create-post" onSubmit={addPost}>
        <div className="create-post__title">Add new Post:</div>
        <input
          placeholder="Enter Title"
          className="create-post__input"
          type="text"
          value={newTitle}
          name="title"
          onChange={event => setNewTitle(event.target.value)}
          required
        />

        <input
          placeholder="Enter Body"
          className="create-post__input"
          name="body"
          value={newBody}
          onChange={event => setNewBody(event.target.value)}
          required
        />

        <button
          type="submit"
          className="create-post__submit-button"
          onClick={addPost}
        >
          Add a post
        </button>
      </form>

      <ul className="posts__list">
        {posts.map(post => (
          <li key={post.id} className="posts__item">
            <div className="posts__title">
              <span className="posts__title--start">Title:</span>
              {' '}
              {post.title}
            </div>
            <div className="posts__hood-buttons-block">
              {selectedPostId === post.id
                ? (
                  <>
                    <button
                      type="button"
                      className="posts__hood-button"
                      onClick={() => setSelectedPostId(0)}
                    >
                      Hide post info
                    </button>
                    {selectedPostId === post.id
                    && <PostInfo post={post} selectedPostId={selectedPostId} />}
                    <UpdatePostForm
                      loadPosts={loadPosts}
                      setUpdatedPostId={setUpdatedPostId}
                      id={post.id}
                    />
                  </>
                )
                : (
                  <button
                    type="button"
                    className="posts__hood-button posts__hood-button--show"
                    onClick={() => setSelectedPostId(post.id)}
                  >
                    Show post info
                  </button>
                )}

              <button
                type="button"
                className="posts__hood-button"
                onClick={() => removePost(post.id)}
              >
                Delete post
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
