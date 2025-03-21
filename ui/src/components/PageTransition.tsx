import React from "react";

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return <div className="fadeIn slideUp">{children}</div>;
};

export default PageTransition;
