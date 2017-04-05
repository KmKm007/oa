export function parseToTimeObject(time) {
  const date = new Date(time)
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const millisecond = date.getMilliseconds()
  return {
    year,
    month: month >= 9 ? (month + 1) : '0' + (month + 1),
    day: day >= 10 ? day : ('0' + day),
    hour: hour >= 10 ? hour : ('0' + hour),
    minute: minute >= 10 ? minute : ('0' + minute),
    second: second >= 10 ? second : ('0' + second),
    millisecond
  }
}

export function getCurrentTimeObject() {
  const time = Date.now()
  const timeObject = parseToTimeObject(time)
  return timeObject
}
