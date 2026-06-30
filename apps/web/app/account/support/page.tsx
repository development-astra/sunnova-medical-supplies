'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import {
  Headphones, TicketCheck, ChevronDown, ChevronUp, Send,
  Plus, AlertCircle, Clock, CheckCircle2, XCircle, Inbox,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { cn, formatDate, formatRelative } from '@/lib/utils';
import { supportApi, type SupportTicket, type SupportMessage } from '@/lib/customer-api';

// ─── Badge helpers ─────────────────────────────────────────────────────────────

const STATUS_META: Record<string, { label: string; className: string; icon: React.ElementType }> = {
  OPEN:        { label: 'Open',        className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',      icon: Clock },
  IN_PROGRESS: { label: 'In Progress', className: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400', icon: AlertCircle },
  RESOLVED:    { label: 'Resolved',    className: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',   icon: CheckCircle2 },
  CLOSED:      { label: 'Closed',      className: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',      icon: XCircle },
};

const PRIORITY_META: Record<string, { label: string; className: string }> = {
  LOW:    { label: 'Low',    className: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400' },
  MEDIUM: { label: 'Medium', className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400' },
  HIGH:   { label: 'High',   className: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400' },
  URGENT: { label: 'Urgent', className: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400' },
};

function StatusBadge({ status }: { status: string }) {
  const meta = STATUS_META[status] ?? STATUS_META.OPEN;
  return (
    <span className={cn('inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full', meta.className)}>
      {status.charAt(0) + status.slice(1).toLowerCase().replace('_', ' ')}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const meta = PRIORITY_META[priority] ?? PRIORITY_META.LOW;
  return (
    <span className={cn('inline-flex text-xs font-semibold px-2 py-0.5 rounded-full', meta.className)}>
      {priority.charAt(0) + priority.slice(1).toLowerCase()}
    </span>
  );
}

function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="inline-flex text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
      {category.charAt(0) + category.slice(1).toLowerCase()}
    </span>
  );
}

// ─── Thread dialog (inline expansion) ─────────────────────────────────────────

function TicketThread({ ticket }: { ticket: SupportTicket }) {
  const qc = useQueryClient();
  const [reply, setReply] = useState('');

  const { data: full, isLoading } = useQuery({
    queryKey: ['support-ticket', ticket.id],
    queryFn: () => supportApi.getTicket(ticket.id),
    initialData: ticket,
  });

  const replyMutation = useMutation({
    mutationFn: (msg: string) => supportApi.replyTicket(ticket.id, msg),
    onSuccess: (newMsg) => {
      qc.setQueryData<SupportTicket>(['support-ticket', ticket.id], (old) =>
        old ? { ...old, messages: [...old.messages, newMsg] } : old,
      );
      qc.invalidateQueries({ queryKey: ['support-tickets'] });
      setReply('');
      toast.success('Reply sent');
    },
    onError: () => toast.error('Failed to send reply'),
  });

  const messages = full?.messages ?? [];

  return (
    <div className="mt-4 border-t border-slate-100 dark:border-slate-800 pt-4 space-y-3">
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => <Skeleton key={i} className="h-16 rounded-xl" />)}
        </div>
      ) : messages.length === 0 ? (
        <p className="text-sm text-slate-400 text-center py-4">No messages yet.</p>
      ) : (
        <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
          {messages.map((msg: SupportMessage) => (
            <div
              key={msg.id}
              className={cn(
                'flex',
                msg.fromAdmin ? 'justify-start' : 'justify-end',
              )}
            >
              <div className={cn(
                'max-w-[80%] rounded-xl px-4 py-2.5 text-sm',
                msg.fromAdmin
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-tl-sm'
                  : 'bg-[#1a4fa0] text-white rounded-tr-sm',
              )}>
                <p className="leading-relaxed">{msg.message}</p>
                <p className={cn(
                  'text-[10px] mt-1',
                  msg.fromAdmin ? 'text-slate-400' : 'text-blue-200',
                )}>
                  {msg.fromAdmin ? 'Support' : 'You'} · {formatRelative(msg.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reply */}
      {full?.status !== 'CLOSED' && full?.status !== 'RESOLVED' && (
        <div className="flex gap-2 pt-2">
          <Input
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Type a reply…"
            className="flex-1 text-sm"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && reply.trim()) {
                e.preventDefault();
                replyMutation.mutate(reply.trim());
              }
            }}
          />
          <Button
            size="sm"
            disabled={!reply.trim() || replyMutation.isPending}
            onClick={() => replyMutation.mutate(reply.trim())}
            className="bg-[#1a4fa0] hover:bg-[#163d80] text-white"
          >
            <Send size={14} />
          </Button>
        </div>
      )}
    </div>
  );
}

// ─── Ticket row ────────────────────────────────────────────────────────────────

function TicketRow({ ticket }: { ticket: SupportTicket }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden"
    >
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full text-left p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-bold text-[#1a4fa0] dark:text-blue-400">
                #{ticket.ticketNumber}
              </span>
              <CategoryBadge category={ticket.category} />
              <PriorityBadge priority={ticket.priority} />
              <StatusBadge status={ticket.status} />
            </div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1.5 truncate">
              {ticket.subject}
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              Opened {formatDate(ticket.createdAt)} · Updated {formatRelative(ticket.updatedAt)}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
              {ticket.messages.length} {ticket.messages.length === 1 ? 'message' : 'messages'}
            </span>
            {expanded ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
          </div>
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden px-4 pb-4"
          >
            <TicketThread ticket={ticket} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Submit form ──────────────────────────────────────────────────────────────

const schema = z.object({
  subject:  z.string().min(5, 'Subject must be at least 5 characters'),
  category: z.enum(['ORDER', 'SHIPPING', 'BILLING', 'PRODUCT', 'OTHER']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  orderId:  z.string().optional(),
  message:  z.string().min(20, 'Message must be at least 20 characters'),
});

type FormValues = z.infer<typeof schema>;

function SubmitTicketForm({ onSuccess }: { onSuccess: () => void }) {
  const qc = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const mutation = useMutation({
    mutationFn: (data: FormValues) =>
      supportApi.createTicket({
        subject: data.subject,
        category: data.category,
        priority: data.priority,
        message: data.message,
        orderId: data.orderId || undefined,
      }),
    onSuccess: () => {
      toast.success('Ticket submitted! We\'ll get back to you soon.');
      qc.invalidateQueries({ queryKey: ['support-tickets'] });
      reset();
      onSuccess();
    },
    onError: () => toast.error('Failed to submit ticket. Please try again.'),
  });

  return (
    <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Subject */}
        <div className="sm:col-span-2 space-y-1.5">
          <Label htmlFor="subject" className="text-sm font-medium">
            Subject <span className="text-red-500">*</span>
          </Label>
          <Input
            id="subject"
            placeholder="Briefly describe your issue"
            {...register('subject')}
            className={cn(errors.subject && 'border-red-400 focus-visible:ring-red-300')}
          />
          {errors.subject && (
            <p className="text-xs text-red-500">{errors.subject.message}</p>
          )}
        </div>

        {/* Category */}
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">
            Category <span className="text-red-500">*</span>
          </Label>
          <Select onValueChange={(v) => setValue('category', v as FormValues['category'])}>
            <SelectTrigger className={cn(errors.category && 'border-red-400')}>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {['ORDER', 'SHIPPING', 'BILLING', 'PRODUCT', 'OTHER'].map((c) => (
                <SelectItem key={c} value={c}>
                  {c.charAt(0) + c.slice(1).toLowerCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-xs text-red-500">{errors.category.message}</p>
          )}
        </div>

        {/* Priority */}
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Priority</Label>
          <Select onValueChange={(v) => setValue('priority', v as FormValues['priority'])}>
            <SelectTrigger>
              <SelectValue placeholder="Select priority (optional)" />
            </SelectTrigger>
            <SelectContent>
              {['LOW', 'MEDIUM', 'HIGH'].map((p) => (
                <SelectItem key={p} value={p}>
                  {p.charAt(0) + p.slice(1).toLowerCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Order ID */}
        <div className="sm:col-span-2 space-y-1.5">
          <Label htmlFor="orderId" className="text-sm font-medium">
            Related Order Number <span className="text-slate-400 font-normal">(optional)</span>
          </Label>
          <Input
            id="orderId"
            placeholder="e.g. ORD-2024-001"
            {...register('orderId')}
          />
        </div>

        {/* Message */}
        <div className="sm:col-span-2 space-y-1.5">
          <Label htmlFor="message" className="text-sm font-medium">
            Message <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="message"
            placeholder="Please describe your issue in detail…"
            rows={5}
            {...register('message')}
            className={cn(errors.message && 'border-red-400 focus-visible:ring-red-300')}
          />
          <div className="flex items-center justify-between">
            {errors.message ? (
              <p className="text-xs text-red-500">{errors.message.message}</p>
            ) : (
              <span />
            )}
            <span className="text-xs text-slate-400">{(watch('message') ?? '').length} chars</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={mutation.isPending}
          className="bg-[#1a4fa0] hover:bg-[#163d80] text-white gap-2"
        >
          {mutation.isPending ? 'Submitting…' : 'Submit Ticket'}
        </Button>
      </div>
    </form>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function SupportPage() {
  const [tab, setTab] = useState('tickets');

  const { data: tickets = [], isLoading, isError } = useQuery({
    queryKey: ['support-tickets'],
    queryFn: supportApi.listTickets,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#122036] dark:text-slate-100" style={{ fontFamily: 'var(--font-heading)' }}>
          Support
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Get help with your orders, billing, and account.
        </p>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-slate-100 dark:bg-slate-800/60">
          <TabsTrigger value="tickets" className="gap-2">
            <TicketCheck size={14} />
            My Tickets
            {tickets.length > 0 && (
              <span className="ml-1 text-[10px] bg-[#1a4fa0] text-white rounded-full px-1.5 py-0.5 leading-none">
                {tickets.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="submit" className="gap-2">
            <Plus size={14} />
            Submit Ticket
          </TabsTrigger>
        </TabsList>

        {/* My Tickets */}
        <TabsContent value="tickets" className="mt-5">
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-24 rounded-xl" />
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-16 text-slate-500">
              <Headphones size={32} className="mx-auto mb-3 opacity-40" />
              <p className="font-medium">Failed to load tickets</p>
            </div>
          ) : tickets.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                <Inbox size={28} className="text-slate-400" />
              </div>
              <p className="font-semibold text-slate-700 dark:text-slate-300" style={{ fontFamily: 'var(--font-heading)' }}>
                No support tickets yet
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-4">
                Have a question or issue? We&apos;re here to help.
              </p>
              <Button
                onClick={() => setTab('submit')}
                className="bg-[#1a4fa0] hover:bg-[#163d80] text-white gap-2"
              >
                <Plus size={15} />
                Submit a Ticket
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence>
                {tickets.map((ticket) => (
                  <TicketRow key={ticket.id} ticket={ticket} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </TabsContent>

        {/* Submit Ticket */}
        <TabsContent value="submit" className="mt-5">
          <Card className="border-slate-100 dark:border-slate-800 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold text-[#122036] dark:text-slate-100" style={{ fontFamily: 'var(--font-heading)' }}>
                Submit a Support Ticket
              </CardTitle>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Fill out the form below and our team will respond within 24 hours.
              </p>
            </CardHeader>
            <Separator />
            <CardContent className="pt-5">
              <SubmitTicketForm onSuccess={() => setTab('tickets')} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
