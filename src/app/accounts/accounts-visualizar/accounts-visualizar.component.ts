import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit } from '@angular/core';

const swal = require('sweetalert');

@Component({
  selector: 'app-accounts-visualizar',
  templateUrl: './accounts-visualizar.component.html',
  styleUrls: ['./accounts-visualizar.component.css']
})
export class AccountsVisualizarComponent implements OnInit {
  public account: Object = {
    bank: {}
  }
  public idAccount: number;
  public loading = true;

  constructor(private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.idAccount = params.id;
      this.view(params.id);
    });
  }

  view(id: number) {
    return this.apiService.builder('accounts')
      .view(id)
      .then((res) => {
        this.account = res;
        this.loading = false;
      })
  }

  delete(id: number, nome: string) {

    swal({
      title: 'Exclusão de Conta',
      text: `Deseja realmente excluir esta conta: ${id} - ${nome}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Não, cancelar!',
      showLoaderOnConfirm: true,
      closeOnConfirm: false,
      closeOnCancel: false
    }, (isConfirm) => {
      if (isConfirm) {
        this.apiService.builder('accounts')
          .remove(id)
          .then((res) => {
            swal('Deletado!', 'A conta foi removida com sucesso.', 'success');
            this.router.navigate(['/accounts']);
          })
          .catch(() => {
            console.log("Erro delete");
          });
      } else {
        swal('Cancelado!', 'A conta ainda continua no sistema!', 'error');
      }
    });
  }

}
