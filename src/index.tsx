// eslint-disable-next-line import/no-extraneous-dependencies
import LikeMinds from 'likeminds-chat-beta';

import './index.css';

export const myClient = new LikeMinds({
  apiKey: process.env.CM_API_KEY!,
  xPlatformCode: process.env.REACT_APP_LM_PLATFORM_CODE,
  xVersionCode: process.env.REACT_APP_LM_VERSION_CODE
});
