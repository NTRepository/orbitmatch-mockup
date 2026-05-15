export type DocumentType = 'transport' | 'invoice' | 'shipment' | 'country_specific';

export type IngestionSource = 'email' | 'api' | 'vendor_portal';

export interface ShipbillDocument {
  id: string;
  name: string;
  type: DocumentType;
  pdfPath: string; // path to PDF in public/documents/
  content: MockDocumentContent;
}

export interface Shipbill {
  id: string;
  referenceNumber: string;
  source: IngestionSource;
  sourceDetail: string; // e.g. "vendor@example.com" or "REST API /v2/documents"
  receivedAt: string;
  documents: ShipbillDocument[];
}

export interface UploadedDocument {
  id: string;
  name: string;
  type: DocumentType;
  file?: File;
  pdfPath?: string;
  content: MockDocumentContent;
  shipbillRef?: string;
}

export interface MockDocumentContent {
  fields: Record<string, string>;
}

export interface ValidationIssue {
  field: string;
  expected: string;
  actual: string;
  severity: 'error' | 'warning';
  rule: string;
  relatedDocName?: string; // which document in the shipbill this issue relates to
  highlight?: { page: number; x: number; y: number; w: number; h: number }; // PDF point coordinates (72 dpi)
}

export interface ValidationResult {
  documentId: string;
  documentName: string;
  documentType: DocumentType;
  shipbillRef: string;
  issues: ValidationIssue[];
  status: 'pass' | 'fail' | 'warning';
}

export interface CustomerPolicy {
  id: string;
  name: string;
  rules: PolicyRule[];
}

export interface PolicyRule {
  id: string;
  description: string;
  documentType: DocumentType;
  field: string;
  condition: 'matches' | 'present' | 'format' | 'cross_reference';
  expectedValue?: string;
  referenceDocument?: DocumentType;
  referenceField?: string;
}
