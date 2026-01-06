import { EntitySchema } from 'typeorm';

export const Note = new EntitySchema({
  name: 'Note',
  tableName: 'notes',
  columns: {
    id: {
      primary: true,
      type: 'integer',
      generated: true,
    },
    title: {
      type: 'varchar',
      length: 255,
    },
    content: {
      type: 'text',
    },
    createdAt: {
      type: 'datetime',
      createDate: true,
    },
    updatedAt: {
      type: 'datetime',
      updateDate: true,
    },
  },
});