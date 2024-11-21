import { Injectable } from '@angular/core';
import { HttpService } from './HttpService';

@Injectable({
    providedIn: 'root'
})

export class PhotoConsolidationService {
  
    constructor(private httpService: HttpService) {}
  
    // 上傳資料
    async upload(formData: FormData): Promise<any> {
        return this.httpService.postRequest<any>(`upload`, formData);
    }
  
    // 下載資料
    async downloadDocx(downloadphotoName:string): Promise<Blob> {
      return this.httpService.postRequestForBlob({}, `download/${downloadphotoName}`);
    }
  
    // 取得文件列表
    async getFileList(): Promise<any> {
      return this.httpService.getRequest<any>(`files`);
    }

    // 刪除資料
    async deleteDocx(deletefilenName: string){
      return this.httpService.postRequest<any>(`delete/${deletefilenName}`);
    }
  }