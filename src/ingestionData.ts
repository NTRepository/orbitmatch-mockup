import { Shipbill, ValidationResult } from "./types";

// PDF map: folder → PDF files available
const pdfMap: Record<string, string[]> = {
  "4681983": [
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "4681984": [
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "4684277": [
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "4684281": [
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "4684283": [
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "4684286": [
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "4684289": [
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "4688295": [
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "4688297": [
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "4688787": [
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "4689144": [
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "4689174": [
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "4689712": [
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "4689713": [
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "4689714": [
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "4690735": [
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "4690736": [
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "20260619": [
    "Others.pdf",
    "Packing List.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "20260620": [
    "Packing List.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "600318472": [
    "Declaration.pdf",
    "Others.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "01382SAIGIII2026": [
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "079_SAMA_EXP_III_2026": [
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "152 NSCN-AC _26": [
    "Certificate of Origin.pdf",
    "Others.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "165 NSCN-AC _26": [
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "2025L-508-2": [
    "Export Declaration.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "2026DY-49377-6": [
    "Apparel Details Sheet.pdf",
    "ASN.pdf",
    "ATR.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "2026KH0149": [
    "Export Declaration.pdf",
    "Others.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "2026VN28052": [
    "Certificate of Origin.pdf",
    "Delivery Note.pdf",
    "Others.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "24THS-8962 & 8963-27": [
    "ASN.pdf",
    "ATR.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "25CI0610-173": [
    "Others.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "25CI0610-174": [
    "Others.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "25CI0610-175": [
    "Others.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "25CI0610-176": [
    "Others.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "25E7262": [
    "Certificate of Origin.pdf",
    "Others.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "25E7292": [
    "Certificate of Origin.pdf",
    "Others.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "25E7488": [
    "Certificate of Origin.pdf",
    "Others.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "25RA3379-22": [
    "Declaration.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "25RA3379-9": [
    "Declaration.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "25VA0627-8": [
    "Declaration.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "2629HK0190508": [
    "ASN.pdf",
    "Supporting Documents.pdf",
    "Vendor Invoice.pdf",
  ],
  "2629HK0190521": [
    "ASN.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "2629HK0190573": [
    "ASN.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "2629HK0190599": [
    "ASN.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "2629HK0190608": [
    "ASN.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "2629HK0190609": [
    "ASN.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "2629HK0190630": [
    "ASN.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "2629HK0190646": [
    "ASN.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "2629HK0190652": ["Supporting Documents.pdf", "Vendor Invoice.pdf"],
  "2629HK0190662": [
    "ASN.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "2629HK0190716": [
    "ASN.pdf",
    "ATR.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "2629HK0190745": [
    "ASN.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "2629HK0190747": [
    "ASN.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "2629HK0190781": [
    "ASN.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "26AL-2045": [
    "ASN.pdf",
    "ATR.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "26HT42126": [
    "Others.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "26HT42127": [
    "Others.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "26HT42128": [
    "Others.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "26HT42129": [
    "Others.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "26HT42130": [
    "Others.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "26HT42131": [
    "Others.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "26HT42132": [
    "Others.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "26HT42133": [
    "Others.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "26M3272": [
    "Others.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "26M3321": [
    "Others.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "26M3356": [
    "Others.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "26M3369": [
    "Others.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "26T0023-2": [
    "Export Declaration.pdf",
    "Others.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "26TG0340": [
    "Others.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "26TG0393": [
    "Others.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "26TG0394": [
    "Others.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "26TG0398": [
    "Others.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "26ZL-0862": [
    "ASN.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "26ZL-0864": [
    "ASN.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "26ZL-1025": [
    "ASN.pdf",
    "ATR.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "26ZL-2046": [
    "ASN.pdf",
    "ATR.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "26ZL-2047": [
    "ASN.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "4401017458": [
    "Others.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "6161411523": [
    "Others.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "6161411735": [
    "Others.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "6161411738": [
    "Others.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "91E262D0031": [
    "Others.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "A05AC26033-25": [
    "Apparel Details Sheet.pdf",
    "ASN.pdf",
    "ATR.pdf",
    "Others.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "A05AC26033-27": [
    "Apparel Details Sheet.pdf",
    "ASN.pdf",
    "ATR.pdf",
    "Supporting Documents.pdf",
    "Testing Report.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "A05BC26016-6": [
    "Apparel Details Sheet.pdf",
    "ASN.pdf",
    "ATR.pdf",
    "Others.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  A25000573810: [
    "Packing List.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  A25000573811: [
    "Packing List.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  A25000573812: [
    "Packing List.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  A25000573813: [
    "Packing List.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  A25000651251: [
    "Packing List.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "A25BB05004-10": [
    "Apparel Details Sheet.pdf",
    "ATR.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "A70AG2500752-1": [
    "ASN.pdf",
    "Customs Document.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "A70AG2500752-2": [
    "ATR.pdf",
    "Customs Document.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "ACL-25-26-830": [
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  AEOSKG260342: [
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  CI_01134_2025: [
    "Declaration.pdf",
    "Others.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  IH12026000000498: [
    "ATR.pdf",
    "Packing List.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "OST251020-33": [
    "ASN.pdf",
    "ATR.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "X-A25001415604": [
    "Export Declaration.pdf",
    "Others.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "YC26-N045": [
    "ASN.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
  "YWJX25-11030080": [
    "Others.pdf",
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ],
};

// Document type mapping
const docTypeMap: Record<
  string,
  "invoice" | "transport" | "shipment" | "country_specific"
> = {
  "Vendor Invoice.pdf": "invoice",
  "Transport Document.pdf": "transport",
  "Supporting Documents.pdf": "shipment",
  "Others.pdf": "country_specific",
  "Certificate of Origin.pdf": "country_specific",
  "ASN.pdf": "shipment",
  "ATR.pdf": "country_specific",
  "Packing List.pdf": "shipment",
  "Export Declaration.pdf": "country_specific",
  "Declaration.pdf": "country_specific",
  "Apparel Details Sheet.pdf": "shipment",
  "Delivery Note.pdf": "shipment",
  "Customs Document.pdf": "country_specific",
  "Testing Report.pdf": "shipment",
};

// Source cycling helpers
const sources: Array<"email" | "api" | "vendor_portal"> = [
  "email",
  "api",
  "vendor_portal",
];
const sourceDetails: Record<string, string[]> = {
  email: [
    "docs@transasia-freight.com",
    "shipping@meridian-logistics.de",
    "dispatch@pacificrim-hk.com",
    "export@goodwill-india.in",
    "logistics@kn-portal.com",
    "ops@turkfreight.com.tr",
    "docflow@rio-commodities.br",
    "accounts@nordic-supply.se",
    "compliance@eurofreight.nl",
    "intake@sealand-docs.sg",
  ],
  api: [
    "POST /api/v2/shipments/ingest",
    "PUT /api/v2/documents/upload",
    "POST /api/v2/shipments/ingest",
  ],
  vendor_portal: [
    "Kuehne+Nagel Portal \u2014 auto-sync",
    "Maersk Connect \u2014 EDI feed",
    "DB Schenker Portal \u2014 webhook",
    "DHL MySupplyChain \u2014 EDI",
    "Flexport Portal \u2014 auto-pull",
    "COSCO Syncon Hub \u2014 auto-sync",
  ],
};

function getSource(i: number): "email" | "api" | "vendor_portal" {
  return sources[i % 3];
}
function getSourceDetail(i: number): string {
  const s = getSource(i);
  const arr = sourceDetails[s];
  return arr[i % arr.length];
}
function getTimestamp(i: number): string {
  const base = new Date("2025-05-05T07:00:00Z");
  base.setMinutes(base.getMinutes() + i * 3);
  return base.toISOString();
}

// The 80 passed reference numbers
const passedRefs = [
  "01382SAIGIII2026",
  "079_SAMA_EXP_III_2026",
  "152 NSCN-AC _26",
  "2026DY-49377-6",
  "25CI0610-173",
  "25CI0610-174",
  "25CI0610-175",
  "25CI0610-176",
  "25E7262",
  "25E7292",
  "25RA3379-22",
  "25RA3379-9",
  "25VA0627-8",
  "2629HK0190521",
  "2629HK0190573",
  "2629HK0190599",
  "2629HK0190608",
  "2629HK0190609",
  "2629HK0190630",
  "2629HK0190646",
  "2629HK0190662",
  "2629HK0190716",
  "2629HK0190745",
  "2629HK0190747",
  "2629HK0190781",
  "26AL-2045",
  "26HT42126",
  "26HT42127",
  "26HT42128",
  "26HT42129",
  "26HT42130",
  "26HT42131",
  "26HT42132",
  "26HT42133",
  "26M3272",
  "26M3321",
  "26M3356",
  "26M3369",
  "26T0023-2",
  "26TG0340",
  "26TG0393",
  "26TG0394",
  "26TG0398",
  "26ZL-0862",
  "26ZL-0864",
  "26ZL-1025",
  "26ZL-2046",
  "26ZL-2047",
  "4401017458",
  "4681983",
  "4681984",
  "4684277",
  "4684281",
  "4684283",
  "4684286",
  "4684289",
  "4688295",
  "4688297",
  "4688787",
  "4689144",
  "4689174",
  "4689712",
  "4689713",
  "4689714",
  "4690735",
  "4690736",
  "6161411523",
  "6161411735",
  "6161411738",
  "91E262D0031",
  "A05AC26033-25",
  "A05AC26033-27",
  "A05BC26016-6",
  "A25000573810",
  "A25000573812",
  "A25000573813",
  "A25000651251",
  "A25BB05004-10",
  "A70AG2500752-2",
  "X-A25001415604",
];

// The 20 failed reference numbers (in order)
const failedRefs = [
  "165 NSCN-AC _26",
  "2025L-508-2",
  "20260619",
  "20260620",
  "2026KH0149",
  "2026VN28052",
  "25E7488",
  "2629HK0190508",
  "2629HK0190652",
  "A25000573811",
  "A70AG2500752-1",
  "24THS-8962 & 8963-27",
  "600318472",
  "IH12026000000498",
  "YC26-N045",
  "YWJX25-11030080",
  "CI_01134_2025",
  "OST251020-33",
  "ACL-25-26-830",
  "AEOSKG260342",
];

// Interleave: place a failed one roughly every 5th position
function buildAllRefs(): { ref: string; failed: boolean }[] {
  const result: { ref: string; failed: boolean }[] = [];
  let pi = 0,
    fi = 0;
  for (let i = 0; i < 100; i++) {
    if ((i + 1) % 5 === 0 && fi < 20) {
      result.push({ ref: failedRefs[fi++], failed: true });
    } else {
      result.push({ ref: passedRefs[pi++], failed: false });
    }
  }
  return result;
}

const orderedRefs = buildAllRefs();

function makeDocs(i: number, ref: string) {
  const pdfs = pdfMap[ref] || [
    "Supporting Documents.pdf",
    "Transport Document.pdf",
    "Vendor Invoice.pdf",
  ];
  const prefix = `d${i + 1}`;
  return pdfs.map((pdfName, j) => ({
    id: `${prefix}_${j + 1}`,
    name: pdfName,
    type: docTypeMap[pdfName] || ("shipment" as const),
    pdfPath: `/documents/${ref}/${pdfName}`,
    content: { fields: {} },
  }));
}

// Build the 100 shipbills
const generatedShipbills: Shipbill[] = orderedRefs.map((entry, i) => ({
  id: `sb_${i + 1}`,
  referenceNumber: entry.ref,
  source: getSource(i),
  sourceDetail: getSourceDetail(i),
  receivedAt: getTimestamp(i),
  documents: makeDocs(i, entry.ref),
}));

export const allShipbills: Shipbill[] = generatedShipbills;

// Keep mockShipbills export for backward compat (empty - all shipbills are in allShipbills now)
export const mockShipbills: Shipbill[] = [];

/**
 * Hardcoded validation results for all 100 shipbills.
 * 80 pass, 20 fail with real rejection reasons.
 */
export function getHardcodedResults(): ValidationResult[] {
  const failedResults: Record<
    string,
    {
      type: "invoice" | "transport" | "shipment" | "country_specific";
      issues: any[];
    }
  > = {
    "165 NSCN-AC _26": {
      type: "country_specific",
      issues: [
        {
          field: "action_vietnam_eur1",
          expected:
            "Original EUR1 Movement Certificate required for Vietnam origin shipments",
          actual:
            "Vietnam origin shipment requires an original EUR1 Movement Certificate, but none was found.",
          severity: "error",
          rule: "EUR1 required for Vietnam origin",
          relatedDocName: "Supporting Documents.pdf",
        },
        {
          field: "action_transport_signed",
          expected: "Transport document must be an original without watermarks",
          actual:
            "FCR contains a large background watermark \'COPY\'; transport document must be an ORIGINAL.",
          severity: "error",
          rule: "Transport document must be original",
          relatedDocName: "Transport Document.pdf",
          highlight: { page: 1, x: 60, y: 300, w: 475, h: 240 },
        },
      ],
    },
    "2025L-508-2": {
      type: "shipment",
      issues: [
        {
          field: "index_transport_doc_present",
          expected: "Valid original transport document must be present",
          actual:
            "Transport document FCR000951944 is a COPY (watermarked), which is not acceptable as a valid original document.",
          severity: "error",
          rule: "Transport document must be original",
          relatedDocName: "Transport Document.pdf",
          highlight: { page: 1, x: 60, y: 300, w: 475, h: 240 },
        },
        {
          field: "action_purchase_contract_present",
          expected: "Purchase Contract or Order Confirmation must be present",
          actual:
            "Purchase Contract/Order Confirmation not found in Supporting Documents, Transport Document, or Export Declaration files.",
          severity: "error",
          rule: "Missing Purchase Contract",
          relatedDocName: "Supporting Documents.pdf",
        },
        {
          field: "action_transport_doc_present",
          expected: "Original transport document must be uploaded",
          actual:
            "Transport document is a non-original copy (watermarked); please upload the original FCR.",
          severity: "error",
          rule: "Transport document is a copy",
          relatedDocName: "Transport Document.pdf",
          highlight: { page: 1, x: 60, y: 300, w: 475, h: 240 },
        },
      ],
    },
    "20260619": {
      type: "invoice",
      issues: [
        {
          field: "action_total_amount_match",
          expected: "Invoice numeric total must match written total amount",
          actual:
            "Invoice numeric total $15,157.44 does not match written total string \'FIFTY THOUSAND...\' ($50,000).",
          severity: "error",
          rule: "Invoice total mismatch",
          relatedDocName: "Vendor Invoice.pdf",
          highlight: { page: 1, x: 450, y: 580, w: 110, h: 35 },
        },
        {
          field: "action_transport_signed",
          expected: "Transport document must be an original without watermarks",
          actual:
            "FCR is a DRAFT copy (background watermark) and the signature area is blank.",
          severity: "error",
          rule: "Transport document must be original",
          relatedDocName: "Transport Document.pdf",
          highlight: { page: 1, x: 60, y: 300, w: 475, h: 240 },
        },
      ],
    },
    "20260620": {
      type: "transport",
      issues: [
        {
          field: "action_transport_signed",
          expected: "Transport document must be an original without watermarks",
          actual:
            "FCR has prominent D-R-A-F-T background watermark and blank authorization line.",
          severity: "error",
          rule: "Transport document must be original",
          relatedDocName: "Transport Document.pdf",
          highlight: { page: 1, x: 60, y: 300, w: 475, h: 240 },
        },
      ],
    },
    "2026KH0149": {
      type: "invoice",
      issues: [
        {
          field: "action_incoterm_match",
          expected: "Invoice incoterm must match XTS DWPRSI_ATTRBT2 value",
          actual:
            "Invoice incoterm FCA NINGBO does not match XTS DWPRSI_ATTRBT2 value FOB.",
          severity: "error",
          rule: "Incoterm mismatch",
          relatedDocName: "Vendor Invoice.pdf",
          highlight: { page: 1, x: 370, y: 130, w: 180, h: 30 },
        },
        {
          field: "action_transport_signed",
          expected: "Transport document must be an original without watermarks",
          actual:
            "FCR is a copy due to prominent large background \'COPY\' watermark identified in the center.",
          severity: "error",
          rule: "Transport document must be original",
          relatedDocName: "Transport Document.pdf",
          highlight: { page: 1, x: 60, y: 300, w: 475, h: 240 },
        },
      ],
    },
    "2026VN28052": {
      type: "invoice",
      issues: [
        {
          field: "action_gross_weight_match",
          expected:
            "Gross weight must match across shipbill, FCR, PL, and EUR1",
          actual:
            "Shipbill GW: 8331.84 does not match FCR/PL/EUR1 GW: 9331.84.",
          severity: "error",
          rule: "Gross weight mismatch",
          relatedDocName: "Delivery Note.pdf",
          highlight: { page: 1, x: 470, y: 430, w: 100, h: 35 },
        },
      ],
    },
    "25E7488": {
      type: "country_specific",
      issues: [
        {
          field: "action_vietnam_eur1",
          expected: "EUR1 Box 8/10 must reference the correct PO and SKU",
          actual:
            "EUR1 Box 8/10 shows shipment ref 4401031062 instead of PO A250008204 and SKU 3211541.",
          severity: "error",
          rule: "EUR1 reference mismatch",
          relatedDocName: "Vendor Invoice.pdf",
          highlight: { page: 1, x: 15, y: 270, w: 230, h: 20 },
        },
      ],
    },
    "2629HK0190508": {
      type: "shipment",
      issues: [
        {
          field: "index_transport_doc_present",
          expected:
            "Transport document (FCR/B/L) must be present in uploaded files",
          actual:
            "Transport document (FCR/B/L) is missing from the uploaded files.",
          severity: "error",
          rule: "Missing Transport Document",
          relatedDocName: "Supporting Documents.pdf",
        },
        {
          field: "action_poland_sad",
          expected: "SAD/Export Declaration required for Poland destination",
          actual:
            "SAD/Export Declaration for Poland destination is missing from all uploaded files.",
          severity: "error",
          rule: "Missing SAD for Poland",
          relatedDocName: "Supporting Documents.pdf",
        },
      ],
    },
    "2629HK0190652": {
      type: "shipment",
      issues: [
        {
          field: "index_transport_doc_present",
          expected: "Transport Document (FCR, B/L, or AWB) must be present",
          actual:
            "Transport Document (FCR, B/L, or AWB) was not found in the uploaded files.",
          severity: "error",
          rule: "Missing Transport Document",
          relatedDocName: "Supporting Documents.pdf",
        },
        {
          field: "action_purchase_contract_present",
          expected: "Purchase Contract or Order Confirmation must be present",
          actual:
            "Purchase Contract or Order Confirmation was not found in the uploaded documents.",
          severity: "error",
          rule: "Missing Purchase Contract",
          relatedDocName: "Supporting Documents.pdf",
        },
        {
          field: "action_vat_destination_match",
          expected: "Invoice VAT must match destination country VAT",
          actual:
            "Invoice VAT PL5263217969 (Poland) does not match destination France VAT FR03813041969.",
          severity: "error",
          rule: "VAT destination mismatch",
          relatedDocName: "Vendor Invoice.pdf",
          highlight: { page: 1, x: 280, y: 180, w: 220, h: 80 },
        },
        {
          field: "action_consignee_match",
          expected: "Invoice Sold To must match destination country entity",
          actual:
            "Invoice Sold To Action (PL) does not match destination France entity; FCR missing.",
          severity: "error",
          rule: "Consignee mismatch",
          relatedDocName: "Vendor Invoice.pdf",
          highlight: { page: 1, x: 280, y: 180, w: 220, h: 80 },
        },
        {
          field: "action_notify_party_match",
          expected: "Invoice Sold To must match destination country",
          actual:
            "Invoice Sold To specifies Poland entity (PL) while destination is France.",
          severity: "error",
          rule: "Notify party mismatch",
          relatedDocName: "Vendor Invoice.pdf",
          highlight: { page: 1, x: 280, y: 180, w: 220, h: 80 },
        },
        {
          field: "action_invoice_number_match",
          expected: "Invoice number must match shipbill number",
          actual:
            "Invoice No: 2629HK0190562 does not match Shipbill No: 2629HK0190652.",
          severity: "error",
          rule: "Invoice number mismatch",
          relatedDocName: "Vendor Invoice.pdf",
          highlight: { page: 1, x: 270, y: 80, w: 140, h: 50 },
        },
      ],
    },
    A25000573811: {
      type: "invoice",
      issues: [
        {
          field: "action_carton_count_match",
          expected:
            "Carton count must match across body, FCR, and Packing List",
          actual:
            "Body cartons: 494 matches FCR: 494, but mismatches Packing List summary total: 492.",
          severity: "error",
          rule: "Carton count mismatch",
          relatedDocName: "Vendor Invoice.pdf",
          highlight: { page: 1, x: 330, y: 380, w: 150, h: 30 },
        },
        {
          field: "action_final_ports_match",
          expected: "Shipbill destination must match FCR place of delivery",
          actual:
            "Shipbill destination: TILBURG conflicts with FCR place of delivery: Zwaagdijk.",
          severity: "error",
          rule: "Final destination mismatch",
          relatedDocName: "Transport Document.pdf",
          highlight: { page: 1, x: 150, y: 300, w: 120, h: 30 },
        },
      ],
    },
    "A70AG2500752-1": {
      type: "invoice",
      issues: [
        {
          field: "action_invoice_number_match",
          expected: "Invoice number must match shipbill number",
          actual:
            "Extracted Invoice No: A70AG2600752-1 does not match Shipbill No: A70AG2500752-1.",
          severity: "error",
          rule: "Invoice number mismatch",
          relatedDocName: "Vendor Invoice.pdf",
          highlight: { page: 1, x: 50, y: 100, w: 150, h: 20 },
        },
      ],
    },
    "24THS-8962 & 8963-27": {
      type: "country_specific",
      issues: [
        {
          field: "action_fsc_validation",
          expected: "FSC claims must be authorized in XTS DWPRMS_ATTRBT fields",
          actual:
            "Unauthorized FSC Claim: Documents mention \'FSC color label\' for items 3004367 and 3013529, but XTS DWPRMS_ATTRBT fields do not contain FSC keywords.",
          severity: "error",
          rule: "Unauthorized FSC claim",
          relatedDocName: "ASN.pdf",
          highlight: { page: 1, x: 220, y: 510, w: 220, h: 20 },
        },
      ],
    },
    "600318472": {
      type: "invoice",
      issues: [
        {
          field: "action_po_number_match",
          expected: "Body PO must appear on Invoice and Packing List",
          actual:
            "Body PO: A240025725 is missing from Invoice and Packing List, which list Shipment Ref: 4400929480 in the PO field.",
          severity: "error",
          rule: "PO number mismatch",
          relatedDocName: "Vendor Invoice.pdf",
          highlight: { page: 1, x: 250, y: 100, w: 200, h: 20 },
        },
      ],
    },
    IH12026000000498: {
      type: "country_specific",
      issues: [
        {
          field: "action_turkey_atr",
          expected: "ATR invoice reference must match shipbill number exactly",
          actual:
            "ATR invoice reference IH112026000000498 (17 chars) mismatches Shipbill No IH12026000000498 (16 chars); on-board date is also missing.",
          severity: "error",
          rule: "ATR reference mismatch",
          relatedDocName: "ATR.pdf",
          highlight: { page: 1, x: 120, y: 520, w: 200, h: 20 },
        },
      ],
    },
    "YC26-N045": {
      type: "transport",
      issues: [
        {
          field: "action_container_number_match",
          expected:
            "Container number must match between Packing List and Shipbill/FCR",
          actual:
            "Packing List container TGBU8052449 does not match Shipbill/FCR container HAMU2049447.",
          severity: "error",
          rule: "Container number mismatch",
          relatedDocName: "Transport Document.pdf",
          highlight: { page: 1, x: 50, y: 350, w: 300, h: 30 },
        },
      ],
    },
    "YWJX25-11030080": {
      type: "invoice",
      issues: [
        {
          field: "action_gross_weight_match",
          expected: "Gross weight must match between PL and FCR",
          actual:
            "PL Gross Weight 9436.02 does not match FCR Gross Weight 9492.12.",
          severity: "error",
          rule: "Gross weight mismatch",
          relatedDocName: "Vendor Invoice.pdf",
          highlight: { page: 1, x: 300, y: 550, w: 250, h: 35 },
        },
        {
          field: "action_cbm_match",
          expected: "CBM must match between Shipbill/PL and FCR",
          actual: "Shipbill/PL CBM 23.03 does not match FCR CBM 23.994.",
          severity: "error",
          rule: "CBM mismatch",
          relatedDocName: "Vendor Invoice.pdf",
          highlight: { page: 1, x: 300, y: 550, w: 250, h: 35 },
        },
      ],
    },
    CI_01134_2025: {
      type: "invoice",
      issues: [
        {
          field: "action_agent_nonfood",
          expected:
            "Invoice Buying Agent statement must include \'as buying agent\' phrase",
          actual:
            "Invoice Buying Agent statement \'Li & Fung (Trading) Ltd for and on behalf of Action...\' is missing the required \'as buying agent\' phrase.",
          severity: "error",
          rule: "Agent wording missing required phrase",
          relatedDocName: "Vendor Invoice.pdf",
          highlight: { page: 1, x: 50, y: 750, w: 400, h: 40 },
        },
      ],
    },
    "OST251020-33": {
      type: "invoice",
      issues: [
        {
          field: "action_vat_destination_match",
          expected: "Invoice must include French VAT for France destination",
          actual:
            "Invoice missing French VAT FR03813041969 for destination Saint Martin de Crau.",
          severity: "error",
          rule: "VAT destination mismatch",
          relatedDocName: "Vendor Invoice.pdf",
          highlight: { page: 1, x: 300, y: 150, w: 250, h: 30 },
        },
        {
          field: "action_transport_signed",
          expected: "Transport document must be an original without watermarks",
          actual:
            "FCR contains a prominent \'COPY\' watermark; document is not an original.",
          severity: "error",
          rule: "Transport document must be original",
          relatedDocName: "Transport Document.pdf",
          highlight: { page: 1, x: 60, y: 300, w: 475, h: 240 },
        },
        {
          field: "action_final_ports_match",
          expected: "Body final destination must match FCR Place of Delivery",
          actual:
            "Body final destination QINGDAO conflicts with FCR Place of Delivery Saint Martin de Crau.",
          severity: "error",
          rule: "Final destination mismatch",
          relatedDocName: "Transport Document.pdf",
          highlight: { page: 1, x: 50, y: 250, w: 300, h: 30 },
        },
      ],
    },
    "ACL-25-26-830": {
      type: "invoice",
      issues: [
        {
          field: "aeo_invoice_number_match",
          expected:
            "Shipbill number must match Invoice number or Vendor Reference",
          actual:
            "Shipbill No: ACL-25-26-830 does not match Invoice No: 4686384 or Vendor Reference No: ACL2526830.",
          severity: "error",
          rule: "Invoice number mismatch",
          relatedDocName: "Vendor Invoice.pdf",
          highlight: { page: 1, x: 50, y: 100, w: 250, h: 30 },
        },
      ],
    },
    AEOSKG260342: {
      type: "country_specific",
      issues: [
        {
          field: "aeo_usa_country_declaration",
          expected:
            "Single/Multi Country Declaration required for apparel shipments",
          actual:
            "Apparel shipment (AEOI); Single/Multi Country Declaration is missing.",
          severity: "error",
          rule: "Missing country declaration for apparel",
          relatedDocName: "Supporting Documents.pdf",
        },
      ],
    },
  };

  return orderedRefs.map((entry, i) => {
    const id = `sb_${i + 1}`;
    if (entry.failed && failedResults[entry.ref]) {
      const fr = failedResults[entry.ref];
      return {
        documentId: id,
        documentName: entry.ref,
        documentType: fr.type,
        shipbillRef: entry.ref,
        status: "fail" as const,
        issues: fr.issues,
      };
    }
    return {
      documentId: id,
      documentName: entry.ref,
      documentType: "invoice" as const,
      shipbillRef: entry.ref,
      status: "pass" as const,
      issues: [],
    };
  });
}
