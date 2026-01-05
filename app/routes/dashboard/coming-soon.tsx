import { LuConstruction } from "react-icons/lu";

export default function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <LuConstruction className="w-24 h-24 text-primary mb-6" />
      <h1 className="text-4xl font-bold text-gray-800 dark:text-neutral-200 mb-2">
        Coming Soon!
      </h1>
      <p className="text-lg text-gray-600 dark:text-neutral-400">
        We're working hard to bring this feature to you.
        <br />
        Stay tuned!
      </p>
    </div>
  );
}