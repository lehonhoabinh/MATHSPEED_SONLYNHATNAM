import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Một chiếc thang dài 10 m được đặt nghiêng vào tường, đầu thang cách mặt đất 8 m. Hỏi chân thang cách chân tường bao xa?
        `,
        answers: [
            `6 m`,
            `8 m`,
            `5 m`,
            `4 m`,
        ],
        explain: `
            Ta coi hình vẽ như tam giác vuông với: <br>
            - Cạnh huyền là chiều dài chiếc thang: 10 m. <br>
            - Một cạnh góc vuông là khoảng cách từ đầu thang đến mặt đất: 8 m. <br>
            Sử dụng định lý Pythagoras: cạnh góc vuông còn lại = √(huyền² - góc vuông²) = √(10² - 8²) = √(100 - 64) = √36 = 6 m. <br>
            Vậy chân thang cách chân tường 6 m.
        `
    }, {
        question: `
            Một cột điện cao 15 m, dây chằng từ đỉnh cột điện đến mặt đất dài 25 m. Hỏi dây chằng cách chân cột điện bao xa?
        `,
        answers: [
            `20 m`,
            `18 m`,
            `22 m`,
            `24 m`,
        ],
        explain: `
            Ta coi hình vẽ như tam giác vuông với: <br>
            - Cạnh huyền là chiều dài dây chằng: 25 m. <br>
            - Một cạnh góc vuông là chiều cao cột điện: 15 m. <br>
            Sử dụng định lý Pythagoras: cạnh góc vuông còn lại = √(huyền² - góc vuông²) = √(25² - 15²) = √(625 - 225) = √400 = 20 m. <br>
            Vậy dây chằng cách chân cột điện 20 m.
        `
    }            
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[11].levels[1].state = 'unlock';
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
