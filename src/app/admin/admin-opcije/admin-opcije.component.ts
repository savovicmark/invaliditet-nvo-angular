import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/Models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-admin-opcije',
  templateUrl: './admin-opcije.component.html',
  styleUrls: ['./admin-opcije.component.scss']
})
export class AdminOpcijeComponent implements OnInit {

  verifiedUsers: UserModel[];
  requestedUsers: UserModel[];

  constructor(private authService: AuthService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.authService.getAllUsers().subscribe(users => {
      this.verifiedUsers = users.filter(user => user.verified);
      this.requestedUsers = users.filter(user => !user.verified);
    });
  }

  deleteUser(id: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        action: 'izbrisete',
        question: 'korisnika'
      }
    });
    dialogRef.afterClosed().pipe(
      filter(res => !!res),
      switchMap(res => this.authService.deleteUser(id))
    ).subscribe(users => {
      this.verifiedUsers = users.filter(user => user.verified);
      this.requestedUsers = users.filter(user => !user.verified);
    });
    /*this.authService.deleteUser(id).subscribe(users => {
      this.verifiedUsers = users.filter(user => user.verified);
      this.requestedUsers = users.filter(user => !user.verified);
    });*/
  }

  verifyUser(id: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        action: 'verifikujete',
        question: 'korisnika'
      }
    });
    dialogRef.afterClosed().pipe(
      filter(res => !!res),
      switchMap(res => this.authService.verifyUser(id))
    ).subscribe(users => {
      this.verifiedUsers = users.filter(user => user.verified);
      this.requestedUsers = users.filter(user => !user.verified);
    });
    /*this.authService.verifyUser(id).subscribe(users => {
      this.verifiedUsers = users.filter(user => user.verified);
      this.requestedUsers = users.filter(user => !user.verified);
    });*/
  }

}
