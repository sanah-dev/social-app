import { CommentProps } from './comment';
import { LikeProps } from './like';
import { TweetProps } from './tweet';

// export interface UserProps {
//   id: number;
//   username: string;
//   password?: string;
//   email?: string;
//   phone?: string;
//   bio?: string;
//   github_id?: string;
//   avatar?: string;
//   created_at: Date;
//   updated_at: Date;
//   tweets?: TweetProps[];
//   likes?: LikeProps[];
//   comments?: CommentProps[];
// }

export interface UserProps {
  id: number;
  username: string;
  password: string | null;
  email: string | null;
  phone: string | null;
  bio: string | null;
  github_id: string | null;
  avatar: string | null;
  created_at: Date;
  updated_at: Date;
}
