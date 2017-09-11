import { Account } from './../../model/account';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import "rxjs/add/operator/debounceTime";

const swal = require('sweetalert');

@Component({
  selector: 'app-accounts-editar',
  templateUrl: './accounts-editar.component.html',
  styleUrls: ['./accounts-editar.component.css']
})
export class AccountsEditarComponent implements OnInit {
  public account: Object = {
    bank: {}
  }
  public banks: Array<Object>;
  public idAccount: number;
  public accountForm: FormGroup;
  public accounts: any = {};
  public isLoading: boolean = false;
  public loading = true;

  constructor(private apiService: ApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: Http,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.idAccount = params.id;
      this.view(params.id);
    });
    this.bankList();
    this.iniciaForm();

    this.accountForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  save() {
    let acc = Object.assign({}, this.accounts, this.accountForm.value);
    this.isLoading = !this.isLoading;
    this.apiService.builder('accounts')
      .update(this.accounts.id, acc)
      .then((res) => {
        swal({
          title: 'Alterado!',
          text: 'Conta alterada com sucesso!',
          type: 'success',
          showCancelButton: false,
          confirmButtonColor: '#0099D4',
          confirmButtonText: 'Ok',
          showLoaderOnConfirm: true,
          closeOnConfirm: true,
        }, (isConfirm) => {
          if (isConfirm) {
            this.onSaveComplete();
            this.isLoading = !this.isLoading;
          }
        });
      })
      .catch((res) => {
        swal("Ocorreu um erro!", "Não foi possível cadastrar a conta");
        this.isLoading = !this.isLoading;
      })

  }



  view(id: number) {
    return this.apiService.builder('accounts')
      .view(id)
      .then((res) => {
        this.onAccountRecovery(res);
        this.account = res;
        this.loading = false;
      })
  }

  onSaveComplete(): void {
    this.accountForm.reset();
    this.router.navigate([this.accounts.id + '/view' ]);
  }

  onAccountRecovery(account: Account): void {
    if (this.accountForm) {
      this.accountForm.reset;
    }
    this.accounts = account;

    this.accountForm.patchValue({
      title: this.accounts.title,
      agency: this.accounts.agency,
      account_number: this.accounts.account_number,
      balance: this.accounts.balance,
      balance_initial: this.accounts.balance_initial,
      bank_id: this.accounts.bank_id,

    })
  }

  iniciaForm(): void {
    this.accountForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      agency: ['', Validators.required],
      account_number: ['', Validators.required],
      balance: ['', Validators.required],
      balance_initial: ['', Validators.required],
      bank_id: '',
    });

    this.accountForm.valueChanges.debounceTime(1000)
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.accountForm) { return; }
    const form = this.accountForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'title': '',
    'agency': '',
    'account_number': '',
    'balance': '',
    'balance_initial': ''
  };

  validationMessages = {
    'title': {
      'required': 'Campo obrigatório.',
      'minlength': 'Nome deve ser maior que 3 caracteres.',
      'maxlength': 'Nome deve ser menor que 100 caracteres.',
    },
    'agency': {
      'required': 'Campo obrigatório.'
    },
    'account_number': {
      'required': 'Campo obrigatório.',
    },
    'balance': {
      'required': 'Campo obrigatório.',
    },
    'balance_initial': {
      'required': 'Campo obrigatório.'
    }
  };

  bankList() {
    return this.apiService.builder('banks')
      .list({ limit: 200 })
      .then((res) => {
        this.banks = res.data;
      })
  }

}
