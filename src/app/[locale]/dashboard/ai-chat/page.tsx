'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const examplePrompts = [
  'Quels sont mes 5 meilleurs produits ce mois ?',
  'Écris une description pour "Robe Kabyle Traditionnelle"',
  'Quel est mon taux de retour par transporteur ?',
  'Suggère une campagne SMS pour les clients d\'Alger',
  'Analyse mes ventes de la dernière semaine',
  'Crée un coupon de -20% pour les nouveaux clients',
];

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || data.error || 'Désolé, une erreur est survenue.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Erreur de connexion. Veuillez réessayer.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold font-display text-gray-900 dark:text-white">
              Assistant IA
            </h1>
            <p className="text-xs text-gray-500">Powered by Claude — Anthropic</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<RefreshCw size={14} />}
          onClick={() => setMessages([])}
        >
          Nouveau chat
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-6 space-y-6 scrollbar-hide">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <Sparkles size={28} className="text-primary" />
            </div>
            <h2 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-2">
              Comment puis-je vous aider ?
            </h2>
            <p className="text-sm text-gray-500 max-w-md mb-8">
              Je connais votre boutique, vos produits, vos commandes et vos clients.
              Posez-moi n&apos;importe quelle question.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg w-full">
              {examplePrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="text-start p-3 text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-lg hover:border-primary/30 hover:bg-primary/5 transition-all"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  'flex gap-3 max-w-3xl',
                  message.role === 'user' ? 'ms-auto flex-row-reverse' : ''
                )}
              >
                <div
                  className={cn(
                    'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                    message.role === 'assistant'
                      ? 'bg-primary/10 text-primary'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  )}
                >
                  {message.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div
                  className={cn(
                    'px-4 py-3 rounded-xl text-sm leading-relaxed max-w-[85%]',
                    message.role === 'assistant'
                      ? 'bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300'
                      : 'bg-primary text-white'
                  )}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        {/* Typing indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div className="px-4 py-3 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-xl">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 pt-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-end gap-3 max-w-3xl mx-auto">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Posez votre question..."
              rows={1}
              className="w-full px-4 py-3 pe-12 text-sm bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              className="absolute end-2 bottom-2 p-2 rounded-lg bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-dark transition-colors"
            >
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            </button>
          </div>
        </div>
        <p className="text-[10px] text-gray-400 text-center mt-2">
          L&apos;IA peut faire des erreurs. Vérifiez les informations importantes.
        </p>
      </div>
    </div>
  );
}
