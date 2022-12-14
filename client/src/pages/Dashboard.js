import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import QuizList from "../components/QuizList";
import Chart from "../components/Chart";
import { Container, makeStyles, Box, Grid } from "@material-ui/core";
import Auth from "../utils/auth";
import HelpCard from "../components/Elements/HelpLineCard";
import { Typography, Card, CardContent } from "@mui/material";

/*
Dashboard module of the Mental Health Test Application
Created on: 29 September 2022
Authors: Priyansh Patidar, Chirag R
Shows the dashboard of the logged-in user, along with the test results
*/

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    marginTop: "60px",
    padding: "0, 10px",
    marginBottom: 300,
  },
  title: {
    fontSize: "4rem",
    fontWeight: "600",
    textAlign: "center",
    color: "white",
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      fontSize: "2rem",
    },
  },
  text: {
    fontSize: "1.3rem",
    textAlign: "center",
    color: "#f5f5f5",
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      fontSize: "1rem",
    },
  },
  hero: {
    width: "50%",
    marginTop: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      width: "75%",
    },
  },
  img: {
    aspectRatio: 4 / 5,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  card: {
    backgroundColor: "#255070",
  },

  cardButtons: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#255070",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  cardTitle: {
    fontWeight: "600",
    fontSize: "2.5rem",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      fontSize: "1.5rem",
    },
  },
  cardText: {
    fontSize: "1.3rem",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      fontSize: "1rem",
    },
  },
  button: {
    backgroundColor: "#18344A",
    padding: "15px",
    fontSize: "1rem",
  },
  buttonTitle: {
    color: "white",
  },
}));

const Dashboard = () => {
  if (!Auth.loggedIn()) {
    window.location.replace("/login");
  }

  const classes = useStyles();

  const { loading, data } = useQuery(QUERY_USER);

  const user = data?.user || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  // console.log(user)

  let count = [];
  let quizCount = [];
  if (user.quizzes.length > 0) {
    let depCount = 0;
    let depQuizCount = 0;
    for (let i = 0; i < user.quizzes.length; i++) {
      for (let j = 0; j < user.quizzes[i].quizResults.length; j++) {
        if (
          user.quizzes[i].quizResults[j].quizAnswer ===
          "positive for depression"
        ) {
          depCount++;
          depQuizCount++;
        } else if (
          user.quizzes[i].quizResults[j].quizAnswer ===
          "negative for depression"
        ) {
          depQuizCount++;
        }
      }
    }

    let anxCount = 0;
    let anxQuizCount = 0;
    for (let i = 0; i < user.quizzes.length; i++) {
      for (let j = 0; j < user.quizzes[i].quizResults.length; j++) {
        if (
          user.quizzes[i].quizResults[j].quizAnswer === "positive for anxiety"
        ) {
          anxCount++;
          anxQuizCount++;
        } else if (
          user.quizzes[i].quizResults[j].quizAnswer === "negative for anxiety"
        ) {
          anxQuizCount++;
        }
      }
    }

    let PTSDCount = 0;
    let PTSDQuizCount = 0;
    for (let i = 0; i < user.quizzes.length; i++) {
      for (let j = 0; j < user.quizzes[i].quizResults.length; j++) {
        if (user.quizzes[i].quizResults[j].quizAnswer === "positive for PTSD") {
          PTSDCount++;
          PTSDQuizCount++;
        } else if (
          user.quizzes[i].quizResults[j].quizAnswer === "negative for PTSD"
        ) {
          PTSDQuizCount++;
        }
      }
    }

    let schCount = 0;
    let schQuizCount = 0;
    for (let i = 0; i < user.quizzes.length; i++) {
      for (let j = 0; j < user.quizzes[i].quizResults.length; j++) {
        if (
          user.quizzes[i].quizResults[j].quizAnswer ===
          "positive for schizophrenia"
        ) {
          schCount++;
          schQuizCount++;
        } else if (
          user.quizzes[i].quizResults[j].quizAnswer ===
          "negative for schizophrenia"
        ) {
          schQuizCount++;
        }
      }
    }

    let addictionCount = 0;
    let addictionQuizCount = 0;
    for (let i = 0; i < user.quizzes.length; i++) {
      for (let j = 0; j < user.quizzes[i].quizResults.length; j++) {
        if (
          user.quizzes[i].quizResults[j].quizAnswer === "positive for addiction"
        ) {
          addictionCount++;
          addictionQuizCount++;
        } else if (
          user.quizzes[i].quizResults[j].quizAnswer === "negative for addiction"
        ) {
          addictionQuizCount++;
        }
      }
    }
    count = [depCount, anxCount, PTSDCount, schCount, addictionCount];
    quizCount = [
      depQuizCount,
      anxQuizCount,
      PTSDQuizCount,
      schQuizCount,
      addictionQuizCount,
    ];
  }

  const chartHandler = (len) => {
    if (len > 0) {
      return (
        <Box
          sx={{
            backgroundColor: "white",
            position: "relative",
            width: "30vw",
            marginBottom: 20,
          }}
        >
          <Chart count={count} quizCount={quizCount} />
        </Box>
      );
    }
  };

  return (
    <Container className={classes.container}>
      <Typography variant='h2' color={"white"} style={{ marginBottom: 10 }}>
        Dashboard
      </Typography>
      <Container className={classes.cardContainer}>
        {/* user name */}
        <Card variant='outlined' className={classes.card}>
          <CardContent>
            <Typography className={classes.cardTitle}>
              Welcome, {user.name}!
            </Typography>
            <Typography className={classes.cardText}>
              Here you can view your results from previous quizzes and take new
              quizzes.
            </Typography>
          </CardContent>
        </Card>
        {/* display attendee information */}
        <Card variant='outlined' className={classes.card}>
          <CardContent>
            <Typography className={classes.cardTitle}>
              Attendee Information
            </Typography>
            <Typography className={classes.cardText}>
              {user.attendeeName}
            </Typography>
            <Typography className={classes.cardText}>
              {user.attendeeEmail}
            </Typography>
            <Typography className={classes.cardText}>
              {user.attendeeRelationship}
            </Typography>
          </CardContent>
        </Card>
      </Container>
      {chartHandler(user.quizzes.length)}
      <Container style={{ marginBottom: 20 }}>
        <Grid container spacing={3}>
          <QuizList quizzes={user.quizzes} />
        </Grid>
      </Container>
      <HelpCard />
    </Container>
  );
};

export default Dashboard;
