﻿import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { AuthService } from './../../../shared/services/auth.service';
import { HelperService } from './../../../shared/services/helper.service';
import { PageComponent } from './../../../shared/components/page/page.component';
import { Category4Mod2GridComponent } from './components/category4-mod2-grid/category4-mod2-grid.component';
import { Category4Mod2 } from './../../models/category4-mod2';

import { Category4Mod2Service } from './../../services/category4-mod2.service';

@Component({
  selector: 'app-mod2-category4-mod2-page',
  templateUrl: './category4-mod2-page.component.html',
  providers: [
    Category4Mod2Service
  ]
})
export class Category4Mod2PageComponent extends PageComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public newRecord: boolean;
  public item: Category4Mod2;

  @ViewChild('grid') grid: Category4Mod2GridComponent;

  constructor(
    private route: ActivatedRoute,
    router: Router,
    authService: AuthService,
    private helperService: HelperService,
    private category4Mod2Service: Category4Mod2Service) {
    super(router, authService);
  }

  ngOnInit() {
    super.checkPermission('mod2.category4Mod2.select');
    this.route.params
      .takeUntil(this.ngUnsubscribe)
      .subscribe(params => {
        const id = params['id'];
        if (id) {
          this.edit(id);
        } else if (id === '') {
          this.item = {} as Category4Mod2;
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
    this.router.navigate(['/mod2/category4-mod2', { id: '' }]);
  }

  private edit(id: number): void {
    this.grid.isLoading = true;
    this.newRecord = false;
    this.category4Mod2Service
      .getById(id)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(item => {
        this.item = item;
        this.grid.isLoading = false;
      });
  }

}
