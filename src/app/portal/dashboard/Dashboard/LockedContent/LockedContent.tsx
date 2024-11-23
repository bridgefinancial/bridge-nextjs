import ParagraphText from '@/components/atoms/typography/ParagraphText';
import { routePaths } from '@/types/routes.enum';
import clsx from 'clsx';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import './LockedContent.css';

type LockedContentProps = {
  buttonLabel?: string;
  children?: React.ReactNode;
  body?: string;
  blurred: boolean;
  buttonHref?: string;
  onAction?: () => void;
};

const LockedContent = ({
  buttonLabel = 'Complete Profile',
  buttonHref,
  children,
  body,
  blurred = true,
  onAction,
}: LockedContentProps) => {
  const onButtonClick = () => {
    onAction?.();
  };

  return (
    <div className="blur-container h-full min-h-[300px]">
      <div className={clsx('h-full', { 'blurred-content': blurred })}>
        {/* Replace with the actual content passed in */}
        {children}
      </div>
      {blurred && (
        <div className="overlay h-full">
          <div className="p-4 max-w-[400px] m-4 rounded-[20px] h-fit bg-white bg-opacity-70">
            <div className="lock-icon">
              🔒
              {/* You can use an actual icon from a library like FontAwesome if preferred */}
            </div>
            <ParagraphText className="p-4">{body}</ParagraphText>
            <Link
              className="cursor-pointer text-sm font-semibold text-bridge-dark-purple"
              onClick={onButtonClick}
              href={buttonHref ?? routePaths.DASHBOARD}
            >
              {buttonLabel}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

LockedContent.propTypes = {
  buttonLabel: PropTypes.string,
  body: PropTypes.string,
  blurred: PropTypes.bool,
  onAction: PropTypes.func,
};

export default LockedContent;
