// VTTV Vassiliko Terminal Data
// Source: VTTV Jetty Overview v8 (Official Documentation)

export interface BerthInfo {
  id: number;
  name: string;
  deadweightMin: number;
  deadweightMax: number;
  maxDraft: number;
  loaMin: number;
  loaMax: number;
  berthingSide: 'Port' | 'Starboard';
  loadingArms: string;
  coordinates: {
    lat: string;
    lon: string;
  };
  products: string[];
}

export interface EmergencyContact {
  service: string;
  phone: string;
  alternative?: string;
}

export interface DocumentRequirement {
  document: string;
  description?: string;
}

export interface VTTVTerminalData {
  operator: {
    name: string;
    address: string;
    portCode: string;
    phone: string;
    fax: string;
    email: string;
    website: string;
  };
  operations: {
    hours: string;
    jettyFormation: string;
    berthCount: number;
    ispsCompliant: boolean;
    bottomType: string;
    airDraftRestrictions: boolean;
    daylightRestrictions: boolean;
  };
  products: {
    shoreTanks: string[];
    stsTransfers: string[];
  };
  berths: BerthInfo[];
  technicalSpecs: {
    channelDraft: number;
    waterDensity: number;
    loadingArmFlange: string;
    piggingFacilities: string;
    berthsWithPigging: number[];
    emptyingMethod: string;
  };
  vhfChannels: number[];
  emergencyContacts: EmergencyContact[];
  preArrivalRequirements: string[];
  solasRequirements: string[];
  loadingDocuments: DocumentRequirement[];
  dischargeDocuments: DocumentRequirement[];
  restrictions: string[];
  notes: string[];
}

export const vttvTerminalData: VTTVTerminalData = {
  operator: {
    name: "VTT Vasiliko Ltd",
    address: "75 Mari, 7736, Larnaca, Cyprus",
    portCode: "CYZYY-0003",
    phone: "+357 24257500",
    fax: "+357 24333299",
    email: "customerservice@vttv.vtti.com",
    website: "www.vtti.com"
  },
  operations: {
    hours: "24 hours a day, 365 days a year",
    jettyFormation: "Single 'T' formation jetty",
    berthCount: 4,
    ispsCompliant: true,
    bottomType: "Sandy bottom",
    airDraftRestrictions: false,
    daylightRestrictions: false
  },
  products: {
    shoreTanks: [
      "Clean products only"
    ],
    stsTransfers: [
      "Clean products",
      "Dirty products (fuel oil/crude)"
    ]
  },
  berths: [
    {
      id: 1,
      name: "Berth 1",
      deadweightMin: 20000,
      deadweightMax: 160000,
      maxDraft: 17,
      loaMin: 180,
      loaMax: 280,
      berthingSide: "Starboard",
      loadingArms: "2x clean + 2x fuel oil",
      coordinates: {
        lat: "N 34.707469",
        lon: "E 33.319983"
      },
      products: ["Clean", "Fuel Oil", "Crude"]
    },
    {
      id: 2,
      name: "Berth 2",
      deadweightMin: 20000,
      deadweightMax: 120000,
      maxDraft: 16,
      loaMin: 162,
      loaMax: 260,
      berthingSide: "Port",
      loadingArms: "2x clean + 2x fuel oil",
      coordinates: {
        lat: "N 34.707787",
        lon: "E 33.319645"
      },
      products: ["Clean", "Fuel Oil", "Crude"]
    },
    {
      id: 3,
      name: "Berth 3",
      deadweightMin: 10000,
      deadweightMax: 50000,
      maxDraft: 13,
      loaMin: 135,
      loaMax: 216,
      berthingSide: "Port",
      loadingArms: "3x clean (with pigging)",
      coordinates: {
        lat: "N 34.710014",
        lon: "E 33.323454"
      },
      products: ["Clean"]
    },
    {
      id: 4,
      name: "Berth 4",
      deadweightMin: 5000,
      deadweightMax: 50000,
      maxDraft: 13,
      loaMin: 50,
      loaMax: 216,
      berthingSide: "Starboard",
      loadingArms: "3x clean (with pigging)",
      coordinates: {
        lat: "N 34.710336",
        lon: "E 33.322960"
      },
      products: ["Clean"]
    }
  ],
  technicalSpecs: {
    channelDraft: 30,
    waterDensity: 1025,
    loadingArmFlange: "12\" ASME B16.5 Class 150# raised face",
    piggingFacilities: "Nitrogen purged pigging facilities",
    berthsWithPigging: [3, 4],
    emptyingMethod: "Low drain points with portable pumps (Berths 1 & 2)"
  },
  vhfChannels: [9, 16],
  emergencyContacts: [
    {
      service: "EMERGENCY",
      phone: "+357 24257655",
      alternative: "+357 24257640"
    },
    {
      service: "ISPS Officer (PFSO)",
      phone: "+357 99221260",
      alternative: "+357 24257640"
    },
    {
      service: "Cargo Control Room",
      phone: "+357 24257640"
    },
    {
      service: "Cyprus Ports Authority",
      phone: "+357 25207225",
      alternative: "+357 25207182"
    },
    {
      service: "VTS (Towage/Pilotage)",
      phone: "+357 24258600",
      alternative: "+357 96972900"
    },
    {
      service: "Customs Office",
      phone: "+357 24801440"
    },
    {
      service: "Meteorological Station",
      phone: "+357 24802977",
      alternative: "+357 24304753"
    }
  ],
  preArrivalRequirements: [
    "Import manifest in Thyseas Customs & Excise Electronic Systems",
    "Declare vessel arrival in PCS system (Cyprus Ports Authority)",
    "Declaration to Department of Merchant Shipping",
    "Declare vessel arrival in Vessel Traffic System"
  ],
  solasRequirements: [
    "Vessels with Inert Gas Systems must arrive with cargo tanks fully inerted",
    "Inert Gas System must be maintained during cargo operations",
    "Cargo tank atmosphere must be kept below 8% oxygen during loading",
    "IG plant must be continuously monitored with alarms"
  ],
  loadingDocuments: [
    { document: "Product value (Commercial Invoice)", description: "Required for cargo valuation" },
    { document: "Copy of documentary instructions", description: "From cargo owner/charterer" },
    { document: "Customs/Excise warehouse number", description: "For EU destinations" },
    { document: "Bill of Lading (B/L)", description: "On completion" },
    { document: "Certificate of Analysis/Quality (COA/Q)", description: "On completion" },
    { document: "Certificate of Origin (COO)", description: "On completion" },
    { document: "Surveyor's documents", description: "On completion" }
  ],
  dischargeDocuments: [
    { document: "Delivery Order", description: "3 original copies required" },
    { document: "Bill of Lading (B/L)", description: "Original or copy" },
    { document: "Material Safety Data Sheet (MSDS)", description: "For cargo" },
    { document: "Certificate of Analysis/Quality (COA/Q)", description: "From loading port" },
    { document: "Certificate of Origin (COO)", description: "From loading port" },
    { document: "Cargo/Commercial Document (AAD/e-AD)", description: "Administrative Accompanying Document" },
    { document: "Surveyor's documents", description: "On completion" }
  ],
  restrictions: [
    "No bunkers alongside jetty",
    "No fresh water supply alongside jetty",
    "No slop/sludge reception alongside jetty",
    "Crew not permitted to leave vessel via shore side",
    "Vessels with hull protrusions may be rejected",
    "Minimum 4m² deck space required for gangway",
    "MARPOL regulations for Mediterranean Sea apply"
  ],
  notes: [
    "All berths have sandy bottom",
    "No air draft restrictions",
    "No daylight restrictions",
    "Terminal is ISPS Code compliant",
    "24/7/365 operations"
  ]
};

// Utility functions
export const getMaxDWT = (): number => {
  return Math.max(...vttvTerminalData.berths.map(b => b.deadweightMax));
};

export const getMaxDraft = (): number => {
  return Math.max(...vttvTerminalData.berths.map(b => b.maxDraft));
};

export const getBerthCount = (): number => {
  return vttvTerminalData.berths.length;
};

export const getMaxLOA = (): number => {
  return Math.max(...vttvTerminalData.berths.map(b => b.loaMax));
};
