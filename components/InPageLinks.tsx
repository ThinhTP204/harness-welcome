"use client";

import { useEffect } from "react";

/** Link trong cùng trang chỉ cuộn tới section, không ghi #... lên URL. */
export default function InPageLinks() {
  useEffect(() => {
    if (window.location.hash) window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);

    const onClick = (event: MouseEvent) => {
      // Ctrl/Cmd-click vẫn để trình duyệt mở tab mới như bình thường.
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = (event.target as Element).closest('a[href^="#"]');
      const target = link ? document.getElementById(link.getAttribute("href")!.slice(1)) : null;
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView();
      // Phím Tab đi tiếp từ section vừa tới, giống link # gốc của trình duyệt.
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
