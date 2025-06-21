import { updateProgressBar, fraction } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Giải phương trình sau: x(x - 2) = 0
        `,
        answers: [
            `x = 0 hoặc x = 2`,
            `x = 0`,
            `x = 2`,
            `x = 1`,
        ],
        explain: `
            x(x - 2) = 0<br><br>
            Suy ra x = 0 hoặc x - 2 = 0<br><br>
            Do đó x = 0 hoặc x = 2.<br><br>
            Vậy phương trình đã cho có nghiệm x = 0 hoặc x = 2.
        `
    }, {
        question: `
            Giải phương trình sau: (x² - 4) + x(x - 2) = 0
        `,
        answers: [
            `x = 2 và x = -1`,
            `x = 2 và x = -3`,
            `x = 1`,
            `x = -1 và x = 3`,
        ],
        explain: `
            (x2 - 4) + x(x - 2) = 0<br><br>
            (x - 2)(x + 2) + x(x - 2) = 0<br><br>
            (x - 2)(x + 2 + x) = 0<br><br>
            (x - 2)(2x + 2) = 0.<br><br>
            Ta giải hai phương trình sau:<br><br>
            ⦁ x - 2 = 0, suy ra x = 2.<br><br>
            ⦁ 2x + 2 = 0 hay 2x = -2, suy ra x = -1.<br><br>
            Vậy phương trình đã cho có nghiệm là x = 2 và x = -1.
        `
    }, {
        question: `
            Bác An có một mảnh đất hình chữ nhật với chiều dài 14 m và 
            chiều rộng 12 m. Bác dự định xây nhà trên mảnh đất đó và dành 
            một phần diện tích đất để làm sân vườn như Hình 2.2. Biết diện 
            tích đất làm nhà là 100 m2. Hỏi x bằng bao nhiêu mét?<br>
            <div class="container-img">
                <img src="assets/images/img1.png">
            </div>
        `,
        answers: [
            `2`,
            `3`,
            `4`,
            `5`,
        ],
        explain: `
            Chiều dài của phần đất làm nhà là: 14 - (x + 2) = 12 - x(m). 
            Điều kiện x < 12.<br><br>
            Chiều rộng của phần đất làm nhà là: 12 - x(m).<br><br>
            Diện tích đất làm nhà là: (12 - x)² (m²).<br><br>
            Theo bài, diện tích đất làm nhà là 100m² nên ta có phương trình:<br><br>
            (12 - x)² = 100. (*)<br><br>
            Giải phương trình (*):<br><br>
            (12 - x)² - 10² = 0<br><br>
            (12 - x - 10)(12 - x + 10) = 0<br><br>
            (2 - x)(22 - x) = 0<br><br>
            Suy ra 2 - x = 0 hoặc 22 - x = 0<br><br>
            Do đó x = 2 hoặc x = 22.<br><br>
            Ta thấy x = 2 thỏa mãn điều kiện x < 12.<br><br>
            Vậy x = 2.<br><br>
        `
    }
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[4].levels[0].state = 'unlock';
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
            explainElement.innerHTML = `<p class="highlight">Giải thích<p>` + explain;
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
