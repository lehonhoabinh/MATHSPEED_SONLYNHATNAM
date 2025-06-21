import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Trong tam giác vuông ABC, vuông tại A, biết AB = 5 cm, AC = 12 cm. Hãy tính giá trị của sin(B).
        `,
        answers: [
            `sin(B) = 12/13`,
            `sin(B) = 5/13`,
            `sin(B) = 5/12`,
            `sin(B) = 12/5`,
        ],
        explain: `
            - Tính cạnh huyền BC bằng định lý Pythagoras: BC = √(AB² + AC²) = √(5² + 12²) = √(25 + 144) = √169 = 13 cm. <br>
            - sin(B) = đối/huyền = AC/BC = 12/13.
        `
    }, {
        question: `
            Trong tam giác vuông XYZ, vuông tại Y, biết XY = 8 cm và YZ = 6 cm. Hãy tính số đo góc X (làm tròn đến 2 chữ số thập phân).
        `,
        answers: [
            `Góc X ≈ 36.87°`,
            `Góc X ≈ 45.00°`,
            `Góc X ≈ 53.13°`,
            `Góc X ≈ 30.00°`,
        ],
        explain: `
            - Tính tan(X): tan(X) = đối/kề = YZ/XY = 6/8 = 0.75. <br>
            - Góc X = tan⁻¹(0.75) ≈ 36.87°.
        `
    }, {
        question: `
            Một chiếc thang dài 15 m dựa vào tường, đầu thang cách chân tường 9 m. Hỏi góc nghiêng của thang so với mặt đất (làm tròn đến 2 chữ số thập phân).
        `,
        answers: [
            `Góc nghiêng ≈ 53.13°`,
            `Góc nghiêng ≈ 45.00°`,
            `Góc nghiêng ≈ 36.87°`,
            `Góc nghiêng ≈ 30.00°`,
        ],
        explain: `
            - Tính cos(α): cos(α) = kề/huyền = 9/15 = 0.6. <br>
            - Góc α = cos⁻¹(0.6) ≈ 53.13°.
        `
    }, {
        question: `
            Trong tam giác vuông DEF, vuông tại D, biết DE = 7 cm, DF = 25 cm. Hãy tính độ dài cạnh EF.
        `,
        answers: [
            `EF = 24 cm`,
            `EF = 26 cm`,
            `EF = 28 cm`,
            `EF = 20 cm`,
        ],
        explain: `
            - Áp dụng định lý Pythagoras: EF² = DF² - DE². <br>
            - EF = √(DF² - DE²) = √(25² - 7²) = √(625 - 49) = √576 = 24 cm.
        `
    }, {
        question: `
            Trong tam giác vuông GHI, vuông tại H, biết GH = 6 cm và sin(G) = 3/5. Hãy tính độ dài cạnh GI.
        `,
        answers: [
            `GI = 10 cm`,
            `GI = 8 cm`,
            `GI = 12 cm`,
            `GI = 9 cm`,
        ],
        explain: `
            - Từ sin(G) = đối/huyền = GH/GI = 3/5. <br>
            - Giả sử GI = x, ta có: 6/x = 3/5. <br>
            - Giải phương trình: x = (6 × 5) / 3 = 10 cm.
        `
    }    
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[12].levels[0].state = 'unlock';
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
