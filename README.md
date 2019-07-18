# miniprogram-simple-calendar

适用于微信小程序的日历组件

## 更新

0.0.4

- 晕死，0.0.3 的代码未打包就 publish 了，这才是 0.0.3 的代码

0.0.3

- 修复`list`属性，年月日精确标记日期

0.0.2

- 添加 `list` 属性，可标记日期；
- 添加年月切换时触发 `change` 事件；
- 添加 `showChangeYear` 属性，开启或关闭年份切换

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

3. 在 wxml 中使用

```
<simple-calendar bindselect="select" en="{{en}}" show-other="{{showOther}}"></simple-calendar>
```

**miniprogram-simple-calendar 的属性介绍如下：**

| 属性名         | 类型    | 默认值 | 是否必须 | 说明                                                                                                                                                                                                                           |
| -------------- | ------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| en             | Boolean | false  | 否       | 星期的英文显示                                                                                                                                                                                                                 |
| show-other     | Boolean | true   | 否       | 是否显示除了本月的日期                                                                                                                                                                                                         |
| list           | Array   | []     | 否       | `list`属性传入数组，主要用于标记日期（即日期底部圆点标记），数组中的每一项应含有`day`属性，结构如：`[{day:'2019-01-01'},...]`，注意`2019-01-01`和`2019-1-1`或者`2019-1-01`都是标记同一天的，点击日期会返回此日期下的已传入数据 |
| showChangeYear | Boolean | true   | 否       | 是否允许年份切换，关闭时只保留月份切换                                                                                                                                                                                         |

**事件：**

| 事件名 | 说明             |
| ------ | ---------------- |
| select | 选中日期时触发   |
| change | 切换年或月时触发 |

## 计划

- 考虑加入收缩模式（横滚）
