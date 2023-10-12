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
  Icon,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useDialog } from "@/app/_hooks/dialog";
import { useDispatch } from "react-redux";
import { setFocusedQuestion } from "@/app/_store/pageSlice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Launch } from "@mui/icons-material";
import parse from "html-react-parser";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
interface QuestionListProps {
  questions: any[];
}

// テキストの改行コードをbrタグに変換する+サニタイズ TODO: 共通化
const sanitize = (text: string) => {
  const sanitizedText = text.replace(/\r?\n/g, "<br>");
  return parse(sanitizedText);
};

// liked_byの要素数を返す
const countLiked = (array: any[]) => {
  return array ? array.length : 0;
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
                    <Tooltip title="高評価する" placement="top">
                      <IconButton>
                        <ThumbUpOffAltIcon />
                      </IconButton>
                    </Tooltip>
                    <Typography>{countLiked(answer.liked_by)}</Typography>
                    <Tooltip title="低評価する" placement="top">
                      <IconButton>
                        <ThumbDownOffAltIcon />
                      </IconButton>
                    </Tooltip>
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
