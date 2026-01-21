export const CONTACT = {
  // Primary contact (used on most pages)
  primary: {
    phone: "+357-25-208700",
    phoneHref: "tel:+357-25-208700",
    email: "websales@shoham.com.cy",
    emailHref: "mailto:websales@shoham.com.cy",
    fax: "+357-25-568990",
    faxHref: "tel:+357-25-568990",
  },

  // General info email
  info: {
    email: "info@shoham.com.cy",
    emailHref: "mailto:info@shoham.com.cy",
  },

  // Department-specific contacts
  departments: {
    sales: {
      email: "sales@shoham.com.cy",
      emailHref: "mailto:sales@shoham.com.cy",
    },
    chartering: {
      phone: "+357-25-878300",
      phoneHref: "tel:+35725878300",
      email: "chartering@shoham.com.cy",
      emailHref: "mailto:chartering@shoham.com.cy",
    },
  },

  // Address information
  address: {
    short: "Limassol, Cyprus",
    street: "3 Anexartisias Street",
    poBox: "P.O. Box 50084",
    city: "3600 Limassol, Cyprus",
    full: "3 Anexartisias Street, P.O. Box 50084, 3600 Limassol, Cyprus",
  },

  // Business hours
  hours: {
    display: "08:00 - 17:00",
    weekdays: "Monday - Friday: 08:00 - 17:00",
    weekend: "Saturday - Sunday: Closed",
  },
} as const;
