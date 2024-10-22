import React, { useState, useEffect } from 'react';
import './App.css'; // Import CSS for styling

const questions = [
    {
        question: 'What is the capital of France?',
        options: ['Berlin', 'Madrid', 'Paris', 'Lisbon'],
        correctAnswer: 2,
    },
    {
        question: 'Which planet is known as the Red Planet?',
        options: ['Earth', 'Venus', 'Mars', 'Jupiter'],
        correctAnswer: 2,
    },
    // Add more questions here if needed
];

const App = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [timer, setTimer] = useState(60); // Set timer for 1 minute
    const [isTimeUp, setIsTimeUp] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0); // Track correct answers
    const [showPopup, setShowPopup] = useState(''); // State to control popup

    useEffect(() => {
        // Start countdown timer
        const countdown = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(countdown);
                    setIsTimeUp(true);
                    return 0; // Timer ends
                }
                return prev - 1; // Decrease timer
            });
        }, 1000);

        return () => clearInterval(countdown); // Clear interval on unmount
    }, []);

    const handleOptionClick = (index) => {
        setSelectedOption(index); // Set selected option
    };

    const handleSubmit = () => {
        if (selectedOption !== null) {
            // Check if answer is correct
            if (selectedOption === currentQuestion.correctAnswer) {
                setCorrectAnswers((prev) => prev + 1); // Increment correct answers
                setShowPopup('Correct answer!'); // Show popup for correct answer
            } else {
                setShowPopup('Wrong answer!'); // Show popup for wrong answer
            }
            setIsSubmitted(true); // Mark as submitted
        }
    };

    const handleNextQuestion = () => {
        // Move to the next question
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedOption(null); // Reset selected option
        setIsSubmitted(false); // Reset submission state
        setShowPopup(''); // Hide popup for the next question

        // Reset timer for next question
        setTimer(60);
        setIsTimeUp(false);
    };

    const resetQuestionnaire = () => {
        setCurrentQuestionIndex(0); // Reset to first question
        setSelectedOption(null); // Clear selected option
        setIsSubmitted(false); // Reset submission state
        setTimer(60); // Reset timer
        setIsTimeUp(false); // Reset time up state
        setCorrectAnswers(0); // Reset correct answers count
        setShowPopup(''); // Hide popup on reset
    };

    const currentQuestion = questions[currentQuestionIndex]; // Get current question

    return (
        <div className="App">
            <h1>Questionnaire</h1>
            {isTimeUp ? (
                <div className="popup">
                    <p>Time's up! Reload the page to try again.</p>
                </div>
            ) : (
                <>
                    {currentQuestionIndex < questions.length ? (
                        <>
                            <div className="timer">Time Remaining: {timer}s</div>
                            <div className="question">
                                <h2>{currentQuestion.question}</h2>
                                <div className="options">
                                    {currentQuestion.options.map((option, index) => {
                                        let optionClass = '';
                                        // Check if the question is submitted
                                        if (isSubmitted) {
                                            if (index === currentQuestion.correctAnswer) {
                                                optionClass = 'correct'; // Correct answer style
                                            } else if (index === selectedOption) {
                                                optionClass = 'incorrect'; // Incorrect answer style
                                            }
                                        }
                                        return (
                                            <div
                                                key={index}
                                                className={`option ${selectedOption === index ? 'selected' : ''} ${optionClass}`}
                                                onClick={() => handleOptionClick(index)}
                                            >
                                                {option}
                                            </div>
                                        );
                                    })}
                                </div>
                                <button className="submit-button" onClick={isSubmitted ? handleNextQuestion : handleSubmit}>
                                    {isSubmitted ? 'Next' : 'Submit'}
                                </button>
                            </div>
                            {showPopup && (
                                <div className="popup">
                                    <p>{showPopup}</p>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="summary">
                            <h2>Congratulations!</h2>
                            <p>You answered {correctAnswers} out of {questions.length} questions correctly.</p>
                            <button onClick={resetQuestionnaire}>Restart Questionnaire</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default App;
