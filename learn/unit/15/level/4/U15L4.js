import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Tính diện tích hình vành khuyên nằm giữa hai đường tròn đồng tâm có bán kính là 10m và 14m.
        `,
        answers: [
            `S = 56π m²`,
            `S = 72π m²`,
            `S = 24π m²`,
            `S = 50π m²`,
        ],
        explain: `
            - Diện tích hình vành khuyên được tính bằng công thức S = π(R² - r²), trong đó R là bán kính của đường tròn ngoài và r là bán kính của đường tròn trong.
            - Ở đây, R = 14m và r = 10m, do đó diện tích là S = π(14² - 10²) = π(196 - 100) = 96π m².
        `
    }, {
        question: `
            Cho đường tròn đồng tâm với bán kính 3m và 7m. Hãy tính diện tích của hình vành khuyên này.
        `,
        answers: [
            `S = 48π m²`,
            `S = 56π m²`,
            `S = 52π m²`,
            `S = 60π m²`,
        ],
        explain: `
            - Diện tích hình vành khuyên được tính bằng công thức S = π(R² - r²), trong đó R là bán kính của đường tròn ngoài và r là bán kính của đường tròn trong.
            - Ở đây, R = 7m và r = 3m, do đó diện tích là S = π(7² - 3²) = π(49 - 9) = 40π m².
        `
    }, {
        question: `
            Tính diện tích hình vành khuyên nằm giữa hai đường tròn đồng tâm có bán kính là 4m và 10m.
        `,
        answers: [
            `S = 84π m²`,
            `S = 72π m²`,
            `S = 56π m²`,
            `S = 36π m²`,
        ],
        explain: `
            - Diện tích hình vành khuyên được tính bằng công thức S = π(R² - r²), trong đó R là bán kính của đường tròn ngoài và r là bán kính của đường tròn trong.
            - Ở đây, R = 10m và r = 4m, do đó diện tích là S = π(10² - 4²) = π(100 - 16) = 84π m².
        `
    }, {
        question: `
            Cho hai đường tròn đồng tâm có bán kính là 6m và 9m. Hãy tính diện tích hình vành khuyên.
        `,
        answers: [
            `S = 45π m²`,
            `S = 60π m²`,
            `S = 72π m²`,
            `S = 55π m²`,
        ],
        explain: `
            - Diện tích hình vành khuyên được tính bằng công thức S = π(R² - r²), trong đó R là bán kính của đường tròn ngoài và r là bán kính của đường tròn trong.
            - Ở đây, R = 9m và r = 6m, do đó diện tích là S = π(9² - 6²) = π(81 - 36) = 45π m².
        `
    }    
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[15].levels[0].state = 'unlock';
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
