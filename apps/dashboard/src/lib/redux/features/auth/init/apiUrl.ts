import { BASE_URL } from "@/lib/config/urlConfig";

export const API_ENDPOINT = {
    // GET_LIST_USER : (pageNumber: number, pageSize: number) => `${BASE_URL}/api/users?page=${pageNumber}&size=${pageSize}`,
    LOGIN_USER : `${BASE_URL}/api/users/login`,
}