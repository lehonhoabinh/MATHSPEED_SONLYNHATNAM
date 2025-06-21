import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Cho hai điểm O và O' sao cho OO' = 4 cm. Xác định vị trí tương đối của hai đường tròn (O; 3 cm) và (O'; 2 cm).
        `,
        answers: [
            `Giao nhau tại hai điểm`,
            `Tiếp xúc ngoài`,
            `Tiếp xúc trong`,
            `Không giao nhau`,
        ],
        explain: `
            - Khoảng cách giữa hai tâm OO' = 4 cm.
            - Tổng bán kính: 3 + 2 = 5 cm (lớn hơn OO') nên hai đường tròn không tiếp xúc ngoài.
            - Hiệu bán kính: |3 - 2| = 1 cm (nhỏ hơn OO') nên không tiếp xúc trong.
            - Vậy hai đường tròn giao nhau tại hai điểm.
        `
    }, {
        question: `
            Cho hai điểm O và O' sao cho OO' = 7 cm. Xác định vị trí tương đối của hai đường tròn (O; 4 cm) và (O'; 2 cm).
        `,
        answers: [
            `Không giao nhau`,
            `Tiếp xúc ngoài`,
            `Giao nhau tại hai điểm`,
            `Tiếp xúc trong`,
        ],
        explain: `
            - Khoảng cách giữa hai tâm OO' = 7 cm.
            - Tổng bán kính: 4 + 2 = 6 cm (nhỏ hơn OO') nên hai đường tròn không giao nhau.
            - Vậy vị trí tương đối là không giao nhau.
        `
    }, {
        question: `
            Cho hai điểm O và O' sao cho OO' = 5 cm. Xác định vị trí tương đối của hai đường tròn (O; 3 cm) và (O'; 2 cm).
        `,
        answers: [
            `Tiếp xúc ngoài`,
            `Không giao nhau`,
            `Giao nhau tại hai điểm`,
            `Tiếp xúc trong`,
        ],
        explain: `
            - Khoảng cách giữa hai tâm OO' = 5 cm.
            - Tổng bán kính: 3 + 2 = 5 cm (bằng OO') nên hai đường tròn tiếp xúc ngoài.
            - Vậy vị trí tương đối là tiếp xúc ngoài.
        `
    }    
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[16].levels[1].state = 'unlock';
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
