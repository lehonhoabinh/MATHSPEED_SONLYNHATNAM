import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Cho tam giác đều ABC. Đường tròn nội tiếp tam giác ABC có bán kính r. Biết rằng BC = 8 cm, hãy tính bán kính r.<br><br>
            Áp dụng công thức tính bán kính đường tròn nội tiếp tam giác đều.
        `,
        answers: [
            "${fraction('8√3', '6')} cm",
            "${fraction('4√3', '3')} cm",
            "${fraction('8√3', '3')} cm",
            "${fraction('√3', '3')} cm"
        ],
        explain: `
            Công thức tính bán kính r của đường tròn nội tiếp tam giác đều là r = ${fraction('a√3', '6')}, với a là độ dài cạnh của tam giác.<br><br>
            Với BC = 8 cm, ta có r = ${fraction('8√3', '6')} = ${fraction('4√3', '3')} cm.<br><br>
        `
    },
    {
        question: `
            Cho tam giác ABC có các cạnh AB = 5 cm, AC = 12 cm và BC = 13 cm. Tính bán kính R của đường tròn ngoại tiếp tam giác ABC.<br><br>
            Áp dụng công thức R = ${fraction('abc', '4S')}, với S là diện tích tam giác.
        `,
        answers: [
            "${fraction('65', '6')} cm",
            "${fraction('13', '2')} cm",
            "${fraction('39', '5')} cm",
            "${fraction('52', '5')} cm"
        ],
        explain: `
            Tam giác ABC là tam giác vuông với cạnh huyền BC = 13 cm. Công thức tính bán kính đường tròn ngoại tiếp tam giác vuông là R = ${fraction('c', '2')}, trong đó c là cạnh huyền.<br><br>
            Vậy R = ${fraction('13', '2')} cm.<br><br>
        `
    },
    {
        question: `
            Cho tam giác đều ABC. Đường tròn ngoại tiếp tam giác ABC có bán kính R. Biết rằng BC = 6 cm, hãy tính bán kính R.<br><br>
            Áp dụng công thức tính bán kính đường tròn ngoại tiếp tam giác đều.
        `,
        answers: [
            "${fraction('6', '√3')} cm",
            "${fraction('3√3', '3')} cm",
            "${fraction('6√3', '3')} cm",
            "${fraction('6√3', '2')} cm"
        ],
        explain: `
            Công thức tính bán kính R của đường tròn ngoại tiếp tam giác đều là R = ${fraction('a', '√3')}, với a là độ dài cạnh của tam giác.<br><br>
            Với BC = 6 cm, ta có R = ${fraction('6', '√3')} = ${fraction('2√3', '1')} cm.<br><br>
        `
    }      
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[28].levels[0].state = 'unlock';
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
