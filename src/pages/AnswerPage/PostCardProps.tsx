export interface AnswerDetailProps {
  onClose: () => void;
  nickName: string;
}

export interface PostCardProps {
  answer_id: string;
  nickName: string;
  content: string;
  likeCount: number;
  isWriteAnswer: boolean;
  profileImage: string;
}

export interface HeartButtonProps {
  likeCount: number;
  isLiked: boolean;
}

export interface Answer {
  id: string;
  content: string;
  comments: Comment[];
}

export interface CommentFormProps {}

// export interface Comment {
//   nickName: string;
//   profileImg: string;
//   content: string;
//   createdAt: string;
//   reportCount: string;
// }

export type Comment = {
  _id: string;
  nickName: string;
  profileImage: string;
  content: string;
  createdAt: string;
  reportCount: number;
};
