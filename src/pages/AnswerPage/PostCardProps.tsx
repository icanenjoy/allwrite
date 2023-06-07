export interface AnswerDetailProps {
  answer_id: string;
  content: string;
  onClose: () => void;
}
export interface PostCardProps {
  answer_id: string;
  nick_name: string;
  content: string;
}

export interface HeartButtonProps {
  answer_id: string;
}
