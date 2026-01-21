// Vassiliko Cement Port Facility Data - April 2024
// Source: Q.D.341.2 Port Facility to Vessels Information - Welcoming Booklet

export interface VassilikoQuayInfo {
  name: string;
  length: string;
  depth: string;
  maxLOA: string;
  cargoTypes: string[];
  notes?: string;
}

export interface TugboatInfo {
  name: string;
  bpt: number;
  type: string;
}

export interface EquipmentItem {
  name: string;
  capacity: string;
  type: string;
}

export interface ContactInfo {
  role: string;
  name: string;
  tel: string;
  mobile: string;
  email: string;
  fax?: string;
}

export interface VassilikoPortData {
  operator: string;
  portCode: string;
  location: {
    latitude: string;
    longitude: string;
    description: string;
  };
  timeZone: string;
  loadLineZone: string;
  annualTraffic: {
    vessels: string;
    cargo: string;
  };
  quays: VassilikoQuayInfo[];
  totalQuayLength: string;
  maxDepth: string;
  vesselRestrictions: {
    maxDraft: string;
    maxBeam: string;
    maxLOANorth: string;
    maxLOAWest: string;
    note: string;
  };
  equipment: EquipmentItem[];
  tugboats: TugboatInfo[];
  pilotage: {
    compulsory: boolean;
    vhfChannels: string[];
    boardingPosition: {
      latitude: string;
      longitude: string;
    };
    tugsRequired: string;
    tugsAvailable: number;
  };
  anchorage: {
    location: string;
    depth: string;
  };
  navigation: {
    portDepth: string;
    approachChannel: string;
    tidalRange: string;
    waterDensity: string;
  };
  cargoTypes: {
    dryBulk: string[];
    liquid: string[];
    roRo: string;
  };
  facilities: {
    storage: string;
    warehouse: boolean;
    ballastSlop: boolean;
    ispsCompliant: boolean;
    freshWater: string;
    bunkering: string;
    repairs: string;
    drydock: boolean;
    fumigation: boolean;
    garbage: boolean;
  };
  operatingHours: {
    officeHours: string;
    portWorking: string;
    closedDays: string[];
    overtimeHolidays: string[];
  };
  nearbyFacilities: {
    hospital: string;
    airport: string;
  };
  contacts: ContactInfo[];
  vhfContact: {
    channels: string;
    tel: string;
    mobile24h: string;
  };
  emergencyContacts: {
    deputyMinistryShipping: string;
    fireDepartment: string;
    medicalService: string;
    policeImmigration: string;
    customsOfficer: string;
    emergencyNumber: string;
  };
  security: {
    level: number;
    pfso: {
      name: string;
      tel: string;
      mobile: string;
      email: string;
    };
    apfso: {
      name: string;
      tel: string;
      mobile: string;
      email: string;
    };
  };
  preArrival: {
    etaNotices: string[];
    requiredDocuments: string[];
    requiredCertificates: string[];
  };
  safetyEquipment: string[];
  regulations: {
    smoking: string;
    hotWorks: string;
    mainEngineImmobilization: string;
    ballastOverflow: string;
    gangway: string;
    pollution: string;
  };
}

export const vassilikoPortData: VassilikoPortData = {
  operator: "Vassiliko Cement Works Public Company Ltd",
  portCode: "CYZYY-0001",
  location: {
    latitude: "34° 42.00' N",
    longitude: "033° 20.00' E",
    description: "South Coast of Cyprus, 15nm East of Limassol"
  },
  timeZone: "UTC +02:00",
  loadLineZone: "Summer",
  annualTraffic: {
    vessels: "300-400 vessels",
    cargo: "1.5M - 2.5M tons"
  },
  quays: [
    {
      name: "North Quay 1",
      length: "360m (shared)",
      depth: "8.5m",
      maxLOA: "175m",
      cargoTypes: ["Cement"],
      notes: "Cement loading position"
    },
    {
      name: "North Quay 2",
      length: "360m (shared)",
      depth: "8.5m",
      maxLOA: "175m",
      cargoTypes: ["Dry Bulk"],
      notes: "Bulk cargo position"
    },
    {
      name: "North Quay 3",
      length: "360m (shared)",
      depth: "8.5m",
      maxLOA: "175m",
      cargoTypes: ["Dry Bulk"],
      notes: "Bulk cargo position"
    },
    {
      name: "West Quay",
      length: "125m",
      depth: "8.5m",
      maxLOA: "130m",
      cargoTypes: ["Dry Bulk", "Liquid", "LPG"],
      notes: "Multi-purpose quay for liquid and bulk"
    },
    {
      name: "Eastern Quay",
      length: "80m",
      depth: "5.4m",
      maxLOA: "-",
      cargoTypes: ["Auxiliary"],
      notes: "Auxiliary berth"
    }
  ],
  totalQuayLength: "565m",
  maxDepth: "9.0m at LW",
  vesselRestrictions: {
    maxDraft: "8.50m",
    maxBeam: "26m",
    maxLOANorth: "175m",
    maxLOAWest: "130m",
    note: "All vessels' workability subject to Port Facility Manager approval"
  },
  equipment: [
    {
      name: "Fixed Cement Conveyor Belt",
      capacity: "400 Mt/Hour",
      type: "Conveyor"
    },
    {
      name: "Movable Clinker Conveyor Belt",
      capacity: "600 Mt/Hour",
      type: "Conveyor"
    },
    {
      name: "Sennebogen 860",
      capacity: "Material Handling",
      type: "Crane"
    },
    {
      name: "Sennebogen 870",
      capacity: "Material Handling",
      type: "Crane"
    },
    {
      name: "Sennebogen 875",
      capacity: "Material Handling",
      type: "Crane"
    }
  ],
  tugboats: [
    {
      name: "TB Kerynia",
      bpt: 80,
      type: "100a1 Escort Tug, Fire Fighting Ship 1"
    },
    {
      name: "TB Amochostis",
      bpt: 80,
      type: "100a1 Escort Tug, Fire Fighting Ship 1"
    },
    {
      name: "TB Ayia Marina",
      bpt: 49,
      type: "100a1 Escort Tug"
    },
    {
      name: "TB Chrysovalantis",
      bpt: 35,
      type: "Escort Tug"
    }
  ],
  pilotage: {
    compulsory: true,
    vhfChannels: ["08", "16"],
    boardingPosition: {
      latitude: "34° 42.6' N",
      longitude: "033° 20.05' E"
    },
    tugsRequired: "1 (2nd at Pilot's discretion)",
    tugsAvailable: 4
  },
  anchorage: {
    location: "0.8nm S of main breakwater",
    depth: "30m"
  },
  navigation: {
    portDepth: "9.0m",
    approachChannel: "10.0m",
    tidalRange: "0.60m",
    waterDensity: "1020-1025"
  },
  cargoTypes: {
    dryBulk: ["Clinker", "Cement", "Scrap Iron", "Pet Coke", "Perlite", "Slag"],
    liquid: ["Fuels", "Chemicals", "LPG"],
    roRo: "20m ramp at NW corner"
  },
  facilities: {
    storage: "45,000 m² open storage",
    warehouse: false,
    ballastSlop: true,
    ispsCompliant: true,
    freshWater: "Available through chandlers",
    bunkering: "Available through supplier",
    repairs: "Not allowed unless written permission granted",
    drydock: false,
    fumigation: true,
    garbage: true
  },
  operatingHours: {
    officeHours: "Mon-Fri 08:00-16:00, Sat 08:00-12:00",
    portWorking: "Normally continuous",
    closedDays: ["January 1", "Easter Sunday", "December 25"],
    overtimeHolidays: [
      "January 6", "1st Monday of Lent", "March 25", "April 1",
      "Good Friday", "Easter Eve", "Monday after Easter", "May 1",
      "August 15", "October 1", "October 28", "December 24", "December 26"
    ]
  },
  nearbyFacilities: {
    hospital: "Limassol General Hospital (40km)",
    airport: "Larnaca International Airport (40km)"
  },
  contacts: [
    {
      role: "Port Manager",
      name: "Marios Averkiou",
      tel: "+357 24 845305",
      mobile: "+357 99 335037",
      email: "m.averkiou@vassiliko.com",
      fax: "+357 24 845343"
    },
    {
      role: "Port Supervisor / PFSO",
      name: "Theodoros Foka",
      tel: "+357 24 845402",
      mobile: "+357 99 308368",
      email: "th.fokas@vassiliko.com",
      fax: "+357 24 845343"
    },
    {
      role: "APFSO",
      name: "Demetris Tryfonos",
      tel: "+357 24 845317",
      mobile: "+357 99 176913",
      email: "d.trifonos@vassiliko.com",
      fax: "+357 24 845343"
    },
    {
      role: "Port Foreman",
      name: "Petros Karanikolas",
      tel: "+357 24 845318",
      mobile: "+357 99 378042",
      email: "p.karanicolas@vassiliko.com"
    }
  ],
  vhfContact: {
    channels: "08 or 16",
    tel: "+357 24 845555",
    mobile24h: "+357 99 620841"
  },
  emergencyContacts: {
    deputyMinistryShipping: "+357 25 848100",
    fireDepartment: "+357 24 804980",
    medicalService: "+357 25 305770",
    policeImmigration: "+357 24 804321",
    customsOfficer: "+357 24 201850",
    emergencyNumber: "112"
  },
  security: {
    level: 1,
    pfso: {
      name: "Theodoros Foka",
      tel: "+357 24 845402",
      mobile: "+357 99 308368",
      email: "portsecurity@vassiliko.com"
    },
    apfso: {
      name: "Demetris Tryfonos",
      tel: "+357 24 845317",
      mobile: "+357 99 176913",
      email: "portsecurity@vassiliko.com"
    }
  },
  preArrival: {
    etaNotices: [
      "72 hours prior to arrival",
      "48 hours prior to arrival",
      "24 hours prior to arrival"
    ],
    requiredDocuments: [
      "Crew List",
      "Crew Effect",
      "Passenger List",
      "Ship's Store List",
      "Last 10 Ports",
      "Ship to Ship Activities",
      "ISPS - Ship Security Pre-Arrival Information",
      "Sludge and Waste Form",
      "Health Declaration",
      "Pilot's Pre-Arrival Form"
    ],
    requiredCertificates: [
      "Ships Sanitation/Exemption Certificate",
      "International Ship Security Certificate (ISSC)",
      "Certificate of Registry",
      "International Certificate of Tonnage (1969)",
      "Class Certificate",
      "Bunker Pollution Certificate",
      "Certificate of Entry – P&I Club",
      "Wreck Removal",
      "Ship's Particulars",
      "Sewage Pollution Prevention Certificate",
      "International Ballast Water Management Certificate",
      "Continuous Synopsis Record (CSR)"
    ]
  },
  safetyEquipment: [
    "Helmet",
    "Safety Goggles",
    "Safety Gloves",
    "Safety Shoes",
    "High Visibility Clothing",
    "Lifejacket (near unprotected areas)"
  ],
  regulations: {
    smoking: "Port Facility is a non-smoking area. No smoking on any outside deck, machinery spaces, or any other place.",
    hotWorks: "Permitted only after written approval from Cyprus Port Authority and Port Facility representative. Application through vessel's Agent.",
    mainEngineImmobilization: "Not permitted alongside",
    ballastOverflow: "Overflow of ballast tanks is prohibited within the Port Facility area",
    gangway: "Use of Gangway is compulsory for all vessels",
    pollution: "MARPOL and IMO standards apply"
  }
};

// Utility functions
export const getTotalEquipmentCount = (): number => {
  return vassilikoPortData.equipment.length;
};

export const getTugboatCount = (): number => {
  return vassilikoPortData.tugboats.length;
};

export const getMaxBPT = (): number => {
  return Math.max(...vassilikoPortData.tugboats.map(t => t.bpt));
};
