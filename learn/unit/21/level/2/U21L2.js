import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Một mảnh đất hình chữ nhật có diện tích 360 m². Nếu tăng chiều rộng 3 m và giảm chiều dài 4 m thì diện tích mảnh đất không đổi. Hãy lập phương trình bậc hai và giải bài toán để tìm chiều dài và chiều rộng ban đầu của mảnh đất.
        `,
        answers: [
            `Chiều dài = 18 m, Chiều rộng = 20 m`,
            `Chiều dài = 20 m, Chiều rộng = 18 m`,
            `Chiều dài = 15 m, Chiều rộng = 24 m`,
            `Chiều dài = 25 m, Chiều rộng = 15 m`,
        ],
        explain: `
            Gọi chiều dài ban đầu là x m, chiều rộng ban đầu là y m. <br><br>
            Ta có: x * y = 360 (diện tích ban đầu). <br><br>
            Sau khi thay đổi, chiều dài trở thành (x - 4) và chiều rộng trở thành (y + 3). Diện tích không thay đổi, ta có: <br><br>
            (x - 4)(y + 3) = 360. <br><br>
            Từ đó, ta lập phương trình bậc hai và giải để tìm x và y.
        `
    },
    {
        question: `
            Một người lái xe đi từ A đến B với quãng đường 120 km. Nếu tốc độ của anh ta giảm 10 km/h, thời gian đi từ A đến B sẽ tăng thêm 1 giờ. Hãy lập phương trình bậc hai để tính tốc độ ban đầu của người lái xe.
        `,
        answers: [
            `Tốc độ ban đầu = 40 km/h`,
            `Tốc độ ban đầu = 50 km/h`,
            `Tốc độ ban đầu = 60 km/h`,
            `Tốc độ ban đầu = 30 km/h`,
        ],
        explain: `
            Gọi tốc độ ban đầu của người lái xe là x km/h. <br><br>
            Thời gian để đi từ A đến B với tốc độ x là: 120/x giờ. <br><br>
            Nếu giảm tốc độ 10 km/h, thời gian sẽ tăng thêm 1 giờ, tức là thời gian sẽ là 120/(x - 10) giờ. <br><br>
            Ta có phương trình: 120/(x - 10) - 120/x = 1. <br><br>
            Giải phương trình để tìm x.
        `
    },
    {
        question: `
            Trong một bài kiểm tra, điểm số của các học sinh được tính theo công thức: điểm = (số câu trả lời đúng)² - 4. Nếu một học sinh có điểm số bằng 36, hãy lập phương trình bậc hai để tìm số câu trả lời đúng của học sinh đó.
        `,
        answers: [
            `Số câu trả lời đúng = 8`,
            `Số câu trả lời đúng = 7`,
            `Số câu trả lời đúng = 6`,
            `Số câu trả lời đúng = 9`,
        ],
        explain: `
            Gọi số câu trả lời đúng là x. <br><br>
            Theo công thức, điểm số = x² - 4. <br><br>
            Ta có phương trình: x² - 4 = 36. <br><br>
            Giải phương trình để tìm x.
        `
    }    
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[21].levels[0].state = 'unlock';
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
