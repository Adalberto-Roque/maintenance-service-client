import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialog implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {message:string, title:string}
  ) { }

  ngOnInit(): void {
  }

}
