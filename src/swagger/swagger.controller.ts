import { Controller, Get, Header, Res } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { FastifyInstance, FastifyReply } from 'fastify';

const customSwaggerHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Swagger UI</title>
  <link rel="stylesheet" type="text/css" href="/${process.env.NODE_ENV}/static-docs/swagger-ui.css" >
</head>

<body>
  <div id="swagger-ui"></div>

  <script src="/${process.env.NODE_ENV}/static-docs/swagger-ui-bundle.js"> </script>
  <script src="/${process.env.NODE_ENV}/static-docs/swagger-ui-standalone-preset.js"> </script>
  <script>
  window.onload = function() {
    // Build a system
    const ui = SwaggerUIBundle({
      url: "/${process.env.NODE_ENV}/api-docs/json", // Update this if you have a custom path for your Swagger JSON
      dom_id: '#swagger-ui',
      deepLinking: true,
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset
      ],
      plugins: [
        SwaggerUIBundle.plugins.DownloadUrl
      ],
      layout: "StandaloneLayout"
    });

    window.ui = ui;
  };
  </script>
</body>
</html>
`;

@Controller('api-docs')
export class SwaggerController {
  constructor(private adapterHost: HttpAdapterHost) {}

  @Get('')
  @Header('Content-Type', 'text/html')
  serveSwaggerUI(@Res({ passthrough: true }) res: FastifyReply) {
    res.type('text/html').send(customSwaggerHtml);
  }

  @Get('json')
  serveSwaggerJson(@Res({ passthrough: true }) res: FastifyReply) {
    res.send(global.swaggerDocument);
  }

  private extractRoutesFromPrintRoutes(
    routesString: string,
    baseUrl = 'http://localhost:3000/local/',
  ) {
    const lines = routesString?.split('\n'); // Split into individual route lines
    console.dir(lines);

    const routes = [];
    let currentPath = ''; // Track nested path hierarchy

    lines.forEach((line) => {
      console.log('LINE', line);
      const trimmedLine = line.trim();

      // Identifies a valid endpoint
      if (trimmedLine.endsWith('(GET,HEAD)')) {
        // Remove method details and clean up path
        let routePath = trimmedLine.replace(/^\s+|\s+$/g, '');
        routePath = routePath.replace(/^\/|\/$/g, '');
        routePath = currentPath + routePath;
        routes.push(baseUrl + routePath);
      } else if (trimmedLine.startsWith('│')) {
        currentPath += trimmedLine.replace(/[├└─│]/g, '').trim() + '/';
      } else if (trimmedLine.length === 0) {
        // Handling empty lines & resets
        currentPath = '';
      }
    });

    console.log('ROUTES', routes);

    return routes;
  }

  @Get('routes')
  getRoutes() {
    const appInstance: FastifyInstance =
      this.adapterHost.httpAdapter.getInstance();
    const routesOutput = appInstance.printRoutes();
    console.log('ROUTES OUTPUT', routesOutput);
    const routes = this.extractRoutesFromPrintRoutes(routesOutput);
    return routes;
  }
}
