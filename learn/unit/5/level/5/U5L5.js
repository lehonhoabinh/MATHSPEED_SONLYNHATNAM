import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Giải phương trình sau:<br><br>
            2(x + 1) = (5x - 1)(x + 1)
        `,
        answers: [
            `x = -1 hoặc 
             x = ${fraction('3', '5')}`,
            `x = ${fraction('-1', '3')} hoặc 
             x = ${fraction('3', '2')}`,
            `x = 0 hoặc 
             x = 3`,
            `Vô nghiệm`,
        ],
        explain: `
            2(x + 1) = (5x - 1)(x + 1)<br><br>
            2(x + 1) - (5x - 1)(x + 1) = 0<br><br>
            (x + 1)(2 - 5x + 1) = 0<br><br>
            (x + 1)(3 - 5x) = 0<br><br>
            x + 1 = 0 hoặc 3 - 5x = 0<br><br>
            x = -1 hoặc 5x = 3<br><br>
            x = -1 hoặc x = ${fraction('3', '5')}
        `
    }, {
        question: `
            Giải phương trình sau:<br><br>
            (-4x + 3)x = (2x + 5)x
        `,
        answers: [
            `x = 0 hoặc 
             x = -${fraction('1', '3')}`,
            `x = ${fraction('-1', '5')} hoặc 
             x = ${fraction('2', '3')}`,
            `x = 4`,
            `Vô nghiệm`,
        ],
        explain: `
            (-4x + 3)x = (2x + 5)x <br><br>
            (-4x + 3)x - (2x + 5)x = 0 <br><br>
            x(-4x + 3 - 2x - 5) = 0<br><br>
            x(-6x - 2) = 0<br><br>
            x = 0 hoặc -6x - 2 = 0<br><br>
            x = 0 hoặc -6x = 2<br><br>
            x = 0 hoặc x = -${fraction('1', '3')}
        `
    }, {
        question: `
            Để loại bỏ x% một loại tảo độc khỏi một hồ nước, người ta 
            ước tính chi phí cần bỏ ra là <br><br>
            C(x) = ${fraction('50x', '100 - x')} (triệu đồng), với
            0 ≤ x < 100 <br><br>
            Nếu bỏ ra 450 triệu đồng, người ta có thể loại bỏ được bao 
            nhiêu phần trăm loại tảo độc đó? <br><br>
        `,
        answers: [
            `90%`,
            `70%`,
            `50%`,
            `80%`,
        ],
        explain: `
            Theo bài, chi phí để loại bỏ tảo độc là C = 450 triệu đồng, nên ta 
            có phương trình: <br><br>
            ${fraction('50x', '100 - x')} = 450 <br><br>
            Giải phương trình: <br><br>
            50x = 450.(100 - x) <br><br>
            x = 90 (thoả mãn điều kiện)
        `
    }
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[5].levels[0].state = 'unlock';
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
