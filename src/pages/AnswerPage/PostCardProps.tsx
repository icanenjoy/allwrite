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

export interface CommentFormProps {
  answer_id: string;
}
