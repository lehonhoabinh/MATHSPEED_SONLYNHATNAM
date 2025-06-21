import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `Cho ABCD là tứ giác nội tiếp. Biết rằng A = 60⁰ và B = 80⁰. Tính số đo của các góc còn lại của tứ giác (C và D).<br><br>`,
        answers: [
            `C = 100⁰, D = 120⁰`,
            `C = 120⁰, D = 100⁰`,
            `C = 110⁰, D = 110⁰`,
            `C = 90⁰, D = 130⁰`
        ],
        explain: `Vì ABCD là tứ giác nội tiếp, tổng số đo của hai góc đối diện bằng 180⁰.\n\nTừ đó: C = 180⁰ - A = 180⁰ - 60⁰ = 120⁰.<br><br>D = 180⁰ - B = 180⁰ - 80⁰ = 100⁰.<br><br>Vậy đáp án đúng là: C = 120⁰, D = 100⁰.`
    },
    {
        question: `Cho ABCD là tứ giác nội tiếp. Biết rằng A = 60⁰ và C = 100⁰. Tính số đo của các góc còn lại của tứ giác (B và D).<br><br>`,
        answers: [
            `B = 80⁰, D = 120⁰`,
            `B = 120⁰, D = 80⁰`,
            `B = 110⁰, D = 70⁰`,
            `B = 90⁰, D = 130⁰`
        ],
        explain: `Vì ABCD là tứ giác nội tiếp, tổng số đo của hai góc đối diện bằng 180⁰.\n\nTừ đó: B = 180⁰ - D.<br><br>D = 180⁰ - C = 180⁰ - 100⁰ = 80⁰.<br><br>B = 180⁰ - A = 180⁰ - 60⁰ = 120⁰.<br><br>Vậy đáp án đúng là: B = 120⁰, D = 80⁰.`
    },
    {
        question: `Cho ABCD là tứ giác nội tiếp. Biết rằng B = 80⁰ và D = 100⁰. Tính số đo của các góc còn lại của tứ giác (A và C).<br><br>`,
        answers: [
            `A = 60⁰, C = 120⁰`,
            `A = 100⁰, C = 80⁰`,
            `A = 90⁰, C = 90⁰`,
            `A = 120⁰, C = 60⁰`
        ],
        explain: `Vì ABCD là tứ giác nội tiếp, tổng số đo của hai góc đối diện bằng 180⁰.\n\nTừ đó: A = 180⁰ - C.<br><br>C = 180⁰ - B = 180⁰ - 80⁰ = 100⁰.<br><br>A = 180⁰ - D = 180⁰ - 100⁰ = 80⁰.<br><br>Vậy đáp án đúng là: A = 80⁰, C = 100⁰.`
    }
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[29].levels[0].state = 'unlock';
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
