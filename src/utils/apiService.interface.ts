interface ApiService {
    get<T>(url: string): Promise<T>;
}