Component({
  properties: {
    en: {
      type: Boolean,
      value: false
    },
    showOther: {
      type: Boolean,
      value: true
    },
    list: {
      type: Array,
      value: []
    },
    changeYear: {
      type: Boolean,
      value: true
    }
  },
  data: {
    year: '',
    month: '',
    todayTimestamp: 0,
    datesArr: [],
    datesList: [], // 分组好的列表，渲染到页面
    selectedTimestamp: 0,
    weeks: ['日', '一', '二', '三', '四', '五', '六'],
    weeks_en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    jsonList: {}
  },
  lifetimes: {
    attached() {
      const year = new Date().getFullYear()
      const month = new Date().getMonth()
      this.setData({
        year,
        month,
        datesArr: this.getAllDates(year, month),
        todayTimestamp: this.getTodayTime()
      })
    }
  },
  observers: {
    datesArr(o) {
      this.setData({
        datesList: this.chunk(o, 7)
      })
    },
    list(newVal) {
      if (newVal.length) {
        const arr = this.groupBy(newVal, item => [item.day])
        const newArr = arr.map(item => {
          const key = parseInt(item[0].day.split('-')[2], 10)
          return {[key]: item}
        })
        const obj = {}
        newArr.forEach(o => {
          const key = Object.keys(o)[0]
          obj[key] = o[key]
        })
        this.setData({
          jsonList: obj
        })
      }
    }
  },
  methods: {
    /**
     * 获取当月的信息（返回当月第一天和最后一天的星期，以及当月总天数）
     * @param {*} year 年份
     * @param {*} month 月份（0-11）
     */
    getCurrentMonthInfo(year, month) {
      const firstDate = new Date(year, month, 1)
      const lastDate = new Date(year, month + 1, 0)
      return {
        firstDay: firstDate.getDay(),
        lastDay: lastDate.getDay(),
        days: lastDate.getDate()
      }
    },
    /**
     * 获取当前展示的日期（包括上个月日期和下个月日期）,月份范围 0-11
     * @param {*} year 年份
     * @param {*} month 月份（0-11）
     */
    getAllDates(year, month) {
      // 本月信息
      const thisMonthInfo = this.getCurrentMonthInfo(year, month)
      // 上月信息
      const prevMonthInfo = this.getCurrentMonthInfo(year, month - 1)
      const datesArr = []
      // 向数组中添加当前月日期,m是标记，'cur'表示当前月，'prev'表示上个月，'next'表示下个月
      for (let i = 0; i < thisMonthInfo.days; i++) {
        datesArr.push({
          year,
          month,
          date: i + 1,
          m: 'cur'
        })
      }
      // 向数组头部添加上个月日期
      for (let i = 0; i < thisMonthInfo.firstDay; i++) {
        if (month === 0) {
          datesArr.unshift({
            year: year - 1,
            month: 11,
            date: prevMonthInfo.days - i,
            m: 'prev'
          })
        } else {
          datesArr.unshift({
            year,
            month: month - 1,
            date: prevMonthInfo.days - i,
            m: 'prev'
          })
        }
      }
      // 向数组尾部添加下个月日期
      for (let i = 0; i < 7 - thisMonthInfo.lastDay - 1; i++) {
        if (month === 11) {
          datesArr.push({
            year: year + 1,
            month: 0,
            date: i + 1,
            m: 'next'
          })
        } else {
          datesArr.push({
            year,
            month: month + 1,
            date: i + 1,
            m: 'next'
          })
        }
      }
      return datesArr
    },
    /**
     * 减年份
     */
    reduceYear() {
      const year = this.data.year - 1
      this.setData({
        year,
        datesArr: this.getAllDates(year, this.data.month)
      })
      this.triggerEvent(
        'change',
        {
          year,
          month: this.data.month + 1
        },
        {}
      )
    },
    /**
     * 减月份
     */
    reduceMonth() {
      const month = this.data.month - 1
      // 当month为-1时，年份应该减1，月份是12月
      if (month === -1) {
        const year = this.data.year - 1
        this.setData({
          year,
          month: 11,
          datesArr: this.getAllDates(year, 11)
        })
        this.triggerEvent(
          'change',
          {
            year,
            month: 12 // 这里返回已+1
          },
          {}
        )
      } else {
        this.setData({
          month,
          datesArr: this.getAllDates(this.data.year, month)
        })
        this.triggerEvent(
          'change',
          {
            year: this.data.year,
            month: month + 1
          },
          {}
        )
      }
    },
    /**
     * 加年份
     */
    addYear() {
      const year = this.data.year + 1
      this.setData({
        year,
        datesArr: this.getAllDates(year, this.data.month)
      })
      this.triggerEvent(
        'change',
        {
          year,
          month: this.data.month + 1
        },
        {}
      )
    },
    /**
     * 加月份
     */
    addMonth() {
      const month = this.data.month + 1
      // 当month为12时，年份应该加1，月份为1月
      if (month === 12) {
        const year = this.data.year + 1
        this.setData({
          year,
          month: 0,
          datesArr: this.getAllDates(year, 0)
        })
        this.triggerEvent(
          'change',
          {
            year,
            month: 1 // 已+1
          },
          {}
        )
      } else {
        this.setData({
          month,
          datesArr: this.getAllDates(this.data.year, month)
        })
        this.triggerEvent(
          'change',
          {
            year: this.data.year,
            month: month + 1
          },
          {}
        )
      }
    },
    /**
     * 获取时间戳
     * @param {*} d 每一天的信息
     */
    getCurrentTime(d) {
      return new Date(d.year, d.month, d.date).getTime()
    },
    /**
     * 计算今天的时间戳
     */
    getTodayTime() {
      const today = new Date()
      const d = {
        year: today.getFullYear(),
        month: today.getMonth(),
        date: today.getDate()
      }
      return this.getCurrentTime(d)
    },
    /**
     * 将数组分块
     * @param {*} arr 目标数组
     * @param {*} size 块长度
     */
    chunk(arr, size) {
      return Array.from({length: Math.ceil(arr.length / size)}, (v, i) => arr.slice(i * size, i * size + size))
    },
    /**
     *  分组
     * @param {*} arr 目标数组
     * @param {*} fn 函数
     */
    groupBy(arr, fn) {
      const groups = {}
      arr.forEach(function (o) {
        const group = JSON.stringify(fn(o))
        groups[group] = groups[group] || []
        groups[group].push(o)
      })
      return Object.keys(groups).map(group => groups[group])
    },
    // 选中日期
    selectDate(e) {
      const list = e.currentTarget.dataset.list
      const item = e.currentTarget.dataset.obj
      if (item.m === 'prev') {
        this.reduceMonth()
      } else if (item.m === 'next') {
        this.addMonth()
      }
      this.setData({
        selectedTimestamp: this.getCurrentTime(item)
      })
      const date = {
        year: item.year,
        month: item.month + 1,
        day: item.date,
        list
      }
      this.triggerEvent('select', date, {})
    }
  }
})
