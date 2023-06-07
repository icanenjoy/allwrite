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

export interface Comment {
  id: string;
  content: string;
  user: {
    name: string;
    profilePicture: string;
  };
}

export interface Answer {
  content: string;
  comments: Comment[];
}
