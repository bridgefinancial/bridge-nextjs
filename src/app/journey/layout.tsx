import QuestionnaireHeader from '@/components/organisms/headers/QuestionnaireHeader';
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const JourneyLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className="flex flex-col items-stretch w-screen h-screen justify-stretch">
        <QuestionnaireHeader />

        <div className="w-full bg-white grow">
          <div className="box-border flex flex-col min-h-full pt-4 mx-auto ">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default JourneyLayout;
