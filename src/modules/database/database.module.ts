import { Module } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Logger } from '@modules/helper/logger.service';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: (configService, logger) => ({
        dialect: 'mysql',
        host:  configService.get('MYSQL_HOST'),
        port: configService.get('MYSQL_PORT'),
        username: configService.get('MYSQL_USER'),
        password: configService.get('MYSQL_PASSWORD'),
        database: configService.get('MYSQL_DATABASE'),
        autoLoadModels: true,
        synchronize: false,
        logging: msg => logger.db(msg)
      }),
      inject: [ConfigService, Logger]
    }),
  ],
})
export class DatabaseModule {}
