import useAuth from "~/stores/authStore"
import EmployeePricing from "./employee-pricing"
import EmployerPricing from "./employer-pricing"
// import type { Route } from "./+types/employer-pricing";

export function meta() {
    return [
        { title: "Frontlett - Pricing & Plans" },
        { name: "description", content: "Join as a freelancer and start your journey." },
    ];
}

const Pricing = () => {
    const {user} = useAuth()
    if(user?.role !== 'business') return <EmployerPricing />
  return (
    <EmployeePricing />
  )
}

export default Pricing