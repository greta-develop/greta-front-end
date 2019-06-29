import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { finalize, take, map, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { Router } from '@angular/router';
import * as $ from 'jquery';

declare var $: any;

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router,
    private toastr: ToastrService) { }

  tranList: any[];
  ngOnInit() {
    // this.queryTranList();
  }

  queryTranList() {
    let token = localStorage.getItem('token');

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    let options = {
      headers: headers
    };

    console.log(token);

    let url = "hanyang";
    this.http.get(`${environment.server.url}/api/share/${url}`, options)
      // .pipe(
      //   finalize(() => this.ngxService.stop())
      // )
      .subscribe((ret: any) => {
        this.toastr.success("정보 가져오기 성공");
        console.log("[info.component.ts] $queryTranList () ====> ret", ret);
      }, e => {
        this.toastr.error("로그인 실패. 정보를 확인해주세요");
        console.error("[info.component.ts] $queryTranList () ====> ret", e);
      });
  }

}
