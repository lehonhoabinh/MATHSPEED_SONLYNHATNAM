import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Tính giá trị của căn bậc hai ∛(x + 36) tại x = 0
        `,
        answers: [
            `6`,
            `5`,
            `4`,
            `3`,
        ],
        explain: `
            Ta có: <br><br>
            ∛(x + 36) tại x = 0: <br>
            Thay x = 0 vào: ∛(0 + 36) = ∛36 = 6.
        `
    }, {
        question: `
            Rút gọn biểu thức √(49) + √(16)
        `,
        answers: [
            `11`,
            `10`,
            `12`,
            `9`,
        ],
        explain: `
            Ta có: <br><br>
            √(49) = 7 và √(16) = 4. <br>
            Do đó: 7 + 4 = 11.
        `
    }, {
        question: `
            Tính giá trị của căn bậc ba ∛(x + 8) tại x = 1 (có làm tròn)
        `,
        answers: [
            `2`,
            `3`,
            `1`,
            `4`,
        ],
        explain: `
            Ta có: <br><br>
            ∛(x + 8) tại x = 1: <br>
            Thay x = 1 vào: ∛(1 + 8) = ∛9 ≈ 2.08 (làm tròn).
        `
    }, {
        question: `
            Rút gọn biểu thức √(25) - √(9)
        `,
        answers: [
            `2`,
            `3`,
            `4`,
            `1`,
        ],
        explain: `
            Ta có: <br><br>
            √(25) = 5 và √(9) = 3. <br>
            Do đó: 5 - 3 = 2.
        `
    }, {
        question: `
            Tính giá trị của căn bậc ba ∛(x + 125) tại x = 0
        `,
        answers: [
            `5`,
            `6`,
            `4`,
            `3`,
        ],
        explain: `
            Ta có: <br><br>
            ∛(x + 125) tại x = 0: <br>
            Thay x = 0 vào: ∛(0 + 125) = ∛125 = 5.
        `
    }, {
        question: `
            Tính giá trị của căn bậc hai √(x + 4) tại x = 12 (có làm tròn)
        `,
        answers: [
            `4`,
            `5`,
            `6`,
            `7`,
        ],
        explain: `
            Ta có: <br><br>
            √(x + 4) tại x = 12: <br>
            Thay x = 12 vào: √(12 + 4) = √16 = 4.
        `
    }         
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[10].levels[0].state = 'unlock';
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
