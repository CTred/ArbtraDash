import { SharedArbtraModule } from './shared-arbtra.module';

describe('SharedArbtraModule', () => {
  let sharedArbtraModule: SharedArbtraModule;

  beforeEach(() => {
    sharedArbtraModule = new SharedArbtraModule();
  });

  it('should create an instance', () => {
    expect(sharedArbtraModule).toBeTruthy();
  });
});
