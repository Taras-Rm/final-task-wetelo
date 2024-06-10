import { PropsWithChildren, ReactNode } from "react";

interface PageWrapperProps extends PropsWithChildren {
  title?: string;
  buttons?: ReactNode;
}

function PageWrapper({ children, title = "", buttons }: PageWrapperProps) {
  return (
    <div className="max-w-3xl w-full mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">{title}</h2>
        {buttons}
      </div>

      <div className="mt-6">{children}</div>
    </div>
  );
}

export default PageWrapper;
