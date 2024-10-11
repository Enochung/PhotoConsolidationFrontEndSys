export interface IHttpService {
    getRequest<T>(urlstr: string): Promise<T>;
    postRequest<T>(data: any, urlstr: string): Promise<T>;
    postRequestForBlob(data: any, urlstr: string): Promise<Blob>;
    putRequest<T>(data: any, urlstr: string): Promise<T>;
    delRequest<T>(data: any, urlstr: string): Promise<T>;
}