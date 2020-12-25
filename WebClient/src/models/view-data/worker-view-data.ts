// класс для представления данных о работниках
export class WorkerViewData{
  // конструктор со свойствами класса
  constructor(
    public id: number,  // id - работника
    public surname: string, // фамилия работника
    public name: string, // имя работника
    public patronymic: string, // отчество работника
    public passprt: string, // паспорт работниках
    public discharge: string, // разряд работниках
    public WorkExperience: number, // опыт работы
    public status: string, // статус работниках
    public specialty: string // специальнность работниках
  ) {}
}