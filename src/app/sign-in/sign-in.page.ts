import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  phoneNumber = "+36703086906"
  code = '111111'
  recaptchaInvisible:any

  constructor(private auth:AuthService) { }

  ionViewDidEnter(){
    this.recaptchaInvisible = new RecaptchaVerifier(
      getAuth(),
      'recaptcha-container',
      {
        'size': 'invisible',
        'callback': '',
        'expired-callback': ''
      }
    )
  }

  ngOnInit() {
  }

  signInWithPhone(){
    this.auth.signInWithPhone(this.phoneNumber, this.recaptchaInvisible).then(
      () => {
        //Kód bekér
        this.auth.verificationCode(this.code).then(
          (user:any) => {
            console.log("User")
          }
        )
      }
    )
  }

}
