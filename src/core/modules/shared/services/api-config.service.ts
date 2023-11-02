import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  JwtModuleOptions,
  JwtSecretRequestType,
  JwtSignOptions
} from '@nestjs/jwt'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import type { SequelizeModuleOptions } from '@nestjs/sequelize'
import { ModelOptions } from 'sequelize/types'
import { Dialect } from 'sequelize/types/sequelize'
import { AppConfig, S3Config } from '../../../types'

@Injectable()
export class ApiConfigService {
  private static dialect: Dialect = 'postgres'
  private static define: ModelOptions = {
    timestamps: true,
    updatedAt: true,
    createdAt: true
  }

  constructor(private readonly configService: ConfigService) {}

  public get isDevelopment(): boolean {
    return process.env.NODE_ENV == 'development'
  }

  public get isProduction(): boolean {
    return process.env.NODE_ENV == 'production'
  }

  public get nodeEnv(): string {
    return this.getString('NODE_ENV')
  }

  get appConfig(): AppConfig {
    return {
      port: this.getNumber('PORT'),
      baseUrl: this.getString('BASE_URL'),
      prefix: this.getString('GLOBAL_PREFIX')
    }
  }

  get clientWebUrl(): string {
    return this.getString('CLIENT_WEB_URL')
  }

  get dbConfig(): SequelizeModuleOptions {
    const { dialect, define } = ApiConfigService

    return {
      define,
      dialect,
      autoLoadModels: true,
      synchronize: false,
      port: this.getNumber('DB_PORT'),
      host: this.getString('DB_HOST'),
      username: this.getString('DB_USER'),
      password: this.getString('DB_PASSWORD'),
      database: this.getString('DB_NAME')
    }
  }

  get baseJwtConfig(): JwtModuleOptions {
    return {
      secret: this.getString('JWT_ACCESS_SECRET'),
      signOptions: {
        expiresIn: this.getString('JWT_ACCESS_EXPIRES_IN')
      }
    }
  }

  get S3AccessConfig(): S3Config {
    return {
      accessKeyId: this.getString('S3_ACCESS_SECRET_KEY_ID'),
      secretAccessKey: this.getString('S3_SECRET_ACCESS_KEY')
    }
  }

  get jwtAccessConfig(): JwtSignOptions {
    return {
      secret: this.getString('JWT_ACCESS_SECRET'),
      expiresIn: this.getString('JWT_ACCESS_EXPIRES_IN')
    }
  }

  get jwtRefreshConfig(): JwtSignOptions {
    return {
      secret: this.getString('JWT_REFRESH_SECRET'),
      expiresIn: this.getString('JWT_REFRESH_EXPIRES_IN')
    }
  }

  private get(key: string): string {
    const value = this.configService.get<string>(key)

    if (!value) throw new Error(`${key} environment variable does not set`)

    return value
  }

  get multerConfig(): MulterOptions {
    return {
      dest: this.getString('MULTER_DEST')
    }
  }

  private getBoolean(key: string): boolean {
    const value = this.get(key)

    try {
      return Boolean(JSON.parse(value))
    } catch {
      throw new Error(`${key} environment variable is not a boolean`)
    }
  }

  private getString(key: string): string {
    const value = this.get(key)
    return value.replace(/\\n/g, '\n')
  }

  private getNumber(key: string): number {
    const value = this.get(key)

    try {
      return Number(JSON.parse(value))
    } catch {
      throw new Error(`${key} environment variable is not a number`)
    }
  }
}
