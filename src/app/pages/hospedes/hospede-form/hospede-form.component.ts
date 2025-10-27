import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HospedesService } from 'src/app/services/hospedes/hospedes.service';

@Component({
  selector: 'app-hospede-form',
  templateUrl: './hospede-form.component.html',
  styleUrls: ['./hospede-form.component.css']
})
export class HospedeFormComponent {
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private hospedesService: HospedesService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      documento: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9.,-]+$/)]],
      telefone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s()-]{8,20}$/)]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.hospedesService.createHospede(this.form.value).subscribe({
        next: () => {
          this.router.navigate(['/hospedes'])
          this.snackBar.open('Hóspede criado com sucesso!', 'Fechar', { duration: 3000 });
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open(`Erro ao criar hóspede: ${err?.error?.message}. Tente novamente.`, 'Fechar', { duration: 4000 });
        }
      })

    } else {
      this.form.markAllAsTouched();
      this.snackBar.open('Preencha todos os campos corretamente.', 'Fechar', { duration: 4000 });

    }
  }

  maskTelefone(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 11) value = value.substring(0, 11);

    if (value.length > 6) {
      value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`;
    } else if (value.length > 2) {
      value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }

    input.value = value;
    this.form.get('telefone')?.setValue(value, { emitEvent: false });
  }

}
