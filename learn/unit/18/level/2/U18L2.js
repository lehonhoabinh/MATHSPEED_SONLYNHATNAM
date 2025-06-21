import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Cho hình lăng trụ đứng có đáy là hình vuông cạnh a (cm) và chiều cao 10 cm. Tính giá trị của V khi a = 3 cm.
        `,
        answers: [
            `V = 90 cm³`,
            `V = 45 cm³`,
            `V = 30 cm³`,
            `V = 60 cm³`,
        ],
        explain: `
            - Công thức tính thể tích lăng trụ: V = diện tích đáy × chiều cao.  
            - Diện tích đáy là hình vuông cạnh a, nên diện tích đáy = a².  
            - Thay chiều cao = 10 cm, ta có V = a² × 10.  
            - Với a = 3 cm, ta có V = 3² × 10 = 9 × 10 = 90 cm³.
        `
    }, {
        question: `
            Cho hình lăng trụ đứng có đáy là hình vuông cạnh a (cm) và chiều cao 10 cm.  
            Nếu cạnh đáy tăng gấp đôi, hỏi thể tích của hình lăng trụ thay đổi bao nhiêu lần so với ban đầu?
        `,
        answers: [
            `Tăng 4 lần`,
            `Tăng 2 lần`,
            `Tăng 8 lần`,
            `Không thay đổi`,
        ],
        explain: `
            - Công thức tính thể tích lăng trụ: V = a² × 10.  
            - Khi cạnh đáy a tăng gấp đôi, diện tích đáy sẽ tăng gấp 4 lần vì diện tích = a².  
            - Do đó, thể tích cũng tăng gấp 4 lần.
        `
    }    
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[18].levels[0].state = 'unlock';
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
