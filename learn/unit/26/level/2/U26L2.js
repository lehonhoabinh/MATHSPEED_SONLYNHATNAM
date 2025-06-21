import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Một nhóm học sinh đang khảo sát số điểm của mình trong kỳ thi. Hãy tính xác suất để tổng số điểm của hai học sinh trong nhóm này đạt ít nhất 10 điểm.<br><br>
            Giả sử mỗi học sinh có thể nhận được điểm trong khoảng từ 1 đến 6, tính xác suất để tổng điểm của hai học sinh này ít nhất là 10.
        `,
        answers: [
            `1/6`,
            `1/9`,
            `1/36`,
            `1/12`
        ],
        explain: `
            Các kết quả thuận lợi là: (4,6), (5,5), (6,4), (5,6), (6,5), (6,6). Tổng cộng có 6 kết quả thuận lợi.<br><br>
            Tổng số kết quả có thể có là 36, xác suất là 6/36 = 1/6.
        `
    },
    {
        question: `
            Một cặp đồng hồ được thả ngẫu nhiên để đo thời gian. Xác suất tổng thời gian đo của cả hai đồng hồ lớn hơn hoặc bằng 10 giây là bao nhiêu?<br><br>
            Giả sử mỗi đồng hồ có thể đo được thời gian từ 1 đến 6 giây, bạn cần tính xác suất tổng thời gian đo được ít nhất là 10 giây.
        `,
        answers: [
            `1/6`,
            `1/9`,
            `1/36`,
            `1/12`
        ],
        explain: `
            Các kết quả thuận lợi là: (4,6), (5,5), (6,4), (5,6), (6,5), (6,6). Tổng cộng có 6 kết quả thuận lợi.<br><br>
            Vì tổng số kết quả có thể có là 36, xác suất là 6/36 = 1/6.
        `
    },
    {
        question: `
            Trong một trò chơi quay vòng, bạn cần tính xác suất để tổng điểm của hai vòng quay đạt ít nhất là 10 điểm.<br><br>
            Giả sử mỗi vòng quay có thể mang lại điểm từ 1 đến 6, bạn cần tính xác suất tổng điểm đạt ít nhất 10 điểm.
        `,
        answers: [
            `1/6`,
            `1/9`,
            `1/36`,
            `1/12`
        ],
        explain: `
            Các kết quả thuận lợi là: (4,6), (5,5), (6,4), (5,6), (6,5), (6,6). Tổng cộng có 6 kết quả thuận lợi.<br><br>
            Vì tổng số kết quả có thể có là 36, xác suất là 6/36 = 1/6.
        `
    }    
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];
function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[26].levels[0].state = 'unlock';
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
