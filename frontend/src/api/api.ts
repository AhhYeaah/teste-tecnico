import axios, { AxiosResponse } from "axios";
import { GetKnightInput, GetKnightOutput } from "./types/GetKnights";
import { CreateKnightOutput } from "./types/CreateKnight";
import { KnightEntity } from "@utils/types/KnightEntity";
import { GetKnightByIdInput, GetKnightByIdOutput } from "./types/GetKnightById";
import { DeleteKnightInput, DeleteKnightOutput } from "./types/DeleteKnight";
import { UpdateKnightInput, UpdateKnightOutput } from "./types/UpdateKnight";

type ApiResponse<T> = Promise<AxiosResponse<T>>;

export function useApi() {
  const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  function getKnights(filter?: GetKnightInput): ApiResponse<GetKnightOutput> {
    return client.get("/knights", { params: filter });
  }

  function getKnightById(
    id: GetKnightByIdInput
  ): ApiResponse<GetKnightByIdOutput> {
    return client.get(`/knights/${id}`);
  }

  function createKnight(knight: KnightEntity): ApiResponse<CreateKnightOutput> {
    return client.post("/knights", knight);
  }

  function deleteKnight(
    id: DeleteKnightInput
  ): ApiResponse<DeleteKnightOutput> {
    return client.delete(`/knights/${id}`);
  }

  function updateKnight(
    id: string,
    nickname: UpdateKnightInput
  ): ApiResponse<UpdateKnightOutput> {
    return client.put(`/knights/${id}`, nickname);
  }

  return {
    getKnights,
    createKnight,
    getKnightById,
    deleteKnight,
    updateKnight,
  };
}
