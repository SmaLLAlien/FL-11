function formatTime(minutes) {
  let minutesInDay = 1440;
  let minutesInHour = 60;
  let days = parseInt(minutes / minutesInDay);
  let hours = parseInt((minutes % minutesInDay) / minutesInHour);
  minutes = minutes - days * minutesInDay - hours * minutesInHour;
  return `${days} day(s) ${hours} hour(s) ${minutes} minute(s).`
}
formatTime(3601);