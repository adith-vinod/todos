export class Todo {
  constructor(
    public id: string,
    public title: string,
    public isComplete: boolean
  ) {}

  complete(){
    this.isComplete = true;
  }

  updateTitle(title:string){
    this.title = title;
  }
}
