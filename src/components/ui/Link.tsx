import { Link, LinkProps } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { Link as RouterLink } from "react-router-dom";

interface Props {
    to: string;
}

export const LinkComponent: FC<Props & PropsWithChildren & LinkProps> = ({ to, children, ...rest }) => {
    return (
        <Link to={to} component={RouterLink} {...rest}>
            {children}
        </Link>
    )
} 