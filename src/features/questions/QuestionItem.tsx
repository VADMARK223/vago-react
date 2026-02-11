import type { Question } from './questions.ts';
import { CodeBlock } from '../../shared/ui/codeBlock/CodeBlock.tsx';
import styles from './QuestionPage.module.css';

interface Props {
  question: Question;
}

export const QuestionItem = ({ question }: Props) => {
  return (
    <div style={{ paddingBottom: 6 }}>
      <b>
        {question.id}. {question.text}
      </b>
      {question.code.trim() && <CodeBlock code={question.code} />}
      {question.explanation.trim() && <p className={styles.explanation}>{question.explanation}</p>}
      <hr />
    </div>
  );
};
