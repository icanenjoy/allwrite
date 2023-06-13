export interface AnswerDetailProps {
  answer_id: string;
  content: string;
  onClose: () => void;
}
export interface PostCardProps {
  answer_id: string;
  nickName: string;
  content: string;
}

export interface HeartButtonProps {
  answer_id: string;
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
  nickName: string;
  profileImg: string;
  content: string;
  createdAt: string;
  reportCount: string;
};
