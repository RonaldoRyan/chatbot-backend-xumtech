import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  rootDir: './src',
  moduleNameMapper: {
    '^@core/(.*)$': '<rootDir>/core/$1',
    '^@lib/(.*)$': '<rootDir>/lib/$1',
    '^@modules/(.*)$': '<rootDir>/modules/$1',
    '^@utils/(.*)$': '<rootDir>/modules/chat/utils/$1',
    '^@test/(.*)$': '<rootDir>/test/$1',
  },
  setupFiles: ['dotenv/config'],  // <--- aquí
};

export default config;
