import { posts } from "../../types/posts";
import { ExpressHandlers } from "../utils/ExpressHandlers";
import { db } from "../utils/dbCall";
import { createPostReq, createPostRes } from "../utils/handlerUserTypes";
import { veryficationUserId } from "../utils/verificationUserId";

export const createPost: ExpressHandlers<createPostReq, createPostRes> = async (
  req,
  res
) => {
  const { post, url } = req.body;
  if (!post || !url)
    return res.status(400).json({ error: "post and url is required" });

  const getuserId = await veryficationUserId(res.locals.userId);

  if (!getuserId) throw Error("not authorised");

  const getPostObj: posts = {
    id: crypto.randomUUID(),
    userId: res.locals?.userId,
    post,
    url: url,
    postedAt: new Date().getTime().toString(),
  };

  await db.addPost(getPostObj);

  return res.status(200).json({ post: getPostObj, message: "post created" });
};
