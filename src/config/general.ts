interface IGeneralConfig {
  port: number
  name: string
  environment: string
}

const generalConfig: IGeneralConfig = {
  environment: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT),
  name: 'Back-end',
}

export default generalConfig
