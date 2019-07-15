# miniprogram-simple-calendar

适用于微信小程序的日历组件

## 使用

1. 安装 miniprogram-simple-calendar

```
npm install --save miniprogram-simple-calendar
```

2. 在需要使用 calendar 的页面 page.json 中添加 calendar 自定义组件配置

```
{
  "usingComponents": {
    "simple-calendar": "miniprogram-simple-calendar"
  }
}
```

**miniprogram-simple-calendar 的属性介绍如下：**

| 属性名     | 类型    | 默认值 | 是否必须 | 说明                   |
| ---------- | ------- | ------ | -------- | ---------------------- |
| en         | Boolean | false  | 否       | 星期的英文显示         |
| show-other | Boolean | true   | 否       | 是否显示除了本月的日期 |
