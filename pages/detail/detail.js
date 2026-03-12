let favoritesModule = null

function hideBootLoading() {
  try {
    wx.hideLoading()
  } catch (error) {}
}

function getFavoritesModule() {
  if (!favoritesModule) {
    favoritesModule = require("../../utils/favorites")
  }
  return favoritesModule
}

Page({
  data: {
    id: "",
    recipe: null,
    isFavorite: false,
    isLoading: true
  },
  onLoad(query) {
    const id = (query && query.id) || ""
    this.setData({ id, isLoading: true })
    this.scheduleLoad(id)
  },
  onShow() {
    const id = this.data.id
    if (!id) return
    this.scheduleLoad(id)
  },
  scheduleLoad(id) {
    if (!id) {
      hideBootLoading()
      this.setData({ recipe: null, isFavorite: false, isLoading: false })
      return
    }

    const token = (this._loadToken || 0) + 1
    this._loadToken = token

    setTimeout(() => {
      const favorites = getFavoritesModule()
      const recipe = favorites.getFavoriteRecipeById(id)
      const isFavorite = favorites.isFavorite(id)

      if (this._loadToken !== token) {
        return
      }

      hideBootLoading()
      this.setData({
        recipe,
        isFavorite,
        isLoading: false
      })

      if (recipe && recipe.name) {
        wx.setNavigationBarTitle({ title: recipe.name })
      }
    }, 0)
  },
  toggleFavorite() {
    const id = this.data.id
    const isFavorite = this.data.isFavorite
    const recipe = this.data.recipe
    if (!id || !recipe) return

    const favorites = getFavoritesModule()

    if (isFavorite) {
      favorites.removeFavoriteById(id)
      this.setData({ isFavorite: false })
      wx.showToast({ title: "已取消收藏", icon: "success" })
      return
    }

    favorites.addFavoriteRecipe(recipe)
    this.setData({
      isFavorite: true,
      recipe: favorites.getFavoriteRecipeById(id) || recipe
    })
    wx.showToast({ title: "已收藏", icon: "success" })
  }
})