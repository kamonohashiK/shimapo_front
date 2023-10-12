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
import { useDispatch, useSelector } from "react-redux";
import { setFocusedQuestion } from "@/app/_store/pageSlice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Launch } from "@mui/icons-material";
import parse from "html-react-parser";
import LikeButton from "./answers/like_button";
import DislikeButton from "./answers/dislike_button";
import { RootState } from "@/app/_store/store";
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

  const userId = useSelector((state: RootState) => state.user.userId);

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
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: "center" }}
                  >
                    <Avatar alt="回答者" src={answer.posted_user.image_url} />
                    <Typography variant="subtitle2">
                      {answer.posted_user.name} さんの回答
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
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: "center", justifyContent: "right" }}
                  >
                    <LikeButton liked_by={answer.liked_by} user_id={userId} />
                    <DislikeButton
                      disliked_by={answer.disliked_by}
                      user_id={userId}
                    />
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
