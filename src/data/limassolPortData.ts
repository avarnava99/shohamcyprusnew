// DP World Limassol Terminal Information - January 2024
// Source: Official DP World Limassol Terminal Information Guide

export interface QuayInfo {
  name: string;
  location: { lat: number; lng: number };
  length: string;
  width: string;
  depth: string;
  bollardNumbers: string;
  bollardCapacity: string;
  bollardType: string;
  bollardIntervals: string;
  bollardHeight: string;
  fendering: string;
  underKeelClearance: string;
  restrictedAirDraft: string;
  heightToCopeEdge: string;
  preferredBerthingSide: string;
}

export interface EquipmentItem {
  manufacturer: string;
  model: string;
  description: string;
  capacity: string;
  qty: number;
}

export interface EquipmentCategory {
  category: string;
  icon: string;
  items: EquipmentItem[];
}

export interface TugboatInfo {
  name: string;
  type: string;
  power: string;
}

export interface PilotBoatInfo {
  name: string;
  type: string;
  power: string;
}

export interface MarineServices {
  provider: string;
  availability: string;
  tugboats: TugboatInfo[];
  pilotBoats: PilotBoatInfo[];
  vhfChannels: {
    pilot: string;
    vts: string;
  };
  nightNavigation: string;
  movementRequest: string;
}

export interface VesselExample {
  name: string;
  type: string;
  loa: string;
  beam: string;
}

export interface LimassolPortData {
  operator: string;
  concessionInfo: string;
  imoNumber: string;
  unLocationCode: string;
  certifications: string[];
  vesselTypesServed: string[];
  servicesOffered: string[];
  yardCapacity: {
    total: string;
    warehouses: string;
    openYards: string;
  };
  maxBearingCapacity: string;
  operatingShifts: {
    shift1: string;
    shift2: string;
    shift3: string;
    note: string;
  };
  generalPortDetails: {
    channelDepth: string;
    airDraft: string;
    waterDensity: string;
    tidalRange: string;
    pilotStation: string;
    tidalData: {
      hat: string;
      mhws: string;
      mhwn: string;
      msl: string;
      mlwn: string;
      mlws: string;
      lat: string;
    };
  };
  quays: QuayInfo[];
  equipment: EquipmentCategory[];
  marineServices: MarineServices;
  maxVesselSize: VesselExample[];
  minVesselSize: VesselExample[];
  contacts: {
    emergency: string;
    commercial: string;
    operations: string;
    hsse: string;
  };
  cruiseTerminal: {
    area: string;
    shells: string;
    checkInDesks: string;
    parking: string;
    facilities: string[];
  };
}

export const limassolPortData: LimassolPortData = {
  operator: "DP World Limassol",
  concessionInfo: "25-year exclusive concession awarded April 2016, commenced February 2017",
  imoNumber: "CYLMS - 0003",
  unLocationCode: "CYLMS",
  certifications: [
    "ISPS",
    "ISO 9001:2015",
    "ISO 14001:2015",
    "ISO 45001:2018",
    "ISO 28000:2022"
  ],
  vesselTypesServed: [
    "Break Bulk",
    "Bulk Carriers",
    "General Cargo",
    "RO/RO",
    "Container",
    "Passenger/Ferry/Cruise",
    "Naval",
    "Tanker",
    "Offshore Construction & Special Purpose",
    "Platform/Offshore Supply/Diving",
    "Barges"
  ],
  servicesOffered: [
    "Vessel Layby",
    "Loading/Discharging Operations Lo-Lo & Ro-Ro",
    "General Cargo Handling",
    "Onshore Activities Supporting Offshore Projects",
    "Cargo Storage/Warehousing",
    "Logistics",
    "Supply of Resources (Equipment/Manpower)"
  ],
  yardCapacity: {
    total: "250,000 m²",
    warehouses: "20,600 m²",
    openYards: "236,400 m²"
  },
  maxBearingCapacity: "20 Tons/sqm",
  operatingShifts: {
    shift1: "07:30 - 16:30",
    shift2: "16:30 - 00:00",
    shift3: "00:00 - 07:30",
    note: "Shifts can be extended with 2 additional hours on overtime basis"
  },
  generalPortDetails: {
    channelDepth: "17.0m",
    airDraft: "Unlimited (No restriction)",
    waterDensity: "1026 g/m³",
    tidalRange: "Max 0.5m (practical range ~0.3m)",
    pilotStation: "1.2 NM from berth",
    tidalData: {
      hat: "0.7m",
      mhws: "0.6m",
      mhwn: "0.5m",
      msl: "0.38m",
      mlwn: "0.3m",
      mlws: "0.2m",
      lat: "0.1m"
    }
  },
  quays: [
    {
      name: "East Quay",
      location: { lat: 34.654093, lng: 33.021948 },
      length: "480m",
      width: "28m",
      depth: "11m",
      bollardNumbers: "1 - 22",
      bollardCapacity: "60 Ton",
      bollardType: "T-Head",
      bollardIntervals: "24m (most common)",
      bollardHeight: "~0.5m",
      fendering: "Tire Fenders",
      underKeelClearance: "10% UKC (1m)",
      restrictedAirDraft: "None",
      heightToCopeEdge: "2m above Waterline Datum",
      preferredBerthingSide: "Any"
    },
    {
      name: "North Quay",
      location: { lat: 34.655179, lng: 33.018687 },
      length: "430m",
      width: "14m",
      depth: "11m",
      bollardNumbers: "23 - 39",
      bollardCapacity: "60 Ton",
      bollardType: "T-Head",
      bollardIntervals: "24m (most common)",
      bollardHeight: "~0.5m",
      fendering: "Cell Fenders",
      underKeelClearance: "10% UKC (1m)",
      restrictedAirDraft: "None",
      heightToCopeEdge: "2m above Waterline Datum",
      preferredBerthingSide: "Any"
    },
    {
      name: "West Quay",
      location: { lat: 34.652861, lng: 33.016522 },
      length: "450m",
      width: "17m - 23m",
      depth: "11m - 13m",
      bollardNumbers: "40 - 60",
      bollardCapacity: "60 Ton",
      bollardType: "T-Head",
      bollardIntervals: "20m (most common)",
      bollardHeight: "~0.5m",
      fendering: "Tire Fenders",
      underKeelClearance: "10% UKC (1m)",
      restrictedAirDraft: "None",
      heightToCopeEdge: "2m above Waterline Datum",
      preferredBerthingSide: "Any"
    },
    {
      name: "South-West Quay",
      location: { lat: 34.649357, lng: 33.016023 },
      length: "320m",
      width: "27m",
      depth: "13m - 16m",
      bollardNumbers: "61 - 77",
      bollardCapacity: "60 Ton",
      bollardType: "T-Head",
      bollardIntervals: "20m (most common)",
      bollardHeight: "~0.5m",
      fendering: "Cell Fenders",
      underKeelClearance: "10% UKC (1m)",
      restrictedAirDraft: "None",
      heightToCopeEdge: "2m above Waterline Datum",
      preferredBerthingSide: "Any"
    }
  ],
  equipment: [
    {
      category: "Mobile Harbor Cranes",
      icon: "Crane",
      items: [
        { manufacturer: "Liebherr", model: "LHM420", description: "Mobile Harbor Crane", capacity: "124 Ton", qty: 1 },
        { manufacturer: "Gottwald", model: "HMK170E", description: "Mobile Harbor Crane", capacity: "63 Ton", qty: 1 }
      ]
    },
    {
      category: "Telescopic Cranes",
      icon: "Crane",
      items: [
        { manufacturer: "Terex", model: "AC100-4L", description: "Telescopic Crane", capacity: "100 Ton", qty: 1 }
      ]
    },
    {
      category: "Reach Stackers",
      icon: "Container",
      items: [
        { manufacturer: "Liebherr", model: "LRS545", description: "Reach Stacker", capacity: "45 Ton", qty: 1 },
        { manufacturer: "Kalmar", model: "DRG450", description: "Reach Stacker", capacity: "45 Ton", qty: 2 }
      ]
    },
    {
      category: "Heavy Forklifts",
      icon: "Forklift",
      items: [
        { manufacturer: "Hyster", model: "C117E", description: "Heavy Forklift", capacity: "40 Ton", qty: 1 },
        { manufacturer: "Konecranes", model: "SMV 28-1200B", description: "Heavy Forklift", capacity: "28 Ton", qty: 1 },
        { manufacturer: "Konecranes", model: "SMV 22-1200B", description: "Heavy Forklift", capacity: "22 Ton", qty: 1 },
        { manufacturer: "Kalmar", model: "DCG160-12", description: "Heavy Forklift", capacity: "16 Ton", qty: 2 }
      ]
    },
    {
      category: "Forklifts",
      icon: "Forklift",
      items: [
        { manufacturer: "Hyster", model: "H7.0FT", description: "Forklift", capacity: "7 Ton", qty: 2 },
        { manufacturer: "Hyster", model: "H5.5FT", description: "Forklift", capacity: "5.5 Ton", qty: 1 },
        { manufacturer: "Hyster", model: "H4.0FT", description: "Forklift", capacity: "4 Ton", qty: 1 },
        { manufacturer: "Hyster", model: "H3.0FT", description: "Forklift", capacity: "3 Ton", qty: 4 },
        { manufacturer: "Hyster", model: "H2.5FT", description: "Forklift", capacity: "2.5 Ton", qty: 2 },
        { manufacturer: "Kalmar", model: "DCE120-6", description: "Forklift", capacity: "12 Ton", qty: 2 },
        { manufacturer: "Kalmar", model: "DCE80-6", description: "Forklift", capacity: "8 Ton", qty: 2 }
      ]
    },
    {
      category: "Terminal Tractors",
      icon: "Truck",
      items: [
        { manufacturer: "Kalmar", model: "TT618i", description: "Terminal Tractor", capacity: "35 Ton", qty: 3 },
        { manufacturer: "Terberg", model: "YT222", description: "Terminal Tractor", capacity: "32 Ton", qty: 5 }
      ]
    },
    {
      category: "Trailers",
      icon: "Trailer",
      items: [
        { manufacturer: "Houcon", model: "Low Bed Roll Trailer", description: "Heavy Duty Trailer", capacity: "100 Ton", qty: 2 },
        { manufacturer: "Kalmar", model: "Skeletal Trailer", description: "Container Trailer", capacity: "60 Ton", qty: 13 }
      ]
    }
  ],
  marineServices: {
    provider: "P&O Maritime Logistics",
    availability: "24/7",
    tugboats: [
      { name: "Prinias", type: "Voith Schneider Propeller Harbour Tug", power: "2,560 kW / 3,433 bhp" },
      { name: "Aspelia", type: "Voith Schneider Propeller Harbour Tug", power: "2,560 kW / 3,433 bhp" },
      { name: "P&O Troodos", type: "Azimuth Stern Drive Tug", power: "4,000 kW / 5,364 bhp" },
      { name: "P&O Kalypso", type: "Azimuth Stern Drive Tug", power: "3,720 kW / 4,988 bhp" }
    ],
    pilotBoats: [
      { name: "Akamantis", type: "Twin Screw Pilot Boat", power: "560 kW / 750 bhp" },
      { name: "P&O Cypria", type: "Twin Screw Pilot Boat", power: "820 kW / 1,100 bhp" }
    ],
    vhfChannels: {
      pilot: "Channel 10",
      vts: "Channel 9"
    },
    nightNavigation: "Available / Allowed",
    movementRequest: "Minimum 2 hours prior to movement"
  },
  maxVesselSize: [
    { name: "Wonder of the Seas", type: "Cruise Vessel", loa: "362.15m", beam: "47m" },
    { name: "Harmony of the Seas", type: "Cruise Vessel", loa: "362.12m", beam: "47.03m" },
    { name: "Anthem/Odyssey of the Seas", type: "Cruise Vessel", loa: "347.75m", beam: "48.85m" }
  ],
  minVesselSize: [
    { name: "EDT Beaver II", type: "Tugboat", loa: "8.96m", beam: "3m" },
    { name: "7 Stars", type: "Survey Vessel", loa: "35m", beam: "8.7m" },
    { name: "Ledra Explorer", type: "Supply Vessel", loa: "38.5m", beam: "8.66m" }
  ],
  contacts: {
    emergency: "(+357) 25 858 799",
    commercial: "commercial.dpwl@dpworld.com",
    operations: "operations.dpwl@dpworld.com",
    hsse: "hsse.dpwl@dpworld.com"
  },
  cruiseTerminal: {
    area: "7,000 m²",
    shells: "7 Shells (Sections)",
    checkInDesks: "10 Check-in desks",
    parking: "300 vehicles + 10 PRM slots + EV charging",
    facilities: [
      "Duty-free shops",
      "Wi-Fi",
      "Customs office",
      "Immigration office",
      "Police",
      "Drug Law Enforcement Unit",
      "100% X-Ray luggage screening",
      "Services for People with Reduced Mobility"
    ]
  }
};

// Calculate total quay length
export const getTotalQuayLength = (): number => {
  return limassolPortData.quays.reduce((total, quay) => {
    const length = parseInt(quay.length.replace('m', ''));
    return total + length;
  }, 0);
};

// Get equipment count by category
export const getEquipmentCount = (): number => {
  return limassolPortData.equipment.reduce((total, category) => {
    return total + category.items.reduce((catTotal, item) => catTotal + item.qty, 0);
  }, 0);
};
