// auth.js（或其他文件名）
let accessToken = ""; // 初始化为空

function setGlobalAccessToken(token: string) {
  accessToken = token;
}

function getGlobalAccessToken() {
  return accessToken;
}

export { setGlobalAccessToken, getGlobalAccessToken };
