import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessagesService} from "../../../services/messages/messages.service";
import {IMessages} from "../../../models/messages";
import {AuthService} from "../../../services/auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {
  public loading: boolean = false;
  'activeMsg': IMessages;
  category: string = 'inbox';
  'searchTerm': string;
  private 'messagesSub': Subscription;
  'messages': IMessages[] = [];

  public img: string = '.././../../assets/imgs/default.png';


  constructor(
    private _messageService: MessagesService,
    private _authService: AuthService,
  ) { }

  ngOnInit(): void {
    this._authService.authPages();
    this.messagesSub = this._messageService.getMessages(this.category).subscribe(
      res => this.messages = res
    )
  }

  setActive(message: any){
    this.activeMsg = message;
    console.log(this.activeMsg)
  }

  ngOnDestroy():void {
    if(this.messagesSub){
      this.messagesSub.unsubscribe()
    }
  }

}
