let dataModule = null

function getDataModule() {
  if (!dataModule) {
    dataModule = require("./data")
  }
  return dataModule
}

function getLiveRecipeById(id, date) {
  return getDataModule().getRecipeById(id, date)
}

const FAVORITES_KEY = "favorite_recipe_records"
const LEGACY_FAVORITES_KEY = "favorites_recipe_ids"

let favoriteRecordsCache = null
let favoriteRecordsLoaded = false

function cloneIngredients(list) {
  return Array.isArray(list)
    ? list.map((item) => ({
        name: item && item.name ? item.name : "",
        amount: item && item.amount ? item.amount : ""
      }))
    : []
}

function cloneTextList(list) {
  return Array.isArray(list) ? list.map((item) => String(item || "")) : []
}

function createEmptySnapshot(id) {
  return {
    id: id || "",
    seasonKey: "",
    seasonVegetable: "",
    type: "veg",
    name: "已收藏菜谱",
    timeMinutes: 0,
    ageMonths: 0,
    ageDisplayText: "",
    ageStageName: "",
    textureLabel: "",
    ingredients: [],
    steps: [],
    tips: []
  }
}

function cloneRecipe(recipe) {
  if (!recipe) {
    return null
  }

  return {
    id: recipe.id || "",
    seasonKey: recipe.seasonKey || "",
    seasonVegetable: recipe.seasonVegetable || "",
    type: recipe.type || "veg",
    name: recipe.name || "已收藏菜谱",
    timeMinutes: Number(recipe.timeMinutes) || 0,
    ageMonths: Number(recipe.ageMonths) || 0,
    ageDisplayText: recipe.ageDisplayText || "",
    ageStageName: recipe.ageStageName || "",
    textureLabel: recipe.textureLabel || "",
    ingredients: cloneIngredients(recipe.ingredients),
    steps: cloneTextList(recipe.steps),
    tips: cloneTextList(recipe.tips)
  }
}

function buildRecipeSnapshot(recipe) {
  return cloneRecipe(recipe)
}

function normalizeRecord(record) {
  if (!record) {
    return null
  }

  if (typeof record === "string") {
    const liveRecipe = getLiveRecipeById(record)
    return {
      id: record,
      savedAt: "",
      snapshot: buildRecipeSnapshot(liveRecipe) || createEmptySnapshot(record)
    }
  }

  const id = record.id || (record.snapshot && record.snapshot.id) || ""
  if (!id) {
    return null
  }

  return {
    id,
    savedAt: record.savedAt || "",
    snapshot:
      buildRecipeSnapshot(record.snapshot) ||
      buildRecipeSnapshot(record.recipe) ||
      buildRecipeSnapshot(record) ||
      buildRecipeSnapshot(getLiveRecipeById(id)) ||
      createEmptySnapshot(id)
  }
}

function dedupeRecords(records) {
  const seen = {}
  const nextRecords = []

  ;(Array.isArray(records) ? records : []).forEach((record) => {
    const normalizedRecord = normalizeRecord(record)
    if (!normalizedRecord || !normalizedRecord.id || seen[normalizedRecord.id]) {
      return
    }
    seen[normalizedRecord.id] = true
    nextRecords.push(normalizedRecord)
  })

  return nextRecords
}

function readStorage(key) {
  try {
    return wx.getStorageSync(key)
  } catch (e) {
    return null
  }
}

function writeStorage(key, value) {
  wx.setStorageSync(key, value)
}

function saveFavoriteRecords(records) {
  const nextRecords = dedupeRecords(records)
  favoriteRecordsCache = nextRecords
  favoriteRecordsLoaded = true
  writeStorage(FAVORITES_KEY, nextRecords)
  writeStorage(
    LEGACY_FAVORITES_KEY,
    nextRecords.map((record) => record.id)
  )
  return nextRecords
}

function getFavoriteRecords() {
  if (favoriteRecordsLoaded) {
    return favoriteRecordsCache || []
  }

  const rawRecords = readStorage(FAVORITES_KEY)
  if (Array.isArray(rawRecords)) {
    const nextRecords = dedupeRecords(rawRecords)
    favoriteRecordsCache = nextRecords
    favoriteRecordsLoaded = true
    if (JSON.stringify(rawRecords) !== JSON.stringify(nextRecords)) {
      writeStorage(FAVORITES_KEY, nextRecords)
      writeStorage(
        LEGACY_FAVORITES_KEY,
        nextRecords.map((record) => record.id)
      )
    }
    return nextRecords
  }

  const legacyIds = readStorage(LEGACY_FAVORITES_KEY)
  if (Array.isArray(legacyIds) && legacyIds.length) {
    return saveFavoriteRecords(legacyIds)
  }

  favoriteRecordsCache = []
  favoriteRecordsLoaded = true
  return favoriteRecordsCache
}
function getFavoriteIds() {
  return getFavoriteRecords().map((record) => record.id)
}

function isFavorite(id) {
  return !!id && getFavoriteIds().indexOf(id) > -1
}

function buildResolvedRecipe(record, date) {
  if (!record || !record.id) {
    return null
  }

  const liveRecipe = getLiveRecipeById(record.id, date)
  if (liveRecipe) {
    return Object.assign(cloneRecipe(liveRecipe), {
      savedAt: record.savedAt || "",
      snapshot: cloneRecipe(record.snapshot),
      isSnapshotFallback: false
    })
  }

  const snapshotRecipe = cloneRecipe(record.snapshot) || createEmptySnapshot(record.id)
  if (!snapshotRecipe.ingredients.length) {
    snapshotRecipe.ingredients = [{ name: "原收藏记录", amount: "已保留" }]
  }
  if (!snapshotRecipe.steps.length) {
    snapshotRecipe.steps = ["这是收藏快照，当前版本未找到对应实时菜谱。"]
  }
  if (!snapshotRecipe.tips.length) {
    snapshotRecipe.tips = ["小程序更新后仍保留了这份收藏记录，可继续查看制作内容。"]
  }

  return Object.assign(snapshotRecipe, {
    savedAt: record.savedAt || "",
    isSnapshotFallback: true
  })
}

function getFavoriteRecipes(date) {
  return getFavoriteRecords()
    .map((record) => buildResolvedRecipe(record, date))
    .filter(Boolean)
    .map((recipe) => Object.assign({}, recipe, { isFavorite: true }))
}

function getFavoriteRecipeById(id, date) {
  if (!id) {
    return null
  }

  const record = getFavoriteRecords().find((item) => item.id === id)
  if (record) {
    return buildResolvedRecipe(record, date)
  }

  return getLiveRecipeById(id, date) || null
}

function addFavoriteRecipe(recipe) {
  if (!recipe || !recipe.id) {
    return getFavoriteRecords()
  }

  const records = getFavoriteRecords().filter((record) => record.id !== recipe.id)
  records.unshift({
    id: recipe.id,
    savedAt: new Date().toISOString(),
    snapshot: buildRecipeSnapshot(recipe) || createEmptySnapshot(recipe.id)
  })
  return saveFavoriteRecords(records)
}

function removeFavoriteById(id) {
  if (!id) {
    return getFavoriteRecords()
  }
  return saveFavoriteRecords(getFavoriteRecords().filter((record) => record.id !== id))
}

function toggleFavoriteRecipe(recipe) {
  if (!recipe || !recipe.id) {
    return false
  }

  if (isFavorite(recipe.id)) {
    removeFavoriteById(recipe.id)
    return false
  }

  addFavoriteRecipe(recipe)
  return true
}

module.exports = {
  FAVORITES_KEY,
  LEGACY_FAVORITES_KEY,
  getFavoriteRecords,
  getFavoriteIds,
  getFavoriteRecipes,
  getFavoriteRecipeById,
  isFavorite,
  addFavoriteRecipe,
  removeFavoriteById,
  toggleFavoriteRecipe
}