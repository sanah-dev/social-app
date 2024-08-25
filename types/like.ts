export interface LikeProps {
  user: {
    id: number;
    username: string;
    avatar?: string;
  };
  tweet: {
    id: number;
    created_at: Date;
    updated_at: Date;
  };
  created_at: Date;
  updated_at: Date;
}
