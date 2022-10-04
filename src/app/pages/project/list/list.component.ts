import { Component, OnInit, ViewChild } from '@angular/core';
import { companyDB } from '../../../shared/data/tables/company';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';

export interface Company {
  name: string;
  gender: string;
  company: string;
  age: number;
}

let company = [
  {
    "name": "Ethel Price",
    "gender": "female",
    "company": "Johnson, Johnson and Partners, LLC CMP DDC",
    "age": 22
  },
  {
    "name": "Ethel Price",
    "gender": "female",
    "company": "Johnson, Johnson and Partners, LLC CMP DDC",
    "age": 22
  }
]
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['select', 'name', 'gender', 'company', 'age', 'actions'];

  dataSource!: MatTableDataSource<Company>;
  selection = new SelectionModel<Company>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    this.getCompany();
  }

  ngOnInit(): void {
  }

  getCompany() {
    this.dataSource = new MatTableDataSource<Company>(company);
    this.dataSource.paginator = this.paginator;
  }

  clickChecked(event: any, id: any) {
  }

}
