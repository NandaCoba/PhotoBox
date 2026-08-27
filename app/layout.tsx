import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PHOTOBOX",
  description: "A local-first digital photo booth for little moments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* THESIS: PHOTOBOX is a real-feeling booth ritual, refusing the webcam-dashboard default. OWN-WORLD: off-white photo paper, black camera-room ink, warm gray controls, tactile shutter hardware, and tiny lab-print typography. STORY: enter, count down, shoot a sequence, customize the strip, keep it locally. FIRST VIEWPORT: brand small at top, direct booth copy, primary enter action, and a physical strip preview. FORM: assigned direction 5 from seed 9d326f22, interpreted as a compact print-kiosk and paper-strip experience. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance */}
        {children}
      </body>
    </html>
  );
}
