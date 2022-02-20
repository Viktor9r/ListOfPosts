import React, { useState } from 'react';
import { addComment } from '../../api';
import './NewCommentForm.scss';

type Props = {
  selectedPostId: number,
  loadComments: () => Promise<void>,
};

export const NewCommentForm: React.FC<Props> = (props) => {
  const { loadComments, selectedPostId } = props;

  const [comment, setComment] = useState('');

  const clearForm = () => {
    setComment('');
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    await addComment(selectedPostId, comment);
    await loadComments();
    clearForm();
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="new-comment-form"
    >
      <div className="new-comment-form__field">
        <input
          onChange={event => setComment(event.target.value)}
          value={comment}
          type="text"
          name="name"
          placeholder="Your comment"
          className="new-comment-form__input"
        />
        <button
          type="submit"
          className="new-comment-form__submit-button"
        >
          Add a comment
        </button>
      </div>
    </form>
  );
};
