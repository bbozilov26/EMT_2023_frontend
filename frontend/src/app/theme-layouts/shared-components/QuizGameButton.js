import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import IconButton from "@mui/material/IconButton";
import Icon from "@mdi/react";
import { mdiController } from "@mdi/js";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { Controller, useForm, useFormContext } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";
import QuizRepository from "../../main/apps/e-commerce/repositories/QuizRepository";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";

function QuizGameButton() {
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [shouldClose, setShouldClose] = useState(false);
  const [shouldCloseAfterSecondDialog, setShouldCloseAfterSecondDialog] =
    useState(false);
  const [isQuizQuestionDialogOpen, setQuizQuestionDialogOpen] = useState(false);

  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [
    feedbackInsufficientAmountOfCoinsMessage,
    setFeedbackInsufficientAmountOfCoinsMessage,
  ] = useState(null);
  const [addFeedbackMessage, setAddFeedbackMessage] = useState(null);

  const [userBalance, setUserBalance] = useState(null);

  const { t } = useTranslation("app");
  const { handleSubmit, control } = useForm();

  const [randomQuestion, setRandomQuestion] = useState();
  const [givenAnswers, setGivenAnswers] = useState([]);
  const [givenIncorrectAnswer, setGivenIncorrectAnswer] = useState(null);
  const fee = 5.0;

  const user = JSON.parse(localStorage.getItem("user"));

  const difficulties = [
    {
      id: "EASY",
      name: "EASY",
      label: t("EASY"),
      reward: 1.0,
    },
    {
      id: "MEDIUM",
      name: "MEDIUM",
      label: t("MEDIUM"),
      reward: 3.0,
    },
    {
      id: "HARD",
      name: "HARD",
      label: t("HARD"),
      reward: 5.0,
    },
  ];

  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState(["", ""]); // Initially 2 answer fields
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const generateRandomQuestion = () => {
    QuizRepository.getRandomQuestion().then(({ data }) => {
      const randomQuestionData = {
        id: data.id.id,
        question: data.question,
        reward: data.reward,
        topic: data.topic,
        difficulty: data.difficulty,
        correctQuizAnswerDTO: {
          id: data?.correctQuizAnswerDTO.id.id,
          description: data?.correctQuizAnswerDTO.description,
        },
      };
      setRandomQuestion(randomQuestionData);

      if (randomQuestionData?.id !== undefined) {
        QuizRepository.getAllAnswersByQuestionId(randomQuestionData?.id).then(
          ({ data }) => {
            const givenAnswersData = data.map((el) => ({
              id: el.id.id,
              description: el.description,
            }));

            setGivenAnswers(givenAnswersData);
          }
        );
      }
    });
  };

  const handleQuizQuestionConfirmDialog = () => {
    if (!shouldClose) {
      if (!shouldCloseAfterSecondDialog) {
        setConfirmDialogOpen(true);
      } else {
        setShouldCloseAfterSecondDialog(false);
      }
    }

    if (shouldClose || (!shouldClose && shouldCloseAfterSecondDialog)) {
      setShouldClose(false);
    } else {
      setShouldClose(true);
    }
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
  };

  const handleQuizQuestionDialog = () => {
    if (user?.creditBalance >= 5) {
      generateRandomQuestion();
      handleCloseConfirmDialog();
      setShouldCloseAfterSecondDialog(true);
      setQuizQuestionDialogOpen(true);
    } else {
      setFeedbackInsufficientAmountOfCoinsMessage(
        t("INSUFFICIENT_AMOUNT_OF_COINS")
      );
    }
  };

  const handleCloseQuizQuestionDialog = () => {
    setShouldCloseAfterSecondDialog(true);
    setQuizQuestionDialogOpen(false);
  };

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleAddAnswer = () => {
    if (answers.length < 4) {
      setAnswers([...answers, ""]);
    }
  };

  const onSubmit = (data) => {
    if (isQuizQuestionDialogOpen) {
      // data will contain the selected answer's id
      console.log("Selected Answer:", data);

      // Call your existing handleSubmitQuizAnswer function with the selected answer
      handleSubmitQuizAnswer(data?.selectedAnswer);
    } else {
      data = {
        question: question,
        quizAnswerDTOs: answers.map((answer) => ({
          description: answer,
        })),
        correctQuizAnswerDTO: {
          description: correctAnswer,
        },
        difficulty: difficulty,
        reward: difficulties.find((d) => d.id === difficulty)?.reward ?? 0.0,
      };
      console.log("New Quiz Question and Answers:", data);
      handleSubmitNewQuizQuestionAndAnswers(data);
    }
  };

  const handleSubmitNewQuizQuestionAndAnswers = (data) => {
    QuizRepository.create(data).then(({ data }) => {
      setAddFeedbackMessage(t("NEW_QOTD_ADDED_FEEDBACK"));
    });
  };

  const handleSubmitQuizAnswer = (selectedAnswerId) => {
    console.log("User ID:", user?.id.id);
    console.log("Random Question ID:", randomQuestion?.id);
    console.log("Selected Answer ID:", selectedAnswerId);

    if (randomQuestion?.correctQuizAnswerDTO?.id === selectedAnswerId) {
      setFeedbackMessage(t("CORRECT_ANSWER_FEEDBACK"));
      setUserBalance(user?.creditBalance + randomQuestion?.reward);
    } else {
      setFeedbackMessage(t("INCORRECT_ANSWER_FEEDBACK"));
      setGivenIncorrectAnswer(
        givenAnswers.filter((a) => a?.id === selectedAnswerId)
      );
      setUserBalance(user?.creditBalance - fee);
    }

    const dto = {
      userId: user?.id.id,
      questionId: randomQuestion?.id,
      answerId: selectedAnswerId,
    };

    QuizRepository.submitAnswer(dto).then(({ data }) => {
      // Close the dialog or perform any other necessary actions
      // handleCloseQuizQuestionDialog();
      localStorage.setItem("user", JSON.stringify(data));

      // Reload the window after 3 to 5 seconds
      setTimeout(() => {
        window.location.reload();
      }, Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000); // Random delay between 3 to 5 seconds
    });
  };

  return (
    <IconButton
      onClick={handleQuizQuestionConfirmDialog}
      role="button"
      className="w-40 h-40"
      size="large"
    >
      <FuseSvgIcon>heroicons-outline:puzzle</FuseSvgIcon>

      <Dialog
        open={isConfirmDialogOpen && !isQuizQuestionDialogOpen}
        onClose={handleCloseConfirmDialog}
      >
        {user?.roleDTO?.label !== "ROLE_CUSTOMER" && (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogTitle>{t("ADD_NEW_QOTD")}</DialogTitle>
              <DialogContent>
                <Typography
                  className="text-13"
                  color="text.secondary"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "left",
                  }}
                >
                  {t("QUESTION")}
                  <TextField
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                </Typography>
                <Typography
                  className="text-13"
                  color="text.secondary"
                  style={{
                    display: "block",
                    alignItems: "center",
                    justifyContent: "left",
                  }}
                >
                  {t("ANSWERS")}
                  {answers.map((answer, index) => (
                    <div key={index}>
                      <InputLabel>{t(`Answer ${index + 1}`)}</InputLabel>
                      <TextField
                        value={answer}
                        onChange={(e) =>
                          handleAnswerChange(index, e.target.value)
                        }
                      />
                    </div>
                  ))}
                  {answers.length < 4 && (
                    <Button onClick={handleAddAnswer}>Add Answer</Button>
                  )}
                </Typography>
                <Typography
                  className="text-13"
                  color="text.secondary"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "left",
                  }}
                >
                  {t("CORRECT_ANSWER")}
                  <Select
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                  >
                    {answers.map((answer, index) => (
                      <MenuItem key={index} value={answer}>
                        {answer}
                      </MenuItem>
                    ))}
                  </Select>
                </Typography>
                <Typography
                  className="text-13"
                  color="text.secondary"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "left",
                  }}
                >
                  {t("DIFFICULTY")}
                  <Select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                  >
                    {difficulties.map((diff) => (
                      <MenuItem key={diff.id} value={diff.id}>
                        {diff.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button type="submit" color="primary">
                  {t("SUBMIT")}
                </Button>
                <Button onClick={handleCloseConfirmDialog} color="primary">
                  {t("CANCEL")}
                </Button>
              </DialogActions>
            </form>
            {addFeedbackMessage && (
              <div style={{ padding: "16px 24px" }}>
                <Typography>{addFeedbackMessage}</Typography>
              </div>
            )}
          </>
        )}

        {user?.roleDTO?.label === "ROLE_CUSTOMER" && user?.answeredQotD && (
          <>
            <DialogTitle>{t("ALREADY_ANSWERED_QOTD_TITLE")}</DialogTitle>
            <DialogContent>
              <Typography
                className="text-13"
                color="text.secondary"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                }}
              >
                {t("ALREADY_ANSWERED_QOTD_MESSAGE")}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseConfirmDialog} color="primary">
                {t("CANCEL")}
              </Button>
            </DialogActions>
          </>
        )}

        {user?.roleDTO?.label === "ROLE_CUSTOMER" && !user?.answeredQotD && (
          <>
            <DialogTitle>{t("START_TITLE_QUESTION")}</DialogTitle>
            <DialogContent>
              <Typography
                className="text-13"
                color="text.secondary"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                }}
              >
                {t("FEE")}:
                <FuseSvgIcon>heroicons-outline:currency-euro</FuseSvgIcon>
                {fee}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleQuizQuestionDialog} color="primary">
                {t("CONFIRM")}
              </Button>
              <Button onClick={handleCloseConfirmDialog} color="primary">
                {t("CANCEL")}
              </Button>
            </DialogActions>
            {feedbackInsufficientAmountOfCoinsMessage && (
              <div style={{ padding: "16px 24px" }}>
                <Typography>
                  {feedbackInsufficientAmountOfCoinsMessage}
                  {user?.creditBalance}
                </Typography>
              </div>
            )}
          </>
        )}
      </Dialog>

      <Dialog open={isQuizQuestionDialogOpen}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>{t("QUESTION_OF_THE_DAY")}</DialogTitle>
          <DialogContent>
            <Typography
              className="text-13"
              color="text.secondary"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {randomQuestion?.question}
            </Typography>

            <Controller
              name="selectedAnswer"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  {givenAnswers.map((givenAnswer) => (
                    <FormControlLabel
                      key={givenAnswer.id}
                      value={givenAnswer.id.toString()}
                      control={<Radio />}
                      label={
                        <Typography
                          className="text-13"
                          color="text.secondary"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {givenAnswer.description}
                        </Typography>
                      }
                    />
                  ))}
                </RadioGroup>
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="primary">
              {t("SUBMIT")}
            </Button>
            <Button type="submit" color="primary">
              {t("CANCEL")}
            </Button>
          </DialogActions>
        </form>
        {feedbackMessage && (
          <div style={{ padding: "16px 24px" }}>
            <Typography>{feedbackMessage}</Typography>
            {givenIncorrectAnswer && (
              <Typography>
                {t("CORRECT_ANSWER")}
                {randomQuestion?.correctQuizAnswerDTO?.description}
              </Typography>
            )}
            {userBalance && (
              <Typography>
                {t("YOUR_NEW_BALANCE")}
                {userBalance}
              </Typography>
            )}
            <Typography>{t("RELOAD_LOCATION_TIME")}</Typography>
          </div>
        )}
      </Dialog>
    </IconButton>
  );
}

export default QuizGameButton;
