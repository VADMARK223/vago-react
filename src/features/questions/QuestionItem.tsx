import type { Question } from './questions.ts';
import { CodeBlock } from '@/shared/ui/codeBlock';
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

      {question.answers.map((answer, index) => (
        <div
          key={answer.id}
          style={{
            color: answer.isCorrect ? 'lightgreen' : 'inherit',
            fontWeight: answer.isCorrect ? 'bold' : 'normal',
          }}
        >
          {index + 1}) {answer.text} {answer.isCorrect && '✔️'}
        </div>
      ))}

      {question.explanation.trim() && <p className={styles.explanation}>{question.explanation}</p>}
      <hr />
    </div>
  );
};
