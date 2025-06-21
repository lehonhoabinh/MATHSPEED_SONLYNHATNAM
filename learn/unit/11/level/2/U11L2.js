import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Hãy viết tỉ số lượng giác sau thành tỉ số lượng giác của góc nhỏ hơn 45⁰: <br><br>
            sin55⁰ = cos(A)<br><br>
            Tính A
        `,
        answers: [
            `35⁰`,
            `45⁰`,
            `25⁰`,
            `40⁰`,
        ],
        explain: `
            Ta biết công thức: sin(90⁰ - x) = cos(x). <br>
            Do đó, sin55⁰ = cos(90⁰ - 55⁰) = cos35⁰. <br>
            Vậy A = 35⁰.
        `
    }, {
        question: `
            Hãy viết tỉ số lượng giác sau thành tỉ số lượng giác của góc nhỏ hơn 45⁰: <br><br>
            cos60⁰ = sin(A)<br><br>
            Tính A
        `,
        answers: [
            `30⁰`,
            `20⁰`,
            `40⁰`,
            `50⁰`,
        ],
        explain: `
            Ta biết công thức: cos(90⁰ - x) = sin(x). <br>
            Do đó, cos60⁰ = sin(90⁰ - 60⁰) = sin30⁰. <br>
            Vậy A = 30⁰.
        `
    }, {
        question: `
            Hãy viết tỉ số lượng giác sau thành tỉ số lượng giác của góc nhỏ hơn 45⁰: <br><br>
            tan65⁰ = cot(A)<br><br>
            Tính A
        `,
        answers: [
            `25⁰`,
            `35⁰`,
            `45⁰`,
            `40⁰`,
        ],
        explain: `
            Ta biết công thức: tan(90⁰ - x) = cot(x). <br>
            Do đó, tan65⁰ = cot(90⁰ - 65⁰) = cot25⁰. <br>
            Vậy A = 25⁰.
        `
    }             
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[10].levels[2].state = 'unlock';
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
