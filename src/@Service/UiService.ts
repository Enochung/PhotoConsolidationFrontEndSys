import { Injectable } from "@angular/core";
import Swal from "sweetalert2";

@Injectable({
providedIn: 'root' // 這樣就可以在整個應用中共享此服務
})

export class UiService {
    private processBar: any; // 用來存儲進度條組件的引用

    setProcessBar(processBar: any) {
        this.processBar = processBar;
    }

    showProgress() {
        if (this.processBar) {
        this.processBar.showProgress();
        Swal.fire({
            title: '請稍等',
            icon: 'info',
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: () => {
            Swal.showLoading();
            }
        });
        }
    }

    hideProgress() {
        if (this.processBar) {
        this.processBar.hideProgress();
        Swal.close();
        }
    }
}