import { updateProgressBar } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Giải hệ phương trình<br>
            <p class="highlight red indent">3x + 2y = 6</p>
            <p class="highlight red indent">2x - 2y = 14</p>
            bằng phương pháp cộng đại số
        `,
        answers: [
            "(4; -3)",
            "(1; 2)",
            "(4; 0)",
            "(3; -4)",
        ],
        explain: `
            Cộng từng vế của hai phương trình ta được 3x + 2y + 2x - 2y = 20 
            hay 5x = 20, suy ra x = 4.<br><br>
            Thế x = 4 vào phương trình thứ nhất, ta được 3 . 4 + 2y = 6 
            hay 2y = -6, suy ra y = -3.<br><br>
            Vậy hệ phương trình đã cho có nghiệm là (4; -3).<br><br>
        `
    }, {
        question: `
            Giải hệ phương trình<br>
            <p class="highlight red">0,3x + 0,5y = 3</p>
            <p class="highlight red">1,5x - 2y = 1,5</p>
            bằng phương pháp cộng đại số
        `,
        answers: [
            "(5; 3)",
            "(4; 6)",
            "(-2; 7)",
            "(1; 1)",
        ],
        explain: `
            Nhân hai vế của phương trình thứ nhất với 10 và nhân hai vế 
            của phương trình thứ hai với 2, ta được:<br>
            <p class="highlight red indent">3x + 5y = 30</p>
            <p class="highlight red indent">3x - 4y = 3</p><br>
            Trừ từng vế hai phương trình của hệ mới, ta được 9y = 27 hay y = 3.<br><br>
            Thế y = 3 vào phương trình thứ hai của hệ mới, ta có 3x - 4 . 3 = 3 hay 3x = 15, suy ra x = 5.<br><br>
            Vậy hệ phương trình đã cho có nghiệm là (5; 3).
        `
    }
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[1].levels[2].state = 'unlock';
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
        option.textContent = answer;

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

        const isCorrect = selectedOption.textContent === correctAnswer;
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
