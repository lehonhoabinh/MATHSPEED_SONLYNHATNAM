import { updateProgressBar } from "../../../../utils/util.js";

const questions = [
    {
        question: "Phương trình bậc nhất hai ẩn x và y là hệ thức dạng",
        answers: [
            "ax + by = c",
            "ax² + by = c",
            "0x + 0y = c",
            "ax + b√y = c"
        ],
        explain: `
            Phương trình bậc nhất hai ẩn x và y là hệ thức dạng<br>
            <p class="center-text highlight red">ax + by = c</p>
        `
    }, {
        question: "Hệ thức nào <span class='highlight red'>không</span> là phương trình bậc nhất hai ẩn",
        answers: [
            "0x + 0y = 5",
            "3x + 2y = 6",
            "7y = 2",
            "0x + y = -1"
        ],
        explain: `
            Phương trình bậc nhất hai ẩn x và y là hệ thức dạng<br>
            <p class="center-text">ax + by = c</p>
            <p>Trong đó a và b <span class="highlight red">không đồng thời bằng 0</span></p>
        `
    }, {
        question: "Cặp số nào sau đây là nghiệm của phương trình x + 3y = -5",
        answers: [
            "(4; -3)",
            "(-2; 2)",
            "(3; 1)",
            "(-6; 2)"
        ],
        explain: `
            Thay x = 4, y = -3 vào phương trình ta được<br>
            4 + 3(-3) = -5<br>
            -5 = -5 (Đúng)
        `
    }, {
        question: "Cặp số nào sau đây là nghiệm của phương trình 2x - y = 7",
        answers: [
            "(5; 3)",
            "(3; 1)",
            "(2; -3)",
            "(6; -5)"
        ],
        explain: `
            Thay từng cặp số vào phương trình 2x - y = 7<br>
            Với (5; 3): 2(5) - 3 = 10 - 3 = 7 (Đúng)<br>
            Các cặp còn lại không thỏa mãn.
        `
    }, {
        question: "Điều kiện để hệ số của phương trình ax + by = c không phải là phương trình bậc nhất hai ẩn là",
        answers: [
            "a = 0 và b = 0",
            "a = 0 hoặc b = 0",
            "a = 1 và b = -1",
            "c = 0"
        ],
        explain: `
            Phương trình bậc nhất hai ẩn có dạng ax + by = c<br>
            Trong đó, a và b <span class="highlight red">không đồng thời bằng 0</span>.
        `
    }, {
        question: "Phương trình nào sau đây là phương trình bậc nhất hai ẩn",
        answers: [
            "2x - 3y = 5",
            "x² + y = 4",
            "y² = 7",
            "√x + y = 1"
        ],
        explain: `
            Phương trình bậc nhất hai ẩn có dạng ax + by = c<br>
            Phương trình 2x - 3y = 5 là đúng dạng.
        `
    }, {
        question: "Tìm giá trị của m để cặp số (1; -2) là nghiệm của phương trình mx - y = 5",
        answers: [
            "3",
            "5",
            "7",
            "0"
        ],
        explain: `
            Thay x = 1, y = -2 vào phương trình mx - y = 5<br>
            m(1) - (-2) = 5<br>
            m + 2 = 5 ⟹ m = 3.
        `
    }, {
        question: "Phương trình nào có nghiệm (2; 3)",
        answers: [
            "x + 2y = 8",
            "x - y = 5",
            "3x + y = 10",
            "2x - 3y = 6"
        ],
        explain: `
            Thay x = 2, y = 3 vào từng phương trình:<br>
            Với x + 2y = 8: 2 + 2(3) = 8 (Đúng).<br>
            Các phương trình còn lại không thỏa mãn.
        `
    }, {
        question: "Cặp nghiệm nào đúng với phương trình 3x + 4y = 12",
        answers: [
            "(4; 0)",
            "(2; 3)",
            "(0; 3)",
            "(1; 2)"
        ],
        explain: `
            Thay từng cặp nghiệm vào phương trình 3x + 4y = 12:<br>
            Với (4; 0): 3(4) + 4(0) = 12 (Đúng).<br>
            Các cặp còn lại không thỏa mãn.
        `
    }
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[0].levels[1].state = 'unlock';
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
        newCheckButton.style.pointerEvents = 'none';
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
