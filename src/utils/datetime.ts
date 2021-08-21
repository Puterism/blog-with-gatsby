export const formatDateString = (
  date: string,
  dateTimeFormatParams: Parameters<typeof Intl.DateTimeFormat> = ['ko-KR']
) => {
  return new Intl.DateTimeFormat(...dateTimeFormatParams).format(new Date(date));
};
