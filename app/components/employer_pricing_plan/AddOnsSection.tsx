import { LuCheck } from "react-icons/lu";

// This component is used to display the "Add-ons" section in the pricing plan page.
const AddOnsSection = () => {
  return (
    <div className="bg-blue-50 dark:bg-neutral-700 dark:text-neutral-300 rounded-lg p-5 my-16 max-w-2xl mx-auto">
      <h3 className="font-semibold mb-3">Add-ons</h3>
      <ul className="text-sm space-y-2 text-[#0F1729] dark:text-neutral-300">
        <li className="flex items-center">
          <LuCheck size={24} className="text-green-600 mr-2" /> 1 Hire at ₦20,000 /
          Billed annually
        </li>
        <li className="flex items-center">
          <LuCheck size={24} className="text-green-600 mr-2" /> 1 Business at ₦20,000
          / Billed annually
        </li>
      </ul>
    </div>
  );
};

export default AddOnsSection;
