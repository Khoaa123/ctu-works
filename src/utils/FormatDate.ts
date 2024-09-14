import dayjs from "dayjs";
export const formatDate = (date: string) => {
  const parsedDate = dayjs(date);

  const formattedDate = parsedDate.format("DD/MM/YYYY HH:mm");
  return formattedDate;
};
