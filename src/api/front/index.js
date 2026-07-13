import api from '@/utils/api'

// 取得類別列表 (已登入)
export const reqCategories = () => {
  return api.get('/categories')
}

// 取得 Prompt / Skill 列表 (已登入，支援 params: { keyword, categoryId })
export const reqSkills = (params) => {
  return api.get('/skills', { params })
}

// 取得單筆詳情 (已登入)
export const reqSkillDetail = (id) => {
  return api.get(`/skills/${id}`)
}

// 收藏 Prompt / Skill (會員)
export const reqAddFavorite = (skillId) => {
  return api.post(`/favorites/${skillId}`)
}

// 取消收藏 Prompt / Skill (會員)
export const reqRemoveFavorite = (skillId) => {
  return api.delete(`/favorites/${skillId}`)
}

// 我的收藏 (會員)
export const reqMyFavorites = () => {
  return api.get('/me/favorites')
}
