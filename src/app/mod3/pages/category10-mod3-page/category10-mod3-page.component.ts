﻿import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { AuthService } from './../../../shared/services/auth.service';
import { HelperService } from './../../../shared/services/helper.service';
import { PageComponent } from './../../../shared/components/page/page.component';
import { Category10Mod3GridComponent } from './components/category10-mod3-grid/category10-mod3-grid.component';
import { Category10Mod3 } from './../../models/category10-mod3';

import { Category10Mod3Service } from './../../services/category10-mod3.service';

@Component({
  selector: 'app-mod3-category10-mod3-page',
  templateUrl: './category10-mod3-page.component.html',
  providers: [
    Category10Mod3Service
  ]
})
export class Category10Mod3PageComponent extends PageComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public newRecord: boolean;
  public item: Category10Mod3;

  @ViewChild('grid') grid: Category10Mod3GridComponent;

  constructor(
    private route: ActivatedRoute,
    router: Router,
    authService: AuthService,
    private helperService: HelperService,
    private category10Mod3Service: Category10Mod3Service) {
    super(router, authService);
  }

  ngOnInit() {
    super.checkPermission('mod3.category10Mod3.select');
    this.route.params
      .takeUntil(this.ngUnsubscribe)
      .subscribe(params => {
        const id = params['id'];
        if (id) {
          this.edit(id);
        } else if (id === '') {
          this.item = {} as Category10Mod3;
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
    this.router.navigate(['/mod3/category10-mod3', { id: '' }]);
  }

  private edit(id: number): void {
    this.grid.isLoading = true;
    this.newRecord = false;
    this.category10Mod3Service
      .getById(id)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(item => {
        this.item = item;
        this.grid.isLoading = false;
      });
  }

}
