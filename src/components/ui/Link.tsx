import { Link, LinkProps } from "@mui/material";
import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";

type Props = {
  to: string;
  children: any;
};

export const LinkComponent: FC<Props & LinkProps> = ({
  to,
  children,
  ...rest
}) => {
  return (
    <Link to={to} component={RouterLink} {...rest}>
      {children}
    </Link>
  );
};
