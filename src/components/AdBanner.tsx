import React, { useEffect, useRef } from 'react';

export const AdBanner: React.FC = () => {
  const adWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adWrapperRef.current) return;

    // Prevent duplicate script insertion
    const existingScript = adWrapperRef.current.querySelector(
      'script[src*="7d8e68b13d3f2cdc38795ec49b5fe412"]'
    );
    if (existingScript) return;

    const script = document.createElement('script');
    script.src =
      'https://pl31457770.profitableratecpmnetwork.com/7d8e68b13d3f2cdc38795ec49b5fe412/invoke.js';
    script.async = true;
    script.setAttribute('data-cfasync', 'false');

    adWrapperRef.current.appendChild(script);
  }, []);

  return (
    <div className="w-full flex justify-center items-center my-6 px-4 overflow-hidden">
      <div
        ref={adWrapperRef}
        className="flex justify-center items-center w-full max-w-5xl min-h-[90px]"
      >
        <div id="container-7d8e68b13d3f2cdc38795ec49b5fe412"></div>
      </div>
    </div>
  );
};
