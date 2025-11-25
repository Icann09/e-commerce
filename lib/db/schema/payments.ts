import { pgEnum, pgTable, timestamp, uuid, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { z } from 'zod';
import { orders } from './orders';

export const paymentMethodEnum = pgEnum('payment_method', ['stripe', 'paypal', 'cod']);
export const paymentStatusEnum = pgEnum('payment_status', [
  'initiated',  // user starts payment
  'pending',    // waiting for gateway
  'completed',  // success
  'failed',     // user/bank error
  'expired',    // payment window expired
  'refunded'    // after-paid refund
]);


export const payments = pgTable('payments', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id').references(() => orders.id, { onDelete: 'cascade' }).notNull(),
  method: paymentMethodEnum('method').notNull(),
  status: paymentStatusEnum('status').notNull().default('initiated'),
  paidAt: timestamp('paid_at'),
  transactionId: text('transaction_id').unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const paymentsRelations = relations(payments, ({ one }) => ({
  order: one(orders, {
    fields: [payments.orderId],
    references: [orders.id],
  }),
}));

export const insertPaymentSchema = z
  .object({
    orderId: z.string().uuid(),
    method: z.enum(['stripe', 'paypal', 'cod']),
    status: z
      .enum([
        'initiated',
        'pending',
        'completed',
        'failed',
        'expired',
        'refunded',
      ])
      .optional(),
    paidAt: z.date().nullable().optional(),
    transactionId: z.string().nullable().optional(),
  })
  .superRefine((data, ctx) => {
    // Rule: COD cannot have transactionId or paidAt
    if (data.method === 'cod') {
      if (data.transactionId != null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'COD payments cannot have a transactionId',
          path: ['transactionId'],
        });
      }
      if (data.paidAt != null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'COD payments cannot have paidAt',
          path: ['paidAt'],
        });
      }
    }
  });

export const selectPaymentSchema = insertPaymentSchema.safeExtend({
  id: z.string().uuid(),
});

export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type SelectPayment = z.infer<typeof selectPaymentSchema>;
