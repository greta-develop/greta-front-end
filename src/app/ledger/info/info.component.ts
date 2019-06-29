import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { finalize, take, map, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { WavesModule, TableModule, InputsModule, MdbTableDirective } from 'angular-bootstrap-md';
import { Router } from '@angular/router';

import * as $ from 'jquery';

declare var $: any;


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  elements: any = [];
  headElements = ['id', 'flag', 'Contents', 'Type', 'Details', 'Receipt', 'Amount', 'Balance', 'Date', 'Reply'];

  searchText: string = '';
  previous: string;

  replyForm: FormGroup;



  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router,
    private toastr: ToastrService) { }

  @HostListener('input') oninput() {
    this.searchItems();
  }

  tranList: any[];
  url: any;

  ngOnInit() {

    this.replyForm = this.formBuilder.group({
      email: ['', []],
      message: ['', []],
    });

    // this.queryTranList();
    this.queryGroups() //시도한 유저의 url 을 얻어서
      .then((ret) => {
        this.url = ret;
        this.queryTranList(this.url)
          .then((ret: any) => {
            for (let i = 1; i <= ret.length; i++) {
              this.elements.push(
                {
                  id: i.toString(),
                  flag: "dummy",
                  contents: ret[i - 1].content,
                  type: ret[i - 1].type,
                  details: ret[i - 1].detail,
                  receipt: ret[i - 1].receipt,
                  amount: ret[i - 1].amount,
                  balance: ret[i - 1].balance,
                  date: ret[i - 1].date,
                  reply: ret[i - 1].reply,
                });
            }

            this.mdbTable.setDataSource(this.elements);
            this.elements = this.mdbTable.getDataSource();
            this.previous = this.mdbTable.getDataSource();
          })
      })


  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }

  showListMenu() {
    console.log("show!");
    $('#list-menu-modal').modal('show');
  }
  showReplyModal() {
    console.log("show!");
    $('#replymodal').modal('show');
  }
  

  queryGroups() {
    return new Promise((res, rej) => {
      let token = localStorage.getItem('token');

      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      let options = {
        headers: headers
      };

      console.log(token);

      this.http.get(`${environment.server.url}/api/groups`, options)
        // .pipe(
        //   finalize(() => this.ngxService.stop())
        // )
        .subscribe((ret: any) => {
          this.toastr.success("정보 가져오기 성공");
          this.url = ret[0].alias_url;
          console.log("[info.component.ts] $queryGroups () ====> ret", ret);
          console.log("[info.component.ts] $queryGroups () ====> url", this.url);

          res(this.url);
        }, e => {
          this.toastr.error("정보 가져오기 실패");
          console.error("[info.component.ts] $queryGroups () ====> ret", e);
          rej(e);
        });
    })

  }

  queryTranList(url: any) {
    return new Promise((res, rej) => {
      let token = localStorage.getItem('token');

      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      let options = {
        headers: headers
      };

      console.log(token);

      this.http.get(`${environment.server.url}/api/share/${url}`, options)
        // .pipe(
        //   finalize(() => this.ngxService.stop())
        // )
        .subscribe((ret: any) => {
          this.toastr.success("트랜젝션 가져오기 성공");
          console.log("[info.component.ts] $queryTranList () ====> ret", ret);
          res(ret);
        }, e => {
          this.toastr.error("트랜젝션 가져오기 실패. 정보를 확인해주세요");
          console.error("[info.component.ts] $queryTranList () ====> ret", e);
          rej(e);
        });
    })

  }

}
