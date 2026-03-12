Page({
  onReady() {
    const app = getApp()
    const startTime = Date.now()

    if (app && app.hideLaunchLoading) {
      app.hideLaunchLoading()
    }

    setTimeout(() => {
      try {
        const dataModule = require("../../utils/data")
        const favoritesModule = require("../../utils/favorites")
        dataModule.getTodayPlan(new Date(), 0)
        favoritesModule.getFavoriteIds()
      } catch (error) {
        console.error("启动页预热失败", error)
      }

      const elapsed = Date.now() - startTime
      const remain = Math.max(350 - elapsed, 0)

      setTimeout(() => {
        app.globalData.bootCompleted = true
        app.globalData.bootRouting = false

        if (app && app.showLaunchLoading) {
          app.showLaunchLoading()
        }

        wx.switchTab({
          url: "/pages/index/index",
          fail() {
            if (app && app.hideLaunchLoading) {
              app.hideLaunchLoading()
            }
          }
        })
      }, remain)
    }, 0)
  }
})