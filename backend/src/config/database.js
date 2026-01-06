import { DataSource } from 'typeorm';
import { Note } from '../entities/Note.js';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'notes.db',
  synchronize: true,
  logging: false,
  entities: [Note],
  subscribers: [],
  migrations: [],
});

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('✅ Database connection established');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
};