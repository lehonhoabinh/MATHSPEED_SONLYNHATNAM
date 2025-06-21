import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Một lớp học có 40 học sinh với các sở thích khác nhau: 10 học sinh thích chơi thể thao, 15 học sinh thích đọc sách, và 15 học sinh thích chơi game. Tính tần số phần trăm của các sở thích.
        `,
        answers: [
            `Tần số thể thao: 25%, sách: 37.5%, game: 37.5%`,
            `Tần số thể thao: 20%, sách: 40%, game: 40%`,
            `Tần số thể thao: 30%, sách: 40%, game: 30%`,
            `Tần số thể thao: 35%, sách: 45%, game: 20%`,
        ],
        explain: `
            Tổng số học sinh: 40. <br><br>
            Bảng tần số:<br>
            | Sở thích   | Tần số | Tần số phần trăm |<br>
            |------------|--------|------------------|<br>
            | Thể thao   | 10     | (10/40)*100 = 25% |<br>
            | Đọc sách   | 15     | (15/40)*100 = 37.5% |<br>
            | Chơi game  | 15     | (15/40)*100 = 37.5% |<br><br>
        `
    },
    {
        question: `
            Trong một cuộc khảo sát về thói quen ăn uống của học sinh, có 50 học sinh tham gia, trong đó: 15 học sinh ăn chay, 20 học sinh ăn mặn, và 15 học sinh ăn cả chay và mặn. Tính tỷ lệ học sinh ăn chay.
        `,
        answers: [
            `30%`,
            `40%`,
            `50%`,
            `25%`,
        ],
        explain: `
            Tổng số học sinh tham gia khảo sát là 50. <br><br>
            Bảng tần số:<br>
            | Thói quen ăn uống  | Tần số | Tần số phần trăm |<br>
            |---------------------|--------|------------------|<br>
            | Ăn chay             | 15     | (15/50)*100 = 30% |<br>
            | Ăn mặn              | 20     | (20/50)*100 = 40% |<br>
            | Ăn cả chay và mặn   | 15     | (15/50)*100 = 30% |<br><br>
        `
    },
    {
        question: `
            Một công ty tiến hành khảo sát độ tuổi của 50 nhân viên. Kết quả như sau: 10 nhân viên từ 20 đến 30 tuổi, 15 nhân viên từ 30 đến 40 tuổi, 25 nhân viên từ 40 đến 50 tuổi. Tính tần số phần trăm của từng nhóm độ tuổi.
        `,
        answers: [
            `20-30 tuổi: 20%, 30-40 tuổi: 30%, 40-50 tuổi: 50%`,
            `20-30 tuổi: 10%, 30-40 tuổi: 25%, 40-50 tuổi: 65%`,
            `20-30 tuổi: 30%, 30-40 tuổi: 40%, 40-50 tuổi: 30%`,
            `20-30 tuổi: 25%, 30-40 tuổi: 25%, 40-50 tuổi: 50%`,
        ],
        explain: `
            Tổng số nhân viên khảo sát là 50. <br><br>
            Bảng tần số:<br>
            | Độ tuổi    | Tần số | Tần số phần trăm |<br>
            |------------|--------|------------------|<br>
            | 20-30 tuổi | 10     | (10/50)*100 = 20% |<br>
            | 30-40 tuổi | 15     | (15/50)*100 = 30% |<br>
            | 40-50 tuổi | 25     | (25/50)*100 = 50% |<br><br>
        `
    }     
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[25].levels[0].state = 'unlock';
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
