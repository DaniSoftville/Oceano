// RouterLink.tsx
import { Link as RouterLink, LinkProps } from "react-router-dom";
import React from "react";

type RouterLinkProps = LinkProps & React.RefAttributes<HTMLAnchorElement>;

const CustomRouterLink = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(
  (props, ref) => <RouterLink ref={ref} {...props} />
);

export default CustomRouterLink;
