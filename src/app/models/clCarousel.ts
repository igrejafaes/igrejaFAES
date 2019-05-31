export class Carousel {
  title: string;
  description?: string;
  imageFile: string;
  imageFolder: string;
  date: string;
  linkURL?: string;
  imagePath() : string{
    return `/images/${this.imageFolder}/${this.imageFile}`
  }
}
