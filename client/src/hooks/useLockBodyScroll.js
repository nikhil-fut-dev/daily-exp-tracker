import { useEffect } from "react";

export default function useLockBodyScroll(open) {
  useEffect(() => {
    // Desktop par body lock nahi karna
    if (window.innerWidth >= 1024) return;

    if (open) {
      const scrollY = window.scrollY;

      document.body.dataset.scrollY = scrollY;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      const scrollY = parseInt(document.body.dataset.scrollY || "0", 10);

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = "";

      window.scrollTo(0, scrollY);

      delete document.body.dataset.scrollY;
    }

    return () => {
      const scrollY = parseInt(document.body.dataset.scrollY || "0", 10);

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = "";

      window.scrollTo(0, scrollY);

      delete document.body.dataset.scrollY;
    };
  }, [open]);
}
