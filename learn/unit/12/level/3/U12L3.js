import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Trong tam giác vuông ABC, vuông tại A, biết AB = 5 cm và AC = 12 cm. Hãy tính số đo 3 góc trong tam giác.
        `,
        answers: [
            `Góc B = 22.62°, góc C = 67.38°, góc A = 90°`,
            `Góc B = 30°, góc C = 60°, góc A = 90°`,
            `Góc B = 25°, góc C = 65°, góc A = 90°`,
            `Góc B = 40°, góc C = 50°, góc A = 90°`,
        ],
        explain: `
            - Đầu tiên, tính cạnh huyền BC bằng định lý Pythagoras: <br>
              BC = √(AB² + AC²) = √(5² + 12²) = √(25 + 144) = √169 = 13 cm. <br>
            - Tính góc B bằng công thức: tan(B) = đối/kề = AC/AB = 12/5. <br>
              Góc B = tan⁻¹(12/5) ≈ 67.38°. <br>
            - Góc C = 90° - góc B = 90° - 67.38° = 22.62°. <br>
            - Góc A = 90° (góc vuông).
        `
    }, {
        question: `
            Trong tam giác vuông DEF, vuông tại D, biết góc E = 30° và cạnh DE = 6 cm. Hãy tính độ dài các cạnh DF và EF.
        `,
        answers: [
            `DF = 3√3 cm, EF = 12 cm`,
            `DF = 4 cm, EF = 10 cm`,
            `DF = 5√3 cm, EF = 6 cm`,
            `DF = 3 cm, EF = 6√3 cm`,
        ],
        explain: `
            - Dùng góc và cạnh đã cho để tính các cạnh còn lại: <br>
              DF = DE × tan(E) = 6 × tan(30°) = 6 × (√3/3) = 2√3 cm. <br>
              EF = DE × 2 = 6 × 2 = 12 cm. <br>
            - Vậy các cạnh là DF = 3√3 cm, EF = 12 cm.
        `
    }     
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[11].levels[3].state = 'unlock';
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
