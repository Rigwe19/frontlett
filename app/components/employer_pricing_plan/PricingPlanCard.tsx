// This component is used to display the "Pricing Plan card" section in the pricing plan page.
import { usePricingStore } from "~/stores/employerPricingStore";
import { cn, getPriceLabel } from "~/libs/utils";
import type { PriceType } from "~/stores/employerPricingStore";
// import { plans } from '~/libs/pricing'

const DEFAULT_PRICE_TYPE: PriceType = "Basic";
const PricingPlanCard = () => {
  const { currency, billingCycle, selectedPriceType, plans } = usePricingStore();
  // console.log(plans);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {plans.map((plan) => {
        let type = ''
        if (billingCycle === 'monthly') {
          type = "pro-monthly";
        } else {
          type = "pro-annual";
        } 
        const priceValue =
          plan.prices?.[currency]?.[type] ?? null;
        const priceLabel = plan.requestQuote
          ? "Request Quote"
          : getPriceLabel(
            typeof priceValue === "number" ? priceValue : 0,
            currency
          );

        return (
          <div
            key={plan.id}
            className={cn(
              "rounded-xl border border-gray-200 p-5 flex flex-col items-center text-center shadow-sm",
              plan.name === "Free for Life" && "bg-[#F9FAFB]",
              plan.name === "SME" &&
              "bg-gradient-to-br from-[#2563EB] to-[#0D9488] text-white",
              plan.name === "Startup" && "bg-[#ECFDF5]",
              plan.name === "Corporate" && "bg-[#F3F4F6]",
              plan.name === "Government/Institution" &&
              "border-2 border-orange-400 bg-[#F3F4F6]"
            )}
          >
            <h4 className="font-bold text-lg mb-1">{plan.name}</h4>
            <div className="flex gap-1 items-center mb-4">
              <span className="text-lg font-semibold">{priceLabel}</span>
              {!plan.requestQuote && (
                <span className={`text-sm ${plan.name === 'SME' ? 'text-neutrl-400' : 'text-neutral-500'}`}>
                  {billingCycle === "monthly" ? "/mnth" : "/yr"}
                </span>
              )}
            </div>

            <p className="text-sm">{plan.hireRange}</p>
            <p className="text-sm">{plan.businessLimit}</p>
          </div>
        );
      })}
    </div>
  );
};

export default PricingPlanCard;
