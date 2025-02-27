/*
Copyright 2020-2022 University of Oxford
and Health and Social Care Information Centre, also known as NHS Digital

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
import { Component, Output, EventEmitter } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'mdm-img-croppie',
  templateUrl: './img-croppie.component.html',
  styleUrls: ['./img-croppie.component.scss']
})
export class ImgCroppieComponent {
  @Output() cropImage: EventEmitter<any> = new EventEmitter();
  public imageBase64 = '';
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor() {}


  imageCropped(event: ImageCroppedEvent) {
    this.imageBase64 = event.base64;
    this.cropImage.emit(event.base64);
  }
}
