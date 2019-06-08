export class Upload {
    $key: string;
    file:File;
    name:string;
    url:string;
    progress:number;
    createdAt: Date = new Date();
    storageFolder: string;
  
    constructor(file:File, storageFolder: string = '/images') {
      this.file = file;
      this.storageFolder = storageFolder;
    }
}
