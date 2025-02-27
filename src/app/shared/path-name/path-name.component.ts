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
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PathElement } from './path-name.model';
import { PathNameService } from './path-name.service';

@Component({
  selector: 'mdm-path-name',
  templateUrl: './path-name.component.html',
  styleUrls: ['./path-name.component.scss']
})
export class PathNameComponent implements OnInit, OnChanges {
  @Input() path: string;
  @Input() suffixIcon?: string;
  @Input() suffixLabel?: string;
  @Input() suffixTooltip?: string;

  elements: PathElement[];

  constructor(private pathNames: PathNameService) { }

  ngOnInit(): void {
    this.parse();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.path) {
      this.parse();
    }
  }

  private parse() {
    this.elements = this.pathNames.parse(this.path);
  }
}
