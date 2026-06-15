"use client";

import { useEffect, useState } from "react";
import { QrCode } from "lucide-react";

interface QRCodeBlockProps {
  value: string;
  size?: number;
}

/**
 * Renders a QR code for the given value. Uses the `qrcode` package
 * (loaded dynamically) to generate a data-URL image client-side.
 * Falls back to a placeholder icon if generation fails (e.g. offline demo).
 */
export default function QRCodeBlock({ value, size = 96 }: QRCodeBlockProps) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    import("qrcode")
      .then((QRCode) =>
        QRCode.toDataURL(value, {
          width: size,
          margin: 1,
          color: { dark: "#000000", light: "#ffffff" },
        })
      )
      .then((url) => {
        if (mounted) setDataUrl(url);
      })
      .catch(() => {
        if (mounted) setDataUrl(null);
      });
    return () => {
      mounted = false;
    };
  }, [value, size]);

  return (
    <div className="bg-white p-2 rounded-lg flex items-center justify-center" style={{ width: size + 16, height: size + 16 }}>
      {dataUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={dataUrl} alt="Membership QR code" width={size} height={size} />
      ) : (
        <QrCode size={size * 0.7} className="text-black" />
      )}
    </div>
  );
}
