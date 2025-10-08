export type Post = {
  id?: number;
  title: string;
  content: string;
  createdAt?: Date;
};

export type User = {
  id: number;
  email: string;
};
