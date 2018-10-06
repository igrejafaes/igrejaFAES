import { IgrejaModule } from './igreja.module';

describe('IgrejaModule', () => {
  let igrejaModule: IgrejaModule;

  beforeEach(() => {
    igrejaModule = new IgrejaModule();
  });

  it('should create an instance', () => {
    expect(igrejaModule).toBeTruthy();
  });
});
