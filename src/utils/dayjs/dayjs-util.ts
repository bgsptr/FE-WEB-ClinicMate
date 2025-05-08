import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const getTimestampHourMonth = (stringTime: string) => {
  const day = dayjs(stringTime, "HH:mm");
  return day.valueOf();
};

// export const getTimestampHourMonth = (day: Dayjs) => {
//   return day.valueOf();
// }
