

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-[1px] transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white w-full max-w-[480px] rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200 p-8">
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-foreground mb-3">Leaving already?</h3>
          <div className="h-[1px] bg-border/40 w-full mb-6" />
          <p className="text-[13px] font-medium text-foreground leading-relaxed">
            You can log back in anytime to continue your meetings with Hintro.
          </p>
        </div>
        
        <div className="flex justify-between items-center mt-12 gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white border border-border rounded-lg text-sm font-semibold text-foreground hover:bg-muted transition-colors min-w-[100px]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-black rounded-lg text-sm font-semibold text-white hover:bg-black/90 transition-colors min-w-[100px]"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
