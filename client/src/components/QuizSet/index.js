import { useEffect, useState } from "react";
import { useMutation } from '@apollo/client'
import questionBank from "../../utils/questionBank"
import Question from "../Question";
import { ADD_QUIZRESULT, ADD_QUIZSET } from "../../utils/mutations";

import { Container, makeStyles, Typography } from '@material-ui/core';

const { depressionQuestions, anxietyQuestions, PTSDQuestions, schQuestions, impairmentQuestions, addictionQuestions } = questionBank;

const grader = function () {
    //todo quiz end logic here

}

const QuizSet = (props) => {
    const { currentQuizName, handleSubmitQuiz } = props;

    const initialState = (name) => {
        switch (name) {
            case 'Depression':
                return depressionQuestions
            case 'Anxiety':
                return anxietyQuestions
            case 'PTSD':
                return PTSDQuestions
            case 'Schizophrenia':
                return schQuestions
            case 'Addiction':
                return addictionQuestions
            case 'Impairment':
                return impairmentQuestions
            default:
                throw new Error('initalState Error!')
        }
    };

    const currentQuiz = initialState(currentQuizName)

    const [index, setIndex] = useState(0)


    useEffect(() => {
        document.title = (currentQuizName + ' quiz');
    }, [currentQuizName]);

    const [addQuizSet] = useMutation(ADD_QUIZSET)

    const [currentQuizSetId, setCurrentQuizSetId] = useState('')

    useEffect(() => {
        async function startQuiz() {
            try {
                const { data } = await addQuizSet()
                setCurrentQuizSetId(data.addQuizSet._id)
            } catch (e) {
                // window.location.replace('/login')
                window.alert('You must be logged in to save a quiz')
            }
        }
        startQuiz()
    }, [addQuizSet])

    const [quizSetScore, setQuizSetScore] = useState(0)
    const [addQuizResult] = useMutation(ADD_QUIZRESULT)

    async function handleSubmit(response) {
        // end of quiz
        if (index >= currentQuiz.length - 1) {
            setIndex(0)
            if (quizSetScore >= (currentQuiz.length / 2)) {
                const currentQuizResult = 'positive for ' + currentQuizName
                try {
                    const { data } = await addQuizResult({
                        variables: {
                            quizSetId: currentQuizSetId,
                            quizTaken: currentQuizName, quizAnswer: currentQuizResult
                        }
                    })
                    setQuizSetScore(0)
                } catch (e) {
                    console.log(e)
                    throw new Error(e)
                }

            } else {
                const currentQuizResult = 'negative for ' + currentQuizName
                try {
                    const { data } = await addQuizResult({
                        variables: {
                            quizSetId: currentQuizSetId,
                            quizTaken: currentQuizName, quizAnswer: currentQuizResult
                        }
                    })
                    setQuizSetScore(0)
                } catch (e) {
                    console.log(e)
                    throw new Error(e)
                }
            }

            handleSubmitQuiz(currentQuizSetId)

        } else {
            setIndex(index + 1)
            let newScore = response.score + quizSetScore
            setQuizSetScore(newScore)
        }
    }

    const useStyles = makeStyles((theme) => ({
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            // alignItems: 'center',
            height: '100vh',
            width: '100vw',
            padding: 0,
        },
        title: {
            fontSize: '4rem',
            fontWeight: '600',
            textAlign: 'center',
            paddingBottom: theme.spacing(3),
            [theme.breakpoints.down('md')]: {
                fontSize: '2rem',
            },
        },
        text: {
            fontSize: '1.3rem',
            textAlign: 'center',
            paddingBottom: theme.spacing(3),
            [theme.breakpoints.down('md')]: {
                fontSize: '1rem',
            },
        },
        card: {
            backgroundColor: '#255070',
            display: 'flex',
            flexDirection: 'column',
        },
        cardTitle: {
            fontSize: '2.5rem',
            textAlign: 'center',
            [theme.breakpoints.down('md')]: {
                fontSize: '1.5rem',
            },
        },
        cardText: {
            fontSize: '1.3rem',
            textAlign: 'center',
            color: '#f5f5f5',
            [theme.breakpoints.down('md')]: {
                fontSize: '1rem',
            },
        },
    }));

    const classes = useStyles();
    return (

        <Container className={classes.container}>
            <Typography className={classes.title}>
                {currentQuizName} Quiz
            </Typography>
            <Question currentQuestion={currentQuiz[index]} setCurrentQuestion={setIndex} handleSubmit={handleSubmit}>
            </Question>

            <Typography className={classes.text} >
                Question {index + 1} of {currentQuiz.length}
            </Typography>

        </Container>
    )
}

export default QuizSet

