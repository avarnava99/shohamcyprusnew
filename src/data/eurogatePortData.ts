// Eurogate Container Terminal Limassol - Terminal Information
// Source: Eurogate Introduction Presentation & 2024/2025 Industry Data

export interface EurogateQuayInfo {
  name: string;
  length: string;
  depth: string;
  gantryCranes: number;
  notes?: string;
}

export interface STSCraneInfo {
  type: string;
  qty: number;
  outreach: string;
  heightUnderSpreader: string;
  manufacturer?: string;
}

export interface YardEquipmentItem {
  type: string;
  manufacturer: string;
  qty: number;
  capacity?: string;
}

export interface EDIInterface {
  function: string;
  format: string;
  direction: "Import" | "Export" | "Both";
}

export interface OperatingShift {
  name: string;
  hours: string;
  notes?: string;
}

export interface ServiceCategory {
  category: string;
  items: string[];
}

export interface EurogatePortData {
  operator: string;
  operatorShort: string;
  shareholders: { name: string; percentage: number }[];
  concessionInfo: string;
  operationsStart: string;
  unLocationCode: string;
  website: string;
  email: string;
  phone: string;
  
  terminalArea: {
    total: string;
    totalSqm: number;
    stackingYard: string;
    stackingYardSqm: number;
    reeferPlugs: number;
    yardCapacityTEU: number;
    groundSlots: number;
  };
  
  annualCapacity: string;
  
  quays: EurogateQuayInfo[];
  totalQuayLength: string;
  maxDraft: string;
  
  stsCranes: STSCraneInfo[];
  totalSTSCranes: number;
  
  yardEquipment: YardEquipmentItem[];
  
  operatingHours: {
    quayside: string;
    gate: {
      weekdays: string;
      saturday: string;
      sunday: string;
    };
    closedDays: string[];
  };
  
  shifts: OperatingShift[];
  
  services: ServiceCategory[];
  
  storageInfo: {
    customsBonded: string;
    freeDays: number;
    reeferMonitoring: string;
  };
  
  imdgHandling: {
    accepted: string[];
    excluded: string[];
  };
  
  ediInterfaces: EDIInterface[];
  
  portCommunitySystem: string;
  webPortal: string;
  
  contacts: {
    general: string;
    operations: string;
    commercial: string;
    website: string;
  };
  
  certifications: string[];
}

export const eurogatePortData: EurogatePortData = {
  operator: "EUROGATE Container Terminal Limassol Ltd.",
  operatorShort: "CTL",
  shareholders: [
    { name: "EUROGATE International GmbH", percentage: 60 },
    { name: "Interorient Navigation Company Ltd", percentage: 20 },
    { name: "East Med Holdings SA", percentage: 20 }
  ],
  concessionInfo: "25-year concession with 12-year extension option from 2017",
  operationsStart: "October 2016",
  unLocationCode: "CYLMS",
  website: "www.eurogate-limassol.eu",
  email: "info@eurogate-limassol.eu",
  phone: "+357 25 848 000",
  
  terminalArea: {
    total: "340,000 m²",
    totalSqm: 340000,
    stackingYard: "180,500 m²",
    stackingYardSqm: 180500,
    reeferPlugs: 140,
    yardCapacityTEU: 12000,
    groundSlots: 12000
  },
  
  annualCapacity: "~750,000 TEU",
  
  quays: [
    {
      name: "South Quay",
      length: "340m",
      depth: "14.5m",
      gantryCranes: 2,
      notes: "Original quay from 2016 opening"
    },
    {
      name: "West Quay", 
      length: "320m",
      depth: "14.5m",
      gantryCranes: 2,
      notes: "Container vessel berth"
    },
    {
      name: "New Quay (Extension)",
      length: "140m",
      depth: "16m",
      gantryCranes: 1,
      notes: "Extended capacity for larger vessels"
    }
  ],
  totalQuayLength: "800m",
  maxDraft: "16m",
  
  stsCranes: [
    {
      type: "Super Post-Panamax",
      qty: 2,
      outreach: "23 rows",
      heightUnderSpreader: "52m",
      manufacturer: "ZPMC"
    },
    {
      type: "Post-Panamax",
      qty: 2,
      outreach: "18 rows",
      heightUnderSpreader: "33m",
      manufacturer: "ZPMC"
    },
    {
      type: "Panamax",
      qty: 1,
      outreach: "13 rows",
      heightUnderSpreader: "30m",
      manufacturer: "ZPMC"
    }
  ],
  totalSTSCranes: 5,
  
  yardEquipment: [
    {
      type: "Straddle Carriers",
      manufacturer: "Kalmar/Noell",
      qty: 26,
      capacity: "40 tons"
    },
    {
      type: "Empty Container Handlers",
      manufacturer: "Kalmar",
      qty: 5,
      capacity: "9 tons"
    },
    {
      type: "Terminal Tractors",
      manufacturer: "Kalmar/Terberg",
      qty: 11,
      capacity: "70 tons"
    },
    {
      type: "Reach Stackers",
      manufacturer: "Kalmar",
      qty: 2,
      capacity: "45 tons"
    },
    {
      type: "Forklifts",
      manufacturer: "Various",
      qty: 8,
      capacity: "2.5-16 tons"
    }
  ],
  
  operatingHours: {
    quayside: "24/7",
    gate: {
      weekdays: "Monday - Friday: 07:00 - 18:00",
      saturday: "Saturday: 07:00 - 13:00 (by arrangement)",
      sunday: "Sunday: Closed"
    },
    closedDays: [
      "January 1 (New Year's Day)",
      "January 6 (Epiphany)",
      "Green Monday",
      "March 25 (Greek Independence Day)",
      "April 1 (Cyprus National Day)",
      "Good Friday",
      "Easter Sunday",
      "Easter Monday",
      "May 1 (Labour Day)",
      "Pentecost Monday",
      "August 15 (Assumption)",
      "October 1 (Cyprus Independence Day)",
      "October 28 (Ochi Day)",
      "December 25 (Christmas Day)",
      "December 26 (Boxing Day)"
    ]
  },
  
  shifts: [
    { name: "Day Shift", hours: "07:00 - 15:00", notes: "Main operating shift" },
    { name: "Afternoon Shift", hours: "15:00 - 23:00", notes: "Extended operations" },
    { name: "Night Shift", hours: "23:00 - 07:00", notes: "Vessel operations continue" }
  ],
  
  services: [
    {
      category: "Vessel Operations",
      items: [
        "Container loading and discharging",
        "Hatch cover handling",
        "Re-stows (vessel and quay)",
        "Lashing and unlashing",
        "Out of Gauge (OOG) cargo handling"
      ]
    },
    {
      category: "Truck Operations",
      items: [
        "Container loading onto trucks",
        "Container unloading from trucks",
        "Chassis handling",
        "Weigh bridge services"
      ]
    },
    {
      category: "Storage Services",
      items: [
        "Container storage (import/export)",
        "90-day customs bonded storage",
        "3 days free storage for imports",
        "5 days free storage for exports",
        "Long-term storage arrangements"
      ]
    },
    {
      category: "Reefer Services",
      items: [
        "Reefer container power supply",
        "Temperature monitoring 24/7",
        "Pre-trip inspections (PTI)",
        "140 reefer plugs available"
      ]
    },
    {
      category: "Additional Services",
      items: [
        "Container inspections",
        "Container cleaning",
        "Container repairs (minor)",
        "Customs examinations",
        "Fumigation coordination",
        "VGM (Verified Gross Mass) weighing"
      ]
    }
  ],
  
  storageInfo: {
    customsBonded: "90 days",
    freeDays: 3,
    reeferMonitoring: "24/7 automated monitoring"
  },
  
  imdgHandling: {
    accepted: [
      "Class 2 (Gases)",
      "Class 3 (Flammable Liquids)",
      "Class 4 (Flammable Solids)",
      "Class 5 (Oxidizers)",
      "Class 6 (Toxic Substances)",
      "Class 8 (Corrosives)",
      "Class 9 (Miscellaneous)"
    ],
    excluded: [
      "Class 1 (Explosives)",
      "Class 7 (Radioactive Materials)"
    ]
  },
  
  ediInterfaces: [
    { function: "Bay Plan", format: "BAPLIE", direction: "Both" },
    { function: "Loading/Discharge List", format: "COPRAR", direction: "Import" },
    { function: "Gate Moves Report", format: "COARRI", direction: "Export" },
    { function: "Container Booking", format: "COPARN", direction: "Import" },
    { function: "Release Order", format: "COREOR", direction: "Import" },
    { function: "Container Status", format: "CODECO", direction: "Both" },
    { function: "Customs Declaration", format: "CUSCAR", direction: "Export" }
  ],
  
  portCommunitySystem: "Integrated with Cyprus Port Community System",
  webPortal: "INFOGATE - Customer web portal",
  
  contacts: {
    general: "info@eurogate-limassol.eu",
    operations: "operations@eurogate-limassol.eu",
    commercial: "commercial@eurogate-limassol.eu",
    website: "www.eurogate-limassol.eu"
  },
  
  certifications: [
    "ISPS Certified",
    "ISO 9001:2015 (Quality Management)",
    "ISO 14001:2015 (Environmental Management)",
    "ISO 45001:2018 (Occupational Health & Safety)"
  ]
};

// Utility functions
export const getTotalEquipmentCount = (): number => {
  return eurogatePortData.yardEquipment.reduce((total, item) => total + item.qty, 0) + eurogatePortData.totalSTSCranes;
};

export const getTotalQuayLengthNumber = (): number => {
  return eurogatePortData.quays.reduce((total, quay) => {
    const length = parseInt(quay.length.replace('m', ''));
    return total + length;
  }, 0);
};
