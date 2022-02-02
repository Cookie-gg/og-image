import { Request, Response } from 'express';
import { LemonService } from './lemon.service';
import { Controller, Get, Header, HttpCode, Param, Query, Req, Res } from '@nestjs/common';

@Controller('lemon')
export class LemonController {
  constructor(private readonly lemonService: LemonService) {}

  @Get('/*/:title')
  @HttpCode(200)
  @Header('Content-Type', 'image/png')
  async displayOgPage(
    @Req() req: Request,
    @Res() res: Response,
    @Param('title') title: string,
    @Query('base64') base64?: boolean,
  ) {
    const data = await this.lemonService[req.path.split('/')[2]](title);
    if (base64) {
      return res.end(data.base64);
    } else {
      res.set('Content-Length', `${data.buffer.length}`);
      return res.send(data.buffer);
    }
  }
}
