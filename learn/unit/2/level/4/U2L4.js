import { updateProgressBar } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Cặp số nào sau đây là nghiệm của hệ phương trình<br>
            <p class="highlight red indent">5x + 7y = -1</p>
            <p class="highlight red indent">-3x + 2y = -5</p>
        `,
        answers: [
            "(-3; 2)",
            "(-1; 1)",
            "(2; -3)",
            "(5; 5)",
        ],
        explain: `
            Nhân hai vế của phương trình thứ nhất với 3 và nhân hai vế của 
            phương trình thứ hai với 5, ta được: <br>
            <p class="highlight red indent">15x + 21y = -3</p>
            <p class="highlight red indent">15x + 10y = -25</p>
            Trừ từng vế hai phương trình của hệ mới, ta được 11y = 22 
            hay y = 2.<br><br>
            Thế y = 2 vào phương trình thứ hai của hệ đã cho, ta có 
            3x + 2 . 2 = -5 hay 3x = -9, suy ra x = -3.<br><br>
            Do đó, hệ phương trình đã cho có nghiệm là (-3; 2).
        `
    }, {
        question: `
            Trên mặt phẳng tọa độ Oxy, cho các điểm A(1; 2), B(5; 6), C(2; 3), 
            D(-1; -1). Đường thẳng 4x - 3y = -1 đi qua hai điểm nào trong các 
            điểm đã cho?
        `,
        answers: [
            "C và D",
            "A và B",
            "B và C",
            "D và A",
        ],
        explain: `
            • Thay x = 1; y = 2 vào phương trình đường thẳng, ta có:<br><br>
            4 . 1 - 3 . 2 = 4 - 6 = -2 ≠ -1.<br><br>
            Suy ra đường thẳng 4x - 3y = -1 không đi qua A(1; 2).<br><br>
            Do đó, loại đáp án (A và D).<br><br>
            • Thay x = 5; y = 6 vào phương trình đường thẳng, ta có:<br><br>
            4 . 5 - 3 . 6 = 20 - 18 = 2 ≠ -1.<br><br>
            Suy ra đường thẳng 4x - 3y = -1 không đi qua B(5; 6).<br><br>
            Do đó, loại đáp án (B và C).<br><br>
            • Thay x = 2; y = 3 vào phương trình đường thẳng, ta có:<br><br>
            4 . 2 - 3 . 3 = 8 - 9 = -1.<br><br>
            Suy ra đường thẳng 4x - 3y = -1 đi qua C(2; 3).
        `
    }, {
        question: `
            Tìm các hệ số x, y trong phản ứng hóa học đã được cân bằng sau:
            <p class="highlight red indent">4Al + xO<sub>2</sub> → 
            yAl<sub>2</sub>O<sub>3</sub></p>
        `,
        answers: [
            "x = 3; y = 2",
            "x = 1; y = 2",
            "x = 1; y = 1",
            "x = 2; y = 2"
        ],
        explain: `
            Vì số nguyên tử Al và O ở cả hai vế của phương trình phản ứng 
            bằng nhau nên ta có hệ phương trình<br>
            <p class="highlight red indent">4 = 2y</p>
            <p class="highlight red indent">2x = 3y</p><br>
            Suy ra:
            <p class="highlight red indent">y = 2</p>
            <p class="highlight red indent">x = 3</p><br>
        `
    }, {
        question: `
            Tìm a và b sao cho hệ phương trình<br>
            <p class="highlight red indent">ax + by = 1</p>
            <p class="highlight red indent">ax + (2 - b)y = 3</p><br>
            có nghiệm là (1; -2)
        `,
        answers: [
            "a = 4; b = <sup>3</sup>/<sub>2</sub>",
            "a = <sup>2</sup>/<sub>5</sub>; b = <sup>4</sup>/<sub>7</sub>",
            "a = 1; b = -2",
            "Không có giá trị của a và b thoả mãn",
        ],
        explain: `
            Hệ phương trình đã cho có nghiệm là (1; -2) nên ta có
            <p class="highlight red indent">a.1 + b.(-2) = 1</p>
            <p class="highlight red indent">a.1 + (2 - b).(-2) = 3</p><br>
            Suy ra<br>
            <p class="highlight red indent">a - 2b = 1</p>
            <p class="highlight red indent">a + 2b - 4 = 3</p><br>
            hay <br>
            <p class="highlight red indent">a - 2b = 1</p>
            <p class="highlight red indent">a + 2b = 7</p><br>
            Cộng từng vế hai phương trình của hệ mới, ta được 2a = 8 hay a = 4.<br><br>
            Thế a = 4 vào phương trình thứ nhất của hệ mới, ta có 4 - 2b = 1 
            hay 2b = 3, suy ra b = <sup>3</sup>/<sub>2</sub><br><br>
            Vậy a = 4 và b = <sup>3</sup>/<sub>2</sub>
        `
    }
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[2].levels[0].state = 'unlock';
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
