import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { CheckinService } from 'src/app/services/checkin/checkin.service';
import { HospedesService } from 'src/app/services/hospedes/hospedes.service';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit, OnDestroy {

  constructor(private fb: FormBuilder,
    private hospedesService: HospedesService,
    private checkinService: CheckinService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  form!: FormGroup;
  hospedes: any[] = []
  selectedHospede!: any
  private subscription: Subscription[] = [];

  dataEntrada!: string;
  minDataSaida!: string;


  ngOnInit(): void {
    this.form = this.fb.group({
      hospede: ['', Validators.required],
      dataEntrada: ['', Validators.required],
      dataSaida: [''],
      adicionalVeiculo: [false]
    });

    this.subscription.push(this.form.get('hospede')!.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe({
      next: (value) => value != '' ? this.loadHospedes(value) : this.hospedes = [],
      error: (err) => console.log(err)
    }))

    const agora = new Date();
    this.dataEntrada = this.formatLocalDateTime(agora);
    this.form.patchValue({ dataEntrada: this.dataEntrada });

    const amanha = new Date();
    amanha.setDate(amanha.getDate() + 1);
    amanha.setHours(8, 0, 0, 0);
    this.minDataSaida = this.formatLocalDateTime(amanha);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe())
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      
      let checkin = this.form.value
      checkin.hospede = this.selectedHospede
      
      this.subscription.push(this.checkinService.createCheckin(checkin).subscribe({
        next: () => {
          this.router.navigate(['/hospedes'])
          this.snackBar.open('Check-In criado com sucesso!', 'Fechar', { duration: 3000 });
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open(`Erro ao criar checkin: ${err?.error?.message}. Tente novamente.`, 'Fechar', { duration: 4000 });
        }

      }))

    } else {
      this.form.markAllAsTouched();
    }
  }

  loadHospedes(search: string): void {
    this.hospedesService.getHospedeByAny(search).subscribe({
      next: (response) => this.hospedes = response,
      error: (err) => console.log(err)
    })
  }

  onHospedeSelected($event: any) {
    this.selectedHospede = $event.option.value
    this.form.get('hospede')?.setValue(this.selectedHospede.nome)
  }

  formatLocalDateTime(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }


}
