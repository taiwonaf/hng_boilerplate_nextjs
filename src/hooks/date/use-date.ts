import { useCallback } from "react";

export const useTime = () => {
  const formatTime = useCallback((timestamp: number): string => {
    const dateObject = new Date(timestamp);
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes().toString().padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
    return `${formattedHours}:${minutes} ${period}`;
  }, []);
  return formatTime;
};
export const useDate = () => {
  const formatDate = useCallback((timestamp: number): string => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const dateObject = new Date(timestamp);
    const day = dateObject.getDate();
    const month = months[dateObject.getMonth()];
    const year = dateObject.getFullYear();
    return `${day} ${month}, ${year}`;
  }, []);
  return formatDate;
};
export const useDateRangeFormat = () => {
  const convertDateFormat = useCallback((timestamp: number): string => {
    const dateObject = new Date(timestamp);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
    const day = dateObject.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);
  return convertDateFormat;
};
