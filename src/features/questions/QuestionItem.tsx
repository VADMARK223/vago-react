import type { Question } from './questions.ts';
import { CodeBlock } from '../book/CodeBlock.tsx';

interface Props {
  question: Question;
}

export const QuestionItem = ({ question }: Props) => {
  return (
    <div style={{ paddingBottom: 12 }}>
      <b>
        {question.id}. {question.text}
      </b>
      {question.code.trim() && <CodeBlock code={question.code} />}
      <p>{question.explanation}</p>
      <hr />
    </div>
  );
};
