import { ApiService } from './service/api.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginate',
  template: `
  <div class="center-align">
    <ul class="pagination">
      <li class="waves-effect" [ngClass]="{'active': page == activePage}" *ngFor="let page of pages">
        <a (click)="changePage(page)">{{ page }}</a>
      </li>
    </ul>
    <p>Você tem um total de {{ total }} registros, exibindo página {{ activePage }} de {{ totalPage }}</p>
  </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppPaginateComponent implements OnInit {
  @Input() total: number;
  @Input() activePage:number;
  @Input() totalPage: number;
  @Input() pages:Array<number>;
  @Input() resource: string;
  @Output() onChangePage = new EventEmitter<boolean>();

  ngOnChanges(changes: any) {
    if(changes.totalPage){
      this.pages = Array(this.totalPage)
      .fill(this.totalPage)
      .map((x, i) => {
        return i+1;
      })
    }
  }

  changePage(page: number){
    this.activePage = page;
    this.apiService.builder(this.resource)
    .list({page: page})
    .then((res) => {
      this.onChangePage.emit(res);
    })
  }

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

}
