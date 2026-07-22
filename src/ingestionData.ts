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
  const base = process.env.PUBLIC_URL || "";
  return pdfs.map((pdfName, j) => ({
    id: `${prefix}_${j + 1}`,
    name: pdfName,
    type: docTypeMap[pdfName] || ("shipment" as const),
    pdfPath: `${base}/documents/${ref}/${pdfName}`,
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
          field: "vietnam_eur1_present",
          expected:
            "Original EUR1 Movement Certificate required for Vietnam origin shipments",
          actual:
            "Vietnam origin shipment requires an original EUR1 Movement Certificate, but none was found in the file.",
          severity: "error",
          rule: "EUR1 required for Vietnam origin",
          relatedDocName: "Supporting Documents.pdf",
        },
        {
          field: "transport_original",
          expected: "Transport document must be an original without watermarks",
          actual:
            "FCR carries a large background 'COPY' watermark; the transport document must be an ORIGINAL.",
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
          field: "transport_original",
          expected: "Valid original transport document must be present",
          actual:
            "Transport document is a COPY (background watermark) and is not acceptable as a valid original.",
          severity: "error",
          rule: "Transport document must be original",
          relatedDocName: "Transport Document.pdf",
          highlight: { page: 1, x: 60, y: 300, w: 475, h: 240 },
        },
        {
          field: "purchase_contract_present",
          expected: "Purchase Contract or Order Confirmation must be present",
          actual:
            "Purchase Contract / Order Confirmation was not found in the Supporting Documents.",
          severity: "error",
          rule: "Missing Purchase Contract",
          relatedDocName: "Supporting Documents.pdf",
        },
      ],
    },
    "20260619": {
      type: "invoice",
      issues: [
        {
          field: "total_amount_match",
          expected: "Invoice numeric total must match the written total amount",
          actual:
            "Invoice numeric total USD 15,157.44 does not match the written total 'FIFTY THOUSAND US DOLLARS'.",
          severity: "error",
          rule: "Invoice total mismatch",
          relatedDocName: "Vendor Invoice.pdf",
          highlight: { page: 1, x: 355, y: 491, w: 205, h: 18 },
        },
        {
          field: "transport_original",
          expected: "Transport document must be an original without watermarks",
          actual:
            "FCR is a DRAFT copy (background watermark) and the signature line is blank.",
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
          field: "transport_original",
          expected: "Transport document must be an original without watermarks",
          actual:
            "FCR has a prominent DRAFT background watermark and a blank authorisation line.",
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
          field: "incoterm_match",
          expected: "Invoice incoterm must match the shipment record incoterm (FOB)",
          actual:
            "Invoice incoterm 'FCA NINGBO' does not match the shipment record incoterm 'FOB'.",
          severity: "error",
          rule: "Incoterm mismatch",
          relatedDocName: "Vendor Invoice.pdf",
          highlight: { page: 1, x: 315, y: 80, w: 235, h: 20 },
        },
        {
          field: "transport_original",
          expected: "Transport document must be an original without watermarks",
          actual:
            "FCR carries a large background 'COPY' watermark and is not an original.",
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
          field: "gross_weight_match",
          expected:
            "Gross weight must match across the Delivery Note, Invoice and FCR",
          actual:
            "Delivery Note gross weight 8,331.84 KG does not match Invoice/FCR gross weight 3,120.50 KG.",
          severity: "error",
          rule: "Gross weight mismatch",
          relatedDocName: "Delivery Note.pdf",
          highlight: { page: 1, x: 295, y: 426, w: 180, h: 16 },
        },
      ],
    },
    "25E7488": {
      type: "country_specific",
      issues: [
        {
          field: "shipment_reference_match",
          expected: "Invoice shipment reference must match the PO for this shipbill",
          actual:
            "Invoice shipment reference 4401031062 does not match PO A250010045; EUR1 preference reference cannot be validated.",
          severity: "error",
          rule: "Shipment reference mismatch",
          relatedDocName: "Vendor Invoice.pdf",
          highlight: { page: 1, x: 40, y: 278, w: 320, h: 16 },
        },
      ],
    },
    "2629HK0190508": {
      type: "shipment",
      issues: [
        {
          field: "transport_doc_present",
          expected:
            "Transport document (FCR / B/L) must be present in the uploaded files",
          actual:
            "Transport document (FCR / B/L) is missing from the uploaded files.",
          severity: "error",
          rule: "Missing Transport Document",
          relatedDocName: "Supporting Documents.pdf",
        },
        {
          field: "poland_sad_present",
          expected: "SAD / Export Declaration required for Poland destination",
          actual:
            "SAD / Export Declaration for the Poland destination is missing from all uploaded files.",
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
          field: "invoice_number_match",
          expected: "Invoice number must match the shipbill number",
          actual:
            "Invoice No 2629HK0190562 does not match Shipbill No 2629HK0190652.",
          severity: "error",
          rule: "Invoice number mismatch",
          relatedDocName: "Vendor Invoice.pdf",
          highlight: { page: 1, x: 40, y: 80, w: 240, h: 20 },
        },
        {
          field: "vat_destination_match",
          expected: "Invoice VAT must match the destination country",
          actual:
            "Invoice VAT PL5261234567 (Poland) does not match the destination France; buyer entity is in the Netherlands.",
          severity: "error",
          rule: "VAT / destination mismatch",
          relatedDocName: "Vendor Invoice.pdf",
          highlight: { page: 1, x: 305, y: 150, w: 250, h: 98 },
        },
        {
          field: "transport_doc_present",
          expected: "Transport Document (FCR, B/L, or AWB) must be present",
          actual:
            "Transport Document (FCR, B/L, or AWB) was not found in the uploaded files.",
          severity: "error",
          rule: "Missing Transport Document",
          relatedDocName: "Supporting Documents.pdf",
        },
      ],
    },
    A25000573811: {
      type: "invoice",
      issues: [
        {
          field: "carton_count_match",
          expected:
            "Carton count must match across the Invoice, Packing List, and FCR",
          actual:
            "Invoice carton total 492 does not match the Packing List / FCR carton count 684.",
          severity: "error",
          rule: "Carton count mismatch",
          relatedDocName: "Vendor Invoice.pdf",
          highlight: { page: 1, x: 315, y: 430, w: 180, h: 16 },
        },
        {
          field: "final_destination_match",
          expected: "Shipbill destination must match the FCR place of delivery",
          actual:
            "Invoice destination Tilburg conflicts with FCR place of delivery Venlo.",
          severity: "error",
          rule: "Final destination mismatch",
          relatedDocName: "Transport Document.pdf",
          highlight: { page: 1, x: 300, y: 586, w: 255, h: 16 },
        },
      ],
    },
    "A70AG2500752-1": {
      type: "invoice",
      issues: [
        {
          field: "invoice_number_match",
          expected: "Invoice number must match the shipbill number",
          actual:
            "Extracted Invoice No A70AG2600752-1 does not match Shipbill No A70AG2500752-1.",
          severity: "error",
          rule: "Invoice number mismatch",
          relatedDocName: "Vendor Invoice.pdf",
          highlight: { page: 1, x: 40, y: 80, w: 240, h: 20 },
        },
      ],
    },
    "24THS-8962 & 8963-27": {
      type: "country_specific",
      issues: [
        {
          field: "fsc_claim_authorized",
          expected: "FSC claims must be authorised in the shipment attributes",
          actual:
            "Unauthorised FSC claim: ASN declares an FSC-certified colour label for items 3004367 and 3013529, but the shipment attributes contain no FSC authorisation.",
          severity: "error",
          rule: "Unauthorised FSC claim",
          relatedDocName: "ASN.pdf",
          highlight: { page: 1, x: 40, y: 506, w: 430, h: 16 },
        },
      ],
    },
    "600318472": {
      type: "invoice",
      issues: [
        {
          field: "po_number_match",
          expected: "The shipbill PO must appear on the Invoice and Packing List",
          actual:
            "Shipbill PO A250010810 is missing from the Invoice, which lists shipment reference 4400929480 in the PO field.",
          severity: "error",
          rule: "PO number mismatch",
          relatedDocName: "Vendor Invoice.pdf",
          highlight: { page: 1, x: 40, y: 262, w: 320, h: 16 },
        },
      ],
    },
    IH12026000000498: {
      type: "country_specific",
      issues: [
        {
          field: "turkey_atr_reference",
          expected: "ATR invoice reference must match the shipbill number exactly",
          actual:
            "ATR reference IH112026000000498 (17 chars) does not match Shipbill No IH12026000000498 (16 chars); on-board date is also missing.",
          severity: "error",
          rule: "ATR reference mismatch",
          relatedDocName: "ATR.pdf",
          highlight: { page: 1, x: 40, y: 506, w: 300, h: 16 },
        },
      ],
    },
    "YC26-N045": {
      type: "transport",
      issues: [
        {
          field: "container_number_match",
          expected:
            "Container number must match between the FCR and Packing List",
          actual:
            "FCR container TGBU8052449 does not match Packing List container HAMU2049447.",
          severity: "error",
          rule: "Container number mismatch",
          relatedDocName: "Transport Document.pdf",
          highlight: { page: 1, x: 40, y: 626, w: 270, h: 16 },
        },
      ],
    },
    "YWJX25-11030080": {
      type: "invoice",
      issues: [
        {
          field: "gross_weight_match",
          expected: "Gross weight must match between the Invoice/PL and FCR",
          actual:
            "Invoice / Packing List gross weight 9,436.02 KG does not match FCR gross weight 9,492.12 KG.",
          severity: "error",
          rule: "Gross weight mismatch",
          relatedDocName: "Vendor Invoice.pdf",
          highlight: { page: 1, x: 295, y: 466, w: 265, h: 16 },
        },
        {
          field: "cbm_match",
          expected: "CBM must match between the Invoice/PL and FCR",
          actual: "Invoice / Packing List CBM 23.030 does not match FCR CBM 23.994.",
          severity: "error",
          rule: "CBM mismatch",
          relatedDocName: "Vendor Invoice.pdf",
          highlight: { page: 1, x: 295, y: 466, w: 265, h: 16 },
        },
      ],
    },
    CI_01134_2025: {
      type: "invoice",
      issues: [
        {
          field: "agent_statement_wording",
          expected:
            "Invoice buying-agent statement must include the phrase 'as buying agent'",
          actual:
            "Invoice buying-agent statement 'Meridian Sourcing Ltd. for and on behalf of Harbor & Vale Retail B.V.' is missing the required 'as buying agent' phrase.",
          severity: "error",
          rule: "Agent wording missing required phrase",
          relatedDocName: "Vendor Invoice.pdf",
          highlight: { page: 1, x: 40, y: 774, w: 510, h: 18 },
        },
      ],
    },
    "OST251020-33": {
      type: "invoice",
      issues: [
        {
          field: "vat_destination_match",
          expected: "Invoice must include a French VAT for the France destination",
          actual:
            "Invoice is missing a French VAT for the destination Marseille, France (VAT field not provided).",
          severity: "error",
          rule: "VAT destination mismatch",
          relatedDocName: "Vendor Invoice.pdf",
          highlight: { page: 1, x: 305, y: 150, w: 250, h: 98 },
        },
        {
          field: "transport_original",
          expected: "Transport document must be an original without watermarks",
          actual:
            "FCR carries a prominent 'COPY' watermark; the document is not an original.",
          severity: "error",
          rule: "Transport document must be original",
          relatedDocName: "Transport Document.pdf",
          highlight: { page: 1, x: 60, y: 300, w: 475, h: 240 },
        },
        {
          field: "final_destination_match",
          expected: "Invoice final destination must match the FCR place of delivery",
          actual:
            "Invoice final destination Marseille conflicts with FCR place of delivery Saint Martin de Crau.",
          severity: "error",
          rule: "Final destination mismatch",
          relatedDocName: "Transport Document.pdf",
          highlight: { page: 1, x: 300, y: 586, w: 255, h: 16 },
        },
      ],
    },
    "ACL-25-26-830": {
      type: "invoice",
      issues: [
        {
          field: "invoice_number_match",
          expected:
            "Shipbill number must match the Invoice number or Vendor Reference",
          actual:
            "Shipbill No ACL-25-26-830 does not match Invoice No 4686384 or Vendor Reference ACL2526830.",
          severity: "error",
          rule: "Invoice number mismatch",
          relatedDocName: "Vendor Invoice.pdf",
          highlight: { page: 1, x: 40, y: 80, w: 240, h: 20 },
        },
      ],
    },
    AEOSKG260342: {
      type: "country_specific",
      issues: [
        {
          field: "usa_country_declaration",
          expected:
            "Single / Multi Country Declaration required for apparel shipments",
          actual:
            "Apparel shipment to the USA; the Single / Multi Country Declaration is missing.",
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
