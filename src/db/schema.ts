import { pgTable, text, uuid, timestamp, numeric } from 'drizzle-orm/pg-core';

export const fruits = pgTable('fruits', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  color: text('color').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});