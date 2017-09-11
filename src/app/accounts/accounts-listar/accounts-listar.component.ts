import { ApiService } from './../../service/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounts-listar',
  templateUrl: './accounts-listar.component.html',
  styles: ['tbody tr {cursor: pointer}']
})
export class AccountsListarComponent implements OnInit {
  public accounts: Object = {
    data: []
  };
  public loading = true;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.list();
  }

  list(){
    this.loading = true;
    return this.apiService.builder('accounts')
    .list()
    .then((res) => {
      this.accounts = res;
      this.loading = false;
    })
  }

  pageChanged(data){
    this.accounts = data;
  }

}
