import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Một vật rơi tự do và quãng đường chuyển động s được tính bằng công thức s = 4,9t². Nếu thời gian rơi t = 3 giây, tính quãng đường s mà vật đã rơi được.
        `,
        answers: [
            `44,1 m`,
            `19,6 m`,
            `73,5 m`,
            `29,4 m`,
        ],
        explain: `
            - Công thức quãng đường: s = 4,9t².
            - Thay t = 3 vào, ta có s = 4,9 × 3² = 4,9 × 9 = 44,1 m.
            - Vậy quãng đường s mà vật đã rơi được là 44,1 m.
        `
    }, {
        question: `
            Một vật rơi tự do và quãng đường chuyển động s được tính bằng công thức s = 4,9t². Tìm giá trị thời gian t khi quãng đường s = 29,4 m.
        `,
        answers: [
            `2,45 giây`,
            `2 giây`,
            `3 giây`,
            `4 giây`,
        ],
        explain: `
            - Công thức quãng đường: s = 4,9t².
            - Với s = 29,4, ta có 29,4 = 4,9t².
            - Giải phương trình: t² = 29,4 / 4,9 = 6 ⟹ t ≈ 2,45 giây.
            - Vậy thời gian t là 2,45 giây.
        `
    }, {
        question: `
            Một chiếc xe đạp chuyển động đều trên đường dốc. Quãng đường y (mét) mà xe đã đi được sau thời gian t (giây) tuân theo công thức y = 3t². Hỏi quãng đường mà xe đã đi được sau 4 giây là bao nhiêu?
        `,
        answers: [
            `48 m`,
            `12 m`,
            `36 m`,
            `24 m`,
        ],
        explain: `
            - Công thức quãng đường: y = 3t².
            - Thay t = 4 vào, ta có y = 3 × 4² = 3 × 16 = 48 m.
            - Vậy quãng đường mà xe đã đi được là 48 m.
        `
    }    
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[17].levels[1].state = 'unlock';
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
