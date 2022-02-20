const url = 'https://bloggy-api.herokuapp.com';

export async function getPosts(): Promise<Post[]> {
  const response = await fetch(`${url}/posts`);

  return response.json();
}

export async function getComments(postId: number): Promise<PostComment[]> {
  const response = await fetch(`${url}/comments?postId=${postId}`);

  return response.json();
}

export async function addComment(postId: number, body: string):Promise<PostComment> {
  const response = await fetch(`${url}/comments`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      postId,
      body,
    }),
  });

  return response.json();
}

export async function createPost(title: string, body: string): Promise<Post> {
  const response = await fetch(`${url}/posts`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      title,
      body,
    }),
  });

  return response.json();
}

export async function deletePost(id: number) {
  const response = await fetch(`${url}/posts/${id}`, {
    method: 'DELETE',
  });

  return response.json();
}

export async function updatePost(
  id: number,
  title: string,
  body: string,
) {
  const response = await fetch(`${url}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      title,
      body,
    }),
  });

  return response.json();
}
