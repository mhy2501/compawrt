export const formatDate = (d) => {
  const x = new Date(d);
 
  let month = x.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  let day = x.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  // let hour =  x.setHours(x.getHours() + 8) / 86400000;
  let hour = x.getHours()
  if (hour < 10) {
    hour = "0" + hour
  }
  let minute = x.getMinutes()
  if (minute < 10) {
    minute = "0" + minute
  }
  let second = x.getSeconds()
  if (second < 10) {
    second = "0" + second
  }
  return x.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
};
