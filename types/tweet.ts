export interface TweetProps {
  id: number;
  tweet: string;
  created_at: Date;
  updated_at?: Date;
  user: {
    username: string;
    avatar: string | null;
  };
  _count: {
    likes: number;
    comments: number;
  };
}

// export interface TweetProps {
//   user: {
//     id: number;
//     username: string;
//     avatar: string | null;
//   };
//   id: number;
//   created_at: Date;
//   updated_at: Date;
//   likes: {
//     user: {
//       id: number;
//       username: string;
//       avatar: string | null;
//     };
//     created_at: Date;
//     updated_at: Date;
//   }[];
//   comments: {
//     user: {
//       id: number;
//       username: string;
//       avatar: string | null;
//     };
//     id: number;
//     created_at: Date;
//     updated_at: Date;
//     payload: string;
//   }[];
//   tweet: string;
// }
