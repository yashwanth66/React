import React, { useState, useEffect } from "react";
import Quiz from "../components/Quiz";
import { nanoid } from "nanoid";

export default function Home() {
    const [quizData, setQuizData] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState(null);
    const [allAnswered, setAllAnswered] = useState(false);
    const [resultVisible, setResultVisible] = useState(false);
    const [resultCount, setResultCount] = useState(0);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch("https://opentdb.com/api.php?amount=50&category=9&difficulty=easy&type=multiple");
                if (!response.ok) {
                    if (response.status === 429) {
                        throw new Error("Rate limit exceeded. Please try again later.");
                    } else {
                        throw new Error(`Error: ${response.status}`);
                    }
                }
                const data = await response.json();
                setQuestions(data.results);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching questions:', err);
            }
        };
        fetchQuestions();
    }, []);

    useEffect(() => {
        if (questions.length > 0) {
            const arr = [];
            for (let i = 0; i < 5; i++) {
                const question = questions[Math.floor(Math.random() * questions.length)];
                const options = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5);
                arr.push({
                    fullData: question,
                    selectedOption: null,
                    id: nanoid(),
                    correct_answer: question.correct_answer,
                    options: options
                });
            }
            setQuizData(arr);
        }
    }, [questions]);

    useEffect(() => {
        if (quizData.length > 0) {
            const allAnswered = quizData.every(quiz => quiz.selectedOption !== null);
            setAllAnswered(allAnswered);
        }
    }, [quizData]);

    function handleClick(quizId, option) {
        setQuizData(prevData => prevData.map(val => {
            return val.id === quizId ? { ...val, selectedOption: option } : val;
        }));
    }

    const showResult = () => {
        const correctCount = quizData.reduce((count, quiz) => {
            return quiz.selectedOption === quiz.correct_answer ? count + 1 : count;
        }, 0);
        setResultCount(correctCount);
        setResultVisible(true);
    };

    const resetQuiz = () => {
        // Reset quizData and result visibility
        setResultVisible(false);
        setQuizData(prevData => prevData.map(val => ({ ...val, selectedOption: null })));
    };

    const elements = quizData.map(val => {
        return <Quiz 
            key={val.id} 
            data={val.fullData} 
            id={val.id} 
            options={val.options}
            selectedOption={val.selectedOption} 
            handleClick={handleClick} 
        />;
    });

    if (error) {
        return <div>Error: {error}</div>;
    }

    const style1 = {
        backgroundColor: allAnswered ? "lightgreen" : "rgb(73, 120, 238)"
    };

    const style2 = {
        backgroundColor: allAnswered? (resultCount===5? 'lightgreen': 'red') : "white"
    };
    return (
        <div className="home-container">
            <div className="questions-container">
                {elements}
            </div>
            <div className="checkQuestions" style={style1}>
                {allAnswered ? <div>All questions are answered!</div> : <div>--Answer all the Questions--</div>}
            </div>
            <div className="result" style = {style2}>
                {resultVisible && <div>Correct Answers: {resultCount}/{quizData.length}</div>}
                <button onClick={showResult} disabled={!allAnswered}>Show Result</button>
                <button onClick={resetQuiz}>Reset Quiz</button>
            </div>
        </div>
    );
}
