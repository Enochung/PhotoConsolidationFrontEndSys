import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { PhotoConsolidationService } from '../../@Service/PhotoConsolidationService';
import Swal from 'sweetalert2';
import { UiService } from '../../@Service/UiService';

@Component({
  selector: 'app-upload-tools',
  standalone: true,
  imports: [FormsModule, NavBarComponent],
  template: `
    <app-nav-bar></app-nav-bar>
    <div class="container">
      <fieldset style="border-width:1px; border-color:#9474A4; border-style:solid; border-radius:9px">
        <div class="form-container">
          <div class=" input-groupmb-3">
            <label class="form-label"><h4>選擇上傳檔案</h4></label>
            @for (fileInput of fileInputs; track fileInput; let i = $index) {
              <div class="input-group">
                <input type="file" class="form-control" [id]="'formFileMultiple' + i" multiple aria-describedby="inputGroupFileAddon04" aria-label="Upload" (change)="onFileSelected($event, i)">
                <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon03" (click)="removeFileInput(i)">刪除</button>
              </div>
              <br/>
            }
            <div class="button-group">
              <button class="btn-query" (click)="addFileInput()">增加</button>
            </div>
            <br/>
            <div class="input-group">
              <input type="text" placeholder="請輸入標題" [(ngModel)]="titleName" class="form-control">
            </div>
            <br/>
            <div class="input-group">
              <input type="text" placeholder="請輸入說明" [(ngModel)]="description" class="form-control">
            </div>
            <br/>
            <div class="input-group">
              <input type="date" placeholder="請輸入攝影時間" [(ngModel)]="shootingTime" class="form-control">
            </div>
            <br/>
            <div class="input-group">
              <input type="text" placeholder="請輸入攝影地點" [(ngModel)]="shootingLocation" class="form-control">
            </div>
            <br/>
            <div class="input-group">
              <input type="text" placeholder="請輸入攝影者" [(ngModel)]="photographer" class="form-control">
            </div>
            <br/>
            <div class="button-group">
              <button class="btn-query" [disabled]="!titleName || selectedFiles.length === 0" (click)="onUpload()">上傳</button>
            </div>
          </div>
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

    .btn-query {
      font-size: 14px;
      padding: 8px 12px;
      border: 1px solid #9474A4;
      background-color: white;
      color: #9474A4;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s, color 0.3s;
      margin-right: 5px;
    }

    .btn-query:hover {
      background-color: #9474A4;
      color: white;
      border-color: #9474A4;
    }
  `
})

export class UploadToolsComponent {
  files: File[] = [];
  fileInputs: number[] = [0]; // 動態管理文件選擇器
  selectedFiles: FileList[] = []; // 存儲選中的文件
  titleName: string = ''; // 圖片標題
  description: string = ''; // 圖片說明
  shootingTime: string = ''; // 攝影時間
  shootingLocation: string = ''; // 攝影地點
  photographer: string = ''; // 攝影者姓名
  uploadResponseMsg: string = '';
  dataResponseMsg: string = '';
  errorMsg: string = '';

  constructor(private photoConsolidationService: PhotoConsolidationService, private uiService: UiService) { }

  // 動態新增檔案輸入框
  addFileInput(): void {
    this.fileInputs.push(this.fileInputs.length);
  }

  // 移除指定的文件輸入框
  removeFileInput(index: number): void {
    this.fileInputs.splice(index, 1);
    this.selectedFiles.splice(index, 1);
  }

  onFileSelected(event: Event, index: number): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files) {
      this.selectedFiles[index] = files; // 儲存文件列表
    } else {
      this.selectedFiles.splice(index, 1); // 如果 files 爲 null，移除該項
    }
  }

  // 當文件選擇更改時，更新文件陣列
  onFileChange(event: any, index: number): void {
    const selectedFiles = event.target.files;
    if (selectedFiles.length > 0) {
      this.files[index] = selectedFiles[0]; // 更新指定索引的文件
    } else {
      this.files.splice(index, 1); // 如果沒有文件，刪除對應的文件
    }
  }

  // 上傳所有選擇的文件並進行表單驗證
  onUpload(): void {
    const formData: FormData = new FormData();
    
    // 檢查是否有選擇文件
    let hasFile = false;
    this.fileInputs.forEach((_, index) => {
      const inputElement = document.getElementById(`formFileMultiple${index}`) as HTMLInputElement;
      if (inputElement && inputElement.files && inputElement.files.length > 0) {
        hasFile = true; // 文件已選擇
        Array.from(inputElement.files).forEach(file => {
          formData.append('images', file);  // 'images' 必須匹配後端參數名
        });
      }
    });

    // 驗證必填欄位
    if (!hasFile) {
      this.showPrompt('請選擇至少一個文件');
      return;
    }
    if (!this.titleName) {
      this.showPrompt('請輸入圖片標題');
      return;
    }
    if (!this.description) {
      this.showPrompt('請輸入圖片說明');
      return;
    }
    if (!this.shootingTime) {
      this.showPrompt('請輸入攝影時間');
      return;
    }
    if (!this.shootingLocation) {
      this.showPrompt('請輸入攝影地點');
      return;
    }
    if (!this.photographer) {
      this.showPrompt('請輸入攝影者姓名');
      return;
    }

    // 添加其他表單數據到 FormData
    formData.append('title', this.titleName); // 標題
    formData.append('description', this.description); // 說明
    formData.append('shooting_time', this.shootingTime); // 攝影時間
    formData.append('shooting_location', this.shootingLocation); // 攝影地點
    formData.append('photographer', this.photographer); // 攝影者

    // 呼叫上傳函數
    this.onUploadVideo(formData);
  }

  // 顯示錯誤或成功訊息
  showPrompt(message: string) {
    Swal.fire({
      title: '提示',
      text: message,
      icon: message.includes('成功') ? 'success' : 'error',
      confirmButtonColor: '#3085d6',
      confirmButtonText: '確認'
    });
  }

  //上傳資料
  async onUploadVideo(data: FormData): Promise<void> {
    this.uiService.showProgress();
    try {
      // 上傳資料
      const response = await this.photoConsolidationService.upload(data);

      if (response) {
        this.uploadResponseMsg = response.message || '上傳成功';
        this.dataResponseMsg = response.data || '';
      } else {
        this.uploadResponseMsg = '未收到回應';
      }

    } catch (error: any) {
      this.errorMsg = error.error || '文件上傳失敗';
    } finally {
      this.clearFileInputs();
      this.titleName = '';
      this.description = '';
      this.shootingLocation = '';
      this.photographer = '';
      this.shootingTime = '';
      this.uiService.hideProgress();
    }
    this.showPrompt(this.uploadResponseMsg);
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

  ngOnInit(): void {

  }
}