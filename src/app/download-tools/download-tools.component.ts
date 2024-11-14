import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { PhotoConsolidationService } from '../../@Service/PhotoConsolidationService';
import { UiService } from '../../@Service/UiService';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-download-tools',
  standalone: true,
  imports: [NavBarComponent],
  template: `
    <app-nav-bar></app-nav-bar>
    <div class="container">
      <fieldset style="border-width:1px; border-color:#61AFFE; border-style:solid; border-radius:9px" >
        <div class="form-container">
          <h4>已上傳文件列表:</h4>
          <ul>
            @for (file of fileList; track file; let i = $index) {
            <li (click)="onDownload(file)" style="cursor: pointer; color: #61AFFE;" class="download-item">{{ file }}</li>
            }
          </ul>
        </div>
      </fieldset>
    </div>
  `,
  styles: `
    .container {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 800px;
      max-height: 800px;
      margin: 0 auto;
    }

    .form-container {
      padding: 30px;
      width: 80%;
      margin: 0 auto;
    }

    .file-list-container {
      margin-top: 20px; 
    }

    li.download-item {
      cursor: pointer;
      color: #61AFFE;
    }

    li.download-item:hover {
      color: #2E95FE;
      text-decoration: underline;
    }
  `
})

export class DownloadToolsComponent {
  fileList: string[] = [];
  fileInputs: number[] = [0]; // 動態管理文件選擇器
  selectedFiles: FileList[] = []; // 存儲選中的文件
  downloadphotoName: string = '';
  condsolidationRsponseMsg: string = '';
  errorMsg: string = '';

  constructor(private photoConsolidationService: PhotoConsolidationService, private uiService: UiService) { }

  ngOnInit() {
    this.getFileList();
  }

  //下載資料
  onDownload(filename: string) {
    this.downloadphotoName = filename;
    this.showPromptOnCheck();
    this.onDownloadDocx(filename);
  }

  //下載資料
  async onDownloadDocx(downloadphotoName: string) {
    this.uiService.showProgress();
    try {
      const response = await this.photoConsolidationService.downloadDocx(downloadphotoName);
      // 下載成功，將 Blob 轉換為文件並觸發下載
      if (response) {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = downloadphotoName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        // 成功下載後的提示信息
        this.condsolidationRsponseMsg = '下載成功';
      } else {
        // 處理下載失敗
        this.condsolidationRsponseMsg = '下載失敗';
      }
    } catch (error: any) {
      // 處理異常情況
      this.condsolidationRsponseMsg = `下載過程中發生錯誤: ${error.message || error}`;
    } finally {
      this.uiService.hideProgress();
    }
    this.showPrompt(this.condsolidationRsponseMsg);
    this.downloadphotoName = '';
  }


  // 取得文件列表
  async getFileList(): Promise<void> {
    try {
      const response = await this.photoConsolidationService.getFileList(); // 等待非同步操作完成
      if (response && response.docx_files) {
        this.fileList = response.docx_files; // 將 docx_files 的內容賦值給 fileList
        this.showPrompt('查詢成功');
      } else {
        this.showPrompt('未找到文件列表');
      }
    } catch (error: any) {
      this.errorMsg = error.error; // 錯誤處理
      this.showPrompt('文件取得失敗');
    }
  }

  // 顯示提示訊息
  showPrompt(message: string) {
    let iconType: 'success' | 'error' | 'warning' = 'error'; // 預設為錯誤
    // 根據 message 來設置不同的圖標類型
    if (message === '影片已合併成功，可下載') {
      this.getFileList();
      this.clearFileInputs();
      iconType = 'success';
    } else if (message.includes('成功')) {
      iconType = 'success';
    } else if (message.includes('處理')) {
      iconType = 'warning';
    }

    Swal.fire({
      title: message,
      icon: iconType, // 根據條件設置圖標
      confirmButtonColor: '#3085d6',
      confirmButtonText: '確認'
    });
  }

  //清空檔案輸入框
  clearFileInputs(): void {
    this.fileInputs = [0]; // 重設文件選擇器
    this.selectedFiles = [];
    const fileInputElements = document.querySelectorAll('input[type="file"]');
    fileInputElements.forEach(fileInput => {
      (fileInput as HTMLInputElement).value = '';
    });
  }


  // 顯示確認訊息
  showPromptOnCheck() {
    Swal.fire({
      title: '確認',
      text: '是否要下載檔案?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: '確認',
      cancelButtonColor: '#d33',
      cancelButtonText: '取消'
    }).then((result) => {
      if (result.isConfirmed) {
        // this.onDownloadVideo(this.downloadphotoName);
      }
    });
  }
}
