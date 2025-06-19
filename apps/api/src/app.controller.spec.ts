import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [],
    }).compile();
  });

  describe('healthCheck', () => {
    it('should return "I\'m OK, i\'m fine, Kìn chá nà!"', () => {
      const appController = app.get(AppController);
      expect(appController.healthCheck()).toBe("I'm OK, i'm fine, Kìn chá nà!");
    });
  });
});
