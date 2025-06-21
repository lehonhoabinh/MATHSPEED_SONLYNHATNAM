import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Tính giá trị của căn thức ∛(x + 8) tại x = 1 (có làm tròn)
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
            Thay x = 1 vào: ∛(1 + 8) = ∛9 ≈ 2.08.
        `
    }, {
        question: `
            Rút gọn biểu thức: ∛(64) + ∛(8)
        `,
        answers: [
            `6`,
            `5`,
            `4`,
            `7`,
        ],
        explain: `
            Ta có: <br><br>
            ∛(64) = 4 và ∛(8) = 2. <br>
            Do đó: 4 + 2 = 6.
        `
    }, {
        question: `
            Tính giá trị của căn thức ∛(x + 27) tại x = 8 (có làm tròn)
        `,
        answers: [
            `3`,
            `4`,
            `2`,
            `5`,
        ],
        explain: `
            Ta có: <br><br>
            ∛(x + 27) tại x = 8: <br>
            Thay x = 8 vào: ∛(8 + 27) = ∛35 ≈ 3.33.
        `
    }, {
        question: `
            Rút gọn biểu thức: ∛(125) - ∛(27)
        `,
        answers: [
            `2`,
            `3`,
            `4`,
            `5`,
        ],
        explain: `
            Ta có: <br><br>
            ∛(125) = 5 và ∛(27) = 3. <br>
            Do đó: 5 - 3 = 2.
        `
    }    
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[9].levels[3].state = 'unlock';
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
