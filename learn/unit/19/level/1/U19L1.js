import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Trong các phương trình sau, phương trình nào là phương trình bậc hai ẩn x?  
            a) x² + 5x - 6 = 0  
            b) x + 4 = 0  
            c) 3x² - 2x + 1 = 0  
            d) x³ - x² + 2 = 0
        `,
        answers: [
            `a và c`,
            `b và c`,
            `a và d`,
            `c và d`,
        ],
        explain: `
            - Phương trình bậc hai có dạng tổng quát ax² + bx + c = 0 (a ≠ 0).  
            - Trong các phương trình đã cho:  
              + a) x² + 5x - 6 = 0 là phương trình bậc hai (a = 1).  
              + c) 3x² - 2x + 1 = 0 là phương trình bậc hai (a = 3).  
              + b) x + 4 = 0 là phương trình bậc nhất.  
              + d) x³ - x² + 2 = 0 là phương trình bậc ba.  
            - Vậy đáp án đúng là a và c.
        `
    }, {
        question: `
            Trong các phương trình sau, phương trình nào là phương trình bậc hai ẩn x?  
            a) 2x² + 3x + 1 = 0  
            b) x³ - x² + x - 1 = 0  
            c) x² - 5 = 0  
            d) x + 2 = 0
        `,
        answers: [
            `a và c`,
            `b và d`,
            `a và b`,
            `c và d`,
        ],
        explain: `
            - Phương trình bậc hai có dạng tổng quát ax² + bx + c = 0 (a ≠ 0).  
            - Trong các phương trình đã cho:  
              + a) 2x² + 3x + 1 = 0 là phương trình bậc hai (a = 2).  
              + c) x² - 5 = 0 là phương trình bậc hai (a = 1, b = 0).  
              + b) x³ - x² + x - 1 = 0 là phương trình bậc ba.  
              + d) x + 2 = 0 là phương trình bậc nhất.  
            - Vậy đáp án đúng là a và c.
        `
    }, {
        question: `
            Trong các phương trình sau, phương trình nào là phương trình bậc hai ẩn x?  
            a) x² - 4x + 4 = 0  
            b) 4x + 2 = 0  
            c) x² + 1 = 0  
            d) x³ + 2x - 5 = 0
        `,
        answers: [
            `a và c`,
            `b và d`,
            `a và b`,
            `c và d`,
        ],
        explain: `
            - Phương trình bậc hai có dạng tổng quát ax² + bx + c = 0 (a ≠ 0).  
            - Trong các phương trình đã cho:  
              + a) x² - 4x + 4 = 0 là phương trình bậc hai (a = 1).  
              + c) x² + 1 = 0 là phương trình bậc hai (a = 1, b = 0).  
              + b) 4x + 2 = 0 là phương trình bậc nhất.  
              + d) x³ + 2x - 5 = 0 là phương trình bậc ba.  
            - Vậy đáp án đúng là a và c.
        `
    }    
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[18].levels[1].state = 'unlock';
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
