import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "next-share";
import { ShareListProps } from "./ShareTypes";

export const ShareList = ({
  socialTitle,
  socialUrl,
  socialHashtag,
  buttonSize,
}: ShareListProps) => {
  return (
    <>
      <FacebookShareButton
        url={socialUrl}
        quote={socialTitle}
        hashtag={socialHashtag}
      >
        <FacebookIcon size={buttonSize} round />
      </FacebookShareButton>

      <RedditShareButton url={socialUrl} title={socialTitle}>
        <RedditIcon size={buttonSize} round />
      </RedditShareButton>

      <TelegramShareButton url={socialUrl} title={socialTitle}>
        <TelegramIcon size={buttonSize} round />
      </TelegramShareButton>

      <TwitterShareButton url={socialUrl} title={socialTitle}>
        <TwitterIcon size={buttonSize} round />
      </TwitterShareButton>

      <WhatsappShareButton url={socialUrl} title={socialTitle}>
        <WhatsappIcon size={buttonSize} round />
      </WhatsappShareButton>

      <LinkedinShareButton url={socialUrl}>
        <LinkedinIcon size={buttonSize} round />
      </LinkedinShareButton>
    </>
  );
};
