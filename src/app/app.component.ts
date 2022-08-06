import { Component, VERSION } from '@angular/core';
import { TableBtn, TableColumn } from './core/interfaces';
import { TableMenu } from './core/interfaces/table-menu';
import { createBusinessData } from './core/mock/functions/mock-data';
import { BusinessData } from './core/mock/interfaces/business-data';
import { UserData } from './core/mock/interfaces/user-data';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  introText = 'Button actions and payloads come here in textual form';
  columns: TableColumn[]; // this will define what you pass over to the table
  buttons: TableBtn[]; // this will define what you pass over to the table
  menuButtons: TableMenu[]; // this will define what you pass over to the table
  data: BusinessData[]; // this is example data but you can use any object to pass to the table
  totalVolume: number = 0; // this is an example field used to show how you can access filtered data from the table
  totalRides: number = 0;
  footer: string = ''; // in this example I'm using a dynamic footer which changes with the filtered data

  isLoadingResults = false;
  isLoadingResultsFilter = false;

  constructor() {
    // Create 100 userdata objects
    // this.data = Array.from({ length: 100 }, (_, k) => createNewUserData(k + 1));
    this.data = createBusinessData();
    console.log(this.data);

    // build the colums; columnDef: attribute name; header: column title; cell: row text
    // note that the cell attribute is the same as the columnDef attribute

    this.columns = [
      {
        columnDef: 'id',
        columnSearch: 'idSearch',
        header: 'Id',
        cell: (element: BusinessData) => `${element.id}`,
        sort: true,
        directionSort: 'asc',
        activeSort: true,
      },
      {
        columnDef: 'num_ro',
        columnSearch: 'num_roSearch',
        header: 'RO',
        cell: (element: BusinessData) => `${element.num_ro}`,
        sort: true,
        directionSort: 'asc',
        activeSort: true,
      },
      {
        columnDef: 'identificacao',
        columnSearch: 'identificacaoSearch',
        header: 'Identificacao',
        cell: (element: BusinessData) => `${element.identificacao} m³`,
        sort: true,
        directionSort: 'asc',
        activeSort: true,
      },
      {
        columnDef: 'nome_finalidade',
        columnSearch: 'nome_finalidadeSearch',
        header: 'Finalidade',
        cell: (element: BusinessData) => `${element.nome_finalidade}`,
        sort: true,
        directionSort: 'asc',
        activeSort: true,
      },
      {
        columnDef: 'id_estado',
        columnSearch: 'id_estadoSearch',
        header: 'Estado',
        cell: (element: BusinessData) => `${element.id_estado}`,
        sort: true,
        directionSort: 'asc',
        activeSort: true,
      },
      {
        columnDef: 'nome_tipo',
        columnSearch: 'nome_tipoSearch',
        header: 'Tipo',
        cell: (element: BusinessData) => `${element.nome_tipo}`,
        sort: true,
        directionSort: 'asc',
        activeSort: true,
      },
    ];

    // build the buttons; styleClass: button style; icon: which material icon should be used; payload: what value from the object should be returned; action: what name should the action have
    this.buttons = [
      {
        styleClass: 'btn btn-success px-2',
        icon: 'add',
        payload: (element: UserData) => `${element.id}`,
        action: 'add',
      },
    ];

    this.menuButtons = [
      {
        styleClass: 'btn btn-success px-2',
        icon: 'add',
        payload: (element: UserData) => `${element.id}`,
        action: 'add',
        description: 'Include',
        disable: false,
      },
      {
        styleClass: 'btn btn-primary px-2',
        icon: 'build',
        payload: (element: UserData) => `${element.id}`,
        action: 'edit',
        description: 'Alter',
        disable: false,
      },
    ];

    // this.data.forEach((user) => {
    //   this.totalVolume = this.totalVolume + parseInt(user.volume);
    //   this.totalRides = this.totalRides + user.rides;
    // });
    // this.footer = `Total volume: ${this.totalVolume}m³ / trips: ${this.totalRides}`;
  }

  // Use the filtered data from the table and modify the footer accordingly
  applyFilter(filteredData: UserData[]) {
    // this.totalVolume = 0;
    // this.totalRides = 0;
    filteredData.forEach((user) => {
      // this.totalVolume = this.totalVolume + parseInt(user.volume);
      // this.totalRides = this.totalRides + user.rides;
    });
    // this.footer = `Total volume: ${this.totalVolume}m³ / trips: ${this.totalRides}`;
  }

  // Here we can get the action and payload back from the table
  buttonClick(result: string[]) {
    console.log(result);
    this.introText = `action: ${result[0]}, payload ${result[1]}`;
  }
  add() {}
  pg() {}
}
