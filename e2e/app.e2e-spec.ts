import { SkillEvaluationTaskPage } from './app.po';

describe('skill-evaluation-task App', () => {
  let page: SkillEvaluationTaskPage;

  beforeEach(() => {
    page = new SkillEvaluationTaskPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
