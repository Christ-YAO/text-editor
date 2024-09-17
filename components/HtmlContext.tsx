import React from 'react';

interface HtmlContentProps {
  content: string;
}

const HtmlContent: React.FC<HtmlContentProps> = ({ content }) => {
  return (
    <div className='space-y-4' style={{ whiteSpace: "pre-line" }} dangerouslySetInnerHTML={{ __html: content }} />
  );
};

export default HtmlContent;
