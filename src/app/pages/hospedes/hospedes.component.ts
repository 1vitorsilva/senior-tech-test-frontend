import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { HospedesService } from 'src/app/services/hospedes/hospedes.service';

@Component({
  selector: 'app-hospedes',
  templateUrl: './hospedes.component.html',
  styleUrls: ['./hospedes.component.css']
})
export class HospedesComponent implements OnInit, OnDestroy {

  displayedColumns = [
    { key: 'nome', label: 'Nome', type: 'string' },
    { key: 'documento', label: 'Documento', type: 'string' },
    { key: 'valorUltimoCheckin', label: 'Valor Último Checkin (R$)', type: 'number' },
    { key: 'valorTotal', label: 'Valor Total (R$)', type: 'number' }
  ];
  displayedColumnKeys = this.displayedColumns.map(c => c.key);

  dataSource!: MatTableDataSource<any>;
  totalElements = 0;
  pageSize = 5;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  filterControl = new FormControl('todos');

  private subscription!: Subscription;

  constructor(private hospedesService: HospedesService) { }


  ngOnInit(): void {
    this.loadHospedes();
    this.filterControl.valueChanges
      .subscribe(() => {
        this.pageIndex = 0;
        this.loadHospedes();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadHospedes(): void {
    this.subscription = this.hospedesService.getAllHospedes(this.filterControl.value === null ? 'todos' : this.filterControl.value,
      this.pageIndex, this.pageSize).subscribe({
        next: (data) => {
          this.dataSource = new MatTableDataSource<any>(data.content);
          this.totalElements = data.totalElements;
        }
      });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadHospedes();
  }



}
