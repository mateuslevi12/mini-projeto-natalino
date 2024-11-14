import axios from "axios";
import { ApiService } from "./apiService.interface";

export class AxiosService implements ApiService {
    async get<T>(url: string): Promise<T> {
        const response = await axios.get<T>(url);
        return response.data;
    }
}