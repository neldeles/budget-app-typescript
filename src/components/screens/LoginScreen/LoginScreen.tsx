import { THeadingProps } from "components/atoms/Heading/Heading";
import * as React from "react";

export type TLoginScreenProps = {
  /** Pass the Heading component here */
  heading: React.ReactElement<THeadingProps>;
  /** Pass your login form here*/
  form: React.ReactNode;
};

export function LoginScreen({ heading, form }: TLoginScreenProps) {
  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 min-h-screen bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">{heading}</div>
      {form}
    </div>
  );
}
