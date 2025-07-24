import { useSelector } from "react-redux";

export const useQueueData = () => {
  const rawData = useSelector((state) => state.balance.value);

  // Safely return an empty array until data is available
  if (!rawData || !Array.isArray(rawData)) return [];
  return rawData.map((d, i) => [i, d]);
};
