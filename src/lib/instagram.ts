import { eventConfig } from '@/data/event';

const { hashtag, instagram } = eventConfig;
const tag = hashtag.replace('#', '').toLowerCase();

/** Every Instagram string derives from eventConfig: edit the handle or hashtag there and nothing else. */
export const instagramLinks = {
  handle: `@${instagram.handle}`,
  profileUrl: `https://www.instagram.com/${instagram.handle}/`,
  hashtagUrl: `https://www.instagram.com/explore/tags/${tag}/`,
  caption: `${hashtag} @${instagram.handle}`,
};