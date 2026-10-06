import React, { useEffect, useRef, useId } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) {
      previousFocus.current?.focus();
      previousFocus.current = null;
      return;
    }

    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const focusModal = () => {
      modalRef.current?.focus();
    };

    requestAnimationFrame(focusModal);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key !== 'Tab') return;

      const focusableElements = Array.from(
        modalRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      ).filter((element) => !element.hasAttribute('disabled'));

      if (focusableElements.length === 0) {
        e.preventDefault();
        modalRef.current?.focus();
        return;
      }

      const firstEl = focusableElements[0];
      const lastEl = focusableElements[focusableElements.length - 1];
      const currentActiveElement = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (currentActiveElement === firstEl || currentActiveElement === modalRef.current) {
          lastEl.focus();
          e.preventDefault();
        }
      } else if (currentActiveElement === lastEl) {
        firstEl.focus();
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        style={{
          background: 'white',
          padding: '24px',
          borderRadius: '4px',
          maxWidth: '500px',
          width: '100%',
          outline: 'none'
        }}
      >
        <h2 id={titleId}>{title}</h2>
        <div style={{ margin: '16px 0' }}>{children}</div>
        <button type="button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
