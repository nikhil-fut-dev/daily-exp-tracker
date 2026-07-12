import API from "./axios";

export const getCalendarData = async () => {
  const res = await API.get("/calendar");
  return res.data;
};
