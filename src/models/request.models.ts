/**
 * Request model for creating a new post via POST /posts.
 */
export interface CreatePostRequest {
  title: string;
  body: string;
  userId: number;
}

/**
 * Request model for updating a post via PUT/PATCH /posts/{id}.
 */
export interface UpdatePostRequest {
  title: string;
  body: string;
  userId: number;
}

/**
 * Request model for updating a user via PUT/PATCH /users/{id}.
 */
export interface UpdateUserRequest {
  name: string;
  job: string;
}
