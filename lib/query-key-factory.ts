import { GetPostsType } from "@/types";

function createQueryKey<T extends readonly unknown[]>(...keys: T): T {
  return keys;
}

const $ = {
  me: {
    all: () => createQueryKey("me"),
    posts: (type: GetPostsType) => createQueryKey("me", "posts", type),
    comments: () => createQueryKey("me", "comments"),
    followers: (query: string) => createQueryKey("me", "followers", query),
  },
  users: {
    all: (username: string) => createQueryKey("users", username),
    search: (query: string) => createQueryKey("users", "search", query),
    comments: (username: string) =>
      createQueryKey("users", username, "comments"),
    posts: (username: string) => createQueryKey("users", username, "posts"),
  },
  posts: {
    all: () => createQueryKey("posts"),
    comments: (id: string) => createQueryKey("posts", id, "comments"),
    top: () => createQueryKey("posts", "top"),
  },
};

const queryKeyFactory = $;

export default queryKeyFactory;
