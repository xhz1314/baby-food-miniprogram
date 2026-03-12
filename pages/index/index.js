var dataModule = null
var favoritesModule = null

var HOME_PAGE_CACHE_KEY = "home_page_render_cache"

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

function readStorage(key) {
  try {
    return wx.getStorageSync(key)
  } catch (error) {
    return null
  }
}

function writeStorage(key, value) {
  try {
    wx.setStorageSync(key, value)
  } catch (error) {}
}

function markRecipeFavorite(recipe, favoriteIds) {
  if (!recipe) {
    return null
  }

  var nextRecipe = Object.assign({}, recipe)
  nextRecipe.isFavorite = favoriteIds.indexOf(recipe.id) > -1
  return nextRecipe
}

function attachFavoriteState(plan, favoriteIds) {
  if (!plan) {
    return null
  }

  var resolvedFavoriteIds = Array.isArray(favoriteIds) ? favoriteIds : getFavoritesModule().getFavoriteIds()
  return {
    dateText: plan.dateText,
    birthdayText: plan.birthdayText,
    season: plan.season,
    ageInfo: plan.ageInfo,
    staple: markRecipeFavorite(plan.staple, resolvedFavoriteIds),
    protein: markRecipeFavorite(plan.protein, resolvedFavoriteIds),
    vegs: Array.isArray(plan.vegs)
      ? plan.vegs.map(function (recipe) {
          return markRecipeFavorite(recipe, resolvedFavoriteIds)
        })
      : []
  }
}

function buildPageState(plan, refreshSeed) {
  var ageText = plan && plan.ageInfo ? plan.ageInfo.displayText : ""
  var stageText = ""
  var seasonText = ""

  if (plan && plan.ageInfo) {
    stageText = "成长阶段：" + plan.ageInfo.stageName + " · " + plan.ageInfo.textureLabel
  }

  if (plan && plan.season) {
    seasonText =
      plan.dateText +
      " · 上海" +
      plan.season.name +
      "（" +
      plan.season.monthLabel +
      "） · 当季代表：" +
      plan.season.featuredVegetable
  }

  return {
    plan: plan,
    titleText: ageText ? "今日推荐（" + ageText + "）" : "今日推荐",
    subtitleText: "软糯主食 + 优质蛋白 + 当季蔬菜",
    roundText: "今日第 " + (refreshSeed + 1) + " 组菜单，下拉可切换下一组",
    stageText: stageText,
    seasonText: seasonText,
    errorText: ""
  }
}

function findRecipeInPlan(plan, id) {
  if (!plan || !id) {
    return null
  }

  if (plan.staple && plan.staple.id === id) {
    return plan.staple
  }

  if (plan.protein && plan.protein.id === id) {
    return plan.protein
  }

  if (Array.isArray(plan.vegs)) {
    for (var i = 0; i < plan.vegs.length; i += 1) {
      if (plan.vegs[i] && plan.vegs[i].id === id) {
        return plan.vegs[i]
      }
    }
  }

  return null
}

Page({
  data: {
    plan: null,
    refreshSeed: 0,
    titleText: "今日推荐",
    subtitleText: "软糯主食 + 优质蛋白 + 当季蔬菜",
    roundText: "今日第 1 组菜单，下拉可切换下一组",
    stageText: "",
    seasonText: "",
    errorText: ""
  },
  onLoad: function () {
    this.hydrateFromCache()
    this.scheduleRefresh(false)
  },
  onShow: function () {
    if (!this.data.plan && !this.data.errorText) {
      this.hydrateFromCache()
      this.scheduleRefresh(false)
      return
    }
    this.syncFavoriteState()
  },
  onPullDownRefresh: function () {
    var refreshSeed = this.data.refreshSeed + 1
    this.setData({ refreshSeed: refreshSeed })
    this.scheduleRefresh(true)
  },
  hydrateFromCache: function () {
    var cachedState = readStorage(HOME_PAGE_CACHE_KEY)

    if (!cachedState || !cachedState.plan) {
      return false
    }

    this.setData({
      plan: cachedState.plan,
      titleText: cachedState.titleText || "今日推荐",
      subtitleText: cachedState.subtitleText || "软糯主食 + 优质蛋白 + 当季蔬菜",
      roundText: cachedState.roundText || "今日第 1 组菜单，下拉可切换下一组",
      stageText: cachedState.stageText || "",
      seasonText: cachedState.seasonText || "",
      errorText: ""
    })
    hideBootLoading()
    return true
  },
  cachePageState: function (planOverride) {
    var nextPlan = planOverride || this.data.plan

    if (!nextPlan) {
      return
    }

    writeStorage(HOME_PAGE_CACHE_KEY, {
      plan: nextPlan,
      titleText: this.data.titleText,
      subtitleText: this.data.subtitleText,
      roundText: this.data.roundText,
      stageText: this.data.stageText,
      seasonText: this.data.seasonText
    })
  },
  scheduleRefresh: function (showToast) {
    var that = this
    if (this._refreshPending) {
      return
    }
    this._refreshPending = true
    setTimeout(function () {
      that._refreshPending = false
      that.refresh(showToast)
    }, 0)
  },
  scheduleFavoriteSync: function (plan) {
    var that = this
    var token

    if (!plan) {
      return
    }

    token = (this._favoriteSyncToken || 0) + 1
    this._favoriteSyncToken = token

    setTimeout(function () {
      try {
        var favoriteIds = getFavoritesModule().getFavoriteIds()
        var nextPlan = attachFavoriteState(plan, favoriteIds)
        if (that._favoriteSyncToken !== token) {
          return
        }
        that.setData({ plan: nextPlan })
        that.cachePageState(nextPlan)
        hideBootLoading()
      } catch (error) {
        console.error("首页收藏状态同步失败", error)
      }
    }, 0)
  },
  syncFavoriteState: function () {
    this.scheduleFavoriteSync(this.data.plan)
  },
  refresh: function (showToast) {
    try {
      var moduleRef = getDataModule()
      var rawPlan = moduleRef.getTodayPlan(new Date(), this.data.refreshSeed)
      var basePlan = attachFavoriteState(rawPlan, [])
      var pageState = buildPageState(basePlan, this.data.refreshSeed)

      this.setData(pageState)
      this.cachePageState(basePlan)
      hideBootLoading()
      this.scheduleFavoriteSync(rawPlan)

      if (showToast) {
        wx.showToast({
          title: "已切换到第 " + (this.data.refreshSeed + 1) + " 组",
          icon: "none"
        })
      }
    } catch (error) {
      console.error("首页菜单生成失败", error)
      this.setData({
        plan: null,
        titleText: "今日推荐",
        subtitleText: "软糯主食 + 优质蛋白 + 当季蔬菜",
        roundText: "今日第 " + (this.data.refreshSeed + 1) + " 组菜单，下拉可切换下一组",
        stageText: "",
        seasonText: "",
        errorText: "菜单加载失败，请下拉重试"
      })
      hideBootLoading()
      wx.showToast({ title: "菜单加载失败", icon: "none" })
    } finally {
      if (showToast) {
        wx.stopPullDownRefresh()
      }
    }
  },
  toggleFavorite: function (e) {
    var id = e.currentTarget.dataset.id
    var recipe = findRecipeInPlan(this.data.plan, id)
    var nextFavoriteState = false
    var favoriteIds
    var nextPlan

    if (!id || !recipe) {
      return
    }

    nextFavoriteState = getFavoritesModule().toggleFavoriteRecipe(recipe)
    favoriteIds = getFavoritesModule().getFavoriteIds()
    nextPlan = attachFavoriteState(this.data.plan, favoriteIds)
    this.setData({ plan: nextPlan })
    this.cachePageState(nextPlan)
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