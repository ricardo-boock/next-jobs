type SearchBarBaseProps = {
  className?: string;
  placeholder?: string;
  showReset?: boolean;
};

export type SearchBarFilterProps = SearchBarBaseProps & {
  id: string;
  label: string;
  value: string;
  onValueChange: (value: string) => void;
};

export type SearchBarNavigateProps = SearchBarBaseProps & {
  searchParam?: string;
  targetUrl: string;
};
