import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ValidationResult, UploadedDocument, IngestionSource } from './types';
import { allShipbills, getHardcodedResults } from './ingestionData';
import DocumentPreview from './components/DocumentPreview';
import Toast, { ToastMessage } from './components/Toast';

type TabKey = 'incoming' | 'passed' | 'errors';

interface ProcessedShipbill {
  id: string;
  referenceNumber: string;
  source: IngestionSource;
  sourceDetail: string;
  receivedAt: string;
  docCount: number;
  result: ValidationResult | null; // null = still processing
}

const sourceConfig: Record<IngestionSource, { label: string; color: string }> = {
  email: { label: 'Email', color: 'bg-blue-50 border-blue-200 text-blue-700' },
  api: { label: 'API', color: 'bg-purple-50 border-purple-200 text-purple-700' },
  vendor_portal: { label: 'Portal', color: 'bg-amber-50 border-amber-200 text-amber-700' },
};

function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('incoming');
  const [incoming, setIncoming] = useState<ProcessedShipbill[]>([]);
  const [passed, setPassed] = useState<ProcessedShipbill[]>([]);
  const [errors, setErrors] = useState<ProcessedShipbill[]>([]);
  const [selectedResult, setSelectedResult] = useState<ValidationResult | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const hardcodedResults = useRef(getHardcodedResults());

  // Build flat document list for preview (all shipbills)
  const documents: UploadedDocument[] = allShipbills.flatMap((sb) =>
    sb.documents.map((doc) => ({ ...doc, shipbillRef: sb.referenceNumber }))
  );

  const handleDismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleOverride = useCallback((r: ValidationResult) => {
    setErrors((prev) => prev.filter((p) => p.id !== r.documentId));
    setPassed((prev) => [...prev, {
      id: r.documentId,
      referenceNumber: r.documentName,
      source: 'email',
      sourceDetail: '',
      receivedAt: new Date().toISOString(),
      docCount: 0,
      result: { ...r, status: 'pass', issues: [] },
    }]);
    setSelectedResult(null);
    const id = `toast_${Date.now()}`;
    setToasts((prev) => [...prev, { id, text: `${r.documentName} overridden and moved to passed` }]);
  }, []);

  // Process a shipbill: determine result and move to correct tab
  const processShipbill = useCallback((item: ProcessedShipbill) => {
    const hardcoded = hardcodedResults.current.find((r) => r.shipbillRef === item.referenceNumber);

    setTimeout(() => {
      // Remove from incoming
      setIncoming((prev) => prev.filter((p) => p.id !== item.id));

      if (hardcoded) {
        const processed = { ...item, result: hardcoded };
        if (hardcoded.status === 'pass') {
          setPassed((prev) => [...prev, processed]);
        } else {
          setErrors((prev) => [...prev, processed]);
        }
      } else {
        // Mock shipbills always pass
        const passResult: ValidationResult = {
          documentId: item.id,
          documentName: item.referenceNumber,
          documentType: 'invoice',
          shipbillRef: item.referenceNumber,
          status: 'pass',
          issues: [],
        };
        setPassed((prev) => [...prev, { ...item, result: passResult }]);
      }
    }, 5000 + Math.random() * 1000); // Processing takes 5-6s
  }, []);

  // Feed shipbills in one at a time
  const [feedIdx, setFeedIdx] = useState(0);

  useEffect(() => {
    if (feedIdx >= allShipbills.length) return;

    const delay = feedIdx === 0 ? 5000 : 800 + Math.random() * 1000;
    const timer = setTimeout(() => {
      const sb = allShipbills[feedIdx];
      const item: ProcessedShipbill = {
        id: sb.id,
        referenceNumber: sb.referenceNumber,
        source: sb.source,
        sourceDetail: sb.sourceDetail,
        receivedAt: sb.receivedAt,
        docCount: sb.documents.length,
        result: null,
      };

      setIncoming((prev) => [...prev, item]);

      // Start processing after appearing
      setTimeout(() => processShipbill(item), 500);
      setFeedIdx((i) => i + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [feedIdx, processShipbill]);

  const tabs: { key: TabKey; label: string; count: number; dotColor: string }[] = [
    { key: 'incoming', label: 'Incoming', count: incoming.length, dotColor: 'bg-blue-500' },
    { key: 'passed', label: 'Passed', count: passed.length, dotColor: 'bg-emerald-500' },
    { key: 'errors', label: 'Exceptions', count: errors.length, dotColor: 'bg-red-500' },
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-50/50 overflow-hidden">
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="mx-auto px-8 py-3 flex items-center justify-between" style={{ maxWidth: '1600px' }}>
          <div className="flex items-center gap-3">
            <img src={`${process.env.PUBLIC_URL}/OrbitMATCH logo.svg`} alt="OrbitMATCH" className="h-10" />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 font-medium">S. Khanna</span>
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
              SK
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 min-h-0 flex flex-col mx-auto px-8 py-6 w-full" style={{ maxWidth: '1600px' }}>
        {/* Title + status */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Document Intake</h2>
            <p className="text-gray-500 mt-0.5 text-sm">Real-time shipbill ingestion and validation</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs text-gray-500">Live</span>
            </div>
            <div className="flex items-center gap-1.5">
              {(['email', 'api', 'vendor_portal'] as IngestionSource[]).map((s) => (
                <span key={s} className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-medium ${sourceConfig[s].color}`}>
                  {sourceConfig[s].label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium transition-colors relative ${
                activeTab === tab.key ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${tab.dotColor}`} />
              {tab.label}
              <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${
                activeTab === tab.key ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                {tab.count}
              </span>
              {activeTab === tab.key && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
          <div className="overflow-y-auto min-h-0 border border-gray-200 rounded-xl bg-white p-3">
            {activeTab === 'incoming' && (
              <div className="space-y-2">
                {incoming.length === 0 && (
                  <div className="py-12 text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Waiting for incoming shipbills...
                    </div>
                  </div>
                )}
                {incoming.map((item) => (
                  <ShipbillRow key={item.id} item={item} processing />
                ))}
              </div>
            )}

            {activeTab === 'passed' && (
              <div className="space-y-2">
                {passed.length === 0 && (
                  <p className="py-12 text-center text-sm text-gray-400">No shipbills processed yet</p>
                )}
                {passed.map((item) => (
                  <ShipbillRow
                    key={item.id}
                    item={item}
                    onClick={() => item.result && setSelectedResult(item.result)}
                    selected={selectedResult?.documentId === item.id}
                  />
                ))}
              </div>
            )}

            {activeTab === 'errors' && (
              <div className="space-y-2">
                {errors.length === 0 && (
                  <p className="py-12 text-center text-sm text-gray-400">No exceptions found</p>
                )}
                {errors.map((item) => (
                  <ShipbillRow
                    key={item.id}
                    item={item}
                    onClick={() => item.result && setSelectedResult(item.result)}
                    selected={selectedResult?.documentId === item.id}
                    hasError
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right panel: detail view */}
          <div className="min-h-0 overflow-y-auto">
            <DocumentPreview
              result={selectedResult}
              documents={documents}
              onPassToShipbill={handleOverride}
            />
          </div>
        </div>
      </main>
      <Toast toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}

function ShipbillRow({ item, processing, onClick, selected, hasError }: {
  item: ProcessedShipbill;
  processing?: boolean;
  onClick?: () => void;
  selected?: boolean;
  hasError?: boolean;
}) {
  const cfg = sourceConfig[item.source];
  return (
    <div
      onClick={onClick}
      className={`p-3.5 bg-white border rounded-lg animate-fade-in transition-all ${
        selected ? 'border-gray-900 shadow-sm' : 'border-gray-200 hover:border-gray-300'
      } ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-medium ${cfg.color}`}>
            {cfg.label}
          </span>
          <span className="text-sm font-semibold text-gray-900 font-mono">{item.referenceNumber}</span>
        </div>
        <div className="flex items-center gap-2">
          {processing && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-blue-50 border border-blue-200 text-[10px] text-blue-700 font-medium">
              <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              processing
            </span>
          )}
          {!processing && !hasError && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-[10px] text-emerald-700 font-medium">
              passed
            </span>
          )}
          {hasError && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-red-50 border border-red-200 text-[10px] text-red-700 font-medium">
              rejected
            </span>
          )}
          <span className="text-[10px] text-gray-400 font-mono">
            {new Date(item.receivedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-1.5 text-[11px] text-gray-500">
        <span className="font-mono truncate">{item.sourceDetail}</span>
        <span className="text-gray-300">·</span>
        <span>{item.docCount} doc{item.docCount > 1 ? 's' : ''}</span>
        {hasError && item.result && (
          <>
            <span className="text-gray-300">·</span>
            <span className="text-red-600 font-medium">{item.result.issues.length} issue{item.result.issues.length > 1 ? 's' : ''}</span>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
