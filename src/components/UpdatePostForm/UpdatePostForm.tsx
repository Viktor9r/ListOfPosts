import React, { useState } from 'react';
import { updatePost } from '../../api';
import './UpdatePostForm.scss';

type Props = {
  id: number,
  setUpdatedPostId: React.Dispatch<React.SetStateAction<number>>;
  loadPosts: () => Promise<void>;
};

export const UpdatePostForm: React.FC<Props> = (props) => {
  const {
    id,
    setUpdatedPostId,
    loadPosts,
  } = props;

  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');

  const clearForm = () => {
    setNewBody('');
    setNewTitle('');
  };

  const updatePostInfo = async (event: React.FormEvent) => {
    event.preventDefault();

    await updatePost(id, newTitle, newBody);
    await loadPosts();
    clearForm();
  };

  return (
    <form className="update-post-form" onSubmit={updatePostInfo}>
      <div className="update-post-form__title">
        Update post:
      </div>
      <input
        type="text"
        placeholder="Enter new Title"
        value={newTitle}
        onChange={event => setNewTitle(event.target.value)}
        className="update-post-form__input"
      />
      <input
        type="text"
        placeholder="Enter new Body"
        value={newBody}
        onChange={event => setNewBody(event.target.value)}
        className="update-post-form__input"
      />
      <button
        type="submit"
        className="update-post-form__button"
        onClick={() => setUpdatedPostId(id)}
      >
        Update Info
      </button>
    </form>
  );
};
