import { updateProgressBar } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Giải hệ phương trình<br>
            <p class="highlight red indent">2x - y = -3</p>
            <p class="highlight red indent">-2m²x + 9y = 3(m + 3)</p>
            trong trường hợp m = -2
        `,
        answers: [
            "(-<sup>12</sup>/<sub>5</sub>; -<sup>9</sup>/<sub>5</sub>)",
            "Vô nghiệm",
            "(3; 2)",
            "(-1; 5)",
        ],
        explain: `
            Với m = -2 ta có hệ phương trình
            <p class="highlight red indent">2x - y = -3</p>
            <p class="highlight red indent">-8x + 9y = 3</p><br>
            Nhân hai vế của phương trình thứ nhất với 4, ta được:<br>
            <p class="highlight red indent">8x - 4y = -12</p>
            <p class="highlight red indent">-8x + 9y = 3</p><br>
            Cộng từng vế hai phương trình của hệ mới, ta được 5y = -9 hay 
            y = -<sup>9</sup>/<sub>5</sub><br><br>
            Thế y = -<sup>9</sup>/<sub>5</sub> vào phương trình thứ nhất của hệ
            đã cho, ta có 2x + <sup>9</sup>/<sub>5</sub> = -3 hay
            2x = -<sup>24</sup>/<sub>5</sub>, suy ra
            x = -<sup>12</sup>/<sub>5</sub><br><br>
            Vậy hệ phương trình đã cho có nghiệm là
            (-<sup>12</sup>/<sub>5</sub>; -<sup>9</sup>/<sub>5</sub>)
        `
    }, {
        question: `
            Giải hệ phương trình<br>
            <p class="highlight red indent">2x - y = -3</p>
            <p class="highlight red indent">-2m²x + 9y = 3(m + 3)</p>
            trong trường hợp m = -3
        `,
        answers: [
            "Vô nghiệm",
            "(-3; -2)",
            "(5; 5)",
            "(-1; 6)",
        ],
        explain: `
            Với m = -3 ta có hệ phương trình
            <p class="highlight red indent">2x - y = -3</p>
            <p class="highlight red indent">-18x + 9y = 0</p><br>
            Chia hai vế của phương trình thứ hai cho 9, ta được:<br>
            <p class="highlight red indent">2x - y = -3</p>
            <p class="highlight red indent">-2x + y = 0</p><br>
            Cộng từng vế hai phương trình của hệ mới, ta được 
            0x + 0y = -3 (1)<br><br>
            Do không có giá trị nào của x và y thỏa mãn hệ thức (1) nên hệ phương 
            trình đã cho vô nghiệm.
        `
    }, {
        question: `
            Giải hệ phương trình<br>
            <p class="highlight red indent">2x - y = -3</p>
            <p class="highlight red indent">-2m²x + 9y = 3(m + 3)</p>
            trong trường hợp m = 3
        `,
        answers: [
            "Vô nghiệm",
            "(-3; -2)",
            "(5; 5)",
            "(-1; 6)",
        ],
        explain: `
            Với m = 3 ta có hệ phương trình
            <p class="highlight red indent">2x - y = -3</p>
            <p class="highlight red indent">-18x + 9y = 18</p><br>
            Chia hai vế của phương trình thứ hai cho 9, ta được:<br>
            <p class="highlight red indent">2x - y = -3</p>
            <p class="highlight red indent">-2x + y = 2</p><br>
            Cộng từng vế hai phương trình của hệ mới, ta được 
            0x + 0y = -1 (1)<br><br>
            Do không có giá trị nào của x và y thỏa mãn hệ thức (1) nên hệ phương 
            trình đã cho vô nghiệm.
        `
    }
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[1].levels[3].state = 'unlock';
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
