import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Cho tam giác ABC vuông tại C có AC = 3 cm, AB = 4 cm và BC = 5 cm. Hãy tính bán kính của đường tròn ngoại tiếp tam giác ABC.<br><br>
            Áp dụng công thức tính bán kính của đường tròn ngoại tiếp tam giác vuông.
        `,
        answers: [
            `2 cm`,
            `3 cm`,
            `4 cm`,
            `5 cm`
        ],
        explain: `
            Vì tam giác ABC vuông tại C, nên bán kính R của đường tròn ngoại tiếp tam giác vuông được tính theo công thức R = \(\frac{cạnh \, huyền}{2}\). <br><br> 
            Do đó, R = \(\frac{AB}{2} = \frac{5}{2} = 2.5\) cm.
        `
    },
    {
        question: `
            Cho tam giác ABC có AC = 3 cm, AB = 4 cm và BC = 5 cm. Tính bán kính của đường tròn ngoại tiếp tam giác ABC.<br><br>
            Áp dụng công thức bán kính đường tròn ngoại tiếp tam giác bất kỳ.
        `,
        answers: [
            `2.5 cm`,
            `3.5 cm`,
            `4.5 cm`,
            `5 cm`
        ],
        explain: `
            Để tính bán kính của đường tròn ngoại tiếp tam giác ABC, ta sử dụng công thức R = \(\frac{abc}{4S}\), với a, b, c là độ dài ba cạnh của tam giác và S là diện tích tam giác. <br><br> 
            Với AC = 3 cm, AB = 4 cm, BC = 5 cm và S = \(\frac{1}{2} \times AB \times AC = 6\) cm², ta có R = \(\frac{3 \times 4 \times 5}{4 \times 6} = 2.5\) cm.
        `
    }    
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[27].levels[1].state = 'unlock';
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
