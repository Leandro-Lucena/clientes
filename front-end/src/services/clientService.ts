import { Client } from "@/types";
import api from "../utils/axios";

export const getClients = async (): Promise<Client[]> => {
  const response = await api.get<Client[]>("/client");
  return response.data;
};
