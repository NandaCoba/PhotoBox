import { filters, papers } from "./options";
import type { BoothSession, LayoutType, PaperDecorationType } from "./types";

type Rect = { x: number; y: number; width: number; height: number };
type Paper = { id: string; color: string; ink: string };

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

const clampPhotoCount = (count: number) => Math.min(Math.max(count, 1), 6);
const portraitHeight = (width: number) => width * 1.25;

export const getCanvasSize = (layout: LayoutType, photoCount = 4) => {
  const count = clampPhotoCount(photoCount);
  if (layout === "double") {
    const width = 1800;
    const stripWidth = width / 2;
    const margin = 92;
    const gap = 54;
    const footer = 430;
    const photoWidth = stripWidth - margin * 2;
    return { width, height: Math.ceil(margin * 2 + portraitHeight(photoWidth) * count + gap * (count - 1) + footer) };
  }
  if (layout === "grid") {
    const width = 1800;
    const margin = 120;
    const gap = 58;
    const footer = 430;
    const rows = Math.ceil(count / 2);
    const photoWidth = (width - margin * 2 - gap) / 2;
    return { width, height: Math.ceil(margin * 2 + portraitHeight(photoWidth) * rows + gap * (rows - 1) + footer) };
  }
  if (layout === "polaroid") return { width: 1600, height: count > 3 ? 2300 : 2000 };
  {
    const width = 1200;
    const margin = 92;
    const gap = 54;
    const footer = 430;
    const photoWidth = width - margin * 2;
    return { width, height: Math.ceil(margin * 2 + portraitHeight(photoWidth) * count + gap * (count - 1) + footer) };
  }
};

const setFont = (ctx: CanvasRenderingContext2D, weight: number, size: number, family = '"Trebuchet MS", "Gill Sans", sans-serif') => {
  ctx.font = `${weight} ${size}px ${family}`;
};

const drawPaperBase = (ctx: CanvasRenderingContext2D, paper: Paper, width: number, height: number) => {
  ctx.fillStyle = paper.color;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.globalAlpha = paper.id === "black" ? 0.16 : 0.09;
  ctx.fillStyle = paper.id === "black" ? "#f4f1ea" : "#171717";
  for (let x = 12; x < width; x += 30) {
    for (let y = 10; y < height; y += 30) {
      if ((x + y) % 90 === 0) ctx.fillRect(x, y, 2, 2);
    }
  }
  ctx.restore();

  ctx.save();
  const edge = paper.id === "black" ? "rgba(244,241,234,.16)" : "rgba(23,23,23,.1)";
  ctx.strokeStyle = edge;
  ctx.lineWidth = 4;
  ctx.strokeRect(18, 18, width - 36, height - 36);
  ctx.restore();
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

const drawFooter = (ctx: CanvasRenderingContext2D, session: BoothSession, paper: Paper, width: number, height: number) => {
  ctx.save();
  ctx.filter = "none";
  ctx.fillStyle = paper.ink;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  const title = session.caption?.trim() || "PHOTOBOX";
  const titleSize = title.length > 18 ? 58 : 68;
  setFont(ctx, 700, titleSize);
  ctx.fillText(title.toUpperCase(), width / 2, height - 235);

  if (session.showDate) {
    setFont(ctx, 400, 40, '"Courier New", Courier, monospace');
    ctx.fillText(formatDate(), width / 2, height - 162);
  }

  setFont(ctx, 400, 30, '"Courier New", Courier, monospace');
  ctx.globalAlpha = 0.78;
  ctx.fillText("little moments, kept.", width / 2, height - 82);
  ctx.restore();
};

export async function renderPhotoStrip(session: BoothSession): Promise<string> {
  const requestedCount = clampPhotoCount(session.captureCount || session.photos.length || 4);
  const { width, height } = getCanvasSize(session.layout, requestedCount);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not available.");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  const paper = papers.find((item) => item.id === session.paper) ?? papers[0];
  const filter = filters.find((item) => item.id === session.filter) ?? filters[0];
  const images = (await Promise.all(session.photos.map(loadImage))).slice(0, requestedCount);

  drawPaperBase(ctx, paper, width, height);
  drawPaperDecoration(ctx, session.paperDecoration ?? "plain", width, height, paper.ink);

  const drawPhoto = (image: HTMLImageElement, rect: Rect) => {
    ctx.save();
    ctx.shadowColor = "rgba(23,23,23,.16)";
    ctx.shadowBlur = 16;
    ctx.shadowOffsetY = 10;
    ctx.fillStyle = paper.id === "black" ? "#242424" : "#fdfcf7";
    ctx.fillRect(rect.x - 16, rect.y - 16, rect.width + 32, rect.height + 32);
    ctx.shadowColor = "transparent";
    ctx.strokeStyle = paper.id === "black" ? "rgba(244,241,234,.18)" : "rgba(23,23,23,.12)";
    ctx.lineWidth = 3;
    ctx.strokeRect(rect.x - 16, rect.y - 16, rect.width + 32, rect.height + 32);
    ctx.beginPath();
    ctx.rect(rect.x, rect.y, rect.width, rect.height);
    ctx.clip();
    ctx.filter = filter.canvas;
    cover(ctx, image, rect);
    ctx.restore();
  };

  if (session.layout === "double") {
    const stripWidth = width / 2;
    const margin = 92;
    const gutter = 54;
    const photoWidth = stripWidth - margin * 2;
    const photoHeight = portraitHeight(photoWidth);
    ctx.save();
    ctx.strokeStyle = paper.id === "black" ? "rgba(244,241,234,.24)" : "rgba(23,23,23,.16)";
    ctx.setLineDash([22, 20]);
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(width / 2, 70);
    ctx.lineTo(width / 2, height - 70);
    ctx.stroke();
    ctx.restore();
    images.forEach((image, index) => {
      [0, 1].forEach((column) => {
        const x = column * stripWidth + margin;
        const y = margin + index * (photoHeight + gutter);
        drawPhoto(image, { x, y, width: photoWidth, height: photoHeight });
      });
    });
  } else if (session.layout === "grid") {
    const margin = 120;
    const gap = 58;
    const photoWidth = (width - margin * 2 - gap) / 2;
    const photoHeight = portraitHeight(photoWidth);
    images.forEach((image, index) => {
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
    if (main) drawPhoto(main, { x: margin, y: margin, width: width - margin * 2, height: 1160 });
    const thumbGap = 34;
    const thumbCols = Math.min(3, Math.max(1, images.length - 1));
    const thumbWidth = (width - margin * 2 - thumbGap * (thumbCols - 1)) / thumbCols;
    images.slice(1, 4).forEach((image, index) => {
      drawPhoto(image, { x: margin + index * (thumbWidth + thumbGap), y: 1360, width: thumbWidth, height: 330 });
    });
    images.slice(4, 6).forEach((image, index) => {
      drawPhoto(image, { x: margin + index * (thumbWidth + thumbGap), y: 1780, width: thumbWidth, height: 300 });
    });
  } else {
    const margin = 92;
    const gap = 54;
    const photoWidth = width - margin * 2;
    const photoHeight = portraitHeight(photoWidth);
    images.forEach((image, index) => {
      drawPhoto(image, {
        x: margin,
        y: margin + index * (photoHeight + gap),
        width: photoWidth,
        height: photoHeight,
      });
    });
  }

  drawFooter(ctx, session, paper, width, height);

  return canvas.toDataURL("image/png");
}
