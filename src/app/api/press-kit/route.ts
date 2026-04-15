import { renderToBuffer } from "@react-pdf/renderer";
import { readFileSync } from "fs";
import path from "path";
import { PressKitDocument } from "@/components/PressKitPDF";

export const runtime = "nodejs";

function loadAsset(rel: string): Buffer {
  return readFileSync(path.join(process.cwd(), "public", rel));
}

export async function GET() {
  const photos = [
    loadAsset("press/Glasher 20 2.jpg"),
    loadAsset("press/DSC09352.jpg"),
    loadAsset("press/Glasher 6.jpg"),
  ];
  const chartCover = loadAsset("press/best-wishes-cover.png");

  const buffer = await renderToBuffer(
    PressKitDocument({
      data: {
        photos: photos.map((b) => `data:image/jpeg;base64,${b.toString("base64")}`),
        chartCover: `data:image/png;base64,${chartCover.toString("base64")}`,
        stats: [
          { label: "Spotify Streams", value: "747K" },
          { label: "Monthly Listeners", value: "38K" },
          { label: "Media Followers", value: "2,395" },
          { label: "Radio Plays", value: "47" },
        ],
      },
    })
  );

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="GLASHER-Press-Kit.pdf"',
      "Cache-Control": "no-store",
    },
  });
}
