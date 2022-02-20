import React, { useEffect, useState } from 'react';
import { getComments } from '../../api';
import './PostInfo.scss';
import { NewCommentForm } from '../NewCommentForm/NewCommentForm';

type Props = {
  post: Post,
  selectedPostId: number,
};

export const PostInfo: React.FC<Props> = (props) => {
  const { post, selectedPostId } = props;
  const [comments, setComments] = useState<PostComment[]>([]);

  const loadComments = async () => {
    const commentsFromServer = await getComments(selectedPostId);

    setComments(commentsFromServer);
  };

  useEffect(() => {
    loadComments();
  }, [selectedPostId]);

  return (
    <div className="post-info">
      <div className="post-info__id">
        <span className="post-info--title">Post id:</span>
        {' '}
        {post.id}
      </div>

      <div className="post-info__body">
        <span className="post-info--title">Body:</span>
        {' '}
        {post.body}
      </div>

      <ul className="post-info__comments-list">
        <div className="post-info__comments-title">Comments:</div>
        {comments.map(comment => (
          <li key={comment.id} className="post-info__comment">
            {comment.body}
          </li>
        ))}
      </ul>

      <div className="post-info__add-comment-form">
        <NewCommentForm
          selectedPostId={selectedPostId}
          loadComments={loadComments}
        />
      </div>
    </div>
  );
};
