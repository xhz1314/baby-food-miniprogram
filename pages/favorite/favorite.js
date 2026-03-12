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

const SEPARATOR_REGEXP = /[\s|/、，,。；;：:（）()【】\[\]\-]/
const SEARCH_ALIASES = {
  土豆: ["马铃薯"],
  马铃薯: ["土豆"],
  山药: ["淮山", "淮山药"],
  淮山: ["山药", "淮山药"],
  淮山药: ["山药", "淮山"],
  南瓜: ["贝贝南瓜"],
  贝贝南瓜: ["南瓜"]
}

function getTypeText(type) {
  if (type === "staple") return "主食"
  if (type === "protein") return "蛋白质"
  return "蔬菜"
}

function getTypeLabel(type) {
  if (type === "staple") return "🍚 主食"
  if (type === "protein") return "🥚 蛋白质"
  return "🥬 蔬菜"
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(SEPARATOR_REGEXP, "")
}

function tokenizeText(value) {
  const chars = Array.from(String(value || ""))
  const normalizedChars = []
  const indexMap = []

  chars.forEach((char, index) => {
    if (!SEPARATOR_REGEXP.test(char)) {
      normalizedChars.push(char.toLowerCase())
      indexMap.push(index)
    }
  })

  return {
    chars,
    normalizedText: normalizedChars.join(""),
    indexMap
  }
}

function buildSearchEntries(item) {
  const ingredients = Array.isArray(item.ingredients) ? item.ingredients : []
  const steps = Array.isArray(item.steps) ? item.steps : []
  const tips = Array.isArray(item.tips) ? item.tips : []

  return [
    { text: item.name, visible: true, label: "菜名" },
    { text: item.typeLabel, visible: true, label: "分类" },
    { text: `约 ${item.timeMinutes} 分钟`, visible: true, label: "时长" },
    ...ingredients.map((ingredient) => ({
      text: `${ingredient.name} ${ingredient.amount}`,
      visible: true,
      label: "食材"
    })),
    { text: item.seasonVegetable, visible: false, label: "当季食材" },
    { text: item.ageDisplayText, visible: false, label: "月龄" },
    { text: item.ageStageName, visible: false, label: "阶段" },
    { text: item.textureLabel, visible: false, label: "口感" },
    ...(item.isSnapshotFallback ? [{ text: "收藏快照", visible: false, label: "收藏记录" }] : []),
    ...steps.map((text) => ({ text, visible: false, label: "做法" })),
    ...tips.map((text) => ({ text, visible: false, label: "小贴士" }))
  ].filter((entry) => normalizeText(entry.text))
}

function fuzzyMatch(text, keyword) {
  if (!keyword) return true
  if (text.includes(keyword)) return true

  let keywordIndex = 0
  for (let i = 0; i < text.length; i += 1) {
    if (text[i] === keyword[keywordIndex]) {
      keywordIndex += 1
      if (keywordIndex === keyword.length) {
        return true
      }
    }
  }
  return false
}

function expandKeywords(keyword) {
  const normalizedKeyword = normalizeText(keyword)
  if (!normalizedKeyword) return []

  const result = [normalizedKeyword]
  Object.keys(SEARCH_ALIASES).forEach((aliasKey) => {
    if (normalizedKeyword.includes(aliasKey)) {
      SEARCH_ALIASES[aliasKey].forEach((aliasValue) => {
        result.push(normalizedKeyword.replace(aliasKey, aliasValue))
      })
    }
  })

  return Array.from(new Set(result))
}

function buildList() {
  return getFavoritesModule().getFavoriteRecipes().map((item) => {
    const nextItem = { ...item, isFavorite: true }
    nextItem.typeText = getTypeText(nextItem.type)
    nextItem.typeLabel = getTypeLabel(nextItem.type)
    nextItem.timeText = `约 ${nextItem.timeMinutes} 分钟`
    nextItem.searchEntries = buildSearchEntries(nextItem)
    nextItem.searchFields = nextItem.searchEntries.map((entry) => normalizeText(entry.text))
    nextItem.searchText = nextItem.searchFields.join("|")
    return nextItem
  })
}

function findMatchInfo(text, keyword) {
  const normalizedKeyword = normalizeText(keyword)
  if (!normalizedKeyword) return null

  const tokenizedText = tokenizeText(text)
  if (!tokenizedText.normalizedText) return null

  const directIndex = tokenizedText.normalizedText.indexOf(normalizedKeyword)
  if (directIndex > -1) {
    const indices = []
    for (let i = 0; i < normalizedKeyword.length; i += 1) {
      indices.push(tokenizedText.indexMap[directIndex + i])
    }
    return { direct: true, indices }
  }

  let keywordIndex = 0
  const indices = []
  for (let i = 0; i < tokenizedText.normalizedText.length; i += 1) {
    if (tokenizedText.normalizedText[i] === normalizedKeyword[keywordIndex]) {
      indices.push(tokenizedText.indexMap[i])
      keywordIndex += 1
      if (keywordIndex === normalizedKeyword.length) {
        return { direct: false, indices }
      }
    }
  }

  return null
}

function pickBetterMatch(currentMatch, nextMatch) {
  if (!currentMatch) return nextMatch
  if (!nextMatch) return currentMatch
  if (nextMatch.direct && !currentMatch.direct) return nextMatch
  if (nextMatch.direct === currentMatch.direct && nextMatch.indices.length > currentMatch.indices.length) {
    return nextMatch
  }
  return currentMatch
}

function findBestMatch(text, keywordVariants) {
  return keywordVariants.reduce((bestMatch, keywordVariant) => {
    return pickBetterMatch(bestMatch, findMatchInfo(text, keywordVariant))
  }, null)
}

function buildSegments(text, indices) {
  const chars = Array.from(String(text || ""))
  if (!chars.length) return []
  if (!indices || !indices.length) {
    return [{ text: chars.join(""), highlighted: false }]
  }

  const indexMap = {}
  indices.forEach((index) => {
    indexMap[index] = true
  })

  const segments = []
  let currentText = ""
  let currentHighlighted = null

  chars.forEach((char, index) => {
    const highlighted = !!indexMap[index]
    if (currentHighlighted === null || highlighted === currentHighlighted) {
      currentText += char
      currentHighlighted = highlighted
      return
    }

    segments.push({ text: currentText, highlighted: currentHighlighted })
    currentText = char
    currentHighlighted = highlighted
  })

  if (currentText) {
    segments.push({ text: currentText, highlighted: currentHighlighted })
  }

  return segments
}

function buildHighlightSegments(text, keywordVariants) {
  if (!keywordVariants.length) {
    return buildSegments(text)
  }
  const match = findBestMatch(text, keywordVariants)
  return buildSegments(text, match ? match.indices : null)
}

function hasHighlightedSegment(segments) {
  return Array.isArray(segments) && segments.some((segment) => segment.highlighted)
}

function buildMatchHint(entry, match) {
  const chars = Array.from(String(entry.text || ""))
  if (!chars.length || !match || !match.indices || !match.indices.length) {
    return null
  }

  const sortedIndices = Array.from(new Set(match.indices)).sort((left, right) => left - right)
  const firstIndex = sortedIndices[0]
  const lastIndex = sortedIndices[sortedIndices.length - 1]
  const start = Math.max(0, firstIndex - 4)
  const end = Math.min(chars.length, Math.max(lastIndex + 5, start + 18))
  const snippetText = chars.slice(start, end).join("")
  const snippetIndices = sortedIndices
    .filter((index) => index >= start && index < end)
    .map((index) => index - start)

  const segments = buildSegments(snippetText, snippetIndices)
  if (start > 0) {
    segments.unshift({ text: "…", highlighted: false })
  }
  if (end < chars.length) {
    segments.push({ text: "…", highlighted: false })
  }

  return {
    label: entry.label,
    segments
  }
}

function decorateItem(item, keywordVariants) {
  const titleSegments = buildHighlightSegments(item.name, keywordVariants)
  const typeSegments = buildHighlightSegments(item.typeLabel, keywordVariants)
  const timeSegments = buildHighlightSegments(item.timeText, keywordVariants)
  const ingredientTags = (Array.isArray(item.ingredients) ? item.ingredients : []).map((ingredient, index) => {
    return {
      key: `${ingredient.name}-${index}`,
      segments: buildHighlightSegments(`${ingredient.name} ${ingredient.amount}`, keywordVariants)
    }
  })

  const hasVisibleHighlight =
    hasHighlightedSegment(titleSegments) ||
    hasHighlightedSegment(typeSegments) ||
    hasHighlightedSegment(timeSegments) ||
    ingredientTags.some((ingredientTag) => hasHighlightedSegment(ingredientTag.segments))

  let matchHint = null
  if (keywordVariants.length && !hasVisibleHighlight) {
    const hiddenEntry = item.searchEntries.find((entry) => {
      return !entry.visible && findBestMatch(entry.text, keywordVariants)
    })
    if (hiddenEntry) {
      matchHint = buildMatchHint(hiddenEntry, findBestMatch(hiddenEntry.text, keywordVariants))
    }
  }

  return Object.assign({}, item, {
    titleSegments,
    typeSegments,
    timeSegments,
    ingredientTags,
    matchHint
  })
}

function filterList(list, keyword) {
  const keywordVariants = expandKeywords(keyword)
  const filteredList = !keywordVariants.length
    ? list.slice()
    : list.filter((item) => {
        return keywordVariants.some((keywordVariant) => {
          if (fuzzyMatch(item.searchText, keywordVariant)) return true
          return item.searchFields.some((field) => fuzzyMatch(field, keywordVariant))
        })
      })

  return filteredList.map((item) => decorateItem(item, keywordVariants))
}

Page({
  data: {
    list: [],
    fullList: [],
    keyword: "",
    isLoading: true
  },
  onShow() {
    this.scheduleLoad()
  },
  scheduleLoad() {
    if (this._loadPending) return
    this._loadPending = true
    setTimeout(() => {
      this._loadPending = false
      const fullList = buildList()
      hideBootLoading()
      this.setData({
        fullList,
        list: filterList(fullList, this.data.keyword),
        isLoading: false
      })
    }, 0)
  },
  onKeywordInput(e) {
    const keyword = (e.detail && e.detail.value) || ""
    const nextList = filterList(this.data.fullList, keyword)
    this.setData({
      keyword,
      list: nextList
    })
  },
  clearKeyword() {
    this.setData({
      keyword: "",
      list: filterList(this.data.fullList, "")
    })
  },
  toggleFavorite(e) {
    const id = e.currentTarget.dataset.id
    if (!id) return
    getFavoritesModule().removeFavoriteById(id)
    const fullList = buildList()
    hideBootLoading()
      this.setData({
        fullList,
        list: filterList(fullList, this.data.keyword),
        isLoading: false
      })
    wx.showToast({ title: "已取消收藏", icon: "success" })
  },
  goDetail(e) {
    const id = e.currentTarget.dataset.id
    if (!id || this._navigating) return
    this._navigating = true
    wx.navigateTo({
      url: `/pages/detail/detail?id=${encodeURIComponent(id)}`,
      complete: () => {
        setTimeout(() => {
          this._navigating = false
        }, 300)
      }
    })
  }
})