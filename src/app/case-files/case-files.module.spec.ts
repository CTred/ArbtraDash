import { CaseFilesModule } from './case-files.module';

describe('CaseFilesModule', () => {
  let caseFilesModule: CaseFilesModule;

  beforeEach(() => {
    caseFilesModule = new CaseFilesModule();
  });

  it('should create an instance', () => {
    expect(caseFilesModule).toBeTruthy();
  });
});
