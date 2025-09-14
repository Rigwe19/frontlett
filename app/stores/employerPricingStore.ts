import { create } from "zustand";

export type Currency = "NGN" | "USD";
export type BillingCycle = "monthly" | "annually";
export type PriceType = "Basic" | "Lifetime Basic" | "Pro" | "Lifetime Pro";

// type PlanPrices = {
//   [currency in Currency]: {
//     [billing in BillingCycle]: {
//       [key: string]: number | undefined;
//     };
//   };
// };
type PlanPrices = {
  [currency: string]: { [type: string]: number | undefined };
};

interface Plan {
  id: string;
  name: string;
  hireRange: string;
  businessLimit: string;
  requestQuote?: boolean;
  prices: PlanPrices;
  features: number[];
}
type Subscription = Plan & {
  total_price: number;
  expire_at: Date;
  isActive: boolean;
  price_type: PriceType;
  currency: Currency;
  billing_cycle: BillingCycle;
  plan_id: string;
};

interface AddOn {
  id: string;
  name: string;
  label: string;
  price: {
    [currency in Currency]: number;
  };
}

interface Feature {
  id: number;
  name: string;
  type: string;
}

interface PricingStore {
  plans: Plan[];
  features: Feature[];
  addOns: AddOn[];
  currency: Currency;
  billingCycle: BillingCycle;
  isModalOpen: boolean;
  selectedPlanId: string | null;
  selectedPriceType: PriceType | null;
  includeAddOns: boolean;
  selectedAddOns: string[];
  totalPrice: number | null;
  current: Subscription;

  // Actions
  setPlans: (plans: Plan[]) => void;
  setFeatures: (feature: Feature[]) => void;
  setAddOns: (addOns: AddOn[]) => void;
  setCurrency: (currency: Currency) => void;
  openModal: (planId: string, priceType: PriceType) => void;
  closeModal: () => void;
  setIncludeAddOns: (value: boolean) => void;
  setTotalPrice: (price: number | null) => void;
  setSelectedPlanId: (id: string | null) => void;
  setSelectedPriceType: (type: PriceType | null) => void;
  setBillingCycle: (
    cycle: BillingCycle | ((prev: BillingCycle) => BillingCycle)
  ) => void;
  setSelectedAddOns: (
    updater: string[] | ((prev: string[]) => string[])
  ) => void;
  setCurrent: (current: Subscription) => void;
}

export const usePricingStore = create<PricingStore>((set, get) => ({
  plans: [],
  features: [],
  addOns: [],
  currency: "NGN",
  billingCycle: "annually",
  isModalOpen: false,
  selectedPlanId: null,
  selectedPriceType: null,
  includeAddOns: false,
  totalPrice: null,
  selectedAddOns: [],
  current: {
    id: "free",
    name: "Free for Life",
    hireRange: "Hire for 1 Slot",
    businessLimit: "1 Business",
    requestQuote: false,
    prices: {
      NGN: {
        "basic-annual": 0,
        "basic-monthly": 0,
        "lifetime-basic": 0,
        "pro-annual": 0,
        "pro-monthly": 0,
        "lifetime-pro": 0,
      },
    },
    features: [],
    total_price: 0,
    expire_at: new Date(),
    isActive: true,
    price_type: "Basic",
    currency: "NGN",
    billing_cycle: "annually",
    plan_id: "free",
  },

  setPlans: (plans) => set({ plans }),
  setFeatures: (features) => set({ features }),
  setAddOns: (addOns) => set({ addOns }),
  setCurrency: (currency) => set({ currency }),
  setBillingCycle: (cycle) =>
    set((state) => ({
      billingCycle:
        typeof cycle === "function" ? cycle(state.billingCycle) : cycle,
    })),
  openModal: (planId, priceType) =>
    set({
      selectedPlanId: planId,
      selectedPriceType: priceType,
      isModalOpen: true,
    }),
  closeModal: () =>
    set({ selectedPlanId: null, selectedPriceType: null, isModalOpen: false }),
  setIncludeAddOns: (value) => set({ includeAddOns: value }),
  setTotalPrice: (price) => set({ totalPrice: price }),
  setSelectedPlanId: (id) => set({ selectedPlanId: id }),
  setSelectedPriceType: (type) => set({ selectedPriceType: type }),
  setSelectedAddOns: (updater) =>
    set((state) => ({
      selectedAddOns:
        typeof updater === "function" ? updater(state.selectedAddOns) : updater,
    })),
  setCurrent: (current) => {
    const getPlan = get().plans.find((val) => val.id === current.plan_id);
    if (getPlan) {
      set({ current: {...getPlan, ...current} });
    }
  },
}));
