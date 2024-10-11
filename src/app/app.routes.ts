import { Routes } from '@angular/router';
import { FontpageComponent } from './fontpage/fontpage.component';
import { UploadToolsComponent } from './upload-tools/upload-tools.component';
import { DownloadToolsComponent } from './download-tools/download-tools.component';

export const routes: Routes = [
    { path: 'fontpage', title: '首頁', component: FontpageComponent },
    { path: 'uploadtools', title: '工具', component: UploadToolsComponent },
    { path: 'downloadtools', title: '工具', component: DownloadToolsComponent },
    { path: '', redirectTo: '/fontpage', pathMatch: 'full' }
];
