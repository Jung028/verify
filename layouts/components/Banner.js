import { gsap } from "@lib/gsap";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { useEffect, useRef } from "react";
import ImageFallback from "./ImageFallback";

const Banner = ({ title }) => {
  const banner = useRef(null);

  //banner animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const header = document.querySelector(".header");
      const tl = gsap.timeline();
      tl.fromTo(
        ".banner-regular-title",
        {
          y: 20,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
        }
      ).fromTo(
        ".breadcrumb",
        {
          y: 20,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
        },
        ">-.3"
      );
      //parallax banner
      const parallaxTl = gsap.timeline({
        ease: "none",
        scrollTrigger: {
          trigger: banner.current,
          start: () => `top ${header.clientHeight}`,
          end: () => `+=${banner.current.offsetHeight}`,
          scrub: true,
        },
      });

      const position = banner.current.offsetHeight * 0.15;
      parallaxTl.fromTo(
        ".banner-single .circle",
        {
          y: 0,
        },
        {
          y: position,
        },
        "<"
      );
    }, banner);

    return () => ctx.revert();
  }, []);

  return (
    <div className="banner banner-single " ref={banner}>
      <div className="container-xl ">
        <div className="banner-wrapper relative text-center">
          {markdownify(title, "h1", "mb-8 banner-regular-title opacity-0")}
          <ul className="breadcrumb flex items-center justify-center opacity-0">
            <li>
              <Link className="text-primary" href="/">
                Home
              </Link>
            </li>
            <li className="mx-2">/</li>
            <li className="capitalize">{title}</li>
          </ul>
          <div className="bg-theme banner-bg col-12 absolute top-0 left-0 bg-white before:hidden after:hidden">
            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

/*
<ImageFallback
priority={true}
fill={true}
src="/images/vectors/single-banner-wave-1.svg"
sizes="100vw"
alt=""
/>
<ImageFallback
priority={true}
fill={true}
src="/images/vectors/single-banner-wave-2.svg"
sizes="100vw"
alt=""
/>
*/