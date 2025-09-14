export const plans = [
  {
    id: "free",
    name: "Free for Life",
    hireRange: "Hire for 1 Slot",
    businessLimit: "1 Business",
    prices: {
      NGN: {
        annually: 0,
        monthly: 0,
      },
      USD: {
        annually: 0,
        monthly: 0,
      },
    },
  },
  {
    id: "startup",
    name: "Startup",
    hireRange: "Hire 1-3 People",
    businessLimit: "Up to 2 Businesses",
    prices: {
      NGN: {
        annually: 30000,
        monthly: 3000,
      },
      USD: {
        annually: 60,
        monthly: 6,
      },
    },
  },
  {
    id: "sme",
    name: "SME",
    hireRange: "Hire 4-20 People",
    businessLimit: "Up to 5 Businesses",
    prices: {
      NGN: {
        annually: 50000,
        monthly: 5000,
      },
      USD: {
        annually: 100,
        monthly: 10,
      },
    },
  },
  {
    id: "corporate",
    name: "Corporate",
    hireRange: "Hire 21-100 People",
    businessLimit: "Up to 10 Businesses",
    prices: {
      NGN: {
        annually: 90000,
        monthly: 9000,
      },
      USD: {
        annually: 180,
        monthly: 18,
      },
    },
  },
  {
    id: "enterprise",
    name: "Government/Institution",
    hireRange: "Hire Unlimited",
    businessLimit: "Unlimited Businesses",
    requestQuote: true,
    prices: {
      NGN: {
        annually: 0, // Request quote
        monthly: 0,
      },
      USD: {
        annually: 0,
        monthly: 0,
      },
    },
  },
];
