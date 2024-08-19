import { get } from "../api";

export const fetchUser = async () => {
  const response = await get("/user");
  return response;
};
