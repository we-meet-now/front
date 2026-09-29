import ReactMarkdown from 'react-markdown';

import remarkGfm from 'remark-gfm';

import * as styles from './markdown.css';

type MarkdownProps = {
  children: string;
};

// raw HTML은 렌더링하지 않는다(XSS 방지). rehype-raw 추가 금지
export const Markdown = ({ children }: MarkdownProps) => {
  return (
    <div className={styles.markdown}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          table: ({ children }) => (
            <div className={styles.tableWrapper}>
              <table>{children}</table>
            </div>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};
