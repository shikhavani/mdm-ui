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
import { AfterViewInit, Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { MdmResourcesService } from '@mdm/modules/resources';
import { MessageService } from '@mdm/services/message.service';
import { SharedService } from '@mdm/services/shared.service';
import { StateService } from '@uirouter/core';
import { StateHandlerService } from '@mdm/services/handlers/state-handler.service';
import { DataClassResult, EditableDataClass } from '@mdm/model/dataClassModel';
import { Subscription } from 'rxjs';
import { MatTabGroup } from '@angular/material/tabs';
import { Title } from '@angular/platform-browser';
import { BaseComponent } from '@mdm/shared/base/base.component';
import { EditingService } from '@mdm/services/editing.service';

@Component({
  selector: 'mdm-data-class',
  templateUrl: './data-class.component.html',
  styleUrls: ['./data-class.component.sass']
})
export class DataClassComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChild('tab', { static: false }) tabGroup: MatTabGroup;
  @ViewChildren('editableText') editForm: QueryList<any>;
  dataClass: DataClassResult;
  showSecuritySection: boolean;
  subscription: Subscription;
  showSearch = false;
  editMode = false;
  showExtraTabs = false;
  activeTab: any;
  parentDataClass = { id: null };
  parentDataModel = {};
  isEditable: boolean;

  showEditDescription = false;
  max: any;
  min: any;
  error = '';
  editableForm: EditableDataClass;
  aliases: any[] = [];

  descriptionView = 'default';

  constructor(
    private resourcesService: MdmResourcesService,
    private messageService: MessageService,
    private sharedService: SharedService,
    private stateService: StateService,
    private stateHandler: StateHandlerService,
    private title: Title,
    private editingService: EditingService
  ) {
    super();
  }

  ngOnInit() {
    this.editableForm = new EditableDataClass();
    this.editableForm.visible = false;
    this.editableForm.deletePending = false;

    this.editableForm.show = () => {
      this.editForm.forEach(x =>
        x.edit({
          editing: true,
          focus: x.name === 'moduleName' ? true : false
        })
      );
      this.editableForm.visible = true;
      if (this.min === '*') {
        this.min = '-1';
      }

      if (this.max === '*') {
        this.max = '-1';
      }
    };
    // tslint:disable-next-line: deprecation
    if (this.isGuid(this.stateService.params.id) && (!this.stateService.params.id || !this.stateService.params.dataModelId)) {
      this.stateHandler.NotFound({ location: false });
      return;
    }

    // tslint:disable-next-line: deprecation
    if (this.stateService.params.id && this.stateService.params.dataClassId && this.stateService.params.dataClassId.trim() !== '') {
      // tslint:disable-next-line: deprecation
      this.parentDataClass = { id: this.stateService.params.dataClassId };
    }

    // tslint:disable-next-line: deprecation
    if (this.stateService.params.edit === 'true') {
      this.editMode = true;
    }

    // tslint:disable-next-line: deprecation
    this.activeTab = this.getTabDetailByName(this.stateService.params.tabView).index;

    this.showExtraTabs = this.sharedService.isLoggedIn();

    this.title.setTitle('Data Class');
    // tslint:disable-next-line: deprecation
    this.dataClassDetails(this.stateService.params.dataModelId, this.stateService.params.id, this.parentDataClass.id);
    this.subscription = this.messageService.changeSearch.subscribe((message: boolean) => {
      this.showSearch = message;
    });

    this.setEditableForm();
  }

  ngAfterViewInit(): void {
    this.editingService.setTabGroupClickEvent(this.tabGroup);
  }

  getTabDetailByName(tabName) {
    switch (tabName) {
      case 'content':
        return { index: 0, name: 'content' };
      case 'properties':
        return { index: 1, name: 'properties' };
      case 'comments':
        return { index: 2, name: 'comments' };
      case 'links':
        return { index: 3, name: 'links' };
      case 'summaryMetadata':
        return { index: 4, name: 'summaryMetadata' };
      case 'attachments':
        return { index: 5, name: 'attachments' };
      default:
        return { index: 0, name: 'content' };
    }
  }

  dataClassDetails(model, id, parentDataClass?) {
    if (!parentDataClass) {
      this.resourcesService.dataClass.get(model, id).subscribe((result: { body: DataClassResult }) => {
        this.dataClass = result.body;
        this.parentDataModel = {
          id: result.body.model,
          finalised: this.dataClass.breadcrumbs[0].finalised
        };
        this.isEditable = this.dataClass['availableActions']?.includes('update');
        this.messageService.FolderSendMessage(this.dataClass);
        this.messageService.dataChanged(this.dataClass);

        if (this.dataClass) {
          this.tabGroup.realignInkBar();
          // tslint:disable-next-line: deprecation
          this.activeTab = this.getTabDetailByName(this.stateService.params.tabView).index;
          this.tabSelected(this.activeTab);
        }

        this.editableForm.description = this.dataClass?.description;
        this.editableForm.label = this.dataClass.label;

        if (this.dataClass.classifiers) {
          this.dataClass.classifiers.forEach(item => {
            this.editableForm.classifiers.push(item);
          });
        }
        this.aliases = [];
        if (this.dataClass.aliases) {
          this.dataClass.aliases.forEach(item => {
            this.aliases.push(item);
          });
        }

        if (this.dataClass.minMultiplicity && this.dataClass.minMultiplicity === -1) {
          this.min = '*';
        } else {
          this.min = this.dataClass.minMultiplicity;
        }

        if (this.dataClass.maxMultiplicity && this.dataClass.maxMultiplicity === -1) {
          this.max = '*';
        } else {
          this.max = this.dataClass.maxMultiplicity;
        }

        // this.watchDataClassObject();
      });
    } else {
      this.resourcesService.dataClass.getChildDataClass(model, parentDataClass, id).subscribe((result: { body: DataClassResult }) => {
        this.dataClass = result.body;
        this.parentDataModel = {
          id: result.body.model,
          finalised: this.dataClass.breadcrumbs[0].finalised
        };
        this.isEditable = this.dataClass['availableActions']?.includes('update');
        this.messageService.FolderSendMessage(this.dataClass);
        this.messageService.dataChanged(this.dataClass);

        if (this.dataClass) {
          this.tabGroup.realignInkBar();
          // tslint:disable-next-line: deprecation
          this.activeTab = this.getTabDetailByName(this.stateService.params.tabView).index;
          this.tabSelected(this.activeTab);
        }
      });
    }
  }

  toggleShowSearch() {
    this.messageService.toggleSearch();
  }

  getTabDetailByIndex(index) {
    switch (index) {
      case 0:
        return { index: 0, name: 'description' };
      case 1:
        return { index: 1, name: 'elements' };
      case 2:
        return { index: 2, name: 'constraints' };
      case 3:
        return { index: 3, name: 'history' };
      case 4:
        return { index: 4, name: 'context' };
      case 5:
        return { index: 5, name: 'data' };
      default:
        return { index: 0, name: 'description' };
    }
  }
  tabSelected(index) {
    const tab = this.getTabDetailByIndex(index);
    this.stateHandler.Go('dataClass', { tabView: tab.name }, { notify: false });
    this.activeTab = tab.index;
  }

  private setEditableForm() {
    this.editableForm.description = this.dataClass?.description;
    this.editableForm.label = this.dataClass?.label;
    this.min = this.dataClass?.minMultiplicity;
    this.max = this.dataClass?.maxMultiplicity;
  }
}
