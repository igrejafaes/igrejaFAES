import { DepartamentoModule } from './departamento.module';

describe('DepartamentoModule', () => {
  let departamentoModule: DepartamentoModule;

  beforeEach(() => {
    departamentoModule = new DepartamentoModule();
  });

  it('should create an instance', () => {
    expect(departamentoModule).toBeTruthy();
  });
});
