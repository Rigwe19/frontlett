import { LuCheck } from "react-icons/lu";

const WhyFrontlettSection = () => {
  return (
    <div className="text-center my-20">
      <h3 className="text-2xl font-semibold mb-6">Why Frontlett?</h3>
      <div className="flex flex-col md:flex-row justify-center gap-8 text-sm text-[#0F1729]">
        <div className="flex items-center justify-center gap-2">
          <LuCheck size={24} className="text-green-600 mr-2" /> ₦0 setup fees
        </div>
        <div className="flex items-center justify-center gap-2">
          <LuCheck size={24} className="text-green-600 mr-2" /> Cancel anytime
        </div>
        <div className="flex items-center justify-center gap-2">
          <LuCheck size={24} className="text-green-600 mr-2" /> 98.9% uptime SLA
          (Enterprise)
        </div>
      </div>
    </div>
  );
};

export default WhyFrontlettSection;
