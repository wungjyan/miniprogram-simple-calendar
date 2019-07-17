Page({
  data: {
    year: '',
    month: '',
    day: '',
    showOther: true,
    en: false,
    list: [
      {
        day: '2019-7-17'
      },
      {
        day: '2019-7-18'
      },
      {
        day: '2019-07-19'
      }
    ]
  },
  select(e) {
    this.setData({
      year: e.detail.year,
      month: e.detail.month,
      day: e.detail.day
    })
    console.log(e)
  },
  change(e) {
    console.log(e)
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
