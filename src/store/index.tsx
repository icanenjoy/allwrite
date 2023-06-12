import { legacy_createStore as createStore } from "redux";

// 초기 상태 정의
export interface RootState {
  questionId: string | null;
}

// 액션 타입 정의
interface SetQuestionIdAction {
  type: "SET_QUESTION_ID";
  payload: string;
}

// 액션 생성자 함수 정의
export const setQuestionId = (questionId: string): SetQuestionIdAction => {
  return {
    type: "SET_QUESTION_ID",
    payload: questionId,
  };
};

// 리듀서 함수 정의
const reducer = (
  state: RootState = { questionId: null },
  action: SetQuestionIdAction
): RootState => {
  switch (action.type) {
    case "SET_QUESTION_ID":
      console.log("New questionId:", action.payload);
      return {
        ...state,
        questionId: action.payload,
      };
    default:
      return state;
  }
};

// Redux 스토어 생성
const store = createStore(reducer);

export default store;
