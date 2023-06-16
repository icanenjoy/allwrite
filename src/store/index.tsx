import { legacy_createStore as createStore } from "redux";

// 초기 상태 정의
export interface RootState {
  questionId: string | null;
  answerId: string | null;
  nickName: string | null;
}

// 액션 타입 정의
interface SetQuestionIdAction {
  type: "SET_QUESTION_ID";
  payload: string;
}

interface SetAnswerIdAction {
  type: "SET_ANSWER_ID";
  payload: string;
}

interface SetNickNameAction {
  type: "SET_NICKNAME";
  payload: string;
}

// 액션 생성자 함수 정의
export const setQuestionId = (questionId: string): SetQuestionIdAction => {
  return {
    type: "SET_QUESTION_ID",
    payload: questionId,
  };
};

export const setAnswerId = (answerId: string): SetAnswerIdAction => {
  return {
    type: "SET_ANSWER_ID",
    payload: answerId,
  };
};

export const setNickName = (nickName: string): SetNickNameAction => {
  return {
    type: "SET_NICKNAME",
    payload: nickName,
  };
};

// 리듀서 함수 정의
const reducer = (
  state: RootState = { questionId: null, answerId: null, nickName: null }, // answerId 기본값 추가
  action: SetQuestionIdAction | SetAnswerIdAction | SetNickNameAction // SetAnswerIdAction 추가
): RootState => {
  switch (action.type) {
    case "SET_QUESTION_ID":
      return {
        ...state,
        questionId: action.payload,
      };
    case "SET_ANSWER_ID":
      return {
        ...state,
        answerId: action.payload,
      };
    case "SET_NICKNAME":
      return {
        ...state,
        nickName: action.payload,
      };
    default:
      return state;
  }
};

// Redux 스토어 생성
const store = createStore(reducer);

export default store;
