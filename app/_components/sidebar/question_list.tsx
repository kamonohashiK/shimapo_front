import { Accordion, AccordionSummary, Typography, AccordionDetails, Divider, Button, Stack, Avatar } from "@mui/material";

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
            <Divider sx={{ my: 2 }} />
            <AccordionDetails>
              {item.answerCount === 0 ? (
                <Typography gutterBottom paragraph>
                  この質問にはまだ回答がありません。
                </Typography>
              ) : (
                item.answers.map((answer, index) => (
                  <>
                    <Stack direction="row" >
                      <Avatar alt="回答者" src={answer.postedByImage} />
                      <Typography variant="subtitle2">
                        {answer.postedBy}
                      </Typography>
                    </Stack>
                    <Typography gutterBottom paragraph key={index}>
                      {answer.content}
                    </Typography>
                    <Stack direction="row" spacing={2}>
                      <Typography variant="caption">
                        b {answer.likes}
                      </Typography>
                      <Typography variant="caption">q</Typography>
                      <Typography variant="caption">
                        {answer.postedAt} に回答
                      </Typography>
                    </Stack>
                    <Divider sx={{ my: 1 }} />
                  </>
                ))
              )}
              <Button color="primary" variant="outlined" fullWidth>
                この質問に回答する
              </Button>
            </AccordionDetails>
          </Accordion>
        ))}
        <Divider sx={{ my: 2 }} />
        <Button color="primary" variant="outlined" fullWidth>
          新たに質問する
        </Button>
      </>
    );
}