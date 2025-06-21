import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Trong đường tròn tâm O bán kính r = 6 cm, dây AB có độ dài là 8 cm. Hỏi khoảng cách từ trung điểm của dây AB đến tâm O là bao nhiêu?
        `,
        answers: [
            `4 cm`,
            `3 cm`,
            `5 cm`,
            `6 cm`,
        ],
        explain: `
            - Sử dụng định lý Pythagoras trong tam giác vuông OMB (O là tâm, M là trung điểm của AB): <br>
            - OM² + (AB/2)² = r². <br>
            - OM² + 4² = 6². <br>
            - OM² + 16 = 36. <br>
            - OM² = 36 - 16 = 20. <br>
            - OM = √20 ≈ 4.47 cm.
        `
    }, {
        question: `
            Cho đường tròn tâm O bán kính r = 10 cm, dây CD có độ dài 12 cm. Hỏi khoảng cách từ O đến dây CD là bao nhiêu?
        `,
        answers: [
            `6 cm`,
            `5 cm`,
            `4 cm`,
            `7 cm`,
        ],
        explain: `
            - Giả sử M là trung điểm của dây CD, và OM là khoảng cách từ tâm O đến dây CD. <br>
            - Sử dụng định lý Pythagoras trong tam giác vuông OMC: <br>
            - OM² + (CD/2)² = r². <br>
            - OM² + 6² = 10². <br>
            - OM² + 36 = 100. <br>
            - OM² = 100 - 36 = 64. <br>
            - OM = √64 = 8 cm.
        `
    }    
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[13].levels[1].state = 'unlock';
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
