App({
  globalData: {
    ageMonths: 16,
    bootRouting: false,
    bootCompleted: false,
    launchLoadingVisible: false
  },
  showLaunchLoading() {
    if (this.globalData.launchLoadingVisible) {
      return
    }

    try {
      wx.showLoading({
        title: "正在准备今日菜单",
        mask: true
      })
      this.globalData.launchLoadingVisible = true
    } catch (error) {}
  },
  hideLaunchLoading() {
    if (!this.globalData.launchLoadingVisible) {
      return
    }

    try {
      wx.hideLoading()
    } catch (error) {}

    this.globalData.launchLoadingVisible = false
  },
  onLaunch() {
    this.showLaunchLoading()
  },
  onShow(options) {
    const path = options && options.path ? options.path : ""

    if (!this.globalData.bootCompleted) {
      this.showLaunchLoading()
    }

    if (this.globalData.bootCompleted || this.globalData.bootRouting) {
      return
    }

    if (path === "pages/boot/boot") {
      return
    }

    this.globalData.bootRouting = true
    setTimeout(() => {
      wx.reLaunch({
        url: "/pages/boot/boot"
      })
    }, 0)
  }
})