import React, { useState, useId } from 'react';

interface DisclosureProps {
  title: string;
  children: React.ReactNode;
}

export const Disclosure: React.FC<DisclosureProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const panelId = useId();

  return (
    <div style={{ border: '1px solid #ccc', margin: '8px 0', padding: '8px' }}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((previous) => !previous)}
        style={{ fontWeight: 'bold', cursor: 'pointer' }}
      >
        {title}
      </button>
      <div
        id={panelId}
        hidden={!isOpen}
        style={{ marginTop: '8px', display: isOpen ? 'block' : 'none' }}
      >
        {children}
      </div>
    </div>
  );
};
