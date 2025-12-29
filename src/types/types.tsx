export type User = {
  id?: number;
  email: string;
  password: string;
  avatar?: string;
  name: string;
};

export type Category = {
  id?: number;
  name: string;
};

export type Post = {
  id?: number;
  title: string;
  content: string;
  slug: string;
};

export type Tag = {
  id?: number;
  name: string;
};
