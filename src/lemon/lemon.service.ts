import { Injectable } from '@nestjs/common';
import { createCanvas, loadImage, registerFont } from 'canvas';

@Injectable()
export class LemonService {
  async page(title: string): Promise<{ buffer: Buffer; base64: string }> {
    const WIDTH = 1200 as const;
    const HEIGHT = 630 as const;
    const DX = 0 as const;
    const DY = 0 as const;
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext('2d');

    const backgroundImage = await loadImage(`${process.cwd()}/public/page-background.png`);
    ctx.drawImage(backgroundImage, DX, DY, WIDTH, HEIGHT);
    registerFont(`${process.cwd()}/public/JosefinSans-BoldItalic.ttf`, {
      family: 'Josefin Sans',
    });
    ctx.fillStyle = 'transparent';
    ctx.fillRect(DX, DY, WIDTH, HEIGHT);
    ctx.font = '82.5px "Josefin Sans"';
    ctx.fillStyle = '#1F1F1F';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(title, 600, process.env.PORT ? 402.5 : 385);
    const buffer = canvas.toBuffer();
    const base64 = canvas.toDataURL();
    return { buffer, base64 };
  }

  async article(title: string): Promise<{ buffer: Buffer; base64: string }> {
    const WIDTH = 1200 as const;
    const HEIGHT = 630 as const;
    const DX = 0 as const;
    const DY = 0 as const;
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext('2d');

    const backgroundImage = await loadImage(`${process.cwd()}/public/article-background.png`);
    ctx.drawImage(backgroundImage, DX, DY, WIDTH, HEIGHT);
    registerFont(`${process.cwd()}/public/NotoSansJP-Bold.otf`, {
      family: 'Noto Sans JP',
    });
    ctx.fillStyle = 'transparent';
    ctx.fillRect(DX, DY, WIDTH, HEIGHT);
    ctx.font = '50px Noto Sans JP';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    let refer = '';
    const linedText: string[] = [];
    for (let i = 0; i < title.length; i++) {
      if (ctx.measureText(`${refer}${title[i]}`).width > 650) {
        if (
          title[i].match(
            /\u3041|\u3043|\u3045|\u3047|\u3039|\u3063|\u3083|\u3085|\u3087|\u308E|\u3095|\u3096|\u30A1|\u30A3|\u30A5|\u30A7|\u30A9|\u30C3|\u30E3|\u30E5|\u30E7|\u30EE|\u30F5|\u30F6/,
          )
        ) {
          linedText.push(refer + title[i]);
          refer = '';
        } else {
          refer = title[i];
        }
      } else if (i === title.length - 1) linedText.push(`${refer}${title[i]}`);
      else refer += title[i];
    }

    ctx.fillText(linedText.join('\n'), 150, 315 - 25 * linedText.length);

    const buffer = canvas.toBuffer();
    const base64 = canvas.toDataURL();
    return { buffer, base64 };
  }
}
