import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';

@Component({
  selector: 'app-banks-listar',
  templateUrl: './banks-listar.component.html',
  styleUrls: ['./banks-listar.component.css']
})
export class BanksListarComponent implements OnInit {
  public banks: Object = {
    data: []
  };
  public loading = true;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.list();
  }

  list(){
    this.loading = true;
    return this.apiService.builder('banks')
    .list()
    .then((res) => {
      this.banks = res;
      this.loading = false;
    })
  }

  pageChanged(data){
    this.banks = data;
  }

}

