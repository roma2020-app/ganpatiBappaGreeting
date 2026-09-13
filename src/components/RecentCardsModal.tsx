import React from 'react';
import { GreetingCardData } from '../types';
import { X, Trash2, ArrowRight, Calendar } from 'lucide-react';
import { DiyaLamp } from './FestiveDecorations';

interface RecentCardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  cards: GreetingCardData[];
  onSelectCard: (card: GreetingCardData) => void;
  onDeleteCard: (id: string) => void;
}

export const RecentCardsModal: React.FC<RecentCardsModalProps> = ({
  isOpen,
  onClose,
  cards,
  onSelectCard,
  onDeleteCard,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FFFDF8] w-full max-w-md rounded-2xl shadow-2xl border border-amber-300 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-amber-600 to-red-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🗂️</span>
            <div>
              <h3 className="font-bold text-base font-heading">Recent Created Cards</h3>
              <p className="text-xs text-amber-100">{cards.length} cards saved on this device</p>
            </div>
          </div>
          <button
            type="button"
            id="close-recent-cards-btn"
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto flex-1 flex flex-col gap-3">
          {cards.length === 0 ? (
            <div className="text-center py-10 text-amber-900/60">
              <DiyaLamp size="sm" className="mb-2" />
              <p className="text-sm font-medium">No saved greeting cards yet.</p>
              <p className="text-xs mt-1">Cards you generate will appear here automatically.</p>
            </div>
          ) : (
            cards.map((card) => (
              <div
                key={card.id}
                className="p-3.5 rounded-xl border border-amber-200 bg-white hover:border-amber-400 hover:shadow-sm transition-all flex items-center justify-between gap-3 group"
              >
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => {
                    onSelectCard(card);
                    onClose();
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-amber-950 font-heading">
                      {card.recipientName ? `For ${card.recipientName}` : 'General Blessing'}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 uppercase font-semibold">
                      {card.language}
                    </span>
                  </div>
                  <p className="text-xs text-amber-800/70 truncate mt-0.5">
                    {card.title} • By {card.senderName}
                  </p>
                  <p className="text-[10px] text-amber-600/60 mt-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(card.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    title="Open Card"
                    onClick={() => {
                      onSelectCard(card);
                      onClose();
                    }}
                    className="p-2 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    title="Delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteCard(card.id);
                    }}
                    className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-amber-50/70 border-t border-amber-200 text-center">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold text-amber-800 hover:text-amber-950 py-1 px-4"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
