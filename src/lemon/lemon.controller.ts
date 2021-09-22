import { Response } from 'express';
import { LemonService } from './lemon.service';
import { Controller, Get, Header, HttpCode, Param, Res } from '@nestjs/common';

@Controller('lemon')
export class LemonController {
  constructor(private readonly lemonService: LemonService) {}

  @Get('/page/:title')
  @HttpCode(200)
  @Header('Content-Type', 'image/png')
  async displayOgPage(@Param('title') title: string, @Res() res: Response) {
    const data = await this.lemonService.page(title);
    res.set('Content-Length', `${data.buffer.length}`);
    return res.send(data.buffer);
  }

  @Get('/article/:title')
  @HttpCode(200)
  @Header('Content-Type', 'image/png')
  async displayoOgArticle(@Param('title') title: string, @Res() res: Response) {
    const data = await this.lemonService.article(title);
    res.set('Content-Length', `${data.buffer.length}`);
    return res.send(data.buffer);
  }

  @Get('/page/:title/data')
  @HttpCode(200)
  async OgPage(@Param('title') title: string, @Res() res: Response) {
    const data = await this.lemonService.page(title);
    return res.end(data.dataURL);
  }
  @Get('/article/:title/data')
  @HttpCode(200)
  async OgArticle(@Param('title') title: string, @Res() res: Response) {
    const data = await this.lemonService.article(title);
    return res.send(data.dataURL);
  }
}
