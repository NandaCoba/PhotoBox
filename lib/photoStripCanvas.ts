import { filters, papers } from "./options";
import type { BoothSession, LayoutType, PaperDecorationType } from "./types";

type Rect = { x: number; y: number; width: number; height: number };

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Photo could not be loaded."));
    image.src = src;
  });

const cover = (ctx: CanvasRenderingContext2D, image: HTMLImageElement, rect: Rect) => {
  const scale = Math.max(rect.width / image.width, rect.height / image.height);
  const width = image.width * scale;
  const height = image.height * scale;
  const x = rect.x + (rect.width - width) / 2;
  const y = rect.y + (rect.height - height) / 2;
  ctx.drawImage(image, x, y, width, height);
};

const formatDate = () =>
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  })
    .format(new Date())
    .replaceAll("/", " · ");

export const getCanvasSize = (layout: LayoutType) => {
  if (layout === "double") return { width: 1800, height: 3600 };
  if (layout === "grid") return { width: 1800, height: 2400 };
  if (layout === "polaroid") return { width: 1600, height: 2000 };
  return { width: 1200, height: 3600 };
};

const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.PI / 4);
  ctx.fillStyle = color;
  ctx.fillRect(-size / 2, -size / 2, size, size);
  ctx.beginPath();
  ctx.arc(0, -size / 2, size / 2, 0, Math.PI * 2);
  ctx.arc(-size / 2, 0, size / 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};

const drawPaperDecoration = (
  ctx: CanvasRenderingContext2D,
  decoration: PaperDecorationType,
  width: number,
  height: number,
  ink: string,
) => {
  if (decoration === "plain") return;

  ctx.save();
  ctx.globalAlpha = decoration === "tape" ? 0.65 : 0.32;

  if (decoration === "stamp") {
    ctx.strokeStyle = ink;
    ctx.fillStyle = ink;
    ctx.lineWidth = 4;
    ctx.font = "34px Courier New, monospace";
    ctx.translate(width - 230, 150);
    ctx.rotate(0.1);
    ctx.strokeRect(0, 0, 150, 62);
    ctx.fillText("PHOTOBOX", 14, 41);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(74, height - 520);
    ctx.rotate(-0.12);
    ctx.strokeRect(0, 0, 118, 54);
    ctx.font = "28px Courier New, monospace";
    ctx.fillText("KEEP", 22, 36);
  }

  if (decoration === "hearts") {
    const points = [
      [width * 0.1, height * 0.12],
      [width * 0.86, height * 0.34],
      [width * 0.1, height * 0.58],
      [width * 0.86, height * 0.82],
    ];
    points.forEach(([x, y]) => drawHeart(ctx, x, y, Math.max(20, width * 0.028), ink));
  }

  if (decoration === "tape") {
    ctx.fillStyle = "#e2ded3";
    ctx.translate(-40, 210);
    ctx.rotate(-0.2);
    ctx.fillRect(0, 0, 190, 62);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(width - 150, height - 640);
    ctx.rotate(-0.2);
    ctx.fillRect(0, 0, 190, 62);
  }

  if (decoration === "film") {
    ctx.fillStyle = ink;
    ctx.font = "28px Courier New, monospace";
    ctx.save();
    ctx.translate(28, 140);
    ctx.rotate(Math.PI / 2);
    ctx.fillText("PHOTOBOX 27", 0, 0);
    ctx.restore();
    ctx.save();
    ctx.translate(width - 28, height - 720);
    ctx.rotate(Math.PI / 2);
    ctx.fillText("400TX / 04", 0, 0);
    ctx.restore();
    for (let y = 250; y < height - 420; y += 210) {
      ctx.fillRect(34, y, 26, 58);
      ctx.fillRect(width - 60, y + 90, 26, 58);
    }
  }

  ctx.restore();
};

export async function renderPhotoStrip(session: BoothSession): Promise<string> {
  const { width, height } = getCanvasSize(session.layout);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not available.");

  const paper = papers.find((item) => item.id === session.paper) ?? papers[0];
  const filter = filters.find((item) => item.id === session.filter) ?? filters[0];
  const images = await Promise.all(session.photos.map(loadImage));

  ctx.fillStyle = paper.color;
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "rgba(0,0,0,.045)";
  for (let x = 0; x < width; x += 28) {
    for (let y = 0; y < height; y += 28) {
      if ((x + y) % 84 === 0) ctx.fillRect(x, y, 2, 2);
    }
  }
  drawPaperDecoration(ctx, session.paperDecoration ?? "plain", width, height, paper.ink);

  const drawPhoto = (image: HTMLImageElement, rect: Rect) => {
    ctx.save();
    ctx.fillStyle = paper.id === "black" ? "#242424" : "#ffffff";
    ctx.fillRect(rect.x - 10, rect.y - 10, rect.width + 20, rect.height + 20);
    ctx.beginPath();
    ctx.rect(rect.x, rect.y, rect.width, rect.height);
    ctx.clip();
    ctx.filter = filter.canvas;
    cover(ctx, image, rect);
    ctx.restore();
  };

  if (session.layout === "double") {
    const stripWidth = width / 2;
    const margin = 80;
    const gutter = 42;
    const photoWidth = stripWidth - margin * 2;
    const photoHeight = 660;
    images.slice(0, 4).forEach((image, index) => {
      [0, 1].forEach((column) => {
        const x = column * stripWidth + margin;
        const y = margin + index * (photoHeight + gutter);
        drawPhoto(image, { x, y, width: photoWidth, height: photoHeight });
      });
    });
  } else if (session.layout === "grid") {
    const margin = 120;
    const gap = 48;
    const photoWidth = (width - margin * 2 - gap) / 2;
    const photoHeight = 760;
    images.slice(0, 4).forEach((image, index) => {
      const col = index % 2;
      const row = Math.floor(index / 2);
      drawPhoto(image, {
        x: margin + col * (photoWidth + gap),
        y: margin + row * (photoHeight + gap),
        width: photoWidth,
        height: photoHeight,
      });
    });
  } else if (session.layout === "polaroid") {
    const margin = 120;
    const main = images[0];
    if (main) drawPhoto(main, { x: margin, y: margin, width: width - margin * 2, height: 1180 });
    images.slice(1, 4).forEach((image, index) => {
      drawPhoto(image, { x: margin + index * 455, y: 1370, width: 400, height: 300 });
    });
  } else {
    const margin = 86;
    const gap = 44;
    const footer = 360;
    const photoHeight = (height - margin * 2 - footer - gap * 3) / 4;
    images.slice(0, 4).forEach((image, index) => {
      drawPhoto(image, {
        x: margin,
        y: margin + index * (photoHeight + gap),
        width: width - margin * 2,
        height: photoHeight,
      });
    });
  }

  ctx.filter = "none";
  ctx.fillStyle = paper.ink;
  ctx.textAlign = "center";
  ctx.font = "700 72px Arial, sans-serif";
  const footerY = height - 230;
  ctx.fillText(session.caption?.trim() || "PHOTOBOX", width / 2, footerY);
  if (session.showDate) {
    ctx.font = "42px Courier New, monospace";
    ctx.fillText(formatDate(), width / 2, footerY + 74);
  }
  ctx.font = "32px Courier New, monospace";
  ctx.fillText("little moments, kept.", width / 2, height - 72);

  return canvas.toDataURL("image/png");
}
