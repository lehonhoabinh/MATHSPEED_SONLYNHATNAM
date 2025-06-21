import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Một thùng nước có dạng hình trụ với chiều cao bằng 2 m và bán kính đáy bằng 0,6 m.  
            Tính diện tích xung quanh của thùng nước. <br><br>
        `,
        answers: [
            `Diện tích xung quanh = 2,4 m²`,
            `Diện tích xung quanh = 3,6 m²`,
            `Diện tích xung quanh = 5,4 m²`,
            `Diện tích xung quanh = 6,8 m²`,
        ],
        explain: `
            - Diện tích xung quanh của hình trụ được tính theo công thức: S = 2πrh. <br>
            - Thay r = 0,6 m và h = 2 m vào công thức, ta có: S = 2π × 0,6 × 2 = 2,4 m².<br><br>
        `,
    }, 
    {
        question: `
            Một thùng nước có dạng hình trụ với chiều cao bằng 1,8 m và bán kính đáy bằng 0,4 m.  
            Hỏi thùng chứa được bao nhiêu lít nước? (Coi chiều dày của thùng không đáng kể và làm tròn kết quả đến hàng đơn vị của lít) <br><br>
        `,
        answers: [
            `Thùng chứa được 211 lít`,
            `Thùng chứa được 181 lít`,
            `Thùng chứa được 240 lít`,
            `Thùng chứa được 269 lít`,
        ],
        explain: `
            - Thể tích của hình trụ được tính theo công thức: V = πr²h. <br>
            - Thay r = 0,4 m và h = 1,8 m vào công thức, ta có: V = π × (0,4)² × 1,8 ≈ 0,7236 m³. <br>
            - Vì 1 m³ = 1000 lít, ta có thể tích là khoảng 723,6 lít. Làm tròn đến hàng đơn vị, ta có 724 lít. <br><br>
        `,
    }    
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[30].levels[1].state = 'unlock';
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
