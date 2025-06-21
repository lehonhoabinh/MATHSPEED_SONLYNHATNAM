import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Cho đường thẳng a và điểm O cách a một khoảng bằng 6 cm. Không vẽ hình, hãy dự đoán xem mỗi đường tròn (O; 5cm) sau cắt, tiếp xúc hay không cắt đường thẳng a. Tại sao?
        `,
        answers: [
            `Cắt`,
            `Tiếp Xúc`,
            `Không cắt`,
        ],
        explain: `
            - Khoảng cách từ điểm O đến đường thẳng a là 6cm. Bán kính của đường tròn là 5cm. Vì khoảng cách này lớn hơn bán kính, nên đường tròn không cắt đường thẳng a.
        `
    }, {
        question: `
            Cho đường thẳng a và điểm O cách a một khoảng bằng 7 cm. Không vẽ hình, hãy dự đoán xem mỗi đường tròn (O; 7cm) sau cắt, tiếp xúc hay không cắt đường thẳng a. Tại sao?
        `,
        answers: [
            `Tiếp Xúc`,
            `Cắt`,
            `Không cắt`,
        ],
        explain: `
            - Khoảng cách từ điểm O đến đường thẳng a là 7cm, đúng bằng bán kính của đường tròn. Do đó, đường tròn sẽ tiếp xúc với đường thẳng a tại một điểm.
        `
    }, {
        question: `
            Cho đường thẳng a và điểm O cách a một khoảng bằng 8 cm. Không vẽ hình, hãy dự đoán xem mỗi đường tròn (O; 10cm) sau cắt, tiếp xúc hay không cắt đường thẳng a. Tại sao?
        `,
        answers: [
            `Cắt`,
            `Tiếp Xúc`,
            `Không cắt`,
        ],
        explain: `
            - Khoảng cách từ điểm O đến đường thẳng a là 8cm. Bán kính của đường tròn là 10cm. Vì khoảng cách này nhỏ hơn bán kính, đường tròn sẽ cắt đường thẳng a tại hai điểm.
        `
    }    
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[15].levels[1].state = 'unlock';
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
