import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Đưa thừa số vào trong dấu căn: 4√6
        `,
        answers: [
            `√96`,
            `√24`,
            `√36`,
            `√48`,
        ],
        explain: `
            Ta có: <br><br>
            4√6 = √(4²)√6 = √(16 × 6) = √96.
        `
    }, {
        question: `
            Rút gọn biểu thức  
            B = 5√2 + √18
        `,
        answers: [
            `B = 8√2`,
            `B = 5 + √2`,
            `B = 3√2`,
            `B = 10√2`,
        ],
        explain: `
            Ta có: <br><br>
            √18 = 3√2. <br>
            Do đó: <br>
            B = 5√2 + √18 = 5√2 + 3√2 = 8√2.
        `
    }, {
        question: `
            Đưa thừa số vào trong dấu căn: 6√3
        `,
        answers: [
            `√108`,
            `√72`,
            `√18`,
            `√54`,
        ],
        explain: `
            Ta có: <br><br>
            6√3 = √(6²)√3 = √(36 × 3) = √108.
        `
    }, {
        question: `
            Rút gọn biểu thức  
            C = 4√5 - √80
        `,
        answers: [
            `C = -4√5`,
            `C = 0`,
            `C = 4 - √5`,
            `C = -2 - 2√5`,
        ],
        explain: `
            Ta có: <br><br>
            √80 = 4√5. <br>
            Do đó: <br>
            C = 4√5 - √80 = 4√5 - 4√5 = 0.
        `
    }        
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[9].levels[0].state = 'unlock';
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
