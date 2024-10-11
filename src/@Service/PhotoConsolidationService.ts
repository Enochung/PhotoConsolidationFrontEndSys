import { Injectable } from '@angular/core';
import { HttpService } from './HttpService';

@Injectable({
    providedIn: 'root'
})

export class PhotoConsolidationService {
  
    constructor(private httpService: HttpService) {}
  
    // 上傳資料
    async upload(formData: FormData): Promise<any> {
        return this.httpService.postRequest<any>(formData, `upload`);
    }
  
    // 下載資料
    async downloadDocx(): Promise<Blob> {
      return this.httpService.postRequestForBlob({}, `download`);
    }
  
    // 取得文件列表
    async getFileList(): Promise<any> {
      return this.httpService.getRequest<any>(`files`);
    }

    // 輪詢資料處理狀態
    // async pollVideoProcessingStatus(filename: string, updateStatus: (message: string) => void, interval: number = 30000): Promise<void> {
    //   const poll = async () => {
    //     try {
    //       const response = await this.httpService.getRequest<{ status: number, message: string }>(`${this.apiUrl}/status/${filename}`);
    //       let message: string;
    //       switch (response.status) {
    //         case 200:
    //           message = response.message;
    //           clearInterval(intervalId);
    //           break;
    //         case 404:
    //           message = '找不到指定的處理狀態。';
    //           clearInterval(intervalId);
    //           break;
    //         case 500:
    //           message = '伺服器內部錯誤。';
    //           clearInterval(intervalId);
    //           break;
    //         default:
    //           message = `${response.message}`;
    //           break;
    //       }
    
    //       updateStatus(message);  // 调用回调函数更新状态
    //     } catch (error: any) {
    //       updateStatus('Error during polling: ' + error.message);
    //       clearInterval(intervalId);
    //     }
    //   };
    
    //   const intervalId = setInterval(poll, interval);
    // }
  }