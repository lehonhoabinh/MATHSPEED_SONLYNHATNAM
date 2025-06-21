import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Tìm hai số biết tổng của chúng bằng 9, tích của chúng bằng 20.
            Lời giải: Hai số cần tìm là hai nghiệm của phương trình x² - 9x + 20 = 0.
        `,
        answers: [
            `x = 4 và x = 5`,
            `x = 2 và x = 7`,
            `x = -4 và x = -5`,
            `x = 1 và x = 8`,
        ],
        explain: `
            Đặt hai số cần tìm là x1 và x2.
            Áp dụng định lý Viète: x1 + x2 = 9 và x1 * x2 = 20.
            Phương trình tương ứng là x² - 9x + 20 = 0, từ đó ta tìm được hai nghiệm là x = 4 và x = 5.
        `
    },
    {
        question: `
            Tìm hai số biết tổng của chúng bằng –5, tích của chúng bằng 6.
            Lời giải: Hai số cần tìm là hai nghiệm của phương trình x² + 5x + 6 = 0.
        `,
        answers: [
            `x = -2 và x = -3`,
            `x = -1 và x = -6`,
            `x = 2 và x = 3`,
            `x = 1 và x = 5`,
        ],
        explain: `
            Đặt hai số cần tìm là x1 và x2.
            Áp dụng định lý Viète: x1 + x2 = -5 và x1 * x2 = 6.
            Phương trình tương ứng là x² + 5x + 6 = 0, từ đó ta tìm được hai nghiệm là x = -2 và x = -3.
        `
    },
    {
        question: `
            Tìm hai số biết tổng của chúng bằng 13, tích của chúng bằng 36.
            Lời giải: Hai số cần tìm là hai nghiệm của phương trình x² - 13x + 36 = 0.
        `,
        answers: [
            `x = 4 và x = 9`,
            `x = 3 và x = 12`,
            `x = -4 và x = -9`,
            `x = 6 và x = 6`,
        ],
        explain: `
            Đặt hai số cần tìm là x1 và x2.
            Áp dụng định lý Viète: x1 + x2 = 13 và x1 * x2 = 36.
            Phương trình tương ứng là x² - 13x + 36 = 0, từ đó ta tìm được hai nghiệm là x = 4 và x = 9.
        `
    }      
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[19].levels[3].state = 'unlock';
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
