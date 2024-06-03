import Script from "next/script";
import React from "react";

export default function Head() {
  return (
    <>
      <title>Popup Smart | Blog Site</title>
      <meta name="description" content="Explore of life stream..." />
      <link rel="icon" href="/assets/images/popupsmart.png" />
      <Script src="https://cdn.popupsmart.xyz/bundle.js" data-id="418480" async defer/>
    </>
  );
}
