import dialogTypes from "@/app/_constants/dialog_types";
import { setFocusedQuestion } from "@/app/_store/slices/pageSlice";
import { Launch } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  Typography,
  Divider,
  AccordionDetails,
  Stack,
  Avatar,
  Button,
} from "@mui/material";
import Link from "next/link";
import ValuateForm from "../answers/valuate_form";
import { useDispatch } from "react-redux";
import { useDialog } from "@/app/_hooks/dialog";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { textHelper } from "@/app/_utils/text_helper";

interface QuestionListItemsProps {
  userId: string;
  islandId: string;
  questions: any[];
}

export const QuestionListItems = (props: QuestionListItemsProps) => {
  const { showDialog } = useDialog();
  const dispatch = useDispatch();
  const { sanitize } = textHelper();

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
              {sanitize(item.question)}({item.answer_count})
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
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: "center" }}
                  >
                    <Avatar alt="回答者" src={answer.posted_user.image_url} />
                    <Typography variant="subtitle2">
                      {sanitize(answer.posted_user.name)} さんの回答
                    </Typography>
                  </Stack>
                  <Typography variant="caption" sx={{ textAlign: "right" }}>
                    {answer.posted_at} に投稿
                  </Typography>
                  <Typography gutterBottom paragraph>
                    {sanitize(answer.answer)}
                  </Typography>
                  <Typography overflow={"auto"}>
                    {answer.option_url != "" ? (
                      <Link href={answer.option_url} target="_blank">
                        {answer.option_url}
                        <Launch fontSize="small" />
                      </Link>
                    ) : (
                      <></>
                    )}
                  </Typography>
                  <ValuateForm
                    liked_by={answer.liked_by}
                    disliked_by={answer.disliked_by}
                    user_id={props.userId}
                    island_id={props.islandId}
                    question_id={item.id}
                    answer_id={answer.id}
                  />
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
};
