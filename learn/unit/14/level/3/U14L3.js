import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Số đo cung chắn một góc vuông trong đường tròn bằng
        `,
        answers: [
            `90⁰`,
            `180⁰`,
            `120⁰`,
            `45⁰`,
        ],
        explain: `
            - Một góc vuông có số đo 90⁰, do đó, cung chắn góc vuông trong đường tròn có số đo 90⁰.
        `
    }, {
        question: `
            Số đo cung chắn một nửa đường tròn bằng
        `,
        answers: [
            `180⁰`,
            `360⁰`,
            `90⁰`,
            `270⁰`,
        ],
        explain: `
            - Nửa đường tròn tương ứng với một góc có số đo 180⁰, vì tổng số đo của đường tròn là 360⁰.
        `
    }, {
        question: `
            Cung chắn một góc 60⁰ trong đường tròn có số đo bằng
        `,
        answers: [
            `60⁰`,
            `120⁰`,
            `180⁰`,
            `90⁰`,
        ],
        explain: `
            - Cung chắn một góc 60⁰ trong đường tròn có số đo đúng bằng 60⁰.
        `
    }, {
        question: `
            Cung chắn một góc 135⁰ trong đường tròn có số đo bằng
        `,
        answers: [
            `135⁰`,
            `180⁰`,
            `90⁰`,
            `150⁰`,
        ],
        explain: `
            - Cung chắn một góc 135⁰ trong đường tròn có số đo đúng bằng 135⁰.
        `
    }       
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[14].levels[0].state = 'unlock';
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
