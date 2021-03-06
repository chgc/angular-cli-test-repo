﻿import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { AuthService } from './../../../shared/services/auth.service';
import { HelperService } from './../../../shared/services/helper.service';
import { PageComponent } from './../../../shared/components/page/page.component';
import { Project7Mod5GridComponent } from './components/project7-mod5-grid/project7-mod5-grid.component';
import { Project7Mod5 } from './../../models/project7-mod5';

import { Project7Mod5Service } from './../../services/project7-mod5.service';

@Component({
  selector: 'app-mod5-project7-mod5-page',
  templateUrl: './project7-mod5-page.component.html',
  providers: [
    Project7Mod5Service
  ]
})
export class Project7Mod5PageComponent extends PageComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public newRecord: boolean;
  public item: Project7Mod5;

  @ViewChild('grid') grid: Project7Mod5GridComponent;

  constructor(
    private route: ActivatedRoute,
    router: Router,
    authService: AuthService,
    private helperService: HelperService,
    private project7Mod5Service: Project7Mod5Service) {
    super(router, authService);
  }

  ngOnInit() {
    super.checkPermission('mod5.project7Mod5.select');
    this.route.params
      .takeUntil(this.ngUnsubscribe)
      .subscribe(params => {
        const id = params['id'];
        if (id) {
          this.edit(id);
        } else if (id === '') {
          this.item = {} as Project7Mod5;
        } else {
          this.item = null;
        }
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public new(): void {
    this.newRecord = true;
    this.router.navigate(['/mod5/project7-mod5', { id: '' }]);
  }

  private edit(id: number): void {
    this.grid.isLoading = true;
    this.newRecord = false;
    this.project7Mod5Service
      .getById(id)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(item => {
        this.item = item;
        this.grid.isLoading = false;
      });
  }

}
