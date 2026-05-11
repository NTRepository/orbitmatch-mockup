import React, { useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { ValidationResult, ValidationIssue, UploadedDocument } from '../types';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const passedChecks = [
  { category: 'Identity & Party Verification', checks: [
    'Vendor name matches across Invoice, B/L, and Purchase Order',
    'Buyer/Consignee name matches Letter of Credit beneficiary',
    'Shipper details consistent across all transport documents',
    'Notify party details match across B/L and Invoice',
  ]},
  { category: 'Shipment & Cargo Details', checks: [
    'Port of Loading matches across B/L and Invoice',
    'Port of Discharge matches across all documents',
    'Goods description consistent across Invoice, Packing List, and B/L',
    'HS/Tariff codes present and correctly formatted',
    'Net/Gross weight consistent across Packing List and B/L',
    'Number of packages matches across all documents',
  ]},
  { category: 'Financial & Commercial', checks: [
    'Invoice number matches shipbill reference',
    'Invoice currency consistent with Purchase Order terms',
    'Unit prices match contracted rates in Purchase Order',
    'Total invoice amount reconciles with line items',
    'Incoterms stated and consistent across Invoice and B/L',
  ]},
  { category: 'Transport & Logistics', checks: [
    'B/L or FCR is original (no COPY/DRAFT watermark)',
    'B/L number format valid and unique',
    'Vessel name and voyage number present',
    'Container numbers match across B/L and Packing List',
    'Shipping marks consistent across all documents',
  ]},
  { category: 'Regulatory & Compliance', checks: [
    'Certificate of Origin present and valid',
    'SAD/Export Declaration present where required',
    'Phytosanitary/Fumigation certificate present if applicable',
    'All required signatures and stamps present',
    'Document dates are within acceptable range',
  ]},
];

interface Props {
  result: ValidationResult | null;
  documents: UploadedDocument[];
  onPassToShipbill?: (r: ValidationResult) => void;
}

export default function DocumentPreview({ result, documents, onPassToShipbill }: Props) {
  const [tab, setTab] = useState<'document' | 'details'>('details');
  const [activeIssue, setActiveIssue] = useState<ValidationIssue | null>(null);
  const [numPages, setNumPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(500);

  // Find documents belonging to this shipbill
  const shipbillDocs = result ? documents.filter((d) => d.shipbillRef === result.shipbillRef) : [];
  const [selectedDocIdx, setSelectedDocIdx] = useState(0);
  const selectedDoc = shipbillDocs[selectedDocIdx] || shipbillDocs[0];

  const handleIssueClick = (issue: ValidationIssue) => {
    const docIdx = shipbillDocs.findIndex((d) => d.name === issue.relatedDocName);
    if (docIdx >= 0) {
      setSelectedDocIdx(docIdx);
    }
    if (issue.highlight) {
      setCurrentPage(issue.highlight.page);
    }
    setActiveIssue(issue);
    setTab('document');
  };

  const measureContainer = () => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth);
    }
  };

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
          onClick={() => { setTab('details'); setActiveIssue(null); }}
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
            <div className="p-5 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-semibold text-gray-800">All checks passed</span>
                <span className="text-[10px] text-gray-400 ml-auto">{passedChecks.reduce((n, c) => n + c.checks.length, 0)} checks</span>
              </div>
              {passedChecks.map((group) => (
                <div key={group.category}>
                  <h5 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2">{group.category}</h5>
                  <div className="space-y-1">
                    {group.checks.map((check, j) => (
                      <div key={j} className="flex items-center gap-2 py-1 px-2 rounded text-xs text-gray-600">
                        <svg className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {check}
                      </div>
              ))}
            </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-5 space-y-3">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Discrepancies</h4>
              {result.issues.map((issue, i) => (
                <div
                  key={i}
                  onClick={() => handleIssueClick(issue)}
                  className="text-xs p-4 rounded-lg bg-red-50/50 border border-red-100 cursor-pointer hover:bg-red-50 hover:border-red-200 transition-colors group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${issue.severity === 'error' ? 'bg-red-500' : 'bg-amber-500'}`} />
                    <span className="font-semibold text-gray-800">{issue.rule}</span>
                    <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-red-400 ml-auto transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
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
                  {issue.relatedDocName && (
                    <div className="mt-2 ml-3.5 text-[10px] text-gray-400 group-hover:text-red-500 transition-colors">
                      Click to view in: {issue.relatedDocName}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'document' && (
        <div className="flex-1 flex flex-col min-h-0">
          {/* Doc selector */}
          {shipbillDocs.length > 1 && (
            <div className="px-4 py-2 border-b border-gray-50 flex gap-1 overflow-x-auto">
              {shipbillDocs.map((doc, idx) => (
                <button
                  key={doc.id}
                  onClick={() => { setSelectedDocIdx(idx); setActiveIssue(null); }}
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

          {/* Page nav */}
          {numPages > 1 && (
            <div className="px-4 py-1.5 border-b border-gray-50 flex items-center gap-2 text-xs text-gray-500">
              <button disabled={currentPage <= 1} onClick={() => setCurrentPage((p) => p - 1)} className="disabled:opacity-30 hover:text-gray-900">Prev</button>
              <span>Page {currentPage} of {numPages}</span>
              <button disabled={currentPage >= numPages} onClick={() => setCurrentPage((p) => p + 1)} className="disabled:opacity-30 hover:text-gray-900">Next</button>
            </div>
          )}

          {/* PDF viewer */}
          <div className="flex-1 overflow-auto relative" ref={containerRef} onLoad={measureContainer}>
            {selectedDoc?.pdfPath ? (
              <div className="relative inline-block">
                <Document
                  file={selectedDoc.pdfPath}
                  onLoadSuccess={({ numPages: n }) => { setNumPages(n); measureContainer(); }}
                  loading={<div className="flex items-center justify-center h-64 text-sm text-gray-400">Loading PDF...</div>}
                  error={<div className="flex items-center justify-center h-64 text-sm text-gray-400">Failed to load PDF</div>}
                >
                  <Page
                    pageNumber={currentPage}
                    width={containerWidth - 16}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </Document>
                {/* Highlight overlay */}
                {activeIssue?.highlight && activeIssue.highlight.page === currentPage && (
                  <div
                    className="absolute border-2 border-red-500 bg-red-500/15 rounded-sm pointer-events-none"
                    style={{
                      left: `${activeIssue.highlight.x}%`,
                      top: `${activeIssue.highlight.y}%`,
                      width: `${activeIssue.highlight.w}%`,
                      height: `${activeIssue.highlight.h}%`,
                    }}
                  >
                    <div className="absolute -top-6 left-0 bg-red-600 text-white text-[10px] font-medium px-2 py-0.5 rounded whitespace-nowrap shadow-sm">
                      {activeIssue.rule}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center flex-1 min-h-[400px] text-sm text-gray-400">
                No preview available
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
