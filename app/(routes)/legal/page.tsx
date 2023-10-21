"use client";
import { LegalPageMobile } from "@/app/_components/page/mobile/legal";
import { LegalPagePC } from "@/app/_components/page/pc/legal";
import { useIslandInfo } from "@/app/_hooks/island_info";
import { RootState } from "@/app/_store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function LegalPage() {
  const { setIsMobile } = useIslandInfo();

  useEffect(() => {
    // 横幅が600px以下の場合はモバイルとみなす TODO: ここも全ページで使いまわしたい
    setIsMobile(window.innerWidth < 600);
  });
  const isMobile = useSelector((state: RootState) => state.page.isMobile);
  return <>{isMobile ? <LegalPageMobile /> : <LegalPagePC />}</>;
}
