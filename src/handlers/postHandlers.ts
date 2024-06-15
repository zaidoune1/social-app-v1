import { posts } from "../../types/posts";
import { ExpressHandlers } from "../utils/ExpressHandlers";
import { db } from "../utils/dbCall";
import { handelError } from "../utils/handelFields";
import {
  createPostReq,
  createPostRes,
  deletepostReq,
  deletepostRes,
  updateReq,
  updateRes,
} from "../utils/handlerPostTypes";
import { veryficationUserId } from "../utils/verificationUserId";

export const createPost: ExpressHandlers<createPostReq, createPostRes> = async (
  req,
  res
) => {
  const postFieldEmpty = handelError(req.body);

  const { post, url } = req.body;
  if (postFieldEmpty.length > 0) {
    return res
      .status(400)
      .json({ error: `all fields required ${postFieldEmpty.join(" and ")}` });
  }

  const getuserId = await veryficationUserId(res.locals.userId);

  if (!getuserId) throw Error("not authorised");

  const getPostObj: any = {
    id: crypto.randomUUID(),
    userId: res.locals?.userId,
    post,
    url: url,
    postedAt: new Date().getTime().toString(),
  };

  await db.addPost(getPostObj);

  return res.status(200).json({ post: getPostObj, message: "post created" });
};

export const deletePost: ExpressHandlers<deletepostReq, deletepostRes> = async (
  req,
  res
) => {
  const { id } = req.body;
  const getuserId = await veryficationUserId(res.locals.userId);

  if (!getuserId || !id) return res.status(400).json({ error: "bad request" });
  const postObj: any = await db.getOnePost(id);

  if (!postObj || postObj.userId !== getuserId)
    return res.status(400).json({ error: "not authorised" });

  await db.deletePosts(id);

  return res.status(200).json({ message: "poste deleted", postObj });
};

export const getAllPosts: ExpressHandlers<any, any> = async (req, res) => {
  const getuserId = await veryficationUserId(res.locals.userId);

  if (!getuserId) return res.status(400).json({ error: "bad request" });

  const posts = await db.getAllPostes();

  return res.status(200).json({ posts });
};

export const updatePosts: ExpressHandlers<updateReq, updateRes> = async (
  req,
  res
) => {
  const { id, post, url } = req.body;

  const handelFields = handelError(req.body);

  if (handelFields.length > 0) {
    res.json({ error: `all fields required ${handelFields.join(" and ")}` });
  }
  const getUser = await veryficationUserId(res.locals.userId);

  const getPost = await db.getOnePost(id as string);

  if (!getUser || !getPost)
    return res.status(400).json({ error: "bad request" });

  if (getPost.userId !== getUser)
    return res.status(400).json({ error: "bad request" });

  const postUpdated: any = {
    id: getPost.id,
    userId: getUser,
    post,
    url,
    postedAt: new Date(),
  };

  await db.updatePost(getPost.id, postUpdated);

  return res.status(200).json({ postUpdated });
};
