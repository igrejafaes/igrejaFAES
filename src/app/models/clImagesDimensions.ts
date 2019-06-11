export class ImagesDimensions {
  private dimensions = {
    carousel: {
      width: 1110,
      height: 473
    },
    headerBanner: {
      widht: 1000,
      height: 1000
    },
    agenda: {
      width: 400,
      height: 400
    }
  };

  public getDimension(imageType: string) {
    const dim = this.dimensions[imageType];
    if (dim) {
      return dim;
    } else {
      return null;
    }
  }
}
