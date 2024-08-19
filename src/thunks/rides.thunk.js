import { get } from "../api";

export const fetchRides = async () => {
  const response = await get("/rides");
  return response;
};
