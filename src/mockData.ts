import { CustomerPolicy, DocumentType, MockDocumentContent } from './types';

export const customers: CustomerPolicy[] = [
  {
    id: 'cust_001',
    name: 'Acme Global Trading',
    rules: [
      { id: 'r1', description: 'Invoice currency must be USD', documentType: 'invoice', field: 'currency', condition: 'matches', expectedValue: 'USD' },
      { id: 'r2', description: 'Transport document must have vessel name', documentType: 'transport', field: 'vesselName', condition: 'present' },
      { id: 'r3', description: 'Shipment weight must match invoice weight', documentType: 'shipment', field: 'grossWeight', condition: 'cross_reference', referenceDocument: 'invoice', referenceField: 'grossWeight' },
      { id: 'r4', description: 'Country of origin must be declared', documentType: 'country_specific', field: 'countryOfOrigin', condition: 'present' },
      { id: 'r5', description: 'Invoice number format must be INV-XXXXX', documentType: 'invoice', field: 'invoiceNumber', condition: 'format', expectedValue: '^INV-\\d{5}$' },
      { id: 'r6', description: 'Bill of lading number must be present', documentType: 'transport', field: 'blNumber', condition: 'present' },
      { id: 'r7', description: 'Consignee on transport must match invoice buyer', documentType: 'transport', field: 'consignee', condition: 'cross_reference', referenceDocument: 'invoice', referenceField: 'buyer' },
    ],
  },
  {
    id: 'cust_002',
    name: 'Pacific Rim Imports',
    rules: [
      { id: 'r1', description: 'Invoice currency must be EUR', documentType: 'invoice', field: 'currency', condition: 'matches', expectedValue: 'EUR' },
      { id: 'r2', description: 'HS Code must be present on shipment', documentType: 'shipment', field: 'hsCode', condition: 'present' },
      { id: 'r3', description: 'Phytosanitary certificate required', documentType: 'country_specific', field: 'phytoCertNumber', condition: 'present' },
      { id: 'r4', description: 'Port of loading must match transport doc', documentType: 'shipment', field: 'portOfLoading', condition: 'cross_reference', referenceDocument: 'transport', referenceField: 'portOfLoading' },
      { id: 'r5', description: 'Insurance value must be present', documentType: 'invoice', field: 'insuranceValue', condition: 'present' },
    ],
  },
  {
    id: 'cust_003',
    name: 'Nordic Supply Chain Ltd',
    rules: [
      { id: 'r1', description: 'Invoice currency must be NOK or SEK', documentType: 'invoice', field: 'currency', condition: 'format', expectedValue: '^(NOK|SEK)$' },
      { id: 'r2', description: 'Dangerous goods declaration required', documentType: 'shipment', field: 'dgDeclaration', condition: 'present' },
      { id: 'r3', description: 'EORI number must be present', documentType: 'country_specific', field: 'eoriNumber', condition: 'present' },
      { id: 'r4', description: 'Incoterms must be CIF or FOB', documentType: 'invoice', field: 'incoterms', condition: 'format', expectedValue: '^(CIF|FOB)$' },
      { id: 'r5', description: 'Container number format', documentType: 'transport', field: 'containerNumber', condition: 'format', expectedValue: '^[A-Z]{4}\\d{7}$' },
    ],
  },
  {
    id: 'cust_004',
    name: 'Meridian Logistics AG',
    rules: [
      { id: 'r1', description: 'Invoice currency must be CHF or EUR', documentType: 'invoice', field: 'currency', condition: 'format', expectedValue: '^(CHF|EUR)$' },
      { id: 'r2', description: 'Container number must be present', documentType: 'transport', field: 'containerNumber', condition: 'present' },
      { id: 'r3', description: 'Certificate of origin required', documentType: 'country_specific', field: 'certificateOfOrigin', condition: 'present' },
      { id: 'r4', description: 'Net weight must be present on shipment', documentType: 'shipment', field: 'netWeight', condition: 'present' },
      { id: 'r5', description: 'Consignee on transport must match invoice buyer', documentType: 'transport', field: 'consignee', condition: 'cross_reference', referenceDocument: 'invoice', referenceField: 'buyer' },
      { id: 'r6', description: 'Customs declaration must be present', documentType: 'country_specific', field: 'customsDeclaration', condition: 'present' },
    ],
  },
  {
    id: 'cust_005',
    name: 'Atlas Freight Corp',
    rules: [
      { id: 'r1', description: 'Invoice currency must be USD', documentType: 'invoice', field: 'currency', condition: 'matches', expectedValue: 'USD' },
      { id: 'r2', description: 'Vessel name must be present', documentType: 'transport', field: 'vesselName', condition: 'present' },
      { id: 'r3', description: 'HS Code must be present', documentType: 'shipment', field: 'hsCode', condition: 'present' },
      { id: 'r4', description: 'Port of loading must match transport doc', documentType: 'shipment', field: 'portOfLoading', condition: 'cross_reference', referenceDocument: 'transport', referenceField: 'portOfLoading' },
      { id: 'r5', description: 'EORI number must be present', documentType: 'country_specific', field: 'eoriNumber', condition: 'present' },
      { id: 'r6', description: 'Incoterms must be CIF, FOB, or DDP', documentType: 'invoice', field: 'incoterms', condition: 'format', expectedValue: '^(CIF|FOB|DDP)$' },
    ],
  },
  {
    id: 'cust_006',
    name: 'Sahara Trade Partners',
    rules: [
      { id: 'r1', description: 'Invoice currency must be USD or AED', documentType: 'invoice', field: 'currency', condition: 'format', expectedValue: '^(USD|AED)$' },
      { id: 'r2', description: 'Bill of lading number must be present', documentType: 'transport', field: 'blNumber', condition: 'present' },
      { id: 'r3', description: 'Country of origin must be declared', documentType: 'country_specific', field: 'countryOfOrigin', condition: 'present' },
      { id: 'r4', description: 'Number of packages must be present', documentType: 'shipment', field: 'numberOfPackages', condition: 'present' },
      { id: 'r5', description: 'Insurance value must be present', documentType: 'invoice', field: 'insuranceValue', condition: 'present' },
    ],
  },
  {
    id: 'cust_007',
    name: 'Tidewater Shipping Co.',
    rules: [
      { id: 'r1', description: 'Invoice currency must be GBP', documentType: 'invoice', field: 'currency', condition: 'matches', expectedValue: 'GBP' },
      { id: 'r2', description: 'Vessel name must be present', documentType: 'transport', field: 'vesselName', condition: 'present' },
      { id: 'r3', description: 'Port of discharge must be present', documentType: 'transport', field: 'portOfDischarge', condition: 'present' },
      { id: 'r4', description: 'Shipment weight must match invoice weight', documentType: 'shipment', field: 'grossWeight', condition: 'cross_reference', referenceDocument: 'invoice', referenceField: 'grossWeight' },
      { id: 'r5', description: 'Phytosanitary certificate required', documentType: 'country_specific', field: 'phytoCertNumber', condition: 'present' },
      { id: 'r6', description: 'Invoice number format must be INV-XXXXX', documentType: 'invoice', field: 'invoiceNumber', condition: 'format', expectedValue: '^INV-\\d{5}$' },
    ],
  },
  {
    id: 'cust_008',
    name: 'Bangalore Export House',
    rules: [
      { id: 'r1', description: 'Invoice currency must be INR or USD', documentType: 'invoice', field: 'currency', condition: 'format', expectedValue: '^(INR|USD)$' },
      { id: 'r2', description: 'Dangerous goods declaration required', documentType: 'shipment', field: 'dgDeclaration', condition: 'present' },
      { id: 'r3', description: 'Certificate of origin required', documentType: 'country_specific', field: 'certificateOfOrigin', condition: 'present' },
      { id: 'r4', description: 'Bill of lading number must be present', documentType: 'transport', field: 'blNumber', condition: 'present' },
      { id: 'r5', description: 'Consignee on transport must match invoice buyer', documentType: 'transport', field: 'consignee', condition: 'cross_reference', referenceDocument: 'invoice', referenceField: 'buyer' },
    ],
  },
  {
    id: 'cust_009',
    name: 'Rio Grande Commodities',
    rules: [
      { id: 'r1', description: 'Invoice currency must be BRL or USD', documentType: 'invoice', field: 'currency', condition: 'format', expectedValue: '^(BRL|USD)$' },
      { id: 'r2', description: 'Container number format must be valid', documentType: 'transport', field: 'containerNumber', condition: 'format', expectedValue: '^[A-Z]{4}\\d{7}$' },
      { id: 'r3', description: 'Gross weight must be present on shipment', documentType: 'shipment', field: 'grossWeight', condition: 'present' },
      { id: 'r4', description: 'Country of origin must be declared', documentType: 'country_specific', field: 'countryOfOrigin', condition: 'present' },
      { id: 'r5', description: 'Phytosanitary certificate required', documentType: 'country_specific', field: 'phytoCertNumber', condition: 'present' },
      { id: 'r6', description: 'Vessel name must be present', documentType: 'transport', field: 'vesselName', condition: 'present' },
    ],
  },
  {
    id: 'cust_010',
    name: 'Hanseatic Merchants GmbH',
    rules: [
      { id: 'r1', description: 'Invoice currency must be EUR', documentType: 'invoice', field: 'currency', condition: 'matches', expectedValue: 'EUR' },
      { id: 'r2', description: 'EORI number must be present', documentType: 'country_specific', field: 'eoriNumber', condition: 'present' },
      { id: 'r3', description: 'Incoterms must be DAP or DDP', documentType: 'invoice', field: 'incoterms', condition: 'format', expectedValue: '^(DAP|DDP)$' },
      { id: 'r4', description: 'Shipment weight must match invoice weight', documentType: 'shipment', field: 'grossWeight', condition: 'cross_reference', referenceDocument: 'invoice', referenceField: 'grossWeight' },
      { id: 'r5', description: 'Bill of lading number must be present', documentType: 'transport', field: 'blNumber', condition: 'present' },
      { id: 'r6', description: 'Customs declaration must be present', documentType: 'country_specific', field: 'customsDeclaration', condition: 'present' },
      { id: 'r7', description: 'Port of loading must match transport doc', documentType: 'shipment', field: 'portOfLoading', condition: 'cross_reference', referenceDocument: 'transport', referenceField: 'portOfLoading' },
    ],
  },
];

// The 4 document types in rotation order
const typeRotation: DocumentType[] = ['invoice', 'transport', 'shipment', 'country_specific'];

let uploadCounter = 0;

/**
 * Returns the next document type in rotation so each uploaded file
 * gets a different type (invoice, transport, shipment, certificate, ...).
 */
export function getNextDocumentType(): DocumentType {
  const type = typeRotation[uploadCounter % typeRotation.length];
  uploadCounter++;
  return type;
}

/** Reset counter (useful on app reset) */
export function resetUploadCounter(): void {
  uploadCounter = 0;
}

/**
 * Generates mock content for a document. The `cycle` parameter (0-based)
 * indicates which time this type has appeared (0 = first invoice, 1 = second invoice, etc.)
 * so we can produce varied content — some clean, some with issues.
 */
export function generateMockContent(type: DocumentType, _fileName: string, cycle: number = 0): MockDocumentContent {
  // Cycle 0 = first time this type appears, cycle 1 = second, etc.
  // For Acme: cycle-0 shipment has weight mismatch (fail), cycle-1+ shipment is clean (pass)
  // For Acme: cycle-0 country_specific has empty phyto/eori (fail for Pacific/Nordic), cycle-1+ fills them in

  const mockContents: Record<DocumentType, MockDocumentContent[]> = {
    invoice: [
      // Cycle 0: clean for Acme (USD, valid format)
      {
        fields: {
          invoiceNumber: 'INV-84321',
          currency: 'USD',
          totalAmount: '45,230.00',
          buyer: 'Acme Global Trading BV',
          seller: 'Shenzhen Electronics Co.',
          grossWeight: '2,450 kg',
          incoterms: 'CIF',
          insuranceValue: '48,000.00',
          dateOfIssue: '2024-03-10',
        },
      },
      // Cycle 1: slightly different invoice, still clean for Acme
      {
        fields: {
          invoiceNumber: 'INV-90215',
          currency: 'USD',
          totalAmount: '18,750.00',
          buyer: 'Acme Global Trading BV',
          seller: 'Guangzhou Machinery Ltd.',
          grossWeight: '1,200 kg',
          incoterms: 'FOB',
          insuranceValue: '20,000.00',
          dateOfIssue: '2024-04-02',
        },
      },
    ],
    transport: [
      // Cycle 0: clean for Acme
      {
        fields: {
          blNumber: 'BL-2024-78432',
          vesselName: 'MV Pacific Star',
          portOfLoading: 'Shanghai',
          portOfDischarge: 'Rotterdam',
          consignee: 'Acme Global Trading BV',
          containerNumber: 'MSCU7234567',
          dateOfShipment: '2024-03-15',
        },
      },
      // Cycle 1: missing vessel name → warning/fail for Acme rule r2
      {
        fields: {
          blNumber: 'BL-2024-81290',
          vesselName: '',
          portOfLoading: 'Ningbo',
          portOfDischarge: 'Hamburg',
          consignee: 'Acme Global Trading BV',
          containerNumber: 'TCLU4451230',
          dateOfShipment: '2024-04-08',
        },
      },
    ],
    shipment: [
      // Cycle 0: weight mismatch with invoice → fail for Acme
      {
        fields: {
          hsCode: '8471.30.0100',
          grossWeight: '2,480 kg',
          netWeight: '2,100 kg',
          numberOfPackages: '120',
          portOfLoading: 'Ningbo',
          description: 'Electronic Components - PCBs',
          dgDeclaration: 'DG-2024-0042',
        },
      },
      // Cycle 1: weight matches second invoice → pass for Acme
      {
        fields: {
          hsCode: '8483.40.0000',
          grossWeight: '1,200 kg',
          netWeight: '980 kg',
          numberOfPackages: '45',
          portOfLoading: 'Shanghai',
          description: 'Industrial Bearings',
          dgDeclaration: '',
        },
      },
    ],
    country_specific: [
      // Cycle 0: clean for Acme (countryOfOrigin present), has issues for Pacific/Nordic
      {
        fields: {
          countryOfOrigin: 'China',
          certificateOfOrigin: 'CO-2024-SZ-4421',
          phytoCertNumber: '',
          eoriNumber: '',
          customsDeclaration: 'CD-2024-RT-8832',
        },
      },
      // Cycle 1: fully filled — clean for everyone
      {
        fields: {
          countryOfOrigin: 'Vietnam',
          certificateOfOrigin: 'CO-2024-VN-1187',
          phytoCertNumber: 'PC-2024-VN-0034',
          eoriNumber: 'DE283746510000',
          customsDeclaration: 'CD-2024-HH-2291',
        },
      },
    ],
  };

  const variants = mockContents[type];
  return variants[cycle % variants.length];
}
