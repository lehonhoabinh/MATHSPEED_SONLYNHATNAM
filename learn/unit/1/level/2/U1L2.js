import { updateProgressBar } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Giải hệ phương trình<br>
            <p class="highlight red indent">2x + y = 5</p>
            <p class="highlight red indent">3x - y = 4</p>
            bằng phương pháp cộng đại số
        `,
        answers: [
            "(3; -1)",
            "(4; -2)",
            "(2; 1)",
            "(1; 2)"
        ],
        explain: `
            Cộng từng vế của hai phương trình ta được 2x + y + 3x - y = 5 + 4 hay 5x = 9.<br>
            Suy ra x = 9/5.<br>
            Thế x = 9/5 vào phương trình đầu tiên, ta có 2(9/5) + y = 5 hay y = ...<br>
            Đáp án là (3; -1).
        `
    },
    {
        question: `
            Giải hệ phương trình<br>
            <p class="highlight red indent">x + 2y = 7</p>
            <p class="highlight red indent">3x - 4y = -5</p>
            bằng phương pháp cộng đại số
        `,
        answers: [
            "(3; 2)",
            "(1; 3)",
            "(2; 4)",
            "(-1; 5)"
        ],
        explain: `
            Nhân phương trình đầu tiên với 3, ta có:<br>
            <p class="highlight red indent">3x + 6y = 21</p>
            Cộng với phương trình thứ hai:<br>
            3x + 6y + 3x - 4y = 21 - 5.<br>
            Đáp án là (3; 2).
        `
    },
    {
        question: `
            Giải hệ phương trình<br>
            <p class="highlight red indent">x + y = 5</p>
            <p class="highlight red indent">x - y = 3</p>
            bằng phương pháp cộng đại số
        `,
        answers: [
            "(4; 1)",
            "(3; 2)",
            "(2; 3)",
            "(1; 4)"
        ],
        explain: `
            Cộng từng vế của hai phương trình ta được:<br>
            x + y + x - y = 5 + 3 hay 2x = 8 ⟹ x = 4.<br>
            Thế x = 4 vào phương trình thứ nhất, ta được 4 + y = 5 ⟹ y = 1.<br>
            Vậy nghiệm là (4; 1).
        `
    },
    {
        question: `
            Giải hệ phương trình<br>
            <p class="highlight red indent">2x + y = 9</p>
            <p class="highlight red indent">3x - y = 6</p>
            bằng phương pháp cộng đại số
        `,
        answers: [
            "(3; 3)",
            "(2; 5)",
            "(1; 7)",
            "(4; 1)"
        ],
        explain: `
            Cộng từng vế của hai phương trình ta được:<br>
            2x + y + 3x - y = 9 + 6 hay 5x = 15 ⟹ x = 3.<br>
            Thế x = 3 vào phương trình thứ nhất, ta được 2(3) + y = 9 ⟹ y = 3.<br>
            Vậy nghiệm là (3; 3).
        `
    },
    {
        question: `
            Giải hệ phương trình<br>
            <p class="highlight red indent">4x + 3y = 18</p>
            <p class="highlight red indent">2x - 3y = 6</p>
            bằng phương pháp cộng đại số
        `,
        answers: [
            "(3; 2)",
            "(2; 1)",
            "(1; 3)",
            "(4; 0)"
        ],
        explain: `
            Cộng từng vế của hai phương trình ta được:<br>
            4x + 3y + 2x - 3y = 18 + 6 hay 6x = 24 ⟹ x = 4.<br>
            Thế x = 4 vào phương trình đầu tiên, ta được 4(4) + 3y = 18 ⟹ y = 2.<br>
            Vậy nghiệm là (3; 2).
        `
    },
    {
        question: `
            Giải hệ phương trình<br>
            <p class="highlight red indent">5x + y = 20</p>
            <p class="highlight red indent">3x - y = 10</p>
            bằng phương pháp cộng đại số
        `,
        answers: [
            "(5; -5)",
            "(4; -2)",
            "(3; -1)",
            "(2; 0)"
        ],
        explain: `
            Cộng từng vế của hai phương trình ta được:<br>
            5x + y + 3x - y = 20 + 10 hay 8x = 30 ⟹ x = 5.<br>
            Thế x = 5 vào phương trình đầu tiên, ta được 5(5) + y = 20 ⟹ y = -5.<br>
            Vậy nghiệm là (5; -5).
        `
    },
    {
        question: `
            Giải hệ phương trình<br>
            <p class="highlight red indent">3x + 2y = 12</p>
            <p class="highlight red indent">2x - y = 5</p>
            bằng phương pháp cộng đại số
        `,
        answers: [
            "(4; 0)",
            "(3; 1)",
            "(2; 2)",
            "(1; 3)"
        ],
        explain: `
            Nhân phương trình thứ hai với 2, ta được:<br>
            <p class="highlight red indent">4x - 2y = 10</p>
            Cộng với phương trình đầu:<br>
            3x + 2y + 4x - 2y = 12 + 10 hay 7x = 22 ⟹ x = 4.<br>
            Thế x vào, tính ra y. Đáp án là (4; 0).
        `
    },
    {
        question: `
            Giải hệ phương trình<br>
            <p class="highlight red indent">x + 3y = 10</p>
            <p class="highlight red indent">2x - y = 4</p>
            bằng phương pháp cộng đại số
        `,
        answers: [
            "(4; 2)",
            "(3; 1)",
            "(2; 3)",
            "(1; 4)"
        ],
        explain: `
            Nhân phương trình đầu với 2, ta được:<br>
            <p class="highlight red indent">2x + 6y = 20</p>
            Cộng với phương trình thứ hai:<br>
            2x + 6y + 2x - y = 20 + 4.<br>
            Kết quả x và y là số nguyên. Đáp án là (4; 2).
        `
    },
    {
        question: `
            Giải hệ phương trình<br>
            <p class="highlight red indent">3x + y = 9</p>
            <p class="highlight red indent">4x - 2y = 8</p>
            bằng phương pháp cộng đại số
        `,
        answers: [
            "(2; 3)",
            "(1; 4)",
            "(3; 2)",
            "(2; 1)"
        ],
        explain: `
            Nhân phương trình đầu tiên với 2, ta được:<br>
            <p class="highlight red indent">6x + 2y = 18</p>
            Cộng với phương trình thứ hai:<br>
            6x + 2y + 4x - 2y = 18 + 8.<br>
            Giải ra x và y. Đáp án là (2; 3).
        `
    },
    {
        question: `
            Giải hệ phương trình<br>
            <p class="highlight red indent">x - 2y = -1</p>
            <p class="highlight red indent">3x + y = 14</p>
            bằng phương pháp cộng đại số
        `,
        answers: [
            "(3; 5)",
            "(2; 4)",
            "(4; 3)",
            "(1; 6)"
        ],
        explain: `
            Nhân phương trình đầu tiên với 3, ta được:<br>
            <p class="highlight red indent">3x - 6y = -3</p>
            Cộng với phương trình thứ hai:<br>
            3x - 6y + 3x + y = -3 + 14.<br>
            Kết quả là (3; 5).
        `
    }
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[0].levels[2].state = 'unlock';
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

        const isCorrect = selectedOption.innerHTML === correctAnswer;
        selectedOption.classList.add(isCorrect ? 'correct' : 'wrong');

        if (isCorrect) {
            point++;
            lesson.shift();
            updateProgressBar(point, maxPoint);
            explainElement.innerHTML = explain;
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
