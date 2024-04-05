const getEditTime = (time) => {
  // 将输入的时间字符串转换为Date对象
  const date = new Date(time)

  // 将Date对象转换为北京时间
  const beijingTime = date.toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai'
  })

  // 使用正则表达式将时间格式化为"yyyy-mm-dd-hh-MM"
  const formattedTime = beijingTime.replace(
    /(\d{4})\/(\d{1,2})\/(\d{1,2}),\s(\d{1,2}):(\d{1,2}):(\d{1,2})/,
    (match, p1, p2, p3, p4, p5) => {
      // 使用padStart方法确保月份和日期都是两位数
      return `${p1}-${p2.padStart(2, '0')}-${p3.padStart(2, '0')}-${p4}-${p5}`
    }
  )

  return formattedTime
}
export default getEditTime
