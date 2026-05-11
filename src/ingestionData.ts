import { Shipbill, ValidationResult } from "./types";

// The 4 real shipbills that get validated
export const realShipbills: Shipbill[] = [
  {
    id: "sb_1",
    referenceNumber: "UP260316",
    source: "email",
    sourceDetail: "docs@transasia-freight.com",
    receivedAt: "2025-05-05T08:12:00Z",
    documents: [
      {
        id: "doc_up_1",
        name: "Vendor Invoice.pdf",
        type: "invoice",
        pdfPath: "/documents/UP260316/Vendor Invoice.pdf",
        content: { fields: {} },
      },
      {
        id: "doc_up_2",
        name: "Transport Document.pdf",
        type: "transport",
        pdfPath: "/documents/UP260316/Transport Document.pdf",
        content: { fields: {} },
      },
      {
        id: "doc_up_3",
        name: "Supporting Documents.pdf",
        type: "shipment",
        pdfPath: "/documents/UP260316/Supporting Documents.pdf",
        content: { fields: {} },
      },
      {
        id: "doc_up_4",
        name: "Others.pdf",
        type: "country_specific",
        pdfPath: "/documents/UP260316/Others.pdf",
        content: { fields: {} },
      },
    ],
  },
  {
    id: "sb_2",
    referenceNumber: "2629HK0191346",
    source: "api",
    sourceDetail: "POST /api/v2/shipments/ingest",
    receivedAt: "2025-05-05T08:45:00Z",
    documents: [
      {
        id: "doc_hk_1",
        name: "Vendor Invoice.pdf",
        type: "invoice",
        pdfPath: "/documents/2629HK0191346/Vendor Invoice.pdf",
        content: { fields: {} },
      },
      {
        id: "doc_hk_2",
        name: "Supporting Documents.pdf",
        type: "shipment",
        pdfPath: "/documents/2629HK0191346/Supporting Documents.pdf",
        content: { fields: {} },
      },
    ],
  },
  {
    id: "sb_3",
    referenceNumber: "X-A25001415838",
    source: "vendor_portal",
    sourceDetail: "Kuehne+Nagel Portal — auto-sync",
    receivedAt: "2025-05-05T09:03:00Z",
    documents: [
      {
        id: "doc_xa8_1",
        name: "Vendor Invoice.pdf",
        type: "invoice",
        pdfPath: "/documents/X-A25001415838/Vendor Invoice.pdf",
        content: { fields: {} },
      },
      {
        id: "doc_xa8_2",
        name: "Transport Document.pdf",
        type: "transport",
        pdfPath: "/documents/X-A25001415838/Transport Document.pdf",
        content: { fields: {} },
      },
      {
        id: "doc_xa8_3",
        name: "Supporting Documents.pdf",
        type: "shipment",
        pdfPath: "/documents/X-A25001415838/Supporting Documents.pdf",
        content: { fields: {} },
      },
      {
        id: "doc_xa8_4",
        name: "Others.pdf",
        type: "country_specific",
        pdfPath: "/documents/X-A25001415838/Others.pdf",
        content: { fields: {} },
      },
    ],
  },
  {
    id: "sb_4",
    referenceNumber: "X-A25001415616",
    source: "email",
    sourceDetail: "logistics@kn-portal.com",
    receivedAt: "2025-05-05T09:18:00Z",
    documents: [
      {
        id: "doc_xa6_1",
        name: "Vendor Invoice.pdf",
        type: "invoice",
        pdfPath: "/documents/X-A25001415616/Vendor Invoice.pdf",
        content: { fields: {} },
      },
      {
        id: "doc_xa6_2",
        name: "Transport Document.pdf",
        type: "transport",
        pdfPath: "/documents/X-A25001415616/Transport Document.pdf",
        content: { fields: {} },
      },
      {
        id: "doc_xa6_3",
        name: "Supporting Documents.pdf",
        type: "shipment",
        pdfPath: "/documents/X-A25001415616/Supporting Documents.pdf",
        content: { fields: {} },
      },
      {
        id: "doc_xa6_4",
        name: "Others.pdf",
        type: "country_specific",
        pdfPath: "/documents/X-A25001415616/Others.pdf",
        content: { fields: {} },
      },
    ],
  },
];

// Additional mock shipbills to fill the feed (~16 more for ~20 total)
// They reuse PDFs from real shipbill folders for preview purposes
const pdfSources = [
  "X-A25001415616",
  "X-A25001415838",
  "UP260316",
  "2629HK0191346",
];
const pickPdf = (idx: number, name: string) =>
  `/documents/${pdfSources[idx % pdfSources.length]}/${name}`;

export const mockShipbills: Shipbill[] = [
  {
    id: "sb_m1",
    referenceNumber: "SH-2025-04891",
    source: "email",
    sourceDetail: "dispatch@meridian-logistics.de",
    receivedAt: "2025-05-05T07:42:00Z",
    documents: [
      {
        id: "dm1",
        name: "Commercial Invoice.pdf",
        type: "invoice",
        pdfPath: pickPdf(0, "Vendor Invoice.pdf"),
        content: { fields: {} },
      },
      {
        id: "dm1b",
        name: "Packing List.pdf",
        type: "shipment",
        pdfPath: pickPdf(0, "Supporting Documents.pdf"),
        content: { fields: {} },
      },
    ],
  },
  {
    id: "sb_m2",
    referenceNumber: "BL-MAEU-924177",
    source: "vendor_portal",
    sourceDetail: "Maersk Connect — EDI feed",
    receivedAt: "2025-05-05T07:55:00Z",
    documents: [
      {
        id: "dm2",
        name: "Bill of Lading.pdf",
        type: "transport",
        pdfPath: pickPdf(1, "Transport Document.pdf"),
        content: { fields: {} },
      },
      {
        id: "dm2b",
        name: "Invoice.pdf",
        type: "invoice",
        pdfPath: pickPdf(1, "Vendor Invoice.pdf"),
        content: { fields: {} },
      },
      {
        id: "dm2c",
        name: "CoO.pdf",
        type: "country_specific",
        pdfPath: pickPdf(1, "Others.pdf"),
        content: { fields: {} },
      },
    ],
  },
  {
    id: "sb_m3",
    referenceNumber: "FCR-SZ-20250491",
    source: "api",
    sourceDetail: "POST /api/v2/shipments/ingest",
    receivedAt: "2025-05-05T08:01:00Z",
    documents: [
      {
        id: "dm3",
        name: "FCR Document.pdf",
        type: "transport",
        pdfPath: pickPdf(2, "Transport Document.pdf"),
        content: { fields: {} },
      },
      {
        id: "dm3b",
        name: "Invoice.pdf",
        type: "invoice",
        pdfPath: pickPdf(2, "Vendor Invoice.pdf"),
        content: { fields: {} },
      },
    ],
  },
  {
    id: "sb_m4",
    referenceNumber: "INV-2025-HK-7744",
    source: "email",
    sourceDetail: "accounts@pacificrim-hk.com",
    receivedAt: "2025-05-05T08:08:00Z",
    documents: [
      {
        id: "dm4",
        name: "Invoice Pack.pdf",
        type: "invoice",
        pdfPath: pickPdf(3, "Vendor Invoice.pdf"),
        content: { fields: {} },
      },
    ],
  },
  {
    id: "sb_m5",
    referenceNumber: "PO-4401-NL-229",
    source: "vendor_portal",
    sourceDetail: "DB Schenker Portal — webhook",
    receivedAt: "2025-05-05T08:20:00Z",
    documents: [
      {
        id: "dm5",
        name: "Purchase Order.pdf",
        type: "invoice",
        pdfPath: pickPdf(0, "Vendor Invoice.pdf"),
        content: { fields: {} },
      },
      {
        id: "dm5b",
        name: "Transport Doc.pdf",
        type: "transport",
        pdfPath: pickPdf(0, "Transport Document.pdf"),
        content: { fields: {} },
      },
      {
        id: "dm5c",
        name: "Cert of Origin.pdf",
        type: "country_specific",
        pdfPath: pickPdf(0, "Others.pdf"),
        content: { fields: {} },
      },
    ],
  },
  {
    id: "sb_m6",
    referenceNumber: "AWB-172-4482-9901",
    source: "api",
    sourceDetail: "POST /api/v2/shipments/ingest",
    receivedAt: "2025-05-05T08:28:00Z",
    documents: [
      {
        id: "dm6",
        name: "Air Waybill.pdf",
        type: "transport",
        pdfPath: pickPdf(1, "Transport Document.pdf"),
        content: { fields: {} },
      },
      {
        id: "dm6b",
        name: "Commercial Invoice.pdf",
        type: "invoice",
        pdfPath: pickPdf(1, "Vendor Invoice.pdf"),
        content: { fields: {} },
      },
    ],
  },
  {
    id: "sb_m7",
    referenceNumber: "X-B30001982441",
    source: "email",
    sourceDetail: "shipping@nordic-supply.se",
    receivedAt: "2025-05-05T08:35:00Z",
    documents: [
      {
        id: "dm7",
        name: "Full Doc Set.pdf",
        type: "invoice",
        pdfPath: pickPdf(2, "Vendor Invoice.pdf"),
        content: { fields: {} },
      },
      {
        id: "dm7b",
        name: "B/L.pdf",
        type: "transport",
        pdfPath: pickPdf(2, "Transport Document.pdf"),
        content: { fields: {} },
      },
    ],
  },
  {
    id: "sb_m8",
    referenceNumber: "COSCO-BKG-884721",
    source: "vendor_portal",
    sourceDetail: "COSCO Syncon Hub — auto-sync",
    receivedAt: "2025-05-05T08:52:00Z",
    documents: [
      {
        id: "dm8",
        name: "Booking Confirmation.pdf",
        type: "transport",
        pdfPath: pickPdf(0, "Transport Document.pdf"),
        content: { fields: {} },
      },
      {
        id: "dm8b",
        name: "Invoice.pdf",
        type: "invoice",
        pdfPath: pickPdf(0, "Vendor Invoice.pdf"),
        content: { fields: {} },
      },
      {
        id: "dm8c",
        name: "Packing List.pdf",
        type: "shipment",
        pdfPath: pickPdf(0, "Supporting Documents.pdf"),
        content: { fields: {} },
      },
    ],
  },
  {
    id: "sb_m9",
    referenceNumber: "SAD-PL-2025-0041",
    source: "api",
    sourceDetail: "PUT /api/v2/customs/declarations",
    receivedAt: "2025-05-05T09:05:00Z",
    documents: [
      {
        id: "dm9",
        name: "Export Declaration.pdf",
        type: "country_specific",
        pdfPath: pickPdf(2, "Others.pdf"),
        content: { fields: {} },
      },
    ],
  },
  {
    id: "sb_m10",
    referenceNumber: "TK-IST-250504-R3",
    source: "email",
    sourceDetail: "ops@turkfreight.com.tr",
    receivedAt: "2025-05-05T09:11:00Z",
    documents: [
      {
        id: "dm10",
        name: "Invoice.pdf",
        type: "invoice",
        pdfPath: pickPdf(3, "Vendor Invoice.pdf"),
        content: { fields: {} },
      },
      {
        id: "dm10b",
        name: "CMR Waybill.pdf",
        type: "transport",
        pdfPath: pickPdf(2, "Transport Document.pdf"),
        content: { fields: {} },
      },
    ],
  },
  {
    id: "sb_m11",
    referenceNumber: "SHP-VN-88231-A",
    source: "vendor_portal",
    sourceDetail: "Flexport Portal — auto-pull",
    receivedAt: "2025-05-05T09:22:00Z",
    documents: [
      {
        id: "dm11",
        name: "Vendor Invoice.pdf",
        type: "invoice",
        pdfPath: pickPdf(0, "Vendor Invoice.pdf"),
        content: { fields: {} },
      },
      {
        id: "dm11b",
        name: "FCR.pdf",
        type: "transport",
        pdfPath: pickPdf(0, "Transport Document.pdf"),
        content: { fields: {} },
      },
      {
        id: "dm11c",
        name: "Phyto Cert.pdf",
        type: "country_specific",
        pdfPath: pickPdf(0, "Others.pdf"),
        content: { fields: {} },
      },
    ],
  },
  {
    id: "sb_m12",
    referenceNumber: "OOCL-BL-SZXROT-445",
    source: "api",
    sourceDetail: "POST /api/v2/shipments/ingest",
    receivedAt: "2025-05-05T09:30:00Z",
    documents: [
      {
        id: "dm12",
        name: "B/L Original.pdf",
        type: "transport",
        pdfPath: pickPdf(1, "Transport Document.pdf"),
        content: { fields: {} },
      },
      {
        id: "dm12b",
        name: "Invoice.pdf",
        type: "invoice",
        pdfPath: pickPdf(1, "Vendor Invoice.pdf"),
        content: { fields: {} },
      },
    ],
  },
  {
    id: "sb_m13",
    referenceNumber: "GW-2025-MUM-0093",
    source: "email",
    sourceDetail: "export@goodwill-india.in",
    receivedAt: "2025-05-05T09:38:00Z",
    documents: [
      {
        id: "dm13",
        name: "Tax Invoice.pdf",
        type: "invoice",
        pdfPath: pickPdf(2, "Vendor Invoice.pdf"),
        content: { fields: {} },
      },
      {
        id: "dm13b",
        name: "Shipping Bill.pdf",
        type: "shipment",
        pdfPath: pickPdf(2, "Supporting Documents.pdf"),
        content: { fields: {} },
      },
      {
        id: "dm13c",
        name: "CoO.pdf",
        type: "country_specific",
        pdfPath: pickPdf(2, "Others.pdf"),
        content: { fields: {} },
      },
    ],
  },
  {
    id: "sb_m14",
    referenceNumber: "DHL-AWB-001-9928-4",
    source: "vendor_portal",
    sourceDetail: "DHL MySupplyChain — EDI",
    receivedAt: "2025-05-05T09:44:00Z",
    documents: [
      {
        id: "dm14",
        name: "Waybill.pdf",
        type: "transport",
        pdfPath: pickPdf(0, "Transport Document.pdf"),
        content: { fields: {} },
      },
      {
        id: "dm14b",
        name: "Pro-forma Invoice.pdf",
        type: "invoice",
        pdfPath: pickPdf(0, "Vendor Invoice.pdf"),
        content: { fields: {} },
      },
    ],
  },
  {
    id: "sb_m15",
    referenceNumber: "REF-BR-SANTOS-1177",
    source: "email",
    sourceDetail: "docflow@rio-commodities.br",
    receivedAt: "2025-05-05T09:51:00Z",
    documents: [
      {
        id: "dm15",
        name: "Invoice.pdf",
        type: "invoice",
        pdfPath: pickPdf(3, "Vendor Invoice.pdf"),
        content: { fields: {} },
      },
      {
        id: "dm15b",
        name: "B/L.pdf",
        type: "transport",
        pdfPath: pickPdf(1, "Transport Document.pdf"),
        content: { fields: {} },
      },
      {
        id: "dm15c",
        name: "Fumigation Cert.pdf",
        type: "country_specific",
        pdfPath: pickPdf(1, "Others.pdf"),
        content: { fields: {} },
      },
    ],
  },
  {
    id: "sb_m16",
    referenceNumber: "KN-SEA-FRA-250505",
    source: "api",
    sourceDetail: "POST /api/v2/shipments/ingest",
    receivedAt: "2025-05-05T09:58:00Z",
    documents: [
      {
        id: "dm16",
        name: "Full Document Pack.pdf",
        type: "invoice",
        pdfPath: pickPdf(0, "Vendor Invoice.pdf"),
        content: { fields: {} },
      },
      {
        id: "dm16b",
        name: "Transport.pdf",
        type: "transport",
        pdfPath: pickPdf(0, "Transport Document.pdf"),
        content: { fields: {} },
      },
    ],
  },
];

// Interleave real and mock shipbills in a realistic order
export const allShipbills: Shipbill[] = [
  mockShipbills[0], // SH-2025-04891
  mockShipbills[1], // BL-MAEU-924177
  mockShipbills[2], // FCR-SZ-20250491
  mockShipbills[3], // INV-2025-HK-7744
  realShipbills[0], // UP260316
  mockShipbills[4], // PO-4401-NL-229
  mockShipbills[5], // AWB-172-4482-9901
  mockShipbills[6], // X-B30001982441
  realShipbills[1], // 2629HK0191346
  mockShipbills[7], // COSCO-BKG-884721
  mockShipbills[8], // SAD-PL-2025-0041
  realShipbills[2], // X-A25001415838
  mockShipbills[9], // TK-IST-250504-R3
  realShipbills[3], // X-A25001415616
  mockShipbills[10], // SHP-VN-88231-A
  mockShipbills[11], // OOCL-BL-SZXROT-445
  mockShipbills[12], // GW-2025-MUM-0093
  mockShipbills[13], // DHL-AWB-001-9928-4
  mockShipbills[14], // REF-BR-SANTOS-1177
  mockShipbills[15], // KN-SEA-FRA-250505
];

/**
 * Hardcoded validation results for the 4 real shipbills.
 */
export function getHardcodedResults(): ValidationResult[] {
  return [
    {
      documentId: "sb_1",
      documentName: "UP260316",
      documentType: "transport",
      shipbillRef: "UP260316",
      status: "fail",
      issues: [
        {
          field: "action_transport_signed",
          expected: "Original FCR document without watermarks",
          actual:
            "FCR is non-original; found a large background watermark COPY spanning the center of the document",
          severity: "error",
          rule: "Transport document must be original (no COPY watermark)",
          relatedDocName: "Transport Document.pdf",
          highlight: { page: 1, x: 10, y: 40, w: 70, h: 20 },
        },
      ],
    },
    {
      documentId: "sb_2",
      documentName: "2629HK0191346",
      documentType: "shipment",
      shipbillRef: "2629HK0191346",
      status: "fail",
      issues: [
        {
          field: "action_purchase_contract_present",
          expected:
            "Purchase Contract or Order Confirmation present in uploaded files",
          actual:
            "No document titled Purchase Contract or Order Confirmation found in uploaded files",
          severity: "error",
          rule: "Missing Purchase Contract",
          relatedDocName: "Supporting Documents.pdf",
        },
        {
          field: "action_transport_doc_present",
          expected: "FCR or B/L present in dedicated folder or uploaded files",
          actual:
            "No FCR or B/L found in the dedicated folder or uploaded files",
          severity: "error",
          rule: "Missing Transport Document",
          relatedDocName: "Supporting Documents.pdf",
        },
        {
          field: "action_poland_sad",
          expected: "SAD/Export Declaration present for shipments to Poland",
          actual:
            "Missing SAD/Export Declaration required for shipments to Poland",
          severity: "error",
          rule: "Missing SAD/Export Declaration required for shipments to Poland",
          relatedDocName: "Supporting Documents.pdf",
        },
      ],
    },
    {
      documentId: "sb_3",
      documentName: "X-A25001415838",
      documentType: "invoice",
      shipbillRef: "X-A25001415838",
      status: "fail",
      issues: [
        {
          field: "action_invoice_number_match",
          expected: "Invoice number must match Shipbill number",
          actual:
            "Invoice No: X-A25001415738 does not match Shipbill No: X-A25001415838 (7 vs 8)",
          severity: "error",
          rule: "Invoice number must match shipbill reference",
          relatedDocName: "Vendor Invoice.pdf",
          highlight: { page: 1, x: 62, y: 20, w: 30, h: 5 },
        },
      ],
    },
    {
      documentId: "sb_4",
      documentName: "X-A25001415616",
      documentType: "invoice",
      shipbillRef: "X-A25001415616",
      status: "pass",
      issues: [],
    },
  ];
}
