import { DocRegisterModule } from './doc-register.module';

describe('DocRegisterModule', () => {
  let docRegisterModule: DocRegisterModule;

  beforeEach(() => {
    docRegisterModule = new DocRegisterModule();
  });

  it('should create an instance', () => {
    expect(docRegisterModule).toBeTruthy();
  });
});
