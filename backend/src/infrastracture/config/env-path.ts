export const getEnvFilePath = (): string => {
  return process.env.NODE_ENV === 'development' ? '.env.development' : '.env';
};
