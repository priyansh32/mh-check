import React from 'react';
//mui
import { Container, makeStyles, Typography, CardActions, Box, CardContent, CardMedia } from '@material-ui/core';
import Button from '@mui/material/Button';
import jumbo from '../assets/images/jumbo.jpg';
import { Grid } from '@mui/material';
import Copyright from '../components/Elements/Copyright';

//routes
import { Link } from 'react-router-dom'

/*
Homepage module of the Mental Health Test Application
Created on: 15 September 2022
Authors: Priyansh Patidar, Chirag R
*/

const useStyles = makeStyles((theme) => ({
    container: {
        // backgroundColor: '#18344A',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        padding: '0, 10px',
        marginBottom: 300,
        marginTop: 36,
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
        fontSize: '1.6rem',
        textAlign: 'center',
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.down('md')]: {
            fontSize: '1rem',
        },
    },
    hero: {
        width: '50%',
        marginTop: theme.spacing(4),
        [theme.breakpoints.down('sm')]: {
            width: '75%',
        },
    },
    img: {
        aspectRatio: 5 / 5,
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
    },
    cardButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',

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
        [theme.breakpoints.down('md')]: {
            fontSize: '1rem',
        },
    },
    button: {
        backgroundColor: '#18344A',
        padding: '15px',
        fontSize: '1rem',
    },
    buttonTitle: {
        color: 'white'
    }
}));

function Homepage() {
    const classes = useStyles();
    return (

        <Container className={classes.container}>
            <Typography className={classes.title}>
                Take the First Step to Better Mental Health
            </Typography>
            <Grid spacing={10} container sx={{ alignItems: 'center' }}>
                <Grid item xs={12} md={4}>
                    <CardContent className={classes.card}>
                        <Typography className={classes.text} variant='body1'>
                            Use Mental Health Test to test yourself and how you are feeling.
                        </Typography>
                        <Typography className={classes.text} variant='body1'>
                            Mental Health Test uses questions framed by psychiatrists, which are Yes/No type of questions.
                        </Typography>
                        <Typography className={classes.text} variant='body1'>
                            Mental Health Test uses the questions to help the user identify their feelings and mental health condition.
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Box >
                        <CardMedia className={classes.img}
                            component="img"
                            height="300"
                            image={jumbo}
                            alt="therapy session"
                        />
                        <CardContent className={classes.card}>
                            <Typography className={classes.cardTitle} gutterBottom variant="h5" component="div">
                                Take the Mental Health Test
                            </Typography>
                            <Typography className={classes.cardText}>
                                Click on "Take the quiz" and begin your mental health test quiz!
                            </Typography>
                        </CardContent>
                        <CardActions className={classes.cardButtons}>
                            {/* change buttons to reactroutes */}
                            <Button sx={{ backgroundColor: '#18344A', borderColor: 'white', border: 1, fontSize: 30 }}>
                                <Link to='/quizselect' style={{ textDecoration: 'none' }} >
                                    <span className={classes.buttonTitle} >
                                        Take the quiz
                                    </span>
                                </Link>
                            </Button>
                            <Button sx={{ backgroundColor: '#18344A', borderColor: 'white', border: 1, fontSize: 30 }}>
                                <Link to='/signup' style={{ textDecoration: 'none' }}>
                                    <span className={classes.buttonTitle}>
                                        Create An Account
                                    </span>
                                </Link>
                            </Button>
                        </CardActions>
                    </Box>
                </Grid>
            </Grid>
            <Box>
                <Copyright sx={{ color: 'white', marginTop: '50px', fontSize: '20px' }} />
            </Box>
        </Container>

    )
}

export default Homepage;
