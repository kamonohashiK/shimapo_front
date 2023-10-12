import dialogTypes from "@/app/_constants/dialog_types";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Divider,
  Button,
  Avatar,
  Stack,
  Link,
} from "@mui/material";
import { useDialog } from "@/app/_hooks/dialog";
import { useDispatch } from "react-redux";
import { setFocusedQuestion } from "@/app/_store/pageSlice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Launch } from "@mui/icons-material";
import parse from "html-react-parser";
interface QuestionListProps {
  questions: any[];
}

// テキストの改行コードをbrタグに変換する+サニタイズ TODO: 共通化
const sanitize = (text: string) => {
  const sanitizedText = text.replace(/\r?\n/g, "<br>");
  return parse(sanitizedText);
};

export default function QuestionList(props: QuestionListProps) {
  const { showDialog } = useDialog();
  const dispatch = useDispatch();

  return (
    <>
      {props.questions.map((item, index) => (
        <Accordion key={index}>
          <AccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
            expandIcon={<ExpandMoreIcon />}
            onClick={() => {
              dispatch(
                setFocusedQuestion({
                  focusedQuestionId: item.id,
                  focusedQuestion: item.question,
                })
              );
            }}
          >
            <Typography variant="subtitle1">
              {item.question}({item.answer_count})
            </Typography>
          </AccordionSummary>
          <Divider sx={{ my: 2 }} />
          <AccordionDetails>
            {item.answer_count === 0 ? (
              <Typography gutterBottom paragraph>
                この質問にはまだ回答がありません。
              </Typography>
            ) : (
              item.answers.map((answer: any) => (
                <>
                  <Stack direction="row">
                    <Avatar alt="回答者" src={answer.posted_user.image_url} />
                    <Typography variant="subtitle2">
                      {answer.posted_user.name}
                    </Typography>
                  </Stack>
                  <Typography variant="caption">{answer.posted_at}</Typography>
                  <Typography gutterBottom paragraph>
                    {sanitize(answer.answer)}
                  </Typography>
                  {answer.option_url != "" ? (
                    <Typography>
                      <Link href={answer.option_url} target="_blank">
                        {answer.option_url}
                        <Launch fontSize="small" />
                      </Link>
                    </Typography>
                  ) : (
                    <></>
                  )}
                  <Stack direction="row" spacing={2}>
                    <Typography variant="caption">
                      b {answer.liked_count}
                    </Typography>
                    <Typography variant="caption">q</Typography>
                  </Stack>
                  <Divider sx={{ my: 1 }} />
                </>
              ))
            )}
            <Button
              color="primary"
              variant="outlined"
              fullWidth
              onClick={() => showDialog(dialogTypes.ANSWER_FORM)}
            >
              この質問に回答する
            </Button>
          </AccordionDetails>
        </Accordion>
      ))}
      <Divider sx={{ my: 2 }} />
      <Button
        color="primary"
        variant="outlined"
        fullWidth
        onClick={() => showDialog(dialogTypes.NEW_QUESTION_FORM)}
      >
        新たに質問する
      </Button>
    </>
  );
}
