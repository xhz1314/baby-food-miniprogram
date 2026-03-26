const APP_NAME = "宝宝今日食"
const DEFAULT_SHARE_TITLE = "宝宝今日食｜四季宝宝辅食菜谱"
const DEFAULT_SHARE_PATH = "/pages/index/index"

const SEASON_LABELS = {
  all: "四季",
  spring: "春季",
  summer: "夏季",
  autumn: "秋季",
  winter: "冬季"
}

const CATEGORY_LABELS = {
  all: "全部分类",
  staple: "主食",
  protein: "蛋白质",
  veg: "蔬菜",
  soup: "汤羹"
}

function safeValue(value, fallback) {
  return value || fallback
}

function toQueryString(params) {
  const queryList = []

  Object.keys(params || {}).forEach((key) => {
    if (params[key] === undefined || params[key] === null || params[key] === "") {
      return
    }

    queryList.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  })

  return queryList.join("&")
}

function appendQuery(path, params) {
  const query = toQueryString(params)
  return query ? `${path}?${query}` : path
}

function getSeasonLabel(seasonKey) {
  return safeValue(SEASON_LABELS[seasonKey], SEASON_LABELS.all)
}

function getCategoryLabel(categoryKey) {
  return safeValue(CATEGORY_LABELS[categoryKey], CATEGORY_LABELS.all)
}

function normalizeIndexFilter(query) {
  const season = query && SEASON_LABELS[query.season] ? query.season : "all"
  const category = query && CATEGORY_LABELS[query.category] ? query.category : "all"

  return {
    season,
    category
  }
}

function buildIndexShareMeta(state) {
  const filter = normalizeIndexFilter({
    season: state && state.activeSeason,
    category: state && state.activeCategory
  })
  const hasSeasonFilter = filter.season !== "all"
  const hasCategoryFilter = filter.category !== "all"
  const seasonLabel = getSeasonLabel(filter.season)
  const categoryLabel = getCategoryLabel(filter.category)
  let title = DEFAULT_SHARE_TITLE

  if (hasSeasonFilter && hasCategoryFilter) {
    title = `${seasonLabel}${categoryLabel}宝宝餐，打开就能照着做`
  } else if (hasSeasonFilter) {
    title = `${seasonLabel}宝宝辅食菜谱，按分类快速挑`
  } else if (hasCategoryFilter) {
    title = `宝宝${categoryLabel}菜谱合集，做法简单好上手`
  }

  return {
    title,
    query: toQueryString(filter),
    path: appendQuery(DEFAULT_SHARE_PATH, filter)
  }
}

function buildRecipeShareMeta(recipe, id) {
  const recipeId = safeValue(id, recipe && recipe.id)

  if (!recipeId) {
    return {
      title: DEFAULT_SHARE_TITLE,
      query: "",
      path: DEFAULT_SHARE_PATH
    }
  }

  const recipeName = safeValue(recipe && recipe.name, "这道宝宝餐")
  const timeText = recipe && recipe.timeMinutes ? `｜约 ${recipe.timeMinutes} 分钟` : ""

  return {
    title: `${recipeName}${timeText}`,
    query: toQueryString({ id: recipeId }),
    path: appendQuery("/pages/detail/detail", { id: recipeId })
  }
}

function buildFavoriteShareMeta() {
  return {
    title: `${APP_NAME}｜收藏常看的宝宝辅食做法`,
    query: "",
    path: DEFAULT_SHARE_PATH
  }
}

function showShareMenu() {
  try {
    wx.showShareMenu({
      menus: ["shareAppMessage", "shareTimeline"]
    })
  } catch (error) {}
}

module.exports = {
  APP_NAME,
  DEFAULT_SHARE_TITLE,
  DEFAULT_SHARE_PATH,
  normalizeIndexFilter,
  buildIndexShareMeta,
  buildRecipeShareMeta,
  buildFavoriteShareMeta,
  showShareMenu
}
