/**
 * Response model for a post from GET /posts/{id} or POST /posts.
 * JSONPlaceholder returns flat objects (no wrapper).
 */
export interface PostResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
}

/**
 * Response model for a comment from GET /comments or /posts/{id}/comments.
 */
export interface CommentResponse {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

/**
 * Response model for a user from GET /users/{id}.
 * JSONPlaceholder user has nested address, company, and geo objects.
 */
export interface UserResponse {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address?: AddressInfo;
  company?: CompanyInfo;
}

export interface AddressInfo {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

export interface CompanyInfo {
  name: string;
  catchPhrase: string;
  bs: string;
}

/**
 * Response model for a todo from GET /todos or /todos/{id}.
 */
export interface TodoResponse {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
