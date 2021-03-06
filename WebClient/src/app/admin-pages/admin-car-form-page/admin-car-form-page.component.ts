import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { CarService } from 'src/models/sevices/car.service';
import { CarViewData } from 'src/models/view-data/car-view-data';

@Component({
    selector: 'admin-car-form-page',
    templateUrl: './admin-car-form-page.component.html',
})
export class AdminCarFormPageComponent implements OnInit{
  carViewData!: CarViewData;
  carForm!: FormGroup;
  title = 'Добавление нового автомобиля';

  constructor(private fb: FormBuilder,
              private carService: CarService,
              private location: Location,
              private activatedRoute: ActivatedRoute){
  }

  ngOnInit(): void {
    // получение данных из роутера
    this.activatedRoute.params.forEach((params: Params) => {
      // если данные по id есть, но этого быть не может)
      // то мы отправляем запрос на получение данных
      if (params.id !== undefined) {
        this.title = 'Изменеие данных транспортного средства';
        // получение даных для отображения
        this.carService.getCarViewData(params.id).subscribe((data: any) => {
          this.carViewData = data as CarViewData;
          this.buildForm();
        });
      } else {
        this.createNewCar();
        this.buildForm();
      }
    });
  }

  // построение формы для обработки
  buildForm(): void {
    // создание класса для отображения и изменения формы
    this.carForm = this.fb.group({
      id: [this.carViewData.id],
      stateNumber: [ this.carViewData.stateNumber, [Validators.required, Validators.minLength(8)]],
      color: [ this.carViewData.color, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      // tslint:disable-next-line: max-line-length
      yearOfIssue: [ this.carViewData.yearOfIssue, [Validators.required, Validators.min(1950), Validators.max(new Date().getFullYear())]],
      markTitle: [ this.carViewData.markTitle, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      markModel: [ this.carViewData.markModel, [Validators.required, Validators.maxLength(20)]],
      name: [ this.carViewData.name, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      surname: [ this.carViewData.surname, [Validators.required, Validators.minLength(4), Validators.maxLength(60)]],
      patronymic: [ this.carViewData.patronymic, [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      passport: [ this.carViewData.passport, [Validators.required, Validators.minLength(8)]],
    });
  }

  // отправка данных о форме
  submit(): void{
    this.carViewData = new CarViewData(
      this.carViewData.id,
      this.stateNumber.value,
      this.color.value,
      this.yearOfIssue.value,
      this.markTitle.value,
      this.markModel.value,
      this.surname.value,
      this.name.value,
      this.patronymic.value,
      this.passport.value
    );

    // обработка отправки в зависимости от типа данных
    this.submitId().subscribe((data: any) => this.goBack(), this.errorSubmit );
  }

  // возвращяем отправку формы в зависимости от результата
  submitId(): any {
    return this.carViewData.id <= 0 ?
            this.carService.postCarViewData(this.carViewData) :
            this.carService.putCarViewData(this.carViewData.id, this.carViewData);
  }

  // вернуться назад
  goBack(): void {
    this.location.back();
  }

  // обработка ошибки
  errorSubmit(error: any): void {
    alert(error.message);
  }

  // создание нового автомобиля
  createNewCar(): void {
    this.carViewData = new CarViewData(0, '', '', new Date().getFullYear(), '', '', '', '', '', '');
  }

  // геттеры для более удобной работы
  get stateNumber(): any { return this.carForm.controls.stateNumber; }
  get color(): any { return this.carForm.controls.color; }
  get yearOfIssue(): any { return this.carForm.controls.yearOfIssue; }
  get markTitle(): any { return this.carForm.controls.markTitle; }
  get markModel(): any { return this.carForm.controls.markModel; }
  get name(): any { return this.carForm.controls.name; }
  get surname(): any { return this.carForm.controls.surname; }
  get patronymic(): any { return this.carForm.controls.patronymic; }
  get passport(): any { return this.carForm.controls.passport; }

}
