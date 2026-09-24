import React, { useEffect } from 'react';

export const RedirectPage: React.FC = () => {
  useEffect(() => {
    const url = 'https://www.likomy.site';
    const userAgent = navigator.userAgent;

    const timer = setTimeout(() => {
      if (/(android)/i.test(userAgent)) {
        window.location.href = 'intent://' + url.substring(url.indexOf("://") + 3) + '#Intent;scheme=http;package=com.android.chrome;end;';
      } else if (/(iphone|ipad|ipod)/i.test(userAgent)) {
        window.location.href = url;
      } else {
        window.location.href = url;
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#f0f0f0] font-sans m-0">
      <img
        id="tiktok-logo"
        src="https://www9.0zz0.com/2024/04/06/13/548511907.gif"
        alt="TikTok Logo"
        className="w-[250px] mb-[20px]"
      />
      <p
        id="redirect-text"
        className="text-[30px] text-[#333] opacity-0 animate-[fadeIn_2s_ease-in-out_forwards,scaleUp_2s_ease-in-out_infinite_alternate]"
      >
        Being Redirected ...
      </p>
      <a href="#" id="openLink" className="m-[50px] text-center"></a>
    </div>
  );
};
