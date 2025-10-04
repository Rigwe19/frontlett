// components/PlanConfirmationModal.tsx
import { useEffect, useRef, useState } from "react";
import { usePricingStore } from "~/stores/employerPricingStore";
import Button from "~/components/ui/button";
import { LuX, LuInfo, LuLock, LuCheck } from "react-icons/lu";
import { cn, getPriceLabel } from "~/libs/utils";
// import { plans } from '~/libs/pricing'
import { useLoader } from "~/stores/loaderStore";
import { post, put } from "~/libs/axios";
import useAuth from "~/stores/authStore";
import { usePaystackPayment } from 'react-paystack';

export default function PlanConfirmationModal() {
  const { user } = useAuth();
  // const reference = (new Date()).getTime().toString();
  const ref = useRef<string>('');
  const {
    addOns,
    billingCycle,
    currency,
    isModalOpen,
    selectedPlanId,
    selectedPriceType,
    includeAddOns,
    totalPrice,
    plans,
    selectedAddOns,
    current,
    closeModal,
    setIncludeAddOns,
    setTotalPrice,
    setSelectedAddOns,
    setCurrent,
  } = usePricingStore();
  // console.log(import.meta.env.VITE_PAYSTACK_KEY)
  const initializePayment = usePaystackPayment({publicKey: import.meta.env.VITE_PAYSTACK_KEY});

  const { alert } = useLoader();

  const plan = plans.find((p) => p.id === selectedPlanId) ?? null;
  let type = ''
  if (selectedPriceType === "Basic" && billingCycle === 'monthly') {
    type = "basic-monthly";
  } else if (selectedPriceType === "Basic" && billingCycle === 'annually') {
    type = "basic-annual";
  } else if (selectedPriceType === "Lifetime Basic") {
    type = "lifetime-basic";
  } else if (selectedPriceType === "Pro" && billingCycle === 'monthly') {
    type = "pro-monthly";
  } else if (selectedPriceType === "Pro" && billingCycle === 'annually') {
    type = "pro-annual";
  } else if (selectedPriceType === "Lifetime Pro") {
    type = "lifetime-pro";
  }
  // console.log(selectedPriceType)
  // Add index signature to the PlanPrice type in your plan model:
  // type PlanPrices = { [currency: string]: { [type: string]: number | undefined } };
  const basePrice =
    plan?.prices[currency]?.[type] ?? null;

  const isMonthly = billingCycle === "monthly";
  const isAddOnDisabled = !plan || isMonthly || plan.name === "Free for Life";

  const toggleAddOn = (type: string) => {
    if (isAddOnDisabled) return;
    setSelectedAddOns((prev) => {
      if (prev.includes(type)) {
        return prev.filter((id) => id !== type);
      } else if (prev.length < 2) {
        return [...prev, type];
      }
      return prev;
    });
  };

  const addonCost = selectedAddOns.reduce((sum, id) => {
    const addon = addOns.find((a) => a.id === id);
    return sum + (addon ? addon.price[currency] : 0);
  }, 0);

  const rawTotal = basePrice !== null ? basePrice + addonCost : null;

  // Persist total price globally
  useEffect(() => {
    setTotalPrice(rawTotal);
  }, [rawTotal]);

  useEffect(() => {
    if (isMonthly || !isModalOpen) {
      setSelectedAddOns([]);
      setIncludeAddOns(false);
    }
  }, [billingCycle, isModalOpen]);

  // you can call this function anything
  const onSuccess = async (reference: any) => {
    try {
      // Implementation for whatever you want to do with reference and after success call.
      const response = await put<any, { success: boolean, subscription: any }>('/subscription/paid', { ...reference })
      if (!response.data.success) throw new Error("Subscription failed");
      setCurrent(response.data.subscription)
      closeModal()
    } catch (err) {
      console.error("Failed to subscribe:", err);
      alert("Subscription failed. Please try again.", 5000, 'error');
    }
  };

  // you can call this function anything
  const onClose = async () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    try {
      // Implementation for whatever you want to do with reference and after success call.
      const response = await put<any, { success: boolean, reference: string, subscription: any }>('/subscription/failed', { reference: ref.current })
      if (!response.data.success) throw new Error("Subscription failed");
      // setCurrent(response.data.subscription)
      closeModal()
    } catch (err) {
      console.error("Failed to subscribe:", err);
      alert("Subscription failed. Please try again.", 5000, 'error');
    }
  }

  const formatted = (value: number | null) =>
    typeof value === 'number'
      ? new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }).format(value)
      : "N/A";

  //Backend API call to handle subscription
  const handleSubmit = async () => {
    if (!selectedPlanId || !selectedPriceType || totalPrice === null) return;
    const reference = (new Date()).getTime().toString()
    ref.current = reference
    const payload = {
      plan_id: selectedPlanId,
      price_type: selectedPriceType,
      billing_cycle: billingCycle,
      currency,
      include_add_ons: includeAddOns,
      selected_add_ons: selectedAddOns,
      total_price: totalPrice,
      reference
    };

    const config = {
      reference,
      email: user?.email ?? "",
      currency,
      amount: (totalPrice ?? 1) * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    };
    console.log(config)
    try {
      const response = await post<any, { success: boolean, reference: string, subscription: any }>("/subscription/subscribe", payload);
      if (!response.data.success) throw new Error("Subscription failed");
      // if (!response.ok) 
      // window.location.href = "/dashboard";
      if (totalPrice > 0) {
        initializePayment({ onSuccess, onClose, config })
      } else {
        setCurrent(response.data.subscription)
        closeModal();
      }

    } catch (err) {
      console.error("Failed to subscribe:", err);
      alert("Subscription failed. Please try again.", 5000, 'error');
    }
  };

  // Modal rendering logic
  if (!isModalOpen || !plan || !selectedPriceType) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-neutral-900 w-full max-w-xl rounded-lg shadow-xl p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={closeModal}
        >
          <LuX className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-semibold mb-6">Choose Your Plan</h3>

        {/* Plan boxes */}
        <div className="flex justify-between gap-4 mb-6">
          <div className="border border-neutral-300 dark:border-neutral-600 rounded-md p-4 flex-1 text-sm">
            <p className="text-gray-400 font-medium">Current Plan</p>
            {/* {JSON.stringify(plans)} */}
            <p className="font-semibold">{current?.name ?? "Free for Lifes"}</p>
            <p className="text-xs">
              {current.hireRange}
              <br />
              {current.businessLimit}
            </p>
            <p className="mt-2">{formatted(current.total_price)}/{current?.billing_cycle}</p>
          </div>
          <div className="border border-blue-500 rounded-md p-4 flex-1 text-sm bg-blue-50 dark:bg-neutral-800">
            <p className="text-blue-500 font-medium">New Plan</p>
            <p className="font-semibold">{plan.name}</p>
            <p className="text-xs">
              {plan.hireRange}
              <br />
              {plan.businessLimit}
            </p>
            <p className="mt-2">{getPriceLabel(basePrice, currency)}/{billingCycle === 'monthly' ? 'month' : 'year'}</p>
          </div>
        </div>

        {/* Price summary */}
        <div className="space-y-3 border-t dark:border-neutral-600 border-neutral-300 pt-4 text-sm mb-6">
          <div className="flex justify-between">
            <span>New plan price:</span>
            <span>{getPriceLabel(basePrice, currency)}</span>
          </div>
          {selectedAddOns
            .map((id) => addOns.find((addon) => addon.id === id))
            .filter(Boolean)
            .map((addon) => (
              <div
                key={addon!.id}
                className="flex justify-between items-center"
              >
                <span className="flex items-center gap-1">
                  {addon!.name} Add-ons
                  <LuInfo
                    className="w-4 h-4 text-gray-400"
                    title="Allows you to manage extra profile or resource capacity"
                  />
                </span>
                <span>{getPriceLabel(addon!.price[currency], currency)}</span>
              </div>
            ))}

          <div className="flex justify-between font-semibold">
            <span>Prorated amount:</span>
            <span>{getPriceLabel(rawTotal, currency)}</span>
          </div>
        </div>

        {/* Add-ons */}
        <div className="mb-6">
          <p className="font-medium text-sm mb-2">Available Add-ons</p>
          <div className="flex gap-4 flex-wrap">
            {addOns.map((addon) => {
              const isSelected = selectedAddOns.includes(addon.id);
              const price = addon.price[currency];
              return (
                <div
                  key={addon.id}
                  onClick={() => toggleAddOn(addon.id)}
                  className={cn(
                    "relative w-[140px] p-4 rounded-md border transition-all",
                    isAddOnDisabled
                      ? "opacity-50 cursor-not-allowed bg-gray-50 border-gray-200"
                      : "cursor-pointer",
                    isSelected
                      ? "border-blue-500 bg-blue-50"
                      : "hover:border-gray-400"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <p className="font-medium text-sm">{addon.name}</p>
                    {isSelected && (
                      <div
                        className="absolute top-2 right-2 text-green-600 text-lg"
                        title="Selected"
                      >
                        <LuCheck className="text-green-600" size={24} />
                      </div>
                    )}
                    {isAddOnDisabled && (
                      <div
                        className="absolute top-2 right-2 text-red-500 text-lg"
                        title="Requires annual paid plan"
                      >
                        <LuLock className="text-yellow-600" size={24} />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Billed annually</p>
                  <p className="text-sm font-semibold mt-2">
                    {getPriceLabel(price, currency)}/Annually
                  </p>
                </div>
              );
            })}
          </div>
          {isAddOnDisabled && (
            <p className="text-xs text-red-500 dark:text-red-900 mt-2 flex items-center gap-1">
              <LuInfo className="inline-block" />
              Add-ons require a paid annual plan.
            </p>
          )}
        </div>

        {/* Total + Actions */}
        <div className="border-t dark:border-neutral-600 border-neutral-300 pt-4 flex flex-col gap-4">
          <div className="flex justify-between font-semibold text-base">
            <span>Total:</span>
            <span>{getPriceLabel(totalPrice, currency)}/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Confirm & Pay</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
