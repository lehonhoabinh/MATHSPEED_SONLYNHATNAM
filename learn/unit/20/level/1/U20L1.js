import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Không giải phương trình, hãy tính biệt thức ∆ để kiểm tra điều kiện có nghiệm, rồi tính tổng và tích các nghiệm của phương trình sau:  
            2x² - 7x + 3 = 0
        `,
        answers: [
            `Tổng = ${fraction('7', '2')}, Tích = ${fraction('3', '2')}`,
            `Tổng = ${fraction('7', '3')}, Tích = ${fraction('2', '3')}`,
            `Tổng = ${fraction('7', '2')}, Tích = ${fraction('2', '3')}`,
            `Tổng = ${fraction('7', '2')}, Tích = ${fraction('1', '2')}`,
        ]
    }, {
        question: `
            Không giải phương trình, hãy tính biệt thức ∆' để kiểm tra điều kiện có nghiệm, rồi tính tổng và tích các nghiệm của phương trình sau:  
            3x² - 5x + 2 = 0
        `,
        answers: [
            `Tổng = ${fraction('5', '3')}, Tích = ${fraction('2', '3')}`,
            `Tổng = ${fraction('5', '3')}, Tích = ${fraction('6', '3')}`,
            `Tổng = ${fraction('5', '3')}, Tích = ${fraction('3', '6')}`,
            `Tổng = ${fraction('5', '6')}, Tích = ${fraction('3', '2')}`,
        ]
    }, {
        question: `
            Không giải phương trình, hãy tính biệt thức ∆ để kiểm tra điều kiện có nghiệm, rồi tính tổng và tích các nghiệm của phương trình sau:  
            x² + 4x - 5 = 0
        `,
        answers: [
            `Tổng = ${fraction('-4', '1')}, Tích = ${fraction('-5', '1')}`,
            `Tổng = ${fraction('-4', '1')}, Tích = ${fraction('5', '1')}`,
            `Tổng = ${fraction('4', '1')}, Tích = ${fraction('-5', '1')}`,
            `Tổng = ${fraction('4', '1')}, Tích = ${fraction('5', '1')}`,
        ]
    }    
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[19].levels[1].state = 'unlock';
        localStorage.setItem('units', JSON.stringify(units));
        alert("Bạn đã hoàn thành tất cả câu hỏi!");
        document.location.href = '../../../../';
    }

    const { question, answers, explain } = lesson[0];
    const correctAnswer = answers[0];
    const shuffledAnswers = [...answers].sort(() => Math.random() - 0.5);

    // DOM elements
    const questionElement = document.querySelector('.question');
    const optionsContainer = document.querySelector('.options-container');
    const explainElement = document.querySelector('.explain');
    const checkButton = document.querySelector('.check-btn');
    const continueButton = document.querySelector('.continue-btn');

    // Reset UI
    questionElement.innerHTML = question;
    optionsContainer.innerHTML = '';
    explainElement.innerHTML = '';
    continueButton.classList.add('hide');

    // Track selected option
    let selectedOption = null;

    // Render options
    shuffledAnswers.forEach(answer => {
        const option = document.createElement('div');
        option.className = 'option';
        option.innerHTML = answer;

        option.addEventListener('click', () => {
            if (selectedOption) {
                selectedOption.classList.remove('selected');
            }
            option.classList.add('selected');
            selectedOption = option;
        });

        optionsContainer.appendChild(option);
    });

    // Set up event for "Check" button
    checkButton.replaceWith(checkButton.cloneNode(true));
    const newCheckButton = document.querySelector('.check-btn');

newCheckButton.style.pointerEvents = 'auto';





    newCheckButton.addEventListener('click', () => {
        if (!selectedOption) {
            alert("Vui lòng chọn một đáp án!");
            return;
        }
        console.log(selectedOption.innerHTML);
        console.log(correctAnswer);
        const isCorrect = selectedOption.innerHTML === correctAnswer;
        selectedOption.classList.add(isCorrect ? 'correct' : 'wrong');

        if (isCorrect) {
            point++;
            lesson.shift();
            updateProgressBar(point, maxPoint);
            if (explain)
                explainElement.innerHTML = 
                    `<p class="highlight">Giải thích<p>` + explain;
        } else {
            const currentQuestion = lesson.shift();
            lesson.push(currentQuestion);
            explainElement.innerHTML = `<p class="highlight red">Đáp án sai, thử lại sau nhé!</p>`;
        }

        // Sound Effect
        const audio = new Audio(`../../../../assets/sounds/${isCorrect}.mp3`);
        audio.play();

        // Disable options and check button
        optionsContainer.querySelectorAll('.option').forEach(option => {
            option.style.pointerEvents = 'none';
        });
        newCheckButton.disabled = true;

        



        

                newCheckButton.style.pointerEvents = "none";

        // Show continue button
        continueButton.classList.remove('hide');
    });
}

function setContinueButton() {
    const continueButton = document.querySelector('.continue-btn');
    continueButton.addEventListener('click', displayQuestion);
}

// Initialize quiz
setContinueButton();
displayQuestion();
