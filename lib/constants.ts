/* 폼 유효성 검사 */
// EMAIL
export const EMAIL_MIN_LENGTH = 4;

// USERNAME
export const USERNAME_MIN_LENGTH = 2;

// PASSWORD
export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);

/* 폼 에러 메세지 */
// EMAIL
export const EMAIL_USED_ERROR = '이미 사용 중인 이메일 입니다.';
export const EMAIL_REQUIRED_ERROR = '이메일을 입력해주세요.';
export const EMAIL_TYPE_ERROR = '이메일 형식(sanah@dev.co)으로 입력해주세요.';
export const EMAIL_NULL_ERROR = '해당 이메일로 등록된 계정이 없습니다.';
export const EMAIL_ERROR = '이메일을 확인해주세요.';

// USERNAME
export const USERNAME_USED_ERROR = '이미 사용 중인 이름입니다.';
export const USERNAME_LENGTH_ERROR = `최소 ${USERNAME_MIN_LENGTH}글자 이상 입력해주세요.`;
export const USERNAME_TYPE_ERROR = '이름을 입력해주세요.';

// PASSWORD
export const PASSWORD_ERROR = '비밀번호를 확인해주세요.';
export const CONFIRMPASSWORD_MIN_LENGTH_ERROR = '비밀번호가 동일하지 않습니다.';
export const PASSWORD_MIN_LENGTH_ERROR = `최소 ${PASSWORD_MIN_LENGTH}글자 이상 입력해주세요.`;
export const PASSWORD_TYPE_ERROR =
  '비밀번호에는 대문자, 소문자, 숫자, 특수 문자 #?!@$%^&*-가 하나 이상 포함되어야 합니다.';
export const PASSWORD_REQUIRED_ERROR = '비밀번호를 입력해 주세요.';

// TOKEN
export const SMS__TOKEN_MAX_ERROR = '11자리 이상 입력 할 수 없습니다.';
export const SMS__TOKEN_TYPE_ERROR = '01012345678 형식으로 입력해주세요.';
export const SMS__TOKEN_CONFIRM_ERROR = '인증번호를 다시 확인해주세요.';

/* 트윗 */
export const TWEETS_START_PAGE = 0;
export const TWEETS_SKIP_PAGE = 3;

/* 포스트 */
export const POSTS_START_PAGE = 0;
export const POSTS_SKIP_PAGE = 3;
