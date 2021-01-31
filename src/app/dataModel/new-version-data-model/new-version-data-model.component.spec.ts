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
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVersionDataModelComponent } from './new-version-data-model.component';
import { ElementLinkComponent } from '@mdm/utility/element-link/element-link.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { StateService } from '@uirouter/core';
import { UIRouterModule } from '@uirouter/angular';
import { ToastrModule } from 'ngx-toastr';
import { MdmResourcesService } from '@mdm/modules/resources';

describe('NewVersionDataModelComponent', () => {
  let component: NewVersionDataModelComponent;
  let fixture: ComponentFixture<NewVersionDataModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatRadioModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatRadioModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatProgressBarModule,
        FormsModule,
        UIRouterModule.forRoot({ useHash: true }),
        ToastrModule.forRoot()
      ],
      providers: [
        {
          provide: StateService,
          useValue: {
            params: {}
          }
        },
        {
          provide: MdmResourcesService, useValue: {}
        }
      ],
      declarations: [
        ElementLinkComponent,
        NewVersionDataModelComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVersionDataModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
