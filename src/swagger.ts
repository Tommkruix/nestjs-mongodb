import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export default (app: INestApplication): void => {
  const swaggerOptions = {
    filter: true,
  };

  const config = new DocumentBuilder()
    .setTitle('Musala Soft')
    .setDescription('The Musala Soft API description')
    .setVersion('1.0')
    .addTag('Musala Soft')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions,
  });
};
