import { getConfig } from '@/utils';

const configData = getConfig().FEISHU_CONFIG;

export const APP_ID = configData.FEISHU_APP_ID;
export const APP_SECRET = configData.FEISHU_APP_SECRET;
