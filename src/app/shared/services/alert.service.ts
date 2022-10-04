import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import {TYPE_ALERT} from "./config";
import { reduce } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastr: ToastrService) { }

  toastSuccess(title?: string, subtitle?: string) {
    this.toastr.success(title, subtitle, {
      progressAnimation: 'decreasing',
      progressBar: true,
    });
  }

  toastError(title?: string, subtitle?: string) {
    this.toastr.error(title, subtitle, {
      progressAnimation: 'decreasing',
      progressBar: true,
    });
  }

  toastWarning(title?: string, subtitle?: string) {
    this.toastr.warning(title, subtitle, {
      progressAnimation: 'decreasing',
      progressBar: true,
    });
  }

  toastInfo(title?: string, subtitle?: string) {
    this.toastr.info(title, subtitle, {
      progressAnimation: 'decreasing',
      progressBar: true,
    });
  }

  questionAlert(title: string, text: string, icon = TYPE_ALERT.SUCCESS) {
    return Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonColor: '#f02769',
      cancelButtonColor: '#198fed',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar!'
    })
  }

  questionAlertAction(title: string, text: string, confirmButtonText: string, denyButtonText: string, icon = TYPE_ALERT.QUESTION) {
    return Swal.fire({
      title,
      text,
      icon,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText,
      denyButtonText,
      cancelButtonText: 'Cancelar'
    })
  }

  questionAlertConfirm(title: string, text: string, confirmButtonText: string, icon = TYPE_ALERT.SUCCESS) {
    return Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText
    })
  }

  confirmAlert(title: string, icon = TYPE_ALERT.SUCCESS) {
    Swal.fire({
      title,
      icon,
      confirmButtonColor: '#32ab13',
      confirmButtonText: 'ACEPTAR'
    })
  }
}
