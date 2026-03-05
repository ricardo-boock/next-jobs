type ShareBaseProps = {
  socialTitle: string;
  socialUrl: string;
  socialHashtag?: string;
};

export type ShareProps = {
  title: string;
  description?: string;
} & ShareBaseProps;

export type ShareListProps = {
  buttonSize: number;
} & ShareBaseProps;

export type ShareBaseUIProps = {
  className?: string;
} & ShareProps &
  ShareListProps;

export type ShareDrawerProps = ShareBaseUIProps;
export type SharePopoverProps = ShareBaseUIProps;
