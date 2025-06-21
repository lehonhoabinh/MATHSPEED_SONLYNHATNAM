import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Cho hai đường tròn (O; 4 cm) và (O'; 2 cm) có OO' = 6 cm. Hỏi vị trí tương đối của hai đường tròn này.
        `,
        answers: [
            `Tiếp xúc ngoài`,
            `Không giao nhau`,
            `Giao nhau tại hai điểm`,
            `Tiếp xúc trong`,
        ],
        explain: `
            - Khoảng cách giữa hai tâm OO' = 6 cm.
            - Tổng bán kính: 4 + 2 = 6 cm (bằng OO') nên hai đường tròn tiếp xúc ngoài.
            - Vị trí tương đối của hai đường tròn là tiếp xúc ngoài.
        `
    }, {
        question: `
            Cho hai điểm O và O' cách nhau 10 cm. Tính khoảng cách giữa hai tâm, biết rằng đường tròn (O; 6 cm) tiếp xúc trong với đường tròn (O'; 4 cm).
        `,
        answers: [
            `10 cm`,
            `12 cm`,
            `6 cm`,
            `2 cm`,
        ],
        explain: `
            - Khi hai đường tròn tiếp xúc trong, khoảng cách giữa hai tâm OO' = |R - r| = |6 - 4| = 2 cm.
            - Do đó, khoảng cách giữa hai tâm là 2 cm.
        `
    }, {
        question: `
            Tính độ dài cung 60° của một đường tròn bán kính R = 10 cm.
        `,
        answers: [
            `10π/3 cm`,
            `10π cm`,
            `20π/3 cm`,
            `5π/3 cm`,
        ],
        explain: `
            - Độ dài cung l được tính bằng công thức l = (n/360) × 2πR.
            - Thay n = 60° và R = 10 cm, ta có l = (60/360) × 2π × 10 = (1/6) × 20π = 10π/3 cm.
            - Độ dài cung là 10π/3 cm.
        `
    }, {
        question: `
            Một đường tròn có chu vi 31.4 cm. Tính bán kính R của đường tròn này.
        `,
        answers: [
            `5 cm`,
            `10 cm`,
            `7 cm`,
            `6 cm`,
        ],
        explain: `
            - Công thức tính chu vi đường tròn: C = 2πR.
            - Thay C = 31.4 cm, ta có 2πR = 31.4.
            - Giải phương trình: R = 31.4 / (2π) ≈ 5 cm.
            - Bán kính R của đường tròn là 5 cm.
        `
    }, {
        question: `
            Cho một hình vành khuyên được tạo bởi hai đường tròn đồng tâm có bán kính lần lượt là 7 cm và 5 cm. Tính diện tích hình vành khuyên.
        `,
        answers: [
            `24π cm²`,
            `12π cm²`,
            `36π cm²`,
            `48π cm²`,
        ],
        explain: `
            - Diện tích hình vành khuyên được tính bằng công thức: S = π(R² - r²).
            - Thay R = 7 cm và r = 5 cm, ta có S = π(7² - 5²) = π(49 - 25) = 24π cm².
            - Diện tích hình vành khuyên là 24π cm².
        `
    }    
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        localStorage.setItem('units', JSON.stringify(units));
        units[17].levels[0].state = 'unlock';
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
