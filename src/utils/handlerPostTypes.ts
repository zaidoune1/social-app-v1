// create posts

import { posts } from "../../types/posts";

export type createPostReq = {
  post: string;
  url: string;
};

export type createPostRes = {
  post: posts;
  message?: string;
};

// delete post

export type deletepostReq = {
  id: string;
};

export type deletepostRes = {
  message: string;
  postObj: posts;
};

// update post

export type updateReq = {
  id: string;
  post: string;
  url: string;
};
export type updateRes = {
  postUpdated: posts;
};
