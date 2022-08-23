import Head from "next/head";
import React from "react";

export default function CustomHead({
  title = "VREEL™",
  description = "We make you look better! Our Web3 interface curates and displays your story amazingly.",
  image = "https://staging.vreel.page/assets/icons/Vreel_logo_small.svg",
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="keywords" content={title} />
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />
    </Head>
  );
}
