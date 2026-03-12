const BABY_BIRTHDAY = {
  year: 2024,
  month: 10,
  day: 25
}

const AGE_PROFILES = [
  {
    key: "soft",
    minMonths: 0,
    maxMonths: 17,
    stageName: "软嫩过渡期",
    titleTag: "软嫩版",
    textureLabel: "切碎或压泥，整体软烂",
    vegetablePrep: "焯熟后切碎",
    finishTexture: "煮到一压即散",
    feedingNote: "以软烂、细碎、少调味为主，优先保证吞咽安全。",
    stapleFactor: 1,
    proteinFactor: 1,
    vegetableFactor: 1
  },
  {
    key: "minced",
    minMonths: 18,
    maxMonths: 23,
    stageName: "颗粒进阶期",
    titleTag: "进阶版",
    textureLabel: "切成小丁，保留少量软颗粒",
    vegetablePrep: "焯熟后切成小丁",
    finishTexture: "煮到软而有细小颗粒",
    feedingNote: "开始增加小颗粒和小丁，逐步训练牙龈咀嚼。",
    stapleFactor: 1.15,
    proteinFactor: 1.15,
    vegetableFactor: 1.15
  },
  {
    key: "growth",
    minMonths: 24,
    maxMonths: 35,
    stageName: "咀嚼成长期开端",
    titleTag: "成长版",
    textureLabel: "切成小块，保持食材形状",
    vegetablePrep: "切成约 1 厘米小块后煮软",
    finishTexture: "做到软而成型",
    feedingNote: "可以保留更明确的食材形状，继续训练主动咀嚼。",
    stapleFactor: 1.3,
    proteinFactor: 1.25,
    vegetableFactor: 1.25
  },
  {
    key: "family",
    minMonths: 36,
    maxMonths: 99,
    stageName: "家庭餐衔接期",
    titleTag: "家庭餐版",
    textureLabel: "切成适口小块，接近家庭餐",
    vegetablePrep: "切成适口小块并煮软",
    finishTexture: "保持软嫩成型",
    feedingNote: "可逐步向清淡家庭餐靠拢，但仍建议少盐少油。",
    stapleFactor: 1.45,
    proteinFactor: 1.35,
    vegetableFactor: 1.35
  }
]

const SEASONAL_PRODUCE = {
  spring: {
    key: "spring",
    name: "春季",
    monthLabel: "3-5月",
    featuredVegetable: "菠菜",
    vegetables: [
      "菠菜",
      "芦笋",
      "豌豆尖",
      "莴笋",
      "春笋",
      "荠菜",
      "油麦菜",
      "生菜",
      "西兰花",
      "菜心",
      "芹菜",
      "香椿",
      "蚕豆",
      "茭白",
      "卷心菜"
    ]
  },
  summer: {
    key: "summer",
    name: "夏季",
    monthLabel: "6-8月",
    featuredVegetable: "南瓜",
    vegetables: [
      "南瓜",
      "丝瓜",
      "黄瓜",
      "冬瓜",
      "空心菜",
      "苋菜",
      "西葫芦",
      "毛豆",
      "玉米",
      "番茄",
      "茄子",
      "苦瓜",
      "四季豆",
      "莲藕",
      "娃娃菜"
    ]
  },
  autumn: {
    key: "autumn",
    name: "秋季",
    monthLabel: "9-11月",
    featuredVegetable: "胡萝卜",
    vegetables: [
      "胡萝卜",
      "莲藕",
      "山芋",
      "南瓜",
      "百合",
      "芋头",
      "西兰花",
      "菜花",
      "白萝卜",
      "芹菜",
      "娃娃菜",
      "香菇",
      "西葫芦",
      "毛豆",
      "甜玉米"
    ]
  },
  winter: {
    key: "winter",
    name: "冬季",
    monthLabel: "12-2月",
    featuredVegetable: "山药",
    vegetables: [
      "山药",
      "大白菜",
      "菠菜",
      "茼蒿",
      "白萝卜",
      "胡萝卜",
      "莲藕",
      "芋头",
      "花菜",
      "西兰花",
      "包菜",
      "香菇",
      "菜心",
      "南瓜",
      "芥蓝"
    ]
  }
}

const STAPLE_TEMPLATES = [
  {
    titles: {
      soft: "鸡蛋软面",
      minced: "鸡蛋碎碎面",
      growth: "鸡蛋拌面",
      family: "鸡蛋蔬菜面"
    },
    timeMinutes: 18,
    buildIngredients(vegetable, profile) {
      return [
        { name: "宝宝面", amount: formatScaledAmount(35, profile.stapleFactor, "g") },
        { name: vegetable, amount: formatScaledAmount(40, profile.vegetableFactor, "g") },
        { name: "鸡蛋", amount: "1个" },
        { name: "清水", amount: "适量" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        `${vegetable}${profile.vegetablePrep}，鸡蛋打散备用。`,
        "锅中加水烧开，下宝宝面煮至八分熟。",
        `放入${vegetable}后继续小火煮 2-3 分钟，直到${profile.finishTexture}。`,
        "最后淋入蛋液搅成蛋花即可。"
      ]
    }
  },
  {
    titles: {
      soft: "小米粥",
      minced: "浓稠小米粥",
      growth: "小米软饭",
      family: "杂粮小米饭"
    },
    timeMinutes: 25,
    buildIngredients(vegetable, profile) {
      return [
        { name: "小米", amount: formatScaledAmount(25, profile.stapleFactor, "g") },
        { name: vegetable, amount: formatScaledAmount(50, profile.vegetableFactor, "g") },
        { name: "清水", amount: "适量" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "小米淘洗 1-2 次。",
        `${vegetable}${profile.vegetablePrep}备用。`,
        "锅中水开后下小米，小火慢煮。",
        `加入${vegetable}后继续煮至${profile.finishTexture}即可。`
      ]
    }
  },
  {
    titles: {
      soft: "软饭",
      minced: "蔬菜软饭",
      growth: "蔬菜拌饭",
      family: "时蔬焖饭"
    },
    timeMinutes: 22,
    buildIngredients(vegetable, profile) {
      return [
        { name: "胚芽米饭", amount: formatScaledAmount(80, profile.stapleFactor, "g") },
        { name: vegetable, amount: formatScaledAmount(45, profile.vegetableFactor, "g") },
        { name: "土豆", amount: formatScaledAmount(40, profile.vegetableFactor, "g") },
        { name: "清水", amount: "少量" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        `${vegetable}和土豆都${profile.vegetablePrep}。`,
        "米饭加少量温水回锅焖软。",
        `放入${vegetable}和土豆小火翻拌 3-5 分钟。`,
        `整体处理到${profile.finishTexture}后即可。`
      ]
    }
  },
  {
    titles: {
      soft: "燕麦粥",
      minced: "燕麦浓粥",
      growth: "燕麦软饭",
      family: "燕麦杂粮饭"
    },
    timeMinutes: 15,
    buildIngredients(vegetable, profile) {
      return [
        { name: "燕麦片", amount: formatScaledAmount(20, profile.stapleFactor, "g") },
        { name: vegetable, amount: formatScaledAmount(45, profile.vegetableFactor, "g") },
        { name: "大米", amount: formatScaledAmount(15, profile.stapleFactor, "g") },
        { name: "清水", amount: "适量" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "大米提前浸泡 20 分钟后入锅煮开。",
        `${vegetable}${profile.vegetablePrep}，与燕麦一起下锅。`,
        "全程小火慢煮，边煮边搅防止糊底。",
        `煮到${profile.finishTexture}即可。`
      ]
    }
  },
  {
    titles: {
      soft: "杂粮面片",
      minced: "蔬菜面片",
      growth: "杂粮拌面片",
      family: "时蔬面片"
    },
    timeMinutes: 20,
    buildIngredients(vegetable, profile) {
      return [
        { name: "面粉", amount: formatScaledAmount(35, profile.stapleFactor, "g") },
        { name: "玉米面", amount: formatScaledAmount(10, profile.stapleFactor, "g") },
        { name: vegetable, amount: formatScaledAmount(40, profile.vegetableFactor, "g") },
        { name: "清水", amount: "适量" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "面粉和玉米面加少量水和成小面团，醒 10 分钟。",
        `${vegetable}${profile.vegetablePrep}备用。`,
        "锅中加水煮开，揪入小面片煮熟。",
        `加入${vegetable}后再煮 2 分钟，做到${profile.finishTexture}。`
      ]
    }
  }
]

const PROTEIN_TEMPLATES = [
  {
    titles: {
      soft: "鳕鱼蒸蛋",
      minced: "鳕鱼蔬菜蒸蛋",
      growth: "鳕鱼豆腐蒸蛋",
      family: "鳕鱼蛋羹"
    },
    timeMinutes: 18,
    buildIngredients(vegetable, profile) {
      return [
        { name: "鸡蛋", amount: "1个" },
        { name: "鳕鱼", amount: formatScaledAmount(40, profile.proteinFactor, "g") },
        { name: vegetable, amount: formatScaledAmount(25, profile.vegetableFactor, "g") },
        { name: "温水", amount: "约 1.5 倍蛋液" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "鳕鱼去刺蒸熟压碎。",
        `${vegetable}${profile.vegetablePrep}。`,
        "鸡蛋打散后加温水搅匀并过筛。",
        `蛋液倒入碗中，铺上鳕鱼碎和${vegetable}，中小火蒸到凝固细嫩。`
      ]
    }
  },
  {
    titles: {
      soft: "鸡肉丸",
      minced: "鸡肉蔬菜丸",
      growth: "鸡肉小饼",
      family: "鸡肉时蔬饼"
    },
    timeMinutes: 22,
    buildIngredients(vegetable, profile) {
      return [
        { name: "鸡胸肉", amount: formatScaledAmount(80, profile.proteinFactor, "g") },
        { name: vegetable, amount: formatScaledAmount(30, profile.vegetableFactor, "g") },
        { name: "淀粉", amount: "5g" },
        { name: "清水", amount: "适量" }
      ]
    },
    buildSteps(vegetable, profile) {
      const shapeText = profile.key === "growth" || profile.key === "family" ? "整理成小饼状" : "整理成小丸子"
      return [
        `鸡胸肉剁成细泥，${vegetable}${profile.vegetablePrep}。`,
        "食材混合后加入少量淀粉，顺一个方向搅匀。",
        `${shapeText}。`,
        "下锅蒸熟或用少量水煎焖至完全熟透即可。"
      ]
    }
  },
  {
    titles: {
      soft: "豆腐羹",
      minced: "蔬菜豆腐羹",
      growth: "豆腐烩菜",
      family: "时蔬豆腐煮"
    },
    timeMinutes: 12,
    buildIngredients(vegetable, profile) {
      return [
        { name: "嫩豆腐", amount: formatScaledAmount(70, profile.proteinFactor, "g") },
        { name: vegetable, amount: formatScaledAmount(35, profile.vegetableFactor, "g") },
        { name: "虾皮粉", amount: "少量（可选）" },
        { name: "清水", amount: "适量" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        `${vegetable}${profile.vegetablePrep}，嫩豆腐切小块。`,
        "锅中加少量清水煮开。",
        `先放${vegetable}煮软，再放豆腐轻轻推动。`,
        `煮至汤汁微稠、整体${profile.finishTexture}即可。`
      ]
    }
  },
  {
    titles: {
      soft: "虾仁蒸蛋",
      minced: "虾仁蔬菜蒸蛋",
      growth: "虾仁蛋羹",
      family: "虾仁时蔬蛋羹"
    },
    timeMinutes: 18,
    buildIngredients(vegetable, profile) {
      return [
        { name: "鸡蛋", amount: "1个" },
        { name: "虾仁", amount: formatScaledAmount(35, profile.proteinFactor, "g") },
        { name: vegetable, amount: formatScaledAmount(25, profile.vegetableFactor, "g") },
        { name: "温水", amount: "约 1.5 倍蛋液" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "虾仁去虾线切碎。",
        `${vegetable}${profile.vegetablePrep}。`,
        "鸡蛋与温水打匀过筛。",
        `把虾仁和${vegetable}放入蛋液中，盖好蒸至完全凝固即可。`
      ]
    }
  },
  {
    titles: {
      soft: "牛肉碎煮",
      minced: "牛肉蔬菜煮",
      growth: "牛肉烩菜",
      family: "牛肉时蔬小炒"
    },
    timeMinutes: 18,
    buildIngredients(vegetable, profile) {
      return [
        { name: "牛里脊", amount: formatScaledAmount(50, profile.proteinFactor, "g") },
        { name: vegetable, amount: formatScaledAmount(35, profile.vegetableFactor, "g") },
        { name: "洋葱", amount: formatScaledAmount(10, profile.vegetableFactor, "g") },
        { name: "清水", amount: "适量" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "牛里脊逆纹切碎，洋葱切得尽量细。",
        `${vegetable}${profile.vegetablePrep}备用。`,
        "锅中少量水烧开，先煮洋葱和牛肉。",
        `加入${vegetable}继续煮至完全熟透、整体${profile.finishTexture}即可。`
      ]
    }
  }
]

const VEG_TEMPLATES = [
  {
    titles: {
      soft: "碎碎菜",
      minced: "软炒菜丁",
      growth: "清烩时蔬",
      family: "清炒时蔬"
    },
    timeMinutes: 10,
    buildIngredients(vegetable, profile) {
      return [
        { name: vegetable, amount: formatScaledAmount(80, profile.vegetableFactor, "g") },
        { name: "清水", amount: "适量" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        `${vegetable}洗净后焯水 1-2 分钟。`,
        `${vegetable}${profile.vegetablePrep}。`,
        `回锅加少量水把${vegetable}煮到更软，整体${profile.finishTexture}即可。`
      ]
    }
  },
  {
    titles: {
      soft: "土豆泥",
      minced: "土豆菜泥",
      growth: "土豆时蔬泥",
      family: "土豆时蔬拌"
    },
    timeMinutes: 18,
    buildIngredients(vegetable, profile) {
      return [
        { name: vegetable, amount: formatScaledAmount(50, profile.vegetableFactor, "g") },
        { name: "土豆", amount: formatScaledAmount(80, profile.vegetableFactor, "g") },
        { name: "温水/配方奶", amount: "少量" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        `土豆和${vegetable}分别处理干净。`,
        `食材全部${profile.vegetablePrep}后蒸熟。`,
        `按当前阶段处理成${profile.textureLabel}的状态。`,
        "用少量温水或配方奶调到合适湿润度即可。"
      ]
    }
  },
  {
    titles: {
      soft: "豆腐小煮",
      minced: "蔬菜豆腐小煮",
      growth: "豆腐烩时蔬",
      family: "时蔬豆腐煮"
    },
    timeMinutes: 12,
    buildIngredients(vegetable, profile) {
      return [
        { name: vegetable, amount: formatScaledAmount(55, profile.vegetableFactor, "g") },
        { name: "嫩豆腐", amount: formatScaledAmount(60, profile.proteinFactor, "g") },
        { name: "清水", amount: "适量" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        `${vegetable}${profile.vegetablePrep}，嫩豆腐切成小方块。`,
        "锅中加少量清水烧开。",
        `先下${vegetable}煮软，再放豆腐一起小火煮 2-3 分钟。`,
        `全程轻轻推动，做到${profile.finishTexture}。`
      ]
    }
  },
  {
    titles: {
      soft: "米汤软烩",
      minced: "米汤蔬菜烩",
      growth: "米汤时蔬煮",
      family: "时蔬米汤烩"
    },
    timeMinutes: 12,
    buildIngredients(vegetable, profile) {
      return [
        { name: vegetable, amount: formatScaledAmount(70, profile.vegetableFactor, "g") },
        { name: "米汤", amount: formatScaledAmount(120, profile.stapleFactor, "ml") },
        { name: "玉米淀粉", amount: "2g" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        `${vegetable}${profile.vegetablePrep}。`,
        "米汤煮开后放入蔬菜。",
        "小火煮至食材变软。",
        `最后用少量淀粉水勾薄芡，做到${profile.finishTexture}。`
      ]
    }
  },
  {
    titles: {
      soft: "蒸软拌",
      minced: "山药蔬菜拌",
      growth: "山药时蔬碗",
      family: "山药时蔬拼盘"
    },
    timeMinutes: 14,
    buildIngredients(vegetable, profile) {
      return [
        { name: vegetable, amount: formatScaledAmount(75, profile.vegetableFactor, "g") },
        { name: "山药", amount: formatScaledAmount(40, profile.vegetableFactor, "g") },
        { name: "温水", amount: "少量" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        `${vegetable}和山药处理干净后备用。`,
        `${vegetable}和山药都${profile.vegetablePrep}后蒸熟。`,
        `把食材处理到${profile.textureLabel}的状态。`,
        "视情况加少量温水，让整体更湿润。"
      ]
    }
  }
]

function padNumber(value) {
  return String(value).padStart(2, "0")
}

function formatBirthdayText() {
  return `${BABY_BIRTHDAY.year}-${padNumber(BABY_BIRTHDAY.month)}-${padNumber(BABY_BIRTHDAY.day)}`
}

function getAgeInMonths(date) {
  const targetDate = date || new Date()
  let months =
    (targetDate.getFullYear() - BABY_BIRTHDAY.year) * 12 +
    (targetDate.getMonth() + 1 - BABY_BIRTHDAY.month)

  if (targetDate.getDate() < BABY_BIRTHDAY.day) {
    months -= 1
  }

  return Math.max(months, 0)
}

function formatAgeDisplay(months) {
  if (months < 24) {
    return `${months}个月`
  }

  const years = Math.floor(months / 12)
  const remainMonths = months % 12
  return remainMonths > 0 ? `${years}岁${remainMonths}个月` : `${years}岁`
}

function getAgeProfile(months) {
  return AGE_PROFILES.find((profile) => months >= profile.minMonths && months <= profile.maxMonths) || AGE_PROFILES[AGE_PROFILES.length - 1]
}

function getAgeInfo(date) {
  const months = getAgeInMonths(date)
  const profile = getAgeProfile(months)

  return {
    months,
    monthText: `${months}个月`,
    displayText: formatAgeDisplay(months),
    birthdayText: formatBirthdayText(),
    stageKey: profile.key,
    stageName: profile.stageName,
    titleTag: profile.titleTag,
    textureLabel: profile.textureLabel,
    feedingNote: profile.feedingNote,
    profile
  }
}

function formatScaledAmount(baseValue, factor, unit) {
  const scaledValue = baseValue * factor

  if (unit === "g" || unit === "ml") {
    const roundedValue = Math.max(5, Math.round(scaledValue / 5) * 5)
    return `${roundedValue}${unit}`
  }

  return `${Math.round(scaledValue)}${unit}`
}

function getSeasonKeyByMonth(month) {
  if (month >= 3 && month <= 5) return "spring"
  if (month >= 6 && month <= 8) return "summer"
  if (month >= 9 && month <= 11) return "autumn"
  return "winter"
}

function getSeasonInfo(date) {
  const targetDate = date || new Date()
  const month = targetDate.getMonth() + 1
  const seasonKey = getSeasonKeyByMonth(month)
  const season = SEASONAL_PRODUCE[seasonKey]

  return {
    key: season.key,
    name: season.name,
    monthLabel: season.monthLabel,
    featuredVegetable: season.featuredVegetable,
    vegetables: season.vegetables.slice(),
    summary: `上海${season.name}（${season.monthLabel}）推荐 ${season.vegetables.length} 种时令蔬菜`
  }
}

function getTemplateTitle(template, profile) {
  return template.titles[profile.key] || template.titles.soft || "辅食"
}

function createRecipe(seasonKey, type, index, vegetable, template, ageInfo) {
  const profile = ageInfo.profile

  return {
    id: `${seasonKey}-${type}-${padNumber(index + 1)}`,
    seasonKey,
    seasonVegetable: vegetable,
    type,
    name: `${vegetable}${getTemplateTitle(template, profile)}`,
    timeMinutes: template.timeMinutes,
    ageMonths: ageInfo.months,
    ageDisplayText: ageInfo.displayText,
    ageStageName: ageInfo.stageName,
    textureLabel: ageInfo.textureLabel,
    ingredients: template.buildIngredients(vegetable, profile),
    steps: template.buildSteps(vegetable, profile),
    tips: [
      `当前按${ageInfo.displayText}设计，建议做到${ageInfo.textureLabel}。`,
      ageInfo.feedingNote
    ]
  }
}

const seasonRecipesCache = {}

function getSeasonRecipesCacheKey(seasonKey, ageInfo) {
  return `${seasonKey}-${ageInfo.months}`
}

function buildSeasonRecipes(seasonKey, ageInfo) {
  const recipes = []
  const vegetables = SEASONAL_PRODUCE[seasonKey].vegetables

  STAPLE_TEMPLATES.forEach((template, index) => {
    const vegetable = vegetables[index % vegetables.length]
    recipes.push(createRecipe(seasonKey, "staple", index, vegetable, template, ageInfo))
  })

  PROTEIN_TEMPLATES.forEach((template, index) => {
    const vegetable = vegetables[(index + 5) % vegetables.length]
    recipes.push(createRecipe(seasonKey, "protein", index, vegetable, template, ageInfo))
  })

  vegetables.forEach((vegetable, index) => {
    const template = VEG_TEMPLATES[index % VEG_TEMPLATES.length]
    recipes.push(createRecipe(seasonKey, "veg", index, vegetable, template, ageInfo))
  })

  return recipes
}

function getDailySeed(date, rotation) {
  const targetDate = date || new Date()
  const rotationOffset = Number(rotation) || 0
  return Number(
    `${targetDate.getFullYear()}${padNumber(targetDate.getMonth() + 1)}${padNumber(targetDate.getDate())}`
  ) + rotationOffset * 1009
}

function getScore(seed, salt, id) {
  const input = `${seed}-${salt}-${id}`
  let hash = 0
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 131 + input.charCodeAt(i)) % 2147483647
  }
  return hash
}

function pickOne(list, seed, salt, rotation) {
  if (!list.length) return null
  const sorted = list
    .slice()
    .sort((left, right) => getScore(seed, salt, left.id) - getScore(seed, salt, right.id))
  const offset = sorted.length ? (Number(rotation) || 0) % sorted.length : 0
  return sorted[offset]
}

function pickMany(list, count, seed, salt, rotation) {
  const sorted = list
    .slice()
    .sort((left, right) => getScore(seed, salt, left.id) - getScore(seed, salt, right.id))

  if (!sorted.length) return []

  const offset = (Number(rotation) || 0) % sorted.length
  const rotated = sorted.slice(offset).concat(sorted.slice(0, offset))
  return rotated.slice(0, count)
}

function getRecipesBySeason(seasonKey, date) {
  const ageInfo = getAgeInfo(date)
  const cacheKey = getSeasonRecipesCacheKey(seasonKey, ageInfo)
  if (!seasonRecipesCache[cacheKey]) {
    seasonRecipesCache[cacheKey] = buildSeasonRecipes(seasonKey, ageInfo)
  }
  return seasonRecipesCache[cacheKey]
}

function groupByType(recipes) {
  const byType = { staple: [], protein: [], veg: [] }
  recipes.forEach((recipe) => {
    if (byType[recipe.type]) {
      byType[recipe.type].push(recipe)
    }
  })
  return byType
}

function formatDateText(date) {
  const targetDate = date || new Date()
  return `${targetDate.getFullYear()}-${padNumber(targetDate.getMonth() + 1)}-${padNumber(targetDate.getDate())}`
}

function getTodayPlan(date, rotation) {
  const targetDate = date || new Date()
  const seed = getDailySeed(targetDate, rotation)
  const rotationKey = Number(rotation) || 0
  const season = getSeasonInfo(targetDate)
  const ageInfo = getAgeInfo(targetDate)
  const recipes = getRecipesBySeason(season.key, targetDate)
  const byType = groupByType(recipes)

  const staple = pickOne(byType.staple, seed, `staple-${rotationKey}`, rotationKey)
  const proteinCandidates = staple
    ? byType.protein.filter((recipe) => recipe.seasonVegetable !== staple.seasonVegetable)
    : byType.protein
  const protein = pickOne(proteinCandidates.length ? proteinCandidates : byType.protein, seed, `protein-${rotationKey}`, rotationKey)

  const usedVegetables = {}
  if (staple) usedVegetables[staple.seasonVegetable] = true
  if (protein) usedVegetables[protein.seasonVegetable] = true

  const vegCandidates = byType.veg.filter((recipe) => !usedVegetables[recipe.seasonVegetable])
  const vegs = pickMany(vegCandidates.length >= 2 ? vegCandidates : byType.veg, 2, seed, `veg-${rotationKey}`, rotationKey)

  return {
    dateText: formatDateText(targetDate),
    birthdayText: ageInfo.birthdayText,
    season,
    ageInfo,
    staple,
    protein,
    vegs
  }
}

function getRecipeById(id, date) {
  if (!id) {
    return null
  }

  const seasonKey = String(id).split("-")[0]
  const seasonRecipes = SEASONAL_PRODUCE[seasonKey] ? getRecipesBySeason(seasonKey, date) : []
  if (seasonRecipes.length) {
    return seasonRecipes.find((recipe) => recipe.id === id) || null
  }

  const seasonKeys = Object.keys(SEASONAL_PRODUCE)
  for (let i = 0; i < seasonKeys.length; i += 1) {
    const recipes = getRecipesBySeason(seasonKeys[i], date)
    const matchedRecipe = recipes.find((recipe) => recipe.id === id)
    if (matchedRecipe) {
      return matchedRecipe
    }
  }

  return null
}

module.exports = {
  getAgeInfo,
  getSeasonInfo,
  getTodayPlan,
  getRecipeById
}







