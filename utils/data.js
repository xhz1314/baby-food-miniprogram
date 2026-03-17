const BABY_BIRTHDAY = {
  year: 2024,
  month: 10,
  day: 25
}

const AGE_PROFILES = [
  {
    key: "soft",
    minMonths: 0,
    maxMonths: 11,
    stageName: "细软适应期",
    titleTag: "细软版",
    textureLabel: "切碎或压细，整体湿润细软",
    vegetablePrep: "焯熟后切碎",
    finishTexture: "细软湿润、易吞咽",
    feedingNote: "制作时保持细软湿润，不过度稀薄。",
    stapleFactor: 1,
    proteinFactor: 1,
    vegetableFactor: 1
  },
  {
    key: "minced",
    minMonths: 12,
    maxMonths: 17,
    stageName: "咀嚼能力培养期",
    titleTag: "培养期",
    textureLabel: "软烂小碎末或5-7毫米小丁",
    vegetablePrep: "煮到一夹就断后切成5-7毫米小丁",
    finishTexture: "软烂湿润，便于牙龈咬合",
    feedingNote: "不再打成泥，以小碎末、小丁为主，食物大小控制在5-7毫米左右。",
    stapleFactor: 1.1,
    proteinFactor: 1.1,
    vegetableFactor: 1.1
  },
  {
    key: "growth",
    minMonths: 18,
    maxMonths: 23,
    stageName: "快速成长期",
    titleTag: "成长版",
    textureLabel: "小碎块或可抓握手指食物",
    vegetablePrep: "切成稍大菜丁，确保熟透不硬",
    finishTexture: "熟透软嫩，保留颗粒和形状",
    feedingNote: "逐渐增加粗糙度，可做成小饼、小丸、饭团等便于抓握的形态。",
    stapleFactor: 1.25,
    proteinFactor: 1.2,
    vegetableFactor: 1.2
  },
  {
    key: "family",
    minMonths: 24,
    maxMonths: 99,
    stageName: "家庭餐过渡期",
    titleTag: "宝宝餐版",
    textureLabel: "软嫩适口小块，接近成人软食",
    vegetablePrep: "切得比成人餐更小、煮得更软",
    finishTexture: "熟透成型，方便咀嚼吞咽",
    feedingNote: "可接近家庭餐，但仍保持少盐少油少调味，不提供整颗坚果。",
    stapleFactor: 1.4,
    proteinFactor: 1.3,
    vegetableFactor: 1.3
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
  },
  {
    titles: {
      soft: "奶香米糊",
      minced: "奶香稠粥",
      growth: "奶香杂粮粥",
      family: "奶香谷物粥"
    },
    timeMinutes: 12,
    buildName(vegetable, profile) {
      return getTemplateTitle(this, profile)
    },
    buildIngredients(vegetable, profile) {
      return [
        { name: "大米", amount: formatScaledAmount(25, profile.stapleFactor, "g") },
        { name: "燕麦片", amount: formatScaledAmount(15, profile.stapleFactor, "g") },
        { name: "配方奶/温水", amount: formatScaledAmount(160, profile.stapleFactor, "ml") }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "大米浸泡 20 分钟后与燕麦一起下锅。",
        "加入适量温水，小火慢煮至谷物完全软烂。",
        `按${profile.textureLabel}处理成细腻状态。`,
        "最后根据需要加入少量配方奶调匀即可。"
      ]
    }
  },
  {
    titles: {
      soft: "鸡蛋软饼",
      minced: "鸡蛋软饼",
      growth: "鸡蛋小软饼",
      family: "鸡蛋麦香饼"
    },
    timeMinutes: 15,
    buildName(vegetable, profile) {
      return getTemplateTitle(this, profile)
    },
    buildIngredients(vegetable, profile) {
      return [
        { name: "鸡蛋", amount: "1个" },
        { name: "低筋面粉", amount: formatScaledAmount(25, profile.stapleFactor, "g") },
        { name: "温水", amount: "少量" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "鸡蛋打散，加入面粉和少量温水搅成细糊。",
        "平底锅小火预热，薄薄倒入面糊。",
        "两面煎到完全凝固后取出。",
        `出锅后按${profile.textureLabel}处理成适口大小即可。`
      ]
    }
  },
  {
    titles: {
      soft: "山药小面",
      minced: "山药碎碎面",
      growth: "山药拌面",
      family: "山药面条"
    },
    timeMinutes: 16,
    buildName(vegetable, profile) {
      return getTemplateTitle(this, profile)
    },
    buildIngredients(vegetable, profile) {
      return [
        { name: "宝宝面", amount: formatScaledAmount(35, profile.stapleFactor, "g") },
        { name: "山药", amount: formatScaledAmount(45, profile.vegetableFactor, "g") },
        { name: "清水", amount: "适量" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        `山药去皮切块后蒸熟，处理到${profile.textureLabel}。`,
        "锅中加水煮开，下宝宝面煮软。",
        "将山药加入面中一起翻拌均匀。",
        `整体做到${profile.finishTexture}即可出锅。`
      ]
    }
  },
  {
    titles: {
      soft: "南瓜小米糊",
      minced: "南瓜小米羹",
      growth: "南瓜小米粥",
      family: "南瓜小米饭"
    },
    timeMinutes: 18,
    buildName(vegetable, profile) {
      return getTemplateTitle(this, profile)
    },
    buildIngredients(vegetable, profile) {
      return [
        { name: "南瓜", amount: formatScaledAmount(50, profile.vegetableFactor, "g") },
        { name: "小米", amount: formatScaledAmount(25, profile.stapleFactor, "g") },
        { name: "清水", amount: "适量" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "南瓜去皮切块，小米淘洗干净。",
        "锅中加水烧开后放入小米，小火慢煮。",
        "加入南瓜继续煮到食材完全软烂。",
        `最后按${profile.textureLabel}处理即可。`
      ]
    }
  },
  {
    titles: {
      soft: "土豆饭团",
      minced: "土豆小饭团",
      growth: "土豆拌饭团",
      family: "土豆米饭团"
    },
    timeMinutes: 20,
    buildName(vegetable, profile) {
      return getTemplateTitle(this, profile)
    },
    buildIngredients(vegetable, profile) {
      return [
        { name: "胚芽米饭", amount: formatScaledAmount(75, profile.stapleFactor, "g") },
        { name: "土豆", amount: formatScaledAmount(45, profile.vegetableFactor, "g") },
        { name: "温水", amount: "少量" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "土豆去皮蒸熟，压成细泥。",
        "米饭回温后与土豆泥混合拌匀。",
        `按${profile.textureLabel}处理后整理成小饭团。`,
        "如偏干可补少量温水再拌匀。"
      ]
    }
  },
  {
    titles: {
      soft: "春笋软饭",
      minced: "春笋碎碎饭",
      growth: "春笋拌饭",
      family: "春笋焖饭"
    },
    timeMinutes: 20,
    buildName(vegetable, profile) {
      return getTemplateTitle(this, profile)
    },
    buildIngredients(vegetable, profile) {
      return [
        { name: "胚芽米饭", amount: formatScaledAmount(75, profile.stapleFactor, "g") },
        { name: "春笋", amount: formatScaledAmount(40, profile.vegetableFactor, "g") },
        { name: "胡萝卜", amount: formatScaledAmount(20, profile.vegetableFactor, "g") },
        { name: "清水", amount: "少量" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "春笋焯水后切碎，胡萝卜处理细小。",
        "米饭回锅加少量温水焖软。",
        "加入春笋和胡萝卜翻拌均匀。",
        `整体做到${profile.finishTexture}即可。`
      ]
    }
  },
  {
    titles: {
      soft: "菠菜疙瘩面",
      minced: "菠菜碎面疙瘩",
      growth: "菠菜面疙瘩",
      family: "菠菜软面片"
    },
    timeMinutes: 18,
    buildName(vegetable, profile) {
      return getTemplateTitle(this, profile)
    },
    buildIngredients(vegetable, profile) {
      return [
        { name: "面粉", amount: formatScaledAmount(30, profile.stapleFactor, "g") },
        { name: "菠菜", amount: formatScaledAmount(35, profile.vegetableFactor, "g") },
        { name: "鸡蛋", amount: "1个" },
        { name: "清水", amount: "适量" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "菠菜焯熟切碎，鸡蛋打散备用。",
        "面粉加少量清水调成小面絮。",
        "水开后下入面絮和菠菜煮软。",
        `最后淋入蛋液，煮到${profile.finishTexture}即可。`
      ]
    }
  },
  {
    titles: {
      soft: "芦笋鸡蛋卷",
      minced: "芦笋鸡蛋软卷",
      growth: "芦笋鸡蛋饼",
      family: "芦笋鸡蛋卷"
    },
    timeMinutes: 15,
    buildName(vegetable, profile) {
      return getTemplateTitle(this, profile)
    },
    buildIngredients(vegetable, profile) {
      return [
        { name: "鸡蛋", amount: "1个" },
        { name: "低筋面粉", amount: formatScaledAmount(20, profile.stapleFactor, "g") },
        { name: "芦笋", amount: formatScaledAmount(30, profile.vegetableFactor, "g") },
        { name: "温水", amount: "少量" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "芦笋焯熟切碎，鸡蛋打散。",
        "加入面粉和少量温水搅成细糊。",
        "平底锅小火摊成薄饼后卷起。",
        `出锅后按${profile.textureLabel}切段即可。`
      ]
    }
  },
  {
    titles: {
      soft: "玉米软饭",
      minced: "玉米碎碎饭",
      growth: "玉米拌饭",
      family: "玉米焖饭"
    },
    timeMinutes: 20,
    buildName(vegetable, profile) {
      return getTemplateTitle(this, profile)
    },
    buildIngredients(vegetable, profile) {
      return [
        { name: "胚芽米饭", amount: formatScaledAmount(75, profile.stapleFactor, "g") },
        { name: "甜玉米", amount: formatScaledAmount(40, profile.vegetableFactor, "g") },
        { name: "胡萝卜", amount: formatScaledAmount(20, profile.vegetableFactor, "g") },
        { name: "清水", amount: "少量" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "甜玉米煮熟取粒，胡萝卜处理细小。",
        "米饭回锅加少量温水焖软。",
        "加入玉米粒和胡萝卜翻拌均匀。",
        `整体做到${profile.finishTexture}即可。`
      ]
    }
  },
  {
    titles: {
      soft: "番茄疙瘩面",
      minced: "番茄面疙瘩",
      growth: "番茄软面片",
      family: "番茄小面片"
    },
    timeMinutes: 18,
    buildName(vegetable, profile) {
      return getTemplateTitle(this, profile)
    },
    buildIngredients(vegetable, profile) {
      return [
        { name: "面粉", amount: formatScaledAmount(30, profile.stapleFactor, "g") },
        { name: "番茄", amount: formatScaledAmount(40, profile.vegetableFactor, "g") },
        { name: "鸡蛋", amount: "1个" },
        { name: "清水", amount: "适量" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "番茄去皮切碎，鸡蛋打散备用。",
        "面粉加少量清水调成小面絮。",
        "锅中先煮番茄，再下入面絮。",
        `淋入蛋液后煮到${profile.finishTexture}即可。`
      ]
    }
  },
  {
    titles: {
      soft: "南瓜发糕",
      minced: "南瓜软蒸糕",
      growth: "南瓜小蒸糕",
      family: "南瓜发糕"
    },
    timeMinutes: 22,
    buildName(vegetable, profile) {
      return getTemplateTitle(this, profile)
    },
    buildIngredients(vegetable, profile) {
      return [
        { name: "南瓜", amount: formatScaledAmount(55, profile.vegetableFactor, "g") },
        { name: "低筋面粉", amount: formatScaledAmount(30, profile.stapleFactor, "g") },
        { name: "鸡蛋", amount: "1个" },
        { name: "温水", amount: "少量" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "南瓜蒸熟压泥，鸡蛋打散。",
        "加入面粉搅成顺滑面糊。",
        "装入小碗后上锅蒸熟。",
        `出锅后按${profile.textureLabel}切块即可。`
      ]
    }
  },
  {
    titles: {
      soft: "山芋燕麦粥",
      minced: "山芋燕麦羹",
      growth: "山芋燕麦粥",
      family: "山芋燕麦饭"
    },
    timeMinutes: 18,
    buildName(vegetable, profile) {
      return getTemplateTitle(this, profile)
    },
    buildIngredients(vegetable, profile) {
      return [
        { name: "山芋", amount: formatScaledAmount(50, profile.vegetableFactor, "g") },
        { name: "燕麦片", amount: formatScaledAmount(20, profile.stapleFactor, "g") },
        { name: "大米", amount: formatScaledAmount(15, profile.stapleFactor, "g") },
        { name: "清水", amount: "适量" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "山芋去皮切小块，谷物淘洗干净。",
        "大米与燕麦先下锅慢煮。",
        "加入山芋继续煮到软烂。",
        `最后按${profile.textureLabel}整理即可。`
      ]
    }
  },
  {
    titles: {
      soft: "百合小米粥",
      minced: "百合小米羹",
      growth: "百合小米粥",
      family: "百合小米饭"
    },
    timeMinutes: 18,
    buildName(vegetable, profile) {
      return getTemplateTitle(this, profile)
    },
    buildIngredients(vegetable, profile) {
      return [
        { name: "鲜百合", amount: formatScaledAmount(35, profile.vegetableFactor, "g") },
        { name: "小米", amount: formatScaledAmount(25, profile.stapleFactor, "g") },
        { name: "南瓜", amount: formatScaledAmount(25, profile.vegetableFactor, "g") },
        { name: "清水", amount: "适量" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "鲜百合掰开洗净，小米淘洗干净。",
        "锅中先煮小米。",
        "加入百合和南瓜继续煮软。",
        `最后按${profile.textureLabel}处理即可。`
      ]
    }
  },
  {
    titles: {
      soft: "芋头小面片",
      minced: "芋头碎面片",
      growth: "芋头软面片",
      family: "芋头面片"
    },
    timeMinutes: 18,
    buildName(vegetable, profile) {
      return getTemplateTitle(this, profile)
    },
    buildIngredients(vegetable, profile) {
      return [
        { name: "面粉", amount: formatScaledAmount(30, profile.stapleFactor, "g") },
        { name: "芋头", amount: formatScaledAmount(40, profile.vegetableFactor, "g") },
        { name: "鸡蛋", amount: "1个" },
        { name: "清水", amount: "适量" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "芋头蒸熟压泥，面粉加少量水和成小面团。",
        "锅中加水烧开，揪入小面片煮熟。",
        "加入芋头泥一起翻拌均匀。",
        `整体做到${profile.finishTexture}即可。`
      ]
    }
  },
  {
    titles: {
      soft: "山药软面片",
      minced: "山药碎面片",
      growth: "山药拌面片",
      family: "山药面片"
    },
    timeMinutes: 18,
    buildName(vegetable, profile) {
      return getTemplateTitle(this, profile)
    },
    buildIngredients(vegetable, profile) {
      return [
        { name: "面粉", amount: formatScaledAmount(30, profile.stapleFactor, "g") },
        { name: "山药", amount: formatScaledAmount(45, profile.vegetableFactor, "g") },
        { name: "鸡蛋", amount: "1个" },
        { name: "清水", amount: "适量" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "山药蒸熟压泥，面粉加少量水做成小面团。",
        "水开后揪入小面片煮熟。",
        "加入山药泥翻拌均匀。",
        `整体做到${profile.finishTexture}即可。`
      ]
    }
  },
  {
    titles: {
      soft: "白菜鸡蛋面",
      minced: "白菜碎碎面",
      growth: "白菜拌面",
      family: "白菜鸡蛋面"
    },
    timeMinutes: 16,
    buildName(vegetable, profile) {
      return getTemplateTitle(this, profile)
    },
    buildIngredients(vegetable, profile) {
      return [
        { name: "宝宝面", amount: formatScaledAmount(35, profile.stapleFactor, "g") },
        { name: "大白菜", amount: formatScaledAmount(40, profile.vegetableFactor, "g") },
        { name: "鸡蛋", amount: "1个" },
        { name: "清水", amount: "适量" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "大白菜切细，鸡蛋打散备用。",
        "锅中加水烧开，下宝宝面煮软。",
        "加入大白菜继续小火煮。",
        `最后淋入蛋液，煮到${profile.finishTexture}即可。`
      ]
    }
  },
  {
    titles: {
      soft: "花菜小饭团",
      minced: "花菜碎饭团",
      growth: "花菜拌饭团",
      family: "花菜米饭团"
    },
    timeMinutes: 18,
    buildName(vegetable, profile) {
      return getTemplateTitle(this, profile)
    },
    buildIngredients(vegetable, profile) {
      return [
        { name: "胚芽米饭", amount: formatScaledAmount(75, profile.stapleFactor, "g") },
        { name: "花菜", amount: formatScaledAmount(35, profile.vegetableFactor, "g") },
        { name: "土豆", amount: formatScaledAmount(30, profile.vegetableFactor, "g") },
        { name: "温水", amount: "少量" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "花菜焯熟切碎，土豆蒸熟压泥。",
        "和米饭混合拌匀。",
        `按${profile.textureLabel}整理成小饭团。`,
        "如偏干可补少量温水再拌匀。"
      ]
    }
  }
]

const PROTEIN_TEMPLATES = [
  {
    titles: {
      soft: "鸡肉软丸",
      minced: "鸡肉嫩丸",
      growth: "鸡肉小肉饼",
      family: "鸡肉香煎饼"
    },
    timeMinutes: 20,
    buildIngredients(vegetable, profile) {
      return [
        { name: "鸡胸肉", amount: formatScaledAmount(80, profile.proteinFactor, "g") },
        { name: "鸡蛋", amount: "1个" },
        { name: "淀粉", amount: "5g" },
        { name: "清水", amount: "少量" }
      ]
    },
    buildSteps(vegetable, profile) {
      const shapeText = profile.key === "growth" || profile.key === "family" ? "整理成小肉饼" : "整理成小丸子"
      return [
        "鸡胸肉剁成细泥，鸡蛋打散备用。",
        "加入少量蛋液和淀粉，顺一个方向搅匀上劲。",
        `${shapeText}。`,
        `上锅蒸熟或小火煎焖到${profile.finishTexture}即可。`
      ]
    }
  },
  {
    titles: {
      soft: "鸡肉豆腐蒸糕",
      minced: "鸡肉豆腐糕",
      growth: "鸡肉豆腐蒸饼",
      family: "鸡肉豆腐蒸块"
    },
    timeMinutes: 18,
    buildIngredients(vegetable, profile) {
      return [
        { name: "鸡胸肉", amount: formatScaledAmount(60, profile.proteinFactor, "g") },
        { name: "嫩豆腐", amount: formatScaledAmount(45, profile.proteinFactor, "g") },
        { name: "玉米淀粉", amount: "5g" },
        { name: "温水", amount: "少量" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "鸡胸肉剁细，嫩豆腐压成细泥。",
        "混合后加入淀粉搅匀，装入耐热容器。",
        "表面抹平后上锅蒸熟。",
        `出锅后按${profile.textureLabel}切分即可。`
      ]
    }
  },
  {
    titles: {
      soft: "鸡肉山药球",
      minced: "鸡肉山药小球",
      growth: "鸡肉山药软团",
      family: "鸡肉山药软丸"
    },
    timeMinutes: 20,
    buildIngredients(vegetable, profile) {
      return [
        { name: "鸡胸肉", amount: formatScaledAmount(55, profile.proteinFactor, "g") },
        { name: "山药", amount: formatScaledAmount(45, profile.vegetableFactor, "g") },
        { name: "淀粉", amount: "5g" },
        { name: "清水", amount: "少量" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "山药蒸熟压泥，鸡胸肉剁成细泥。",
        "混合后加入少量淀粉搅匀。",
        "整理成小球状。",
        `上锅蒸熟至整体${profile.finishTexture}即可。`
      ]
    }
  },
  {
    titles: {
      soft: "牛肉小丸子",
      minced: "牛肉嫩丸",
      growth: "牛肉小肉饼",
      family: "牛肉软煎饼"
    },
    timeMinutes: 20,
    buildIngredients(vegetable, profile) {
      return [
        { name: "牛里脊", amount: formatScaledAmount(60, profile.proteinFactor, "g") },
        { name: "嫩豆腐", amount: formatScaledAmount(35, profile.proteinFactor, "g") },
        { name: "淀粉", amount: "5g" },
        { name: "清水", amount: "少量" }
      ]
    },
    buildSteps(vegetable, profile) {
      const shapeText = profile.key === "growth" || profile.key === "family" ? "整理成小肉饼" : "整理成小丸子"
      return [
        "牛里脊逆纹切碎，嫩豆腐压细备用。",
        "加入少量淀粉搅匀上劲。",
        `${shapeText}。`,
        `上锅蒸熟或小火煎焖至${profile.finishTexture}即可。`
      ]
    }
  },
  {
    titles: {
      soft: "牛肉土豆饼",
      minced: "牛肉土豆小饼",
      growth: "牛肉土豆煎饼",
      family: "牛肉土豆软饼"
    },
    timeMinutes: 22,
    buildIngredients(vegetable, profile) {
      return [
        { name: "牛里脊", amount: formatScaledAmount(55, profile.proteinFactor, "g") },
        { name: "土豆", amount: formatScaledAmount(50, profile.vegetableFactor, "g") },
        { name: "淀粉", amount: "5g" },
        { name: "清水", amount: "少量" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "土豆蒸熟压泥，牛里脊逆纹切碎。",
        "混合后加入少量淀粉搅匀。",
        "整理成薄薄的小饼。",
        `平底锅少油小火煎焖到${profile.finishTexture}即可。`
      ]
    }
  },
  {
    titles: {
      soft: "鳕鱼蒸蛋",
      minced: "鳕鱼嫩蒸蛋",
      growth: "鳕鱼滑蛋",
      family: "鳕鱼蛋盅"
    },
    timeMinutes: 18,
    buildIngredients(vegetable, profile) {
      return [
        { name: "鸡蛋", amount: "1个" },
        { name: "鳕鱼", amount: formatScaledAmount(40, profile.proteinFactor, "g") },
        { name: "温水", amount: "约 1.5 倍蛋液" },
        { name: "淀粉", amount: "少量" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "鳕鱼去刺蒸熟压碎备用。",
        "鸡蛋打散后加温水搅匀并过筛。",
        "把鳕鱼碎铺入蛋液中。",
        `中小火蒸至完全凝固、整体${profile.finishTexture}即可。`
      ]
    }
  },
  {
    titles: {
      soft: "鳕鱼土豆饼",
      minced: "鳕鱼小软饼",
      growth: "鳕鱼土豆煎饼",
      family: "鳕鱼土豆软饼"
    },
    timeMinutes: 22,
    buildIngredients(vegetable, profile) {
      return [
        { name: "鳕鱼", amount: formatScaledAmount(45, profile.proteinFactor, "g") },
        { name: "土豆", amount: formatScaledAmount(50, profile.vegetableFactor, "g") },
        { name: "淀粉", amount: "5g" },
        { name: "清水", amount: "少量" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "鳕鱼蒸熟去刺压碎，土豆蒸熟压泥。",
        "混合后加入少量淀粉搅匀。",
        "整理成小饼状。",
        `平底锅少油小火煎焖到${profile.finishTexture}即可。`
      ]
    }
  },
  {
    titles: {
      soft: "虾仁豆腐饼",
      minced: "虾仁豆腐小饼",
      growth: "虾仁豆腐煎饼",
      family: "虾仁豆腐软饼"
    },
    timeMinutes: 18,
    buildIngredients(vegetable, profile) {
      return [
        { name: "虾仁", amount: formatScaledAmount(40, profile.proteinFactor, "g") },
        { name: "嫩豆腐", amount: formatScaledAmount(45, profile.proteinFactor, "g") },
        { name: "淀粉", amount: "5g" },
        { name: "清水", amount: "少量" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "虾仁去虾线切碎，嫩豆腐压细备用。",
        "加入少量淀粉搅匀。",
        "整理成小饼状。",
        `上锅蒸熟或小火煎焖到${profile.finishTexture}即可。`
      ]
    }
  },
  {
    titles: {
      soft: "虾仁蒸豆腐",
      minced: "虾仁嫩豆腐",
      growth: "虾仁豆腐蒸盅",
      family: "虾仁豆腐蒸碗"
    },
    timeMinutes: 16,
    buildIngredients(vegetable, profile) {
      return [
        { name: "虾仁", amount: formatScaledAmount(35, profile.proteinFactor, "g") },
        { name: "嫩豆腐", amount: formatScaledAmount(55, profile.proteinFactor, "g") },
        { name: "鸡蛋", amount: "1个" },
        { name: "温水", amount: "少量" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "虾仁去虾线切碎，嫩豆腐压细备用。",
        "鸡蛋打散后与豆腐、虾仁轻轻拌匀。",
        "装入耐热小碗。",
        `中小火蒸至完全熟透、整体${profile.finishTexture}即可。`
      ]
    }
  },
  {
    titles: {
      soft: "鸡蛋豆腐蒸盅",
      minced: "鸡蛋豆腐嫩蒸盅",
      growth: "鸡蛋豆腐软蒸盅",
      family: "鸡蛋豆腐蒸碗"
    },
    timeMinutes: 14,
    buildIngredients(vegetable, profile) {
      return [
        { name: "鸡蛋", amount: "1个" },
        { name: "嫩豆腐", amount: formatScaledAmount(60, profile.proteinFactor, "g") },
        { name: "温水", amount: "约 1 倍蛋液" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "嫩豆腐压细或切小丁放入小碗。",
        "鸡蛋与温水搅匀后倒入碗中。",
        "盖上耐热盖或保鲜膜扎小孔。",
        `上锅蒸至整体${profile.finishTexture}即可。`
      ]
    }
  },
  {
    titles: {
      soft: "鸡肉芦笋蒸糕",
      minced: "鸡肉芦笋软糕",
      growth: "鸡肉芦笋蒸饼",
      family: "鸡肉芦笋蒸块"
    },
    timeMinutes: 18,
    buildIngredients(vegetable, profile) {
      return [
        { name: "鸡胸肉", amount: formatScaledAmount(60, profile.proteinFactor, "g") },
        { name: "芦笋", amount: formatScaledAmount(30, profile.vegetableFactor, "g") },
        { name: "嫩豆腐", amount: formatScaledAmount(35, profile.proteinFactor, "g") },
        { name: "淀粉", amount: "5g" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "鸡胸肉剁细，芦笋焯熟切碎。",
        "与嫩豆腐、淀粉混合搅匀。",
        "装入耐热容器抹平。",
        `上锅蒸熟后按${profile.textureLabel}切分即可。`
      ]
    }
  },
  {
    titles: {
      soft: "鳕鱼春笋小饼",
      minced: "鳕鱼春笋软饼",
      growth: "鳕鱼春笋煎饼",
      family: "鳕鱼春笋小饼"
    },
    timeMinutes: 20,
    buildIngredients(vegetable, profile) {
      return [
        { name: "鳕鱼", amount: formatScaledAmount(45, profile.proteinFactor, "g") },
        { name: "春笋", amount: formatScaledAmount(30, profile.vegetableFactor, "g") },
        { name: "土豆", amount: formatScaledAmount(35, profile.vegetableFactor, "g") },
        { name: "淀粉", amount: "5g" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "鳕鱼蒸熟去刺压碎，春笋焯熟切细。",
        "土豆蒸熟压泥后与食材混合。",
        "整理成小饼状。",
        `平底锅小火煎焖到${profile.finishTexture}即可。`
      ]
    }
  },
  {
    titles: {
      soft: "牛肉莴笋软丸",
      minced: "牛肉莴笋嫩丸",
      growth: "牛肉莴笋小肉饼",
      family: "牛肉莴笋软煎饼"
    },
    timeMinutes: 18,
    buildIngredients(vegetable, profile) {
      return [
        { name: "牛里脊", amount: formatScaledAmount(55, profile.proteinFactor, "g") },
        { name: "莴笋", amount: formatScaledAmount(30, profile.vegetableFactor, "g") },
        { name: "嫩豆腐", amount: formatScaledAmount(30, profile.proteinFactor, "g") },
        { name: "淀粉", amount: "5g" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "牛里脊切碎，莴笋焯熟切细。",
        "与豆腐、淀粉混合搅匀。",
        `按${profile.textureLabel}整理成小丸或小饼。`,
        `上锅蒸熟或小火煎焖到${profile.finishTexture}即可。`
      ]
    }
  },
  {
    titles: {
      soft: "鸡肉玉米软饼",
      minced: "鸡肉玉米小饼",
      growth: "鸡肉玉米煎饼",
      family: "鸡肉玉米软饼"
    },
    timeMinutes: 18,
    buildIngredients(vegetable, profile) {
      return [
        { name: "鸡胸肉", amount: formatScaledAmount(60, profile.proteinFactor, "g") },
        { name: "甜玉米", amount: formatScaledAmount(35, profile.vegetableFactor, "g") },
        { name: "土豆", amount: formatScaledAmount(30, profile.vegetableFactor, "g") },
        { name: "淀粉", amount: "5g" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "鸡胸肉剁细，玉米煮熟取粒。",
        "土豆蒸熟压泥后与食材混合。",
        "整理成小饼状。",
        `上锅蒸熟或小火煎焖到${profile.finishTexture}即可。`
      ]
    }
  },
  {
    titles: {
      soft: "虾仁丝瓜蒸蛋",
      minced: "虾仁丝瓜嫩蒸蛋",
      growth: "虾仁丝瓜蛋羹",
      family: "虾仁丝瓜蒸盅"
    },
    timeMinutes: 16,
    buildIngredients(vegetable, profile) {
      return [
        { name: "虾仁", amount: formatScaledAmount(35, profile.proteinFactor, "g") },
        { name: "丝瓜", amount: formatScaledAmount(30, profile.vegetableFactor, "g") },
        { name: "鸡蛋", amount: "1个" },
        { name: "温水", amount: "约 1 倍蛋液" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "虾仁切碎，丝瓜去皮切细。",
        "鸡蛋加温水打匀并过筛。",
        "把丝瓜和虾仁放入蛋液中。",
        `中小火蒸至整体${profile.finishTexture}即可。`
      ]
    }
  },
  {
    titles: {
      soft: "鳕鱼南瓜蒸糕",
      minced: "鳕鱼南瓜软糕",
      growth: "鳕鱼南瓜蒸饼",
      family: "鳕鱼南瓜蒸块"
    },
    timeMinutes: 18,
    buildIngredients(vegetable, profile) {
      return [
        { name: "鳕鱼", amount: formatScaledAmount(45, profile.proteinFactor, "g") },
        { name: "南瓜", amount: formatScaledAmount(40, profile.vegetableFactor, "g") },
        { name: "嫩豆腐", amount: formatScaledAmount(30, profile.proteinFactor, "g") },
        { name: "淀粉", amount: "5g" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "鳕鱼蒸熟去刺压碎，南瓜蒸熟压泥。",
        "与豆腐、淀粉混合搅匀。",
        "装入小碗抹平后上锅蒸熟。",
        `出锅后按${profile.textureLabel}切分即可。`
      ]
    }
  },
  {
    titles: {
      soft: "牛肉南瓜蒸糕",
      minced: "牛肉南瓜软糕",
      growth: "牛肉南瓜蒸饼",
      family: "牛肉南瓜蒸块"
    },
    timeMinutes: 18,
    buildIngredients(vegetable, profile) {
      return [
        { name: "牛里脊", amount: formatScaledAmount(55, profile.proteinFactor, "g") },
        { name: "南瓜", amount: formatScaledAmount(40, profile.vegetableFactor, "g") },
        { name: "嫩豆腐", amount: formatScaledAmount(30, profile.proteinFactor, "g") },
        { name: "淀粉", amount: "5g" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "牛里脊切碎，南瓜蒸熟压泥。",
        "与豆腐、淀粉混合搅匀。",
        "装入耐热小碗抹平。",
        `上锅蒸熟后按${profile.textureLabel}切分即可。`
      ]
    }
  },
  {
    titles: {
      soft: "鸡肉山芋软丸",
      minced: "鸡肉山芋嫩丸",
      growth: "鸡肉山芋小肉饼",
      family: "鸡肉山芋软煎饼"
    },
    timeMinutes: 18,
    buildIngredients(vegetable, profile) {
      return [
        { name: "鸡胸肉", amount: formatScaledAmount(60, profile.proteinFactor, "g") },
        { name: "山芋", amount: formatScaledAmount(35, profile.vegetableFactor, "g") },
        { name: "嫩豆腐", amount: formatScaledAmount(30, profile.proteinFactor, "g") },
        { name: "淀粉", amount: "5g" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "鸡胸肉剁细，山芋蒸熟压泥。",
        "与豆腐、淀粉混合搅匀。",
        `按${profile.textureLabel}整理成小丸或小饼。`,
        `上锅蒸熟或小火煎焖到${profile.finishTexture}即可。`
      ]
    }
  },
  {
    titles: {
      soft: "虾仁百合蒸蛋",
      minced: "虾仁百合嫩蒸蛋",
      growth: "虾仁百合蛋羹",
      family: "虾仁百合蒸盅"
    },
    timeMinutes: 16,
    buildIngredients(vegetable, profile) {
      return [
        { name: "虾仁", amount: formatScaledAmount(35, profile.proteinFactor, "g") },
        { name: "鲜百合", amount: formatScaledAmount(25, profile.vegetableFactor, "g") },
        { name: "鸡蛋", amount: "1个" },
        { name: "温水", amount: "约 1 倍蛋液" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "虾仁切碎，鲜百合掰成小片。",
        "鸡蛋加温水打匀并过筛。",
        "把百合和虾仁放入蛋液中。",
        `中小火蒸至整体${profile.finishTexture}即可。`
      ]
    }
  },
  {
    titles: {
      soft: "鸡肉山药蒸糕",
      minced: "鸡肉山药软糕",
      growth: "鸡肉山药蒸饼",
      family: "鸡肉山药蒸块"
    },
    timeMinutes: 18,
    buildIngredients(vegetable, profile) {
      return [
        { name: "鸡胸肉", amount: formatScaledAmount(60, profile.proteinFactor, "g") },
        { name: "山药", amount: formatScaledAmount(35, profile.vegetableFactor, "g") },
        { name: "嫩豆腐", amount: formatScaledAmount(30, profile.proteinFactor, "g") },
        { name: "淀粉", amount: "5g" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "鸡胸肉剁细，山药蒸熟压泥。",
        "与豆腐、淀粉混合搅匀。",
        "装入小碗抹平后上锅蒸熟。",
        `出锅后按${profile.textureLabel}切分即可。`
      ]
    }
  },
  {
    titles: {
      soft: "鳕鱼芋头软饼",
      minced: "鳕鱼芋头小饼",
      growth: "鳕鱼芋头煎饼",
      family: "鳕鱼芋头软饼"
    },
    timeMinutes: 20,
    buildIngredients(vegetable, profile) {
      return [
        { name: "鳕鱼", amount: formatScaledAmount(45, profile.proteinFactor, "g") },
        { name: "芋头", amount: formatScaledAmount(35, profile.vegetableFactor, "g") },
        { name: "土豆", amount: formatScaledAmount(30, profile.vegetableFactor, "g") },
        { name: "淀粉", amount: "5g" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "鳕鱼蒸熟去刺压碎，芋头蒸熟压泥。",
        "与土豆泥、淀粉混合搅匀。",
        "整理成小饼状。",
        `平底锅小火煎焖到${profile.finishTexture}即可。`
      ]
    }
  },
  {
    titles: {
      soft: "虾仁白菜蒸蛋",
      minced: "虾仁白菜嫩蒸蛋",
      growth: "虾仁白菜蛋羹",
      family: "虾仁白菜蒸盅"
    },
    timeMinutes: 16,
    buildIngredients(vegetable, profile) {
      return [
        { name: "虾仁", amount: formatScaledAmount(35, profile.proteinFactor, "g") },
        { name: "大白菜", amount: formatScaledAmount(30, profile.vegetableFactor, "g") },
        { name: "鸡蛋", amount: "1个" },
        { name: "温水", amount: "约 1 倍蛋液" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        "虾仁切碎，大白菜焯熟切细。",
        "鸡蛋与温水打匀并过筛。",
        "把白菜和虾仁放入蛋液中。",
        `中小火蒸至整体${profile.finishTexture}即可。`
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
      minced: "土豆菜丁",
      growth: "土豆时蔬小块",
      family: "土豆时蔬拼"
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
  },
  {
    titles: {
      soft: "时蔬蒸盅",
      minced: "蒸软菜盅",
      growth: "蒸时蔬碗",
      family: "蒸时蔬拼盘"
    },
    timeMinutes: 15,
    buildIngredients(vegetable, profile) {
      return [
        { name: vegetable, amount: formatScaledAmount(80, profile.vegetableFactor, "g") },
        { name: "玉米粒", amount: formatScaledAmount(20, profile.vegetableFactor, "g") },
        { name: "温水", amount: "少量" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        `${vegetable}${profile.vegetablePrep}，玉米粒洗净备用。`,
        "食材装入小碗，加入少量温水。",
        "上锅蒸 8-10 分钟至完全软熟。",
        `出锅后按${profile.textureLabel}整理即可。`
      ]
    }
  },
  {
    titles: {
      soft: "时蔬小炖",
      minced: "炖软菜丁",
      growth: "炖煮时蔬",
      family: "时蔬小炖锅"
    },
    timeMinutes: 18,
    buildIngredients(vegetable, profile) {
      return [
        { name: vegetable, amount: formatScaledAmount(75, profile.vegetableFactor, "g") },
        { name: "香菇", amount: formatScaledAmount(20, profile.vegetableFactor, "g") },
        { name: "清水", amount: "适量" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        `${vegetable}${profile.vegetablePrep}，香菇切碎备用。`,
        "锅中加少量清水，先煮香菇。",
        `加入${vegetable}后继续小火炖煮。`,
        `炖到整体${profile.finishTexture}即可。`
      ]
    }
  },
  {
    titles: {
      soft: "时蔬软焖",
      minced: "时蔬焖菜",
      growth: "时蔬焖煮",
      family: "时蔬焖锅"
    },
    timeMinutes: 17,
    buildIngredients(vegetable, profile) {
      return [
        { name: vegetable, amount: formatScaledAmount(80, profile.vegetableFactor, "g") },
        { name: "土豆", amount: formatScaledAmount(30, profile.vegetableFactor, "g") },
        { name: "清水", amount: "少量" }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        `${vegetable}和土豆处理干净后备用。`,
        `${vegetable}和土豆都${profile.vegetablePrep}。`,
        "锅中加少量水，盖盖小火焖煮。",
        `焖到整体${profile.finishTexture}即可。`
      ]
    }
  }
]

const SOUP_TEMPLATES = [
  {
    titles: {
      soft: "时蔬浓汤",
      minced: "时蔬浓羹",
      growth: "时蔬汤羹",
      family: "时蔬浓汤"
    },
    timeMinutes: 16,
    buildIngredients(vegetable, profile) {
      return [
        { name: vegetable, amount: formatScaledAmount(70, profile.vegetableFactor, "g") },
        { name: "南瓜", amount: formatScaledAmount(45, profile.vegetableFactor, "g") },
        { name: "温水", amount: formatScaledAmount(120, profile.stapleFactor, "ml") }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        `${vegetable}和南瓜处理干净后蒸熟。`,
        `食材按${profile.textureLabel}打碎或压细。`,
        "加入温水回锅，小火加热并搅匀。",
        `整体煮到${profile.finishTexture}即可。`
      ]
    }
  },
  {
    titles: {
      soft: "时蔬米羹",
      minced: "蔬菜米羹",
      growth: "米香时蔬羹",
      family: "时蔬米汤"
    },
    timeMinutes: 14,
    buildIngredients(vegetable, profile) {
      return [
        { name: vegetable, amount: formatScaledAmount(65, profile.vegetableFactor, "g") },
        { name: "熟米饭", amount: formatScaledAmount(35, profile.stapleFactor, "g") },
        { name: "温水", amount: formatScaledAmount(120, profile.stapleFactor, "ml") }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        `${vegetable}${profile.vegetablePrep}后煮软。`,
        "熟米饭加入温水打散备用。",
        "将蔬菜和米汤一起回锅加热。",
        `煮到${profile.finishTexture}后即可出锅。`
      ]
    }
  },
  {
    titles: {
      soft: "豆腐蔬菜羹",
      minced: "豆腐蔬菜小羹",
      growth: "豆腐时蔬羹",
      family: "豆腐时蔬汤"
    },
    timeMinutes: 12,
    buildIngredients(vegetable, profile) {
      return [
        { name: vegetable, amount: formatScaledAmount(55, profile.vegetableFactor, "g") },
        { name: "嫩豆腐", amount: formatScaledAmount(60, profile.proteinFactor, "g") },
        { name: "清水", amount: formatScaledAmount(100, profile.stapleFactor, "ml") }
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
      soft: "山药蔬菜羹",
      minced: "山药蔬菜小羹",
      growth: "山药时蔬羹",
      family: "山药时蔬汤"
    },
    timeMinutes: 15,
    buildIngredients(vegetable, profile) {
      return [
        { name: vegetable, amount: formatScaledAmount(60, profile.vegetableFactor, "g") },
        { name: "山药", amount: formatScaledAmount(40, profile.vegetableFactor, "g") },
        { name: "温水", amount: formatScaledAmount(110, profile.stapleFactor, "ml") }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        `${vegetable}和山药分别处理干净。`,
        `${vegetable}和山药都煮软后按${profile.textureLabel}压细。`,
        "加入温水回锅，小火慢煮。",
        `煮到整体${profile.finishTexture}即可。`
      ]
    }
  },
  {
    titles: {
      soft: "蔬菜蛋花汤",
      minced: "时蔬蛋花羹",
      growth: "时蔬蛋花汤",
      family: "蔬菜蛋花汤"
    },
    timeMinutes: 12,
    buildIngredients(vegetable, profile) {
      return [
        { name: vegetable, amount: formatScaledAmount(60, profile.vegetableFactor, "g") },
        { name: "鸡蛋", amount: "1个" },
        { name: "清水", amount: formatScaledAmount(120, profile.stapleFactor, "ml") }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        `${vegetable}${profile.vegetablePrep}，鸡蛋打散备用。`,
        "锅中加清水烧开后放入蔬菜。",
        `煮到蔬菜软熟后淋入蛋液搅成蛋花。`,
        `整体做到${profile.finishTexture}即可。`
      ]
    }
  },
  {
    titles: {
      soft: "蔬菜小炖汤",
      minced: "时蔬小炖羹",
      growth: "时蔬炖汤",
      family: "时蔬炖汤"
    },
    timeMinutes: 18,
    buildIngredients(vegetable, profile) {
      return [
        { name: vegetable, amount: formatScaledAmount(65, profile.vegetableFactor, "g") },
        { name: "香菇", amount: formatScaledAmount(20, profile.vegetableFactor, "g") },
        { name: "温水", amount: formatScaledAmount(120, profile.stapleFactor, "ml") }
      ]
    },
    buildSteps(vegetable, profile) {
      return [
        `${vegetable}${profile.vegetablePrep}，香菇切碎备用。`,
        "锅中加入温水，先把香菇煮软。",
        `再加入${vegetable}小火慢炖。`,
        `炖到整体${profile.finishTexture}即可。`
      ]
    }
  }
]
const STAPLE_TEMPLATE_INDEXES_BY_SEASON = {
  spring: [0, 1, 2, 5, 6, 8, 9, 10, 11, 12],
  summer: [0, 1, 2, 5, 6, 8, 9, 13, 14, 15],
  autumn: [0, 1, 2, 5, 6, 8, 9, 16, 17, 18],
  winter: [0, 1, 2, 5, 6, 8, 9, 19, 20, 21]
}

const PROTEIN_TEMPLATE_INDEXES_BY_SEASON = {
  spring: [0, 1, 3, 4, 5, 7, 9, 10, 11, 12],
  summer: [0, 1, 3, 4, 5, 7, 9, 13, 14, 15],
  autumn: [0, 1, 3, 4, 5, 7, 9, 16, 17, 18],
  winter: [0, 1, 3, 4, 5, 7, 9, 19, 20, 21]
}

function pickTemplatesByIndexes(templates, indexes) {
  return (indexes || []).map((index) => templates[index]).filter(Boolean)
}

function getSeasonStapleTemplates(seasonKey) {
  return pickTemplatesByIndexes(
    STAPLE_TEMPLATES,
    STAPLE_TEMPLATE_INDEXES_BY_SEASON[seasonKey] || STAPLE_TEMPLATE_INDEXES_BY_SEASON.spring
  )
}

function getSeasonProteinTemplates(seasonKey) {
  return pickTemplatesByIndexes(
    PROTEIN_TEMPLATES,
    PROTEIN_TEMPLATE_INDEXES_BY_SEASON[seasonKey] || PROTEIN_TEMPLATE_INDEXES_BY_SEASON.spring
  )
}
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
    summary: `上海${season.name}（${season.monthLabel}）可用 ${season.vegetables.length} 种常见蔬菜`
  }
}

function getTemplateTitle(template, profile) {
  return template.titles[profile.key] || template.titles.soft || "宝宝餐"
}

function getRecipeName(template, vegetable, profile) {
  if (template.buildName) {
    return template.buildName(vegetable, profile)
  }

  return vegetable ? `${vegetable}${getTemplateTitle(template, profile)}` : getTemplateTitle(template, profile)
}

function normalizeRecipeSteps(steps, profile) {
  const stepList = Array.isArray(steps) ? steps.slice() : []
  let chunkText = ""
  let chunkStateText = ""
  let stepReplacements = []

  if (!profile) {
    return stepList
  }

  if (profile.key === "minced") {
    chunkText = "5-7毫米小丁"
    chunkStateText = "软烂小碎丁"
    stepReplacements = [
      ["压细或切小丁", "切成" + chunkText],
      ["剁成细泥", "剁成小碎末"],
      ["剁细", "剁成小碎末"],
      ["压成细泥", "压成带小颗粒的软碎状"],
      ["压细", "压散成小颗粒"],
      ["压碎", "压成小碎粒"],
      ["压泥", "压成小碎粒"],
      ["切碎", "切成" + chunkText],
      ["切细", "切成" + chunkText],
      ["打碎或压细", "整理成" + chunkStateText],
      ["细腻状态", chunkStateText],
      ["土豆泥", "土豆小碎粒"],
      ["南瓜泥", "南瓜小碎粒"],
      ["山药泥", "山药小碎粒"],
      ["芋头泥", "芋头小碎粒"],
      ["豆腐泥", "豆腐小碎粒"],
      ["鱼肉泥", "鱼肉碎"],
      ["压细备用", "压成小碎粒备用"],
      ["压碎备用", "压成小碎粒备用"]
    ]
  } else if (profile.key === "growth") {
    chunkText = "小碎块"
    chunkStateText = "可抓握小块"
    stepReplacements = [
      ["压细或切小丁", "切成小丁或小块"],
      ["剁成细泥", "剁碎成小颗粒"],
      ["剁细", "剁碎成小颗粒"],
      ["压成细泥", "压散保留颗粒"],
      ["压细", "压散保留颗粒"],
      ["压碎", "压散保留颗粒"],
      ["压泥", "压散保留颗粒"],
      ["切碎", "切成" + chunkText],
      ["切细", "切成" + chunkText],
      ["打碎或压细", "整理成" + chunkStateText],
      ["细腻状态", chunkStateText],
      ["土豆泥", "土豆小碎块"],
      ["南瓜泥", "南瓜小碎块"],
      ["山药泥", "山药小碎块"],
      ["芋头泥", "芋头小碎块"],
      ["豆腐泥", "豆腐小碎块"],
      ["鱼肉泥", "鱼肉小块"],
      ["小面絮", "小面片"],
      ["小面团", "小面片"],
      ["压细备用", "压散备用"],
      ["压碎备用", "压散备用"]
    ]
  } else if (profile.key === "family") {
    chunkText = "适口小块"
    chunkStateText = "软嫩适口小块"
    stepReplacements = [
      ["压细或切小丁", "切成适口小丁或小块"],
      ["剁成细泥", "剁碎"],
      ["剁细", "剁碎"],
      ["压成细泥", "整理成" + chunkStateText],
      ["压细", "整理成" + chunkStateText],
      ["压碎", "整理成" + chunkStateText],
      ["压泥", "整理成" + chunkStateText],
      ["切碎", "切成" + chunkText],
      ["切细", "切成" + chunkText],
      ["打碎或压细", "整理成" + chunkStateText],
      ["细腻状态", chunkStateText],
      ["土豆泥", "土豆" + chunkText],
      ["南瓜泥", "南瓜" + chunkText],
      ["山药泥", "山药" + chunkText],
      ["芋头泥", "芋头" + chunkText],
      ["豆腐泥", "豆腐" + chunkText],
      ["鱼肉泥", "鱼肉" + chunkText],
      ["小面絮", "小面片"],
      ["小面团", "小面片"],
      ["压细备用", "整理成" + chunkText + "备用"],
      ["压碎备用", "整理成" + chunkText + "备用"]
    ]
  } else {
    return stepList
  }

  return stepList.map((step) => {
    let nextStep = String(step || "")
    stepReplacements.forEach(([fromText, toText]) => {
      nextStep = nextStep.split(fromText).join(toText)
    })
    return nextStep
  })
}
function createRecipe(seasonKey, type, index, vegetable, template, ageInfo) {
  const profile = ageInfo.profile

  return {
    id: `${seasonKey}-${type}-${padNumber(index + 1)}`,
    seasonKey,
    seasonVegetable: vegetable,
    type,
    name: getRecipeName(template, vegetable, profile),
    timeMinutes: template.timeMinutes,
    ageMonths: ageInfo.months,
    ageDisplayText: ageInfo.displayText,
    ageStageName: ageInfo.stageName,
    textureLabel: ageInfo.textureLabel,
    ingredients: template.buildIngredients(vegetable, profile),
    steps: normalizeRecipeSteps(template.buildSteps(vegetable, profile), profile),
    tips: [
      `当前菜单按${ageInfo.displayText}处理，食材做成${ageInfo.textureLabel}。`,
      ageInfo.feedingNote
    ]
  }
}

const seasonRecipesCache = {}
const RECIPES_PER_SEASON = 60
const SEASON_TYPE_TARGETS = {
  staple: 10,
  protein: 10,
  veg: 30,
  soup: 10
}
let libraryRecipesCache = null

function getSeasonLibraryReferenceDate(seasonKey) {
  const targetSeasonKey = SEASONAL_PRODUCE[seasonKey] ? seasonKey : "spring"
  const now = new Date()
  const currentSeasonKey = getSeasonKeyByMonth(now.getMonth() + 1)
  const seasonOrder = { winter: 0, spring: 1, summer: 2, autumn: 3 }
  const seasonReferenceMap = {
    spring: { month: 4, day: 15 },
    summer: { month: 7, day: 15 },
    autumn: { month: 11, day: 1 },
    winter: { month: 1, day: 15 }
  }
  const reference = seasonReferenceMap[targetSeasonKey]
  const year = seasonOrder[targetSeasonKey] < seasonOrder[currentSeasonKey] ? now.getFullYear() + 1 : now.getFullYear()

  return new Date(year, reference.month - 1, reference.day)
}

function getLibraryAgeInfo(seasonKey) {
  return getAgeInfo(getSeasonLibraryReferenceDate(seasonKey))
}

function toLibraryRecipe(recipe) {
  return Object.assign({}, recipe, {
    ageMonths: 0,
    ageDisplayText: "",
    ageStageName: "",
    textureLabel: "",
    tips: []
  })
}

function buildLibraryRecipes() {
  const typeOrder = { staple: 0, protein: 1, veg: 2, soup: 3 }
  let recipes = []

  Object.keys(SEASONAL_PRODUCE).forEach((seasonKey) => {
    recipes = recipes.concat(
      buildSeasonRecipes(seasonKey, getLibraryAgeInfo(seasonKey)).map((recipe) => toLibraryRecipe(recipe))
    )
  })

  return recipes.sort((left, right) => {
    const typeDiff = (typeOrder[left.type] || 99) - (typeOrder[right.type] || 99)
    if (typeDiff !== 0) {
      return typeDiff
    }

    return String(left.name).localeCompare(String(right.name), "zh-Hans-CN")
  })
}

function getRecipeList() {
  if (!libraryRecipesCache) {
    libraryRecipesCache = buildLibraryRecipes()
  }

  return libraryRecipesCache.slice()
}

function getSeasonRecipesCacheKey(seasonKey, ageInfo) {
  return `${seasonKey}-${ageInfo.months}`
}

function buildRecipesByType(seasonKey, type, templates, vegetables, ageInfo, count, vegetableOffset) {
  const recipes = []
  const comboMap = {}
  let index = 0
  let comboIndex = 0

  while (recipes.length < count) {
    const templateIndex = comboIndex % templates.length
    const vegetableIndex = (Math.floor(comboIndex / templates.length) + vegetableOffset) % vegetables.length
    const comboKey = `${templateIndex}-${vegetableIndex}`

    if (!comboMap[comboKey]) {
      comboMap[comboKey] = true
      recipes.push(
        createRecipe(seasonKey, type, index, vegetables[vegetableIndex], templates[templateIndex], ageInfo)
      )
      index += 1
    }

    comboIndex += 1
  }

  return recipes
}

function buildVegetableRecipes(seasonKey, ageInfo, count) {
  const vegetables = SEASONAL_PRODUCE[seasonKey].vegetables
  const recipes = []
  let index = 0

  if (!vegetables.length || !count) {
    return recipes
  }

  const baseCountPerVegetable = Math.floor(count / vegetables.length)
  const extraCount = count % vegetables.length

  vegetables.forEach((vegetable, vegetableIndex) => {
    const recipeCount = baseCountPerVegetable + (vegetableIndex < extraCount ? 1 : 0)

    for (let repeatIndex = 0; repeatIndex < recipeCount; repeatIndex += 1) {
      const templateIndex = (vegetableIndex + repeatIndex) % VEG_TEMPLATES.length
      recipes.push(
        createRecipe(seasonKey, "veg", index, vegetable, VEG_TEMPLATES[templateIndex], ageInfo)
      )
      index += 1
    }
  })

  return recipes.slice(0, count)
}

function buildSoupRecipes(seasonKey, ageInfo, count) {
  const vegetables = SEASONAL_PRODUCE[seasonKey].vegetables
  const recipes = []
  let index = 0

  if (!vegetables.length || !count) {
    return recipes
  }

  const baseCountPerVegetable = Math.floor(count / vegetables.length)
  const extraCount = count % vegetables.length

  vegetables.forEach((vegetable, vegetableIndex) => {
    const recipeCount = baseCountPerVegetable + (vegetableIndex < extraCount ? 1 : 0)

    for (let repeatIndex = 0; repeatIndex < recipeCount; repeatIndex += 1) {
      const templateIndex = (vegetableIndex + repeatIndex) % SOUP_TEMPLATES.length
      recipes.push(
        createRecipe(seasonKey, "soup", index, vegetable, SOUP_TEMPLATES[templateIndex], ageInfo)
      )
      index += 1
    }
  })

  return recipes.slice(0, count)
}

function buildSeasonRecipes(seasonKey, ageInfo) {
  const vegetables = SEASONAL_PRODUCE[seasonKey].vegetables
  const stapleRecipes = buildRecipesByType(
    seasonKey,
    "staple",
    getSeasonStapleTemplates(seasonKey),
    vegetables,
    ageInfo,
    SEASON_TYPE_TARGETS.staple,
    0
  )
  const proteinRecipes = buildRecipesByType(
    seasonKey,
    "protein",
    getSeasonProteinTemplates(seasonKey),
    [""],
    ageInfo,
    SEASON_TYPE_TARGETS.protein,
    0
  )
  const vegRecipes = buildVegetableRecipes(seasonKey, ageInfo, SEASON_TYPE_TARGETS.veg)
  const soupRecipes = buildSoupRecipes(seasonKey, ageInfo, SEASON_TYPE_TARGETS.soup)

  return stapleRecipes.concat(proteinRecipes, vegRecipes, soupRecipes).slice(0, RECIPES_PER_SEASON)
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
  const byType = { staple: [], protein: [], veg: [], soup: [] }
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

  const recipeList = getRecipeList()
  const libraryRecipe = recipeList.find((recipe) => recipe.id === id)
  if (libraryRecipe) {
    return libraryRecipe
  }

  const seasonKey = String(id).split("-")[0]
  const seasonRecipes = SEASONAL_PRODUCE[seasonKey] ? getRecipesBySeason(seasonKey, date) : []
  if (seasonRecipes.length) {
    return seasonRecipes.find((recipe) => recipe.id === id) || null
  }

  return null
}

module.exports = {
  getAgeInfo,
  getSeasonInfo,
  getTodayPlan,
  getRecipeList,
  getRecipeById
}











