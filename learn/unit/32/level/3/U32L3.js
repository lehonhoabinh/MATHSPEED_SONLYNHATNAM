import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Tứ giác ABCD nội tiếp trong một đường tròn, biết góc A = 60°, góc C = 120°. Hỏi số đo của góc B? <br><br>
        `,
        answers: [
            `Góc B = 90°`,
            `Góc B = 120°`,
            `Góc B = 60°`,
            `Góc B = 150°`,
        ],
        explain: `
            - Trong tứ giác nội tiếp, tổng số đo hai góc đối diện bằng 180°. <br>
            - Vì góc A = 60° và góc C = 120°, nên góc B = 180° - 120° = 90°. <br><br>
        `,
    },
    {
        question: `
            Trong tam giác vuông ABC, góc A = 30° và cạnh đối diện góc A là 5 cm. Tính độ dài cạnh huyền của tam giác. <br><br>
        `,
        answers: [
            `Cạnh huyền = 10 cm`,
            `Cạnh huyền = 8 cm`,
            `Cạnh huyền = 5√3 cm`,
            `Cạnh huyền = 5/√3 cm`,
        ],
        explain: `
            - Trong tam giác vuông, ta sử dụng công thức sin để tính cạnh huyền: sin(30°) = đối/huyền. <br>
            - sin(30°) = 1/2, vậy 1/2 = 5/huyền. <br>
            - Suy ra cạnh huyền = 10 cm. <br><br>
        `,
    },
    {
        question: `
            Trong một tứ giác ABCD nội tiếp, biết góc A = 45°, góc B = 90°. Hỏi góc C là bao nhiêu? <br><br>
        `,
        answers: [
            `Góc C = 135°`,
            `Góc C = 45°`,
            `Góc C = 90°`,
            `Góc C = 60°`,
        ],
        explain: `
            - Trong tứ giác nội tiếp, tổng số đo hai góc đối diện bằng 180°. <br>
            - Góc A = 45° và góc B = 90°, nên góc C = 180° - 45° = 135°. <br><br>
        `,
    },
    {
        question: `
            Trong tam giác vuông ABC, với góc B = 90°, cạnh AB = 6 cm và cạnh BC = 8 cm. Tính độ dài cạnh AC. <br><br>
        `,
        answers: [
            `Cạnh AC = 10 cm`,
            `Cạnh AC = 12 cm`,
            `Cạnh AC = 14 cm`,
            `Cạnh AC = 7 cm`,
        ],
        explain: `
            - Trong tam giác vuông, ta sử dụng định lý Pythagoras: AC² = AB² + BC². <br>
            - AC² = 6² + 8² = 36 + 64 = 100. <br>
            - AC = √100 = 10 cm. <br><br>
        `,
    },
    {
        question: `
            Tính diện tích của một hình tròn có bán kính 4 cm. (Làm tròn kết quả đến hàng đơn vị). <br><br>
        `,
        answers: [
            `Diện tích = 50 cm²`,
            `Diện tích = 60 cm²`,
            `Diện tích = 70 cm²`,
            `Diện tích = 40 cm²`,
        ],
        explain: `
            - Diện tích của hình tròn được tính theo công thức: S = πr². <br>
            - Với bán kính r = 4 cm, ta có: S = π(4)² ≈ 50,27 cm². Làm tròn đến hàng đơn vị, ta có diện tích = 50 cm². <br><br>
        `,
    }        
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        // units[31].levels[2].state = 'unlock';
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
