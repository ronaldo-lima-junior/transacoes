import { env } from '../env'

interface IGeneralConfig {
  port: number
  name: string
  environment: string
}

const generalConfig: IGeneralConfig = {
  environment: env.NODE_ENV,
  port: Number(env.PORT),
  name: 'Back-end',
}

export default generalConfig
