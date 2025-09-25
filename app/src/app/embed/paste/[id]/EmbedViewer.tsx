'use client';

import dynamic from 'next/dynamic';

const MonacoEditor = dynamic(() => import('@monaco-editor/react').then(mod => mod.Editor), {
  ssr: false,
  loading: () => <div style={{ height: 400, background: '#1a1a1a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>,
});

export default function EmbedViewer({ content, language, title }: { content: string, language: string, title?: string }) {
  return (
    <div style={{ background: '#1a1a1a', borderRadius: 8, padding: 0, margin: 0, width: '100%' }}>
      <div style={{ padding: '16px 16px 0 16px', color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
        {title || 'Untitled Paste'}
      </div>
      <div style={{ padding: 16 }}>
        <MonacoEditor
          height="350px"
          language={language}
          value={content}
          theme="vs-dark"
          options={{
            readOnly: true,
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            padding: { top: 8, bottom: 8 },
            renderLineHighlight: 'all',
            renderWhitespace: 'selection',
            smoothScrolling: true,
            contextmenu: false,
          }}
        />
      </div>
    </div>
  );
} 