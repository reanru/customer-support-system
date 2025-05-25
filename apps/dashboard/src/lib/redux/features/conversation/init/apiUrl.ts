import { BASE_URL } from "@/lib/config/urlConfig";

export const API_ENDPOINT = {
    GET_LIST_CONVERSATION : (pageNumber: number, pageSize: number) => `${BASE_URL}/api/dashboard/conversations?page=${pageNumber}&size=${pageSize}`,
}
