// This component is used to display the "Feature Comparison" section in the pricing plan page.
import { usePricingStore } from "~/stores/employerPricingStore";
import Button from "~/components/ui/button";
import { cn, getPriceLabel } from "~/libs/utils";
// import { plans } from '~/libs/pricing'
import { LuCheck, LuX } from "react-icons/lu";

const FeatureComparisonTable = () => {
  const priceTypes = [
    "Basic",
    "Lifetime Basic",
    "Pro",
    "Lifetime Pro",
  ] as const;

  const { currency, billingCycle, openModal, plans, features } = usePricingStore();

  return (
    <div className="mt-16 overflow-x-auto">
      {/* --- Plans Header --- */}
      <h3 className="text-2xl font-semibold mb-6 text-center">
        Feature Comparison
      </h3>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-neutral-700 text-sm text-left">
            <th className="p-3 font-medium">Feature</th>
            {plans.map((plan) => (
              <th key={plan.id} className="p-3 font-medium text-center">
                {plan.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* --- Basic Feature Section Header --- */}
          <tr className="bg-gray-100 dark:bg-neutral-700 border-t">
            <td className="p-3 font-semibold" colSpan={plans.length + 1}>
              Basic Feature
            </td>
          </tr>
          {/* Max Hires */}
          <tr className="border-t">
            <td className="p-3">Max Hires</td>
            {plans.map((plan) => (
              <td key={plan.id} className="p-3 text-center">
                {plan.hireRange
                  ? /unlimited/i.test(plan.hireRange)
                    ? "Unlimited"
                    : plan.hireRange.match(/\d+\s*(–|-)?\s*\d*/)?.[0] || "-"
                  : "-"}
              </td>
            ))}
          </tr>
          {/* Max Businesses */}
          <tr className="border-t">
            <td className="p-3">Max Businesses</td>
            {plans.map((plan) => (
              <td key={plan.id} className="p-3 text-center">
                {plan.businessLimit
                  ? /unlimited/i.test(plan.businessLimit)
                    ? "Unlimited"
                    : plan.businessLimit.match(/Up to \d+/i)?.[0] ||
                    plan.businessLimit.match(/\d+/)?.[0] ||
                    "-"
                  : "-"}
              </td>
            ))}
          </tr>
          <tr className="border-t">
            <td className="p-3">HR Account Manager</td>
            {plans.map((plan) => {
              let label = "";
              let showCheck = true;

              if (plan.name === "Startup") label = "Basic";
              else if (plan.name === "SME") label = "Full";
              else if (plan.name === "Corporate") label = "Dedicated";
              else if (plan.name === "Government/Institution")
                label = "Enterprise";
              else showCheck = false;

              return (
                <td key={plan.id} className="p-3 text-center">
                  {showCheck ? (
                    <span className="inline-flex items-center gap-1 text-sm">
                      <LuCheck className="text-green-600" size={24} /> {label}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-sm">
                      <LuX className="text-red-500" size={24} />
                    </span>
                  )}
                </td>
              );
            })}
          </tr>
          {features.map((feature, index) => {
            if (feature.type === "pro" || feature.id < 4) return null;

            return (
              <tr key={feature.id} className="border-t">
                <td className="p-3">{feature.name}</td>
                {plans.map((plan) => {
                  const hasFeature = plan.features?.includes(feature.id);
                  return (
                    <td key={plan.id} className="p-3 text-center">
                      {hasFeature ? (
                        <span className="inline-flex items-center gap-1 text-sm">
                          <LuCheck className="text-green-600" size={24} />
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-sm">
                          <LuX className="text-red-500" size={24} />
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}

          {/* --- Pro Feature Section Header --- */}
          <tr className="bg-gray-100 dark:bg-neutral-700 font-semibold text-sm border-t">
            <td className="p-3" colSpan={plans.length + 1}>
              Pro Feature
            </td>
          </tr>
          {/* Verified Pro Access */}
          <tr>
            <td className="p-3">Verified Pro Access</td>
            {plans.map((plan) => (
              <td key={plan.id} className="p-3 text-center">
                {plan.name === "Free for Life" ? (
                  <span className="inline-flex items-center gap-1 text-sm">
                    <LuX className="text-red-500" size={24} />
                  </span>
                ) : plan.name === "Startup" ? (
                  <span className="inline-flex items-center gap-1 text-sm">
                    <LuCheck className="text-green-600" size={24} /> Limited
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-sm">
                    <LuCheck className="text-green-600" size={24} />
                  </span>
                )}
              </td>
            ))}
          </tr>
          {/* Custom Dashboards */}
          <tr>
            <td className="p-3">Custom Dashboards</td>
            {plans.map((plan) => (
              <td key={plan.id} className="p-3 text-center">
                {plan.name === "Free for Life" ? (
                  <span className="inline-flex items-center gap-1 text-sm">
                    <LuX className="text-red-500" size={24} />
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-sm">
                    <LuCheck className="text-green-600" size={24} />
                  </span>
                )}
              </td>
            ))}
          </tr>
          {/* Micro-Contract Automation */}
          <tr>
            <td className="p-3">Micro-Contract Automation</td>
            {plans.map((plan) => (
              <td key={plan.id} className="p-3 text-center">
                <span className="inline-flex items-center gap-1 text-sm">
                  <LuCheck className="text-green-600" size={24} />
                </span>
              </td>
            ))}
          </tr>
          {features.map((feature) => {
            if (feature.type !== "pro") return null;

            return (
              <tr key={feature.id} className="border-t">
                <td className="p-3">{feature.name}</td>
                {plans.map((plan) => {
                  const hasFeature = plan.features?.includes(feature.id);
                  return (
                    <td key={plan.id} className="p-3 text-center">
                      {hasFeature ? (
                        <span className="inline-flex items-center gap-1 text-sm">
                          <LuCheck className="text-green-600" size={24} />
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-sm">
                          <LuX className="text-red-500" size={24} />
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}

          {/* --- Prices Section Header --- */}
          <tr className="bg-gray-100 dark:bg-neutral-700 border-t">
            <td className="p-3 font-semibold" colSpan={plans.length + 1}>
              Prices
            </td>
          </tr>

          {priceTypes.map((priceType) => (
            <tr key={priceType} className={cn("border-t")}>
              <td className="p-3 font-medium align-top border border-pink-300">
                <div>
                  {priceType}
                  {priceType === "Lifetime Basic" && (
                    <div className="text-xs text-pink-500 mt-1">
                      (Limited to 300 Slots)
                    </div>
                  )}
                  {priceType === "Lifetime Pro" && (
                    <div className="text-xs text-pink-500 mt-1">
                      (Limited to 200 Slots)
                    </div>
                  )}
                </div>
              </td>
              {plans.map((plan) => {
                let type = ''
                if(priceType === "Basic" && billingCycle === 'monthly') {
                  type = "basic-monthly";
                } else if(priceType === "Basic" && billingCycle === 'annually') {
                  type = "basic-annual";
                } else if(priceType === "Lifetime Basic") {
                  type = "lifetime-basic";
                }else if(priceType === "Pro" && billingCycle === 'monthly') {
                  type = "pro-monthly";
                } else if(priceType === "Pro" && billingCycle === 'annually') {
                  type = "pro-annual";
                } else if(priceType === "Lifetime Pro") {
                  type = "lifetime-pro";
                }
                const priceValue =
                  plan.prices?.[currency]?.[type] ?? null;

                const price = priceValue;// === 0 ? null : priceValue;
                const isRequestQuote = plan.requestQuote || price === null;
                const isFreePlan = plan.name === "Free for Life";
                const showSubscribe =
                  !isFreePlan || (isFreePlan && priceType !== "Basic");

                return (
                  <td
                    key={`${plan.id}-${priceType}`}
                    className="p-3 text-center align-top border border-pink-300"
                  >
                    {isRequestQuote ? (
                      <button type="button" className="text-sm text-blue-600 underline">
                        Request Quote
                      </button>
                    ) : isFreePlan ? (
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-sm text-neutral-400">
                          {getPriceLabel(price, currency)}
                        </span>
                        <Button
                          size="sm"
                          type="button"
                          onClick={() => {
                            openModal(plan.id, priceType);
                          }}
                        >
                          Subscribe
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1">
                        <span className="font-medium text-sm">
                          {getPriceLabel(price, currency)}
                        </span>
                        {showSubscribe && (
                          <Button
                            size="sm"
                            type="button"
                            onClick={() => {
                              openModal(plan.id, priceType);
                            }}
                          >
                            Subscribe
                          </Button>
                        )}
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeatureComparisonTable;
