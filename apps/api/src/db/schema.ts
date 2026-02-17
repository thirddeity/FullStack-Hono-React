import { pgTable, serial, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const userInfo = pgTable('user_info', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: text('role', { enum: ['admin', 'user'] }).default('user'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()),
});