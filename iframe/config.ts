import { ChatConfig, isObject } from '@/common';

export const WIDGET_URL = import.meta.env.VITE_WIDGET_URL;

const validateVerify = (verify: unknown): verify is ChatConfig['verify'] => {
  return isObject(verify) && typeof verify.projectID === 'string';
};

export const sanitizeConfig = (config: unknown): Partial<ChatConfig> & Pick<ChatConfig, 'verify'> => {
  const ref = isObject(config) ? config : {};
  const { url, userID, versionID, verify } = ref;

  if (!validateVerify(verify)) {
    throw new Error('no projectID on load');
  }

  return {
    verify,
    ...(typeof url === 'string' && { url }),
    ...(typeof userID === 'string' && { userID }),
    ...(typeof userID === 'number' && { userID: userID.toString() }),
    ...(typeof versionID === 'string' && { versionID }),
  };
};
