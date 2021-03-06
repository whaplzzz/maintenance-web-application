import { Component, OnInit } from '@angular/core';
import { formatDate, Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ClientService } from 'src/models/sevices/client.service';
import { ClientViewData } from 'src/models/view-data/client-view-data';

@Component({
    selector: 'admin-client-form-page',
    templateUrl: './admin-client-form-page.component.html',
})
export class AdminClientFormPageComponent implements OnInit{
    clientViewData!: ClientViewData;
    clientForm!: FormGroup;
    title = 'Добавление нового клиента';

    constructor(private fb: FormBuilder,
                private clientService: ClientService,
                private location: Location,
                private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    // получение данных из роутера
    this.activatedRoute.params.forEach((params: Params) => {
      // если данные по id есть, но этого быть не может)
      // то мы отправляем запрос на получение данных
      if (params.id !== undefined) {
        this.title = 'Изменение данных о клиенте';
        // получение даных для отображения
        this.clientService.getClientViewData(params.id).subscribe((data: any) => {
          this.clientViewData = data as ClientViewData;
          this.clientViewData.id = params.id;
          this.buildForm();
        });
      } else {
        this.createNewClient();
        this.buildForm();
      }
    });
  }

  // построение формы
  buildForm(): void {
    // создание класса для отображения и изменения формы
    this.clientForm = this.fb.group({
      id: [this.clientViewData.id],
      surname: [ this.clientViewData.surname, [Validators.required]],
      name: [ this.clientViewData.name, [Validators.required]],
      patronymic: [ this.clientViewData.patronymic, [Validators.required]],
      passport: [ this.clientViewData.passport, [Validators.required]],
      dateOfBorn: [ formatDate(this.clientViewData.dateOfBorn, 'yyyy-MM-dd', 'en'), [Validators.required]],
      telephoneNumber: [ this.clientViewData.telephoneNumber, [Validators.required]],
      street: [ this.clientViewData.street, [Validators.required]],
      building: [ this.clientViewData.building, [Validators.required]],
      flat: [ this.clientViewData.flat],
    });
  }

  // отправка формы
  submit(): void{
    this.clientViewData = new ClientViewData(
      this.clientViewData.id,
      this.surname.value,
      this.name.value,
      this.patronymic.value,
      this.passport.value,
      this.dateOfBorn.value,
      this.telephoneNumber.value,
      this.street.value,
      this.building.value,
      this.flat.value
    );

    // отоправка формы в зависимости от параметров
    this.submitId().subscribe((data: any) => {this.goBack();}, this.errorSubmit );
  }

  // отоправка формы в зависимости от параметров
  submitId(): any {
    return this.clientViewData.id <= 0 ?
           this.clientService.postClientViewData(this.clientViewData) :
           this.clientService.putClientViewData(this.clientViewData.id, this.clientViewData);
  }

  // обработка ошибки
  errorSubmit(error: any): void {
    alert(error.message);
  }

  // вернуться назад
  goBack(): void {
    this.location.back();
  }

  // создание нового работника
  createNewClient(): void {
    this.clientViewData = new ClientViewData(
      -1, '', '', '', '', new Date(), '', '', '', 0
    );
  }

  // геттеры для удобного обращения
  get surname(): any { return this.clientForm.controls.surname; }
  get name(): any { return this.clientForm.controls.name; }
  get patronymic(): any { return this.clientForm.controls.patronymic; }
  get passport(): any { return this.clientForm.controls.passport; }
  get dateOfBorn(): any { return this.clientForm.controls.dateOfBorn; }
  get telephoneNumber(): any { return this.clientForm.controls.telephoneNumber; }
  get street(): any { return this.clientForm.controls.street; }
  get building(): any { return this.clientForm.controls.building; }
  get flat(): any { return this.clientForm.controls.flat; }
}
