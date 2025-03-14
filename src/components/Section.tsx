import { ReactNode } from "react";
import clsx from "clsx";

interface SectionProps {
  children: ReactNode;
  className?: string;
}

const Section = ({ children, className }: SectionProps) => {
  return (
    <div className="px-4 lg:px-0">
      <div className={clsx("w-full lg:w-1/2 mx-auto mt-6 bg-white px-10 py-7 rounded-lg", className)}>
      {children}
    </div>
    </div>
    
  );
};

export default Section;
