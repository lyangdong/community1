import { CommunityPage } from './app.po';

describe('community App', () => {
  let page: CommunityPage;

  beforeEach(() => {
    page = new CommunityPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
