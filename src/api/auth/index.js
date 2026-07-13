import api from "@/utils/api";

// 確認服務正常 (公開)
export const reqCheckHealth = () => {
  return api.get("/health");
};

// 會員 / 管理者登入 (公開)
export const reqLogin = (data) => {
  return api.post("/auth/login", data);
};

// 登出 (已登入)
export const reqLogout = () => {
  return api.post("/auth/logout");
};

// 取得目前登入者資訊 (已登入)
export const reqCurrentUser = () => {
  return api.get("/auth/me");
};