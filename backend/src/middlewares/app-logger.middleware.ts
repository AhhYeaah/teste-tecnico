import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, path: url } = request;

    // Override the response.json method to save the response body
    const oldJson = response.json;
    response.json = (body) => {
      response.locals.body = body;
      return oldJson.call(response, body);
    };

    // Log it when the response is closed
    response.on('close', () => {
      const { statusCode } = response;

      this.logger.log(
        this.createResponseString(
          method,
          url,
          statusCode,
          request.body,
          request.params,
          response.locals.body,
        ),
      );
    });

    next();
  }

  private createResponseString(
    method: string,
    url: string,
    statusCode: number,
    requestBody: Record<string, any>,
    requestParams: Record<string, any>,
    responseBody: Record<string, any>,
  ): string {
    return (
      `\nNew ${method} request at ${url} ended with a response code ${statusCode}\n` +
      `Body: ${JSON.stringify(requestBody)}\n` +
      `Params: ${JSON.stringify(requestParams)}\n` +
      `Response: ${JSON.stringify(responseBody)}`
    );
  }
}
