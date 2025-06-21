import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Quay 50 lần một tấm bìa hình tròn được chia thành ba hình quạt với các màu xanh, đỏ, vàng. Quan sát và ghi lại mũi tên chỉ vào hình quạt có màu nào khi tấm bìa dừng lại. Kết quả thu được như sau: <br><br>
            Xanh: ||||| ||||| ||||| <br><br>
            Đỏ: ||||| ||||| ||||| ||||| ||||| <br><br>
            Vàng: ||||| ||||| <br><br>
            Hãy ước lượng xác suất mũi tên chỉ vào hình quạt màu vàng.
        `,
        answers: [
            `0.2`,
            `0.3`,
            `0.1`,
            `0.4`,
        ],
        explain: `
            Để ước lượng xác suất, ta tính tần suất xuất hiện của màu vàng. <br><br>
            Tổng số lần quay là 50. Số lần mũi tên chỉ vào màu vàng là 10 lần. <br><br>
            Xác suất mũi tên chỉ vào màu vàng = Số lần chỉ vào màu vàng / Tổng số lần quay = 10 / 50 = 0.2. <br><br>
        `
    },
    {
        question: `
            Quay 50 lần một tấm bìa hình tròn được chia thành ba hình quạt với các màu xanh, đỏ, vàng. Quan sát và ghi lại mũi tên chỉ vào hình quạt có màu nào khi tấm bìa dừng lại. Kết quả thu được như sau: <br><br>
            Xanh: ||||| ||||| ||||| <br><br>
            Đỏ: ||||| ||||| ||||| ||||| ||||| <br><br>
            Vàng: ||||| ||||| <br><br>
            Hãy ước lượng xác suất mũi tên chỉ vào hình quạt màu xanh.
        `,
        answers: [
            `0.3`,
            `0.4`,
            `0.5`,
            `0.6`,
        ],
        explain: `
            Để ước lượng xác suất, ta tính tần suất xuất hiện của màu xanh. <br><br>
            Tổng số lần quay là 50. Số lần mũi tên chỉ vào màu xanh là 15 lần. <br><br>
            Xác suất mũi tên chỉ vào màu xanh = Số lần chỉ vào màu xanh / Tổng số lần quay = 15 / 50 = 0.3. <br><br>
        `
    }     
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[22].levels[1].state = 'unlock';
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
