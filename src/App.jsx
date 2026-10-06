import { useState } from 'react';
import { Disclosure } from '../Disclosure.tsx';
import { Modal } from '../Modal.tsx';
import { Tabs } from '../Tabs.tsx';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: '24px', maxWidth: '700px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Component Demo</h1>

      <button type="button" onClick={() => setIsOpen(true)}>
        Open Modal
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Example Modal">
        <p>This is modal content.</p>
      </Modal>

      <Disclosure title="Toggle details">
        <p>This content is hidden until opened.</p>
      </Disclosure>

      <Tabs
        items={[
          { id: 'first', label: 'First', content: <div>Content for the first tab</div> },
          { id: 'second', label: 'Second', content: <div>Content for the second tab</div> },
          { id: 'third', label: 'Third', content: <div>Content for the third tab</div> },
        ]}
      />
    </div>
  );
}

export default App;
