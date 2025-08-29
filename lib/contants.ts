export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 21;
export const PASSWORD_REGEX =
  /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[`~!@#$%^&*?({})\-_=+]).*$/;
export const PASSWORD_REGEX_ERROR = "문자/숫자/기호 조합으로 입력해주세요.";
export const PASSWORD_MAX_LENGTH_ERROR = "비밀번호가 너무 깁니다.";
export const PASSWORD_MIN_LENGTH_ERROR = "비밀번호가 너무 짧습니다.";
export const DELETE_COMMENT_TEXT = "삭제된 댓글입니다.";

//세션 키 : 비로그인 상태에서 사용
export const SESSION_FREE_PROGRAMCOUNT_KEY = "freeProgramId";

//세션 키 : 비로그인 상태에서 로그인 이후 이전 페이지로 이동하기 위해 사용
export const SESSION_PREV_PAGE_URL_KEY = "prevPageForLogin";

//마지막 로그인 저장 :
export const SESSION_LAST_LOGIN_KEY = "lastLogin";

//review
export const SESSION_FREE_REVIEWID_KEY = "freeReviewId";

//review temp texxt
export const SESSION_REVIEW_TEMP_TEXT = "reviewTempText";

export const API_BASE_URL = "https://dev-api.monthler.kr";
