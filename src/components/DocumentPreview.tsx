import React, { useState } from 'react';
import { ValidationResult, UploadedDocument } from '../types';

interface Props {
  result: ValidationResult | null;
  documents: UploadedDocument[];
  onPassToShipbill?: (r: ValidationResult) => void;
}

export default function DocumentPreview({ result, documents, onPassToShipbill }: Props) {
  const [tab, setTab] = useState<'document' | 'details'>('details');

  // Find documents belonging to this shipbill
  const shipbillDocs = result ? documents.filter((d) => d.shipbillRef === result.shipbillRef) : [];
  const [selectedDocIdx, setSelectedDocIdx] = useState(0);
  const selectedDoc = shipbillDocs[selectedDocIdx] || shipbillDocs[0];

  if (!result) {
    return (
      <div className="border border-gray-200 rounded-xl bg-white p-8 flex items-center justify-center h-full min-h-[400px]">
        <p className="text-sm text-gray-400">Select a shipbill to preview validation details</p>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-xl bg-white overflow-hidden flex flex-col h-full min-h-[400px]">
      {/* Header */}
      <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{result.shipbillRef}</h3>
          <p className="text-xs text-gray-400">{shipbillDocs.length} document{shipbillDocs.length > 1 ? 's' : ''} in shipbill</p>
        </div>
        <div className="flex items-center gap-2">
          {result.status !== 'pass' && onPassToShipbill && (
            <button
              onClick={() => onPassToShipbill(result)}
              className="text-[11px] font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1 rounded-md transition-colors"
            >
              Override & Accept
            </button>
          )}
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            result.status === 'pass'
              ? 'bg-emerald-50 text-emerald-700'
              : result.status === 'warning'
              ? 'bg-amber-50 text-amber-700'
              : 'bg-red-50 text-red-700'
          }`}>
            {result.status === 'pass' ? 'Accepted' : result.status === 'warning' ? 'Warnings' : 'Rejected'}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        <button
          onClick={() => setTab('details')}
          className={`px-4 py-2 text-xs font-medium transition-colors ${
            tab === 'details'
              ? 'text-gray-900 border-b-2 border-gray-900'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Validation Details{result.issues.length > 0 ? ` (${result.issues.length})` : ''}
        </button>
        <button
          onClick={() => setTab('document')}
          className={`px-4 py-2 text-xs font-medium transition-colors ${
            tab === 'document'
              ? 'text-gray-900 border-b-2 border-gray-900'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Documents
        </button>
      </div>

      {/* Tab content */}
      {tab === 'details' && (
        <div className="flex-1 overflow-auto">
          {result.issues.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center px-6">
              <svg className="w-12 h-12 text-emerald-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-medium text-gray-700">All checks passed</p>
              <p className="text-xs text-gray-400 mt-1">No discrepancies found in this shipbill</p>
            </div>
          ) : (
            <div className="p-5 space-y-3">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Discrepancies</h4>
              {result.issues.map((issue, i) => (
                <div key={i} className="text-xs p-4 rounded-lg bg-red-50/50 border border-red-100">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${issue.severity === 'error' ? 'bg-red-500' : 'bg-amber-500'}`} />
                    <span className="font-semibold text-gray-800">{issue.rule}</span>
                  </div>
                  <div className="ml-3.5 space-y-1">
                    <div className="text-gray-500">
                      <span className="font-medium text-gray-600">Finding: </span>
                      <span className="text-red-700">{issue.actual}</span>
                    </div>
                    <div className="text-gray-500">
                      <span className="font-medium text-gray-600">Expected: </span>
                      <span className="text-gray-700">{issue.expected}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'document' && (
        <div className="flex-1 flex flex-col">
          {/* Doc selector */}
          {shipbillDocs.length > 1 && (
            <div className="px-4 py-2 border-b border-gray-50 flex gap-1 overflow-x-auto">
              {shipbillDocs.map((doc, idx) => (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDocIdx(idx)}
                  className={`px-3 py-1.5 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors ${
                    idx === selectedDocIdx
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {doc.name}
                </button>
              ))}
            </div>
          )}
          {/* PDF preview */}
          {selectedDoc?.pdfPath ? (
            <iframe
              src={selectedDoc.pdfPath}
              title={selectedDoc.name}
              className="w-full flex-1 min-h-[500px] border-0"
            />
          ) : (
            <div className="flex items-center justify-center flex-1 min-h-[400px] text-sm text-gray-400">
              No preview available
            </div>
          )}
        </div>
      )}
    </div>
  );
}
