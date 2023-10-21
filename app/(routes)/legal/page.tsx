import { LegalPageMobile } from "@/app/_components/page/mobile/legal";
import { LegalPagePC } from "@/app/_components/page/pc/legal";

export default function LegalPage() {
  const isMobile = true;
  return <>{isMobile ? <LegalPageMobile /> : <LegalPagePC />}</>;
}
