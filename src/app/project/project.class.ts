export class Project {
  constructor(
    public project_id: number,
    public name: string,
    public url: string,
    public description: string,
    public langs: any,
    public frames: any
  ) {  }
}