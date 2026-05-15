import React, { useState } from 'react';
import { X } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

export function FeedbackModal({ isOpen, onClose, userId }: FeedbackModalProps) {
  const [feedback, setFeedback] = useState('');
  
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    
    const storageKey = `hintro_feedback_${userId}`;
    const existingFeedback = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const newEntry = {
      id: Date.now().toString(),
      text: feedback,
      date: new Date().toISOString()
    };
    
    localStorage.setItem(storageKey, JSON.stringify([newEntry, ...existingFeedback]));
    setFeedback('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
      <div className="bg-card w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-bold text-foreground">Share your feedback</h2>
            <p className="text-sm text-muted-foreground mt-1">Help us improve Hintro for everyone.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
            <X size={20} className="text-muted-foreground" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Your Message</label>
            <textarea
              className="w-full h-40 p-4 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none transition-all placeholder:text-muted-foreground/50"
              placeholder="Tell us what you think..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 text-sm font-semibold text-foreground bg-muted hover:bg-muted/80 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
