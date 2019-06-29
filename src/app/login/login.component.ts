import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { finalize, take, map, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { Router } from '@angular/router';
import * as $ from 'jquery';

declare var $: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private toastr: ToastrService) { }

  createForm: FormGroup;
  loginForm: FormGroup;
  testForm: FormGroup;
  isCheckBA: Boolean;

  ngOnInit() {

    this.isCheckBA = false;

    this.testForm = this.formBuilder.group({
      bankName: ['', []],
      bankCode: ['', []],
      bankAccount: ['', []]
    });

    this.createForm = this.formBuilder.group({
      userEmail: ['', []],
      userPassword: ['', []],
      userName: ['', []],
      asdf: ['', []],
    });

    this.loginForm = this.formBuilder.group({
      userEmail: ['', []],
      userPassword: ['', []],
    });
  }

  getUrl() {
    return "url('assets/login-background.png')";
  }

  showSignUpModal() {
    $('#modalRegisterForm').modal('show');
  }
  hideSignUpModal() {
    $('#modalRegisterForm').modal('hide');
  }

  showCreateBankModal() {
    $('#modalCreateBank').modal('show');
  }
  hideCreateBankModal() {
    $('#modalCreateBank').modal('hide');
  }


  login() {
    let param = {
      email: this.loginForm.value.userEmail,
      password: this.loginForm.value.userPassword
    };

    console.log("param ", param);
    // this.ngxService.start();
    this.http.post(`${environment.server.url}/api/auth/login`, param)
      // .pipe(
      //   finalize(() => this.ngxService.stop())
      // )
      .subscribe((ret: any) => {
        console.log("[login.component.ts] $login () ====> ret", ret);

        localStorage.setItem("token", ret.token);
        // this.modal.title = "Login Success";
        if (!ret.isBank) {
          // 은행 카드 정보를 등록해야함 
          this.toastr.success("greta 정보를 등록해야합니다.");
          // this.router.navigate(['bank/create']);
          this.showCreateBankModal();

        } else { // 등록되어있으면 메인페이지
          this.toastr.success("장부 관리 페이지로 이동합니다.");
          this.router.navigate(['ledger/list']);
        }
      }, e => {
        this.toastr.error("로그인 실패. 정보를 확인해주세요");
        console.error("[login.component.ts] $login () ====> ", e);
      });
  }

  register() {
    console.log("register!!");
    let param = {
      email: this.createForm.value.userEmail,
      password: this.createForm.value.userPassword,
      name: this.createForm.value.userName,
    };

    this.http.post(`${environment.server.url}/api/auth/register`, param)
      // .pipe(
      //   // finalize(() => this.ngxService.stop())
      // )
      .subscribe(ret => {
        this.toastr.success("Greta 서비스에 가입하신걸 환영합니다");
        console.log("[login.component.ts] $register() ====> ", ret);
        this.hideSignUpModal();
      }, e => {
        this.toastr.error("회원가입에 실패하였습니다...");
        console.error("[login.component.ts] $register() ====> ", e);
      });
  }



  checkBankAccount() {
    let token = localStorage.getItem('token');

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    let options = {
      headers: headers
    };

    console.log(token);

    let param = {
      number: this.testForm.get('bankAccount').value,
      verify: false
    };

    console.log(param);

    this.http.post(`${environment.server.url}/api/auth/users/banks`, param, options)
      // .pipe(
      //   // finalize(() => this.ngxService.stop())
      // )
      .subscribe(ret => {
        this.toastr.success("계좌번호 조회에 성공하였습니다!");
        this.isCheckBA = true;
      }, e => {
        this.toastr.error("계좌번호 조회에 실패하였습니다...", e);
        this.isCheckBA = false;
        console.log(JSON.stringify(e));
      });
  }

  createBank() {
    console.log('createBank!!');
    let token = localStorage.getItem('token');

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    let options = {
      headers: headers
    };

    console.log(token);

    let param = {
      number: this.testForm.get('bankAccount').value,
      verify: true
    };

    console.log(param);

    this.http.post(`${environment.server.url}/api/auth/users/banks`, param, options)
      // .pipe(
      //   // finalize(() => this.ngxService.stop())
      // )
      .subscribe(ret => {
        this.toastr.success("계좌정보 등록에 성공하셨습니다!");
      }, e => {
        this.toastr.error("계좌정보 등록에 실패하였습니다...", e);
        console.log(JSON.stringify(e));
      });
  }

  test(event: any) {
    console.log(this.testForm.value);
  }

}
