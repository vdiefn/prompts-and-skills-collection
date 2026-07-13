import api from "@/utils/api";

// 查看類別 (管理者)
export const reqAdminCategories = () => {
  return api.get("/admin/categories");
};

// 新增類別 (管理者)
export const reqAdminCreateCategory = (data) => {
  return api.post("/admin/categories", data);
};

// 編輯類別 (管理者)
export const reqAdminUpdateCategory = (id, data) => {
  return api.patch(`/admin/categories/${id}`, data);
};

// 刪除類別 (管理者)
export const reqAdminDeleteCategory = (id) => {
  return api.delete(`/admin/categories/${id}`);
};


// 查看 Prompt / Skill (管理者)
export const reqAdminSkills = () => {
  return api.get("/admin/skills");
};

// 查看特定 Prompt / Skill (管理者)
export const reqAdminSkillDetail = (id) => {
  return api.get(`/admin/skills/${id}`);
};

// 新增 Prompt / Skill (管理者)
export const reqAdminCreateSkill = (data) => {
  return api.post("/admin/skills", data);
};

// 編輯 Prompt / Skill (管理者)
export const reqAdminUpdateSkill = (id, data) => {
  return api.patch(`/admin/skills/${id}`, data);
};

// 刪除 Prompt / Skill (管理者)
export const reqAdminDeleteSkill = (id) => {
  return api.delete(`/admin/skills/${id}`);
};