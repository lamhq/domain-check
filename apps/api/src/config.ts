import { ConfigFactory, ConfigObject } from '@nestjs/config';

export interface AppConfig extends ConfigObject {
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
  kafka: {
    clientId: string;
    broker: string;
    groupId: string;
  };
}

export const configFactory: ConfigFactory<AppConfig> = () => {
  const config: AppConfig = {
    database: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
    kafka: {
      clientId: process.env.KAFKA_CLIENT_ID,
      broker: process.env.KAFKA_BROKER,
      groupId: process.env.KAFKA_GROUP_ID,
    },
  };

  return config;
};

export default configFactory;
