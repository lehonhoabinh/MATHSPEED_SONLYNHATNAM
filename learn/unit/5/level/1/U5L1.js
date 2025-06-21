import { updateProgressBar, fraction } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Viết bất đẳng thức để mô tả tốc độ cho phép trong tình huống: 
            <p class="highlight red indent">Ô tô ở làn giữa</p><br>
            Gọi tốc độ của ô tô di duyển ở làn giữa là x(km/h)
            <div class="container-img">
                <img src="assets/images/img1.png">
            </div>
        `,
        answers: [
            `x &lt;= 50`,
            `x &gt;= 50`,
            `x &lt; 50`,
            `x &gt; 50`,
        ],
        explain: `
            Bất đẳng thức mô tả tốc độ cho phép ô tô di chuyển ở làn giữa là x <= 50
        `
    }, {
        question: `
            Viết bất đẳng thức để mô tả tốc độ cho phép trong tình huống: 
            <p class="highlight red indent">Xe máy ở làn bên phải</p><br>
            Gọi tốc độ của xe máy di duyển ở làn bên phải là x(km/h)
            <div class="container-img">
                <img src="assets/images/img1.png">
            </div>
        `,
        answers: [
            `x &lt;= 50`,
            `x &gt;= 50`,
            `x &lt; 50`,
            `x &gt; 50`,
        ],
        explain: `
            Bất đẳng thức mô tả tốc độ cho phép xe máy di duyển ở làn bên phải là 
            x <= 50
        `
    }
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[4].levels[1].state = 'unlock';
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
