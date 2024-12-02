import dayjs from "dayjs";
export const formatDate = (date: any) => {
  const parsedDate = dayjs(date);

  const formattedDate = parsedDate.format("DD/MM/YYYY");
  return formattedDate;
};
