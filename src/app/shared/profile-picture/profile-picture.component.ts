/*
Copyright 2020 University of Oxford

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

SPDX-License-Identifier: Apache-2.0
*/
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mdm-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.sass']
})
export class ProfilePictureComponent implements OnInit {
  @Input() user: any;
  image: any;
  dynamicTooltipText: string;
  constructor() {}

  ngOnInit() {
    /* eslint-disable @typescript-eslint/restrict-plus-operands */
    this.dynamicTooltipText =
      '<div>' +
      (this.user.firstName ? this.user.firstName : '') +
      '&nbsp;' +
      (this.user.lastName ? this.user.lastName : '') +
      '<br>' +
      (this.user.organisation ? this.user.organisation + '<br>' : '') +
      this.user.emailAddress +
      '</div>';
  }

  getImage = () => {
    if (this.user.profilePicture.fileType !== 'base64') {
      this.image = this.user.profilePicture.fileContents;
    }
  };
}
