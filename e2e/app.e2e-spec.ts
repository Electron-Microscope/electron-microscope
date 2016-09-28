import { ElectronMicroscopePage } from './app.po';

describe('electron-microscope App', function() {
  let page: ElectronMicroscopePage;

  beforeEach(() => {
    page = new ElectronMicroscopePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
