Page({
  data: {
    year: '',
    month: '',
    day: '',
    showOther: true,
    en: false
  },
  select(e) {
    this.setData({
      year: e.detail.year,
      month: e.detail.month,
      day: e.detail.day
    })
  },
  switchLan() {
    this.setData({
      en: !this.data.en
    })
  },
  switchShow() {
    this.setData({
      showOther: !this.data.showOther
    })
  }
})
