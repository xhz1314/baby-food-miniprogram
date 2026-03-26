var dataModule = null
var favoritesModule = null
var shareModule = null

var SEASON_OPTIONS = [
  { key: "all", label: "全部" },
  { key: "spring", label: "春季" },
  { key: "summer", label: "夏季" },
  { key: "autumn", label: "秋季" },
  { key: "winter", label: "冬季" }
]

var CATEGORY_OPTIONS = [
  { key: "all", label: "全部" },
  { key: "staple", label: "主食" },
  { key: "protein", label: "蛋白质" },
  { key: "veg", label: "蔬菜" },
  { key: "soup", label: "汤羹" }
]

function hideBootLoading() {
  try {
    wx.hideLoading()
  } catch (error) {}
}

function getDataModule() {
  if (!dataModule) {
    dataModule = require("../../utils/data")
  }
  return dataModule
}

function getFavoritesModule() {
  if (!favoritesModule) {
    favoritesModule = require("../../utils/favorites")
  }
  return favoritesModule
}

function getShareModule() {
  if (!shareModule) {
    shareModule = require("../../utils/share")
  }
  return shareModule
}

function getTypeLabel(type) {
  if (type === "staple") {
    return "🍚 主食"
  }

  if (type === "protein") {
    return "🥚 蛋白质"
  }

  if (type === "soup") {
    return "🍲 汤羹"
  }

  return "🥬 蔬菜"
}

function getCardClass(type) {
  if (type === "staple") {
    return "stapleCard"
  }

  if (type === "protein") {
    return "proteinCard"
  }

  if (type === "soup") {
    return "soupCard"
  }

  return "vegCard"
}

function getSeasonLabel(seasonKey) {
  var seasonOption = SEASON_OPTIONS.find(function (item) {
    return item.key === seasonKey
  })

  return seasonOption ? seasonOption.label : "全部"
}

function buildSummaryText(recipe, seasonText) {
  var ingredients = Array.isArray(recipe && recipe.ingredients) ? recipe.ingredients : []
  var nextSeasonText = seasonText || getSeasonLabel(recipe && recipe.seasonKey)
  return nextSeasonText + " · 食材 " + ingredients.length + " 种 · 约 " + recipe.timeMinutes + " 分钟"
}

function markRecipeFavorite(recipe, favoriteIds) {
  if (!recipe) {
    return null
  }

  var nextRecipe = Object.assign({}, recipe)
  nextRecipe.isFavorite = favoriteIds.indexOf(recipe.id) > -1
  nextRecipe.typeLabel = getTypeLabel(recipe.type)
  nextRecipe.cardClass = getCardClass(recipe.type)
  nextRecipe.seasonLabel = getSeasonLabel(recipe.seasonKey)
  nextRecipe.summaryText = buildSummaryText(recipe, nextRecipe.seasonLabel)
  return nextRecipe
}

function buildRecipeList(favoriteIds) {
  var recipes = getDataModule().getRecipeList()
  return recipes.map(function (recipe) {
    return markRecipeFavorite(recipe, favoriteIds)
  })
}

function deduplicateRecipeList(list, seasonKey, categoryKey) {
  var shouldDeduplicate = seasonKey === "all" || categoryKey === "all"
  var deduplicatedList = []
  var recordMap = {}

  if (!Array.isArray(list)) {
    return []
  }

  if (!shouldDeduplicate) {
    return list.slice()
  }

  list.forEach(function (recipe) {
    var key
    var record
    var seasonText

    if (!recipe) {
      return
    }

    key = (recipe.type || "") + "::" + (recipe.name || "")
    record = recordMap[key]

    if (!record) {
      record = {
        recipe: Object.assign({}, recipe),
        seasonMap: {},
        seasonCount: 0
      }
      recordMap[key] = record
      deduplicatedList.push(record)
    }

    if (recipe.isFavorite && !record.recipe.isFavorite) {
      record.recipe = Object.assign({}, recipe)
    }

    record.recipe.isFavorite = !!(record.recipe.isFavorite || recipe.isFavorite)

    if (recipe.seasonKey && !record.seasonMap[recipe.seasonKey]) {
      record.seasonMap[recipe.seasonKey] = true
      record.seasonCount += 1
    }

    seasonText = record.seasonCount > 1 ? "多季可做" : getSeasonLabel(record.recipe.seasonKey)
    record.recipe.seasonLabel = seasonText
    record.recipe.summaryText = buildSummaryText(record.recipe, seasonText)
  })

  return deduplicatedList.map(function (record) {
    return record.recipe
  })
}

function filterRecipeList(list, seasonKey, categoryKey) {
  var filteredList

  if (!Array.isArray(list)) {
    return []
  }

  filteredList = list.slice()

  if (seasonKey && seasonKey !== "all") {
    filteredList = filteredList.filter(function (recipe) {
      return recipe && recipe.seasonKey === seasonKey
    })
  }

  if (categoryKey && categoryKey !== "all") {
    filteredList = filteredList.filter(function (recipe) {
      return recipe && recipe.type === categoryKey
    })
  }

  return deduplicateRecipeList(filteredList, seasonKey, categoryKey)
}

function buildHeroState(list) {
  var count = Array.isArray(list) ? list.length : 0

  return {
    resultCountText: "共 " + count + " 道"
  }
}

function findRecipeInList(list, id) {
  if (!Array.isArray(list) || !id) {
    return null
  }

  for (var i = 0; i < list.length; i += 1) {
    if (list[i] && list[i].id === id) {
      return list[i]
    }
  }

  return null
}

Page({
  data: {
    fullList: [],
    list: [],
    seasonOptions: SEASON_OPTIONS,
    categoryOptions: CATEGORY_OPTIONS,
    activeSeason: "all",
    activeCategory: "all",
    titleText: "宝宝餐",
    subtitleText: "按季节、分类快速找菜谱",
    resultCountText: "共 0 道",
    errorText: "",
    isLoading: true
  },
  onLoad: function (query) {
    var filterState = getShareModule().normalizeIndexFilter(query)

    getShareModule().showShareMenu()
    this.setData({
      activeSeason: filterState.season,
      activeCategory: filterState.category
    })
    this.refreshList()
  },
  onShow: function () {
    getShareModule().showShareMenu()

    if (this.data.isLoading) {
      this.refreshList()
      return
    }
    this.syncFavoriteState()
  },
  onShareAppMessage: function () {
    return getShareModule().buildIndexShareMeta(this.data)
  },
  onShareTimeline: function () {
    var shareMeta = getShareModule().buildIndexShareMeta(this.data)

    return {
      title: shareMeta.title,
      query: shareMeta.query
    }
  },
  refreshList: function () {
    try {
      var favoriteIds = getFavoritesModule().getFavoriteIds()
      var fullList = buildRecipeList(favoriteIds)
      var list = filterRecipeList(fullList, this.data.activeSeason, this.data.activeCategory)
      var heroState = buildHeroState(list)
      this.setData(Object.assign({
        fullList: fullList,
        list: list,
        errorText: "",
        isLoading: false
      }, heroState))
      hideBootLoading()
    } catch (error) {
      console.error("首页菜谱加载失败", error)
      this.setData({
        fullList: [],
        list: [],
        resultCountText: "共 0 道",
        errorText: "菜谱加载失败，请稍后重试",
        isLoading: false
      })
      hideBootLoading()
      wx.showToast({ title: "菜谱加载失败", icon: "none" })
    }
  },
  syncFavoriteState: function () {
    try {
      var favoriteIds = getFavoritesModule().getFavoriteIds()
      var fullList = buildRecipeList(favoriteIds)
      var list = filterRecipeList(fullList, this.data.activeSeason, this.data.activeCategory)
      var heroState = buildHeroState(list)
      this.setData(Object.assign({
        fullList: fullList,
        list: list
      }, heroState))
    } catch (error) {
      console.error("首页收藏状态同步失败", error)
    }
  },
  onSeasonChange: function (e) {
    var seasonKey = e.currentTarget.dataset.season || "all"
    var list
    var heroState

    if (seasonKey === this.data.activeSeason) {
      return
    }

    list = filterRecipeList(this.data.fullList, seasonKey, this.data.activeCategory)
    heroState = buildHeroState(list)

    this.setData(Object.assign({
      activeSeason: seasonKey,
      list: list
    }, heroState))
  },
  onCategoryChange: function (e) {
    var categoryKey = e.currentTarget.dataset.category || "all"
    var list
    var heroState

    if (categoryKey === this.data.activeCategory) {
      return
    }

    list = filterRecipeList(this.data.fullList, this.data.activeSeason, categoryKey)
    heroState = buildHeroState(list)

    this.setData(Object.assign({
      activeCategory: categoryKey,
      list: list
    }, heroState))
  },
  toggleFavorite: function (e) {
    var id = e.currentTarget.dataset.id
    var recipe = findRecipeInList(this.data.list, id)
    var nextFavoriteState = false

    if (!id || !recipe) {
      return
    }

    nextFavoriteState = getFavoritesModule().toggleFavoriteRecipe(recipe)
    this.syncFavoriteState()
    wx.showToast({
      title: nextFavoriteState ? "已收藏" : "已取消收藏",
      icon: "success"
    })
  },
  goDetail: function (e) {
    var id = e.currentTarget.dataset.id
    var that = this
    if (!id || this._navigating) {
      return
    }
    this._navigating = true
    wx.navigateTo({
      url: "/pages/detail/detail?id=" + encodeURIComponent(id),
      complete: function () {
        setTimeout(function () {
          that._navigating = false
        }, 300)
      }
    })
  }
})
