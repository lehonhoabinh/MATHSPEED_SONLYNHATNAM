import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Cho đường tròn tâm O bán kính r = 5 cm. Hãy xác định xem các điểm sau có nằm trong đường tròn hay không:
            <br>1. Điểm A có tọa độ (3, 4) 
            <br>2. Điểm B có tọa độ (6, 7)
            <br>3. Điểm C có tọa độ (2, 1)
            <br>4. Điểm D có tọa độ (5, 5)
        `,
        answers: [
            `Điểm A và C nằm trong đường tròn, điểm B và D không nằm trong đường tròn`,
            `Điểm A và D nằm trong đường tròn, điểm B và C không nằm trong đường tròn`,
            `Tất cả các điểm đều nằm trong đường tròn`,
            `Không có điểm nào nằm trong đường tròn`,
        ],
        explain: `
            - Áp dụng công thức tính khoảng cách từ điểm đến tâm (O) của đường tròn: 
              Để điểm P(x, y) nằm trong đường tròn, điều kiện là: √(x² + y²) ≤ r. <br>
            - Với r = 5 cm:
              - A(3, 4): √(3² + 4²) = √9 + 16 = √25 = 5 (nằm trên đường tròn).
              - B(6, 7): √(6² + 7²) = √36 + 49 = √85 ≈ 9.22 (không nằm trong đường tròn).
              - C(2, 1): √(2² + 1²) = √4 + 1 = √5 ≈ 2.24 (nằm trong đường tròn).
              - D(5, 5): √(5² + 5²) = √25 + 25 = √50 ≈ 7.07 (không nằm trong đường tròn).
        `
    }, {
        question: `
            Cho đường tròn tâm O bán kính r = 7 cm. Hãy xác định xem các điểm sau có nằm trong đường tròn hay không:
            <br>1. Điểm A có tọa độ (4, 5) 
            <br>2. Điểm B có tọa độ (8, 6)
            <br>3. Điểm C có tọa độ (3, 2)
            <br>4. Điểm D có tọa độ (6, 8)
        `,
        answers: [
            `Điểm A, C và D nằm trong đường tròn, điểm B không nằm trong đường tròn`,
            `Điểm A, B và C nằm trong đường tròn, điểm D không nằm trong đường tròn`,
            `Tất cả các điểm đều nằm trong đường tròn`,
            `Không có điểm nào nằm trong đường tròn`,
        ],
        explain: `
            - Áp dụng công thức tính khoảng cách từ điểm đến tâm (O) của đường tròn: 
              Để điểm P(x, y) nằm trong đường tròn, điều kiện là: √(x² + y²) ≤ r. <br>
            - Với r = 7 cm:
              - A(4, 5): √(4² + 5²) = √16 + 25 = √41 ≈ 6.4 (nằm trong đường tròn).
              - B(8, 6): √(8² + 6²) = √64 + 36 = √100 = 10 (không nằm trong đường tròn).
              - C(3, 2): √(3² + 2²) = √9 + 4 = √13 ≈ 3.61 (nằm trong đường tròn).
              - D(6, 8): √(6² + 8²) = √36 + 64 = √100 = 10 (không nằm trong đường tròn).
        `
    }    
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[13].levels[0].state = 'unlock';
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
