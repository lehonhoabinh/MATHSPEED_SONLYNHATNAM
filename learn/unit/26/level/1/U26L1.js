import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Chọn ngẫu nhiên một gia đình có hai con. Giả thiết rằng biến cố “Sinh con trai” và biến cố “Sinh con gái” là đồng khả năng. Tính xác suất của các biến cố sau:<br><br>
            A: “Gia đình đó có cả con trai và con gái”;<br>
            B: “Gia đình đó có con trai”.<br><br>
            Lời giải:<br>
            Phép thử là chọn ngẫu nhiên một gia đình có hai con.<br>
            Kết quả của phép thử là (a, b), trong đó a và b tương ứng là giới tính của người con thứ nhất và người con thứ hai.<br><br>
            Không gian mẫu của phép thử là Ω = {(Trai, Trai); (Trai, Gái); (Gái, Trai); (Gái, Gái)}.<br><br>
            Tập Ω có 4 phần tử.<br>
            a) Có 2 kết quả thuận lợi cho biến cố A là: (Trai, Gái); (Gái, Trai).<br><br>
            Vậy P(A) = ?
        `,
        answers: [
            `1/2`,
            `1/4`,
            `1/3`,
            `3/4`
        ],
        explain: `
            Biến cố A là “Gia đình có cả con trai và con gái”. Kết quả thuận lợi là (Trai, Gái) và (Gái, Trai), tức là 2 phần tử.<br><br>
            Tổng số phần tử trong không gian mẫu là 4. Vì vậy, xác suất P(A) = 2/4 = 1/2.
        `
    } 
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[25].levels[1].state = 'unlock';
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
