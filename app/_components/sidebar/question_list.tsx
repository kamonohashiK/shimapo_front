import { Accordion, AccordionSummary, Typography, AccordionDetails, Divider, Button, Stack } from "@mui/material";

interface QuestionListProps {
    questions: {
        question: string;
        answerCount: number;
        answers: {
            content: string;
            postedAt: string;
            postedBy: string;
            postedByImage: string;
            likes: number;
        }[];
    }[];
}

export default function QuestionList(props: QuestionListProps) {
    return (
      <>
        {props.questions.map((item, index) => (
          <Accordion key={index}>
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="subtitle1">
                {item.question}({item.answerCount})
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {item.answerCount === 0 ? (
                <Typography gutterBottom paragraph>
                  この質問にはまだ回答がありません。
                </Typography>
              ) : (
                item.answers.map((answer, index) => (
                    <Typography gutterBottom paragraph key={index}>
                        {answer.content}
                    </Typography>
                ))
              )}
              <Divider />
              <Button color="primary" variant="outlined" fullWidth>
                この質問に回答する
              </Button>
            </AccordionDetails>
          </Accordion>
        ))}
      </>
    );
}