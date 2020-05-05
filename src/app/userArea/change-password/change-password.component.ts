import { Component, OnInit, ViewChild } from '@angular/core';
import { ResourcesService } from '@mdm/services/resources.service';
import { UserDetailsResult } from '@mdm/model/userDetailsModel';
import { SecurityHandlerService } from '@mdm/services/handlers/security-handler.service';
import { MessageHandlerService } from '@mdm/services/utility/message-handler.service';
import { environment } from '@env/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'mdm-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.sass']
})
export class ChangePasswordComponent implements OnInit {
  user: UserDetailsResult;
  currentUser: any;
  oldPassword: string;
  newPassword: string;
  confirm: string;
  message: string;
  afterSave: (result: { body: { id: any } }) => void;

  @ViewChild('changePasswordForm', { static: false }) changePasswordForm;
  backendUrl: string = environment.apiEndpoint;

  constructor(
    private resourcesService: ResourcesService,
    private securityHandler: SecurityHandlerService,
    private messageHandler: MessageHandlerService,
    private title: Title
    ) {
    this.currentUser = this.securityHandler.getCurrentUser();
    this.newPassword = '';
    this.oldPassword = '';
    this.confirm = '';
    this.message = '';
  }

  ngOnInit() {
    this.title.setTitle('Change password');
  }

  disabled = () => {
    return this.newPassword !== this.confirm || this.newPassword === this.oldPassword || this.newPassword === '' || this.oldPassword === '';
  };

  changePassword = () => {
    const body = {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword
    };
    this.resourcesService.catalogueUser.put(this.currentUser.id, 'changePassword', { resource: body }).subscribe(() => {
        this.messageHandler.showSuccess('Password updated successfully.');
        this.newPassword = '';
        this.oldPassword = '';
        this.confirm = '';
        this.message = '';
        this.changePasswordForm.reset();
      },
      error => {
        this.message = 'Error : ' + error.error.errors[0].message;
      }
    );
  };
}
