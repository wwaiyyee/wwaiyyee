import React from 'react';

export const Marquee = ({ text }: { text: string }) => {
    return (
        <div className="w-full overflow-hidden border-y border-black py-3 flex items-center bg-[#F2F2ED] z-10 relative">
            <div className="whitespace-nowrap flex animate-[marquee_20s_linear_infinite]">
                <span className="text-xl md:text-2xl font-medium tracking-tight uppercase px-4">{text}</span>
                <span className="text-xl md:text-2xl font-medium tracking-tight uppercase px-4">{text}</span>
                <span className="text-xl md:text-2xl font-medium tracking-tight uppercase px-4">{text}</span>
                <span className="text-xl md:text-2xl font-medium tracking-tight uppercase px-4">{text}</span>
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}} />
        </div>
    );
};
