import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `Khẳng định nào sau đây là đúng?`,
        answers: [
            `Góc nội tiếp có số đo bằng một nửa số đo cung bị chắn.`,
            `Góc nội tiếp có số đo bằng số đo cung bị chắn.`,
            `Góc có hai cạnh chứa các dây cung của đường tròn là góc nội tiếp 
            đường tròn đó.`,
            `Góc có đỉnh nằm trên đường tròn là góc nội tiếp đường tròn đó.`,
        ],
        explain: `
            Trong một đường tròn hoặc hai đường tròn bằng nhau: <br><br>
            ⦁ Góc nội tiếp có số đo bằng nửa số đo cung bị chắn. Do đó 
            phương án A là sai và phương án C là đúng. <br><br>
            ⦁ Góc nội tiếp là góc có đỉnh nằm trên đường tròn và hai cạnh chứa hai dây cung của đường tròn đó nên phương án B và D là sai. <br><br>
        `
    }, {
        question: `
            Cho tứ giác ABCD nội tiếp trong một đường tròn. Khẳng định nào sau đây là đúng? <br><br>
        `,
        answers: [
            `Tổng số đo hai góc đối diện bằng 180⁰.`,
            `Tổng số đo hai góc đối diện bằng 90⁰.`,
            `Mỗi góc của tứ giác bằng một nửa số đo cung bị chắn.`,
            `Các góc đối diện của tứ giác bằng nhau.`,
        ],
        explain: `
            - Trong tứ giác nội tiếp, tổng số đo hai góc đối diện luôn bằng 180⁰. Do đó, phương án A là đúng. <br><br>
            - Các phương án khác không đúng vì không phù hợp với tính chất của tứ giác nội tiếp. <br><br>
        `,
    },
    {
        question: `
            Cho tứ giác ABCD nội tiếp trong một đường tròn. Biết số đo cung bị chắn bởi góc D là 120⁰. Tính số đo góc D. <br><br>
        `,
        answers: [
            `D = 60⁰`,
            `D = 90⁰`,
            `D = 120⁰`,
            `D = 45⁰`,
        ],
        explain: `
            - Số đo góc nội tiếp D bằng một nửa số đo cung bị chắn bởi góc đó. <br><br>
            - Do cung bị chắn bởi góc D có số đo 120⁰, ta có D = 120⁰ / 2 = 60⁰. Do đó, phương án A là đúng. <br><br>
        `,
    },
    {
        question: `
            Cho tứ giác ABCD nội tiếp trong một đường tròn. Biết số đo góc A = 75⁰, số đo góc C bằng bao nhiêu? <br><br>
        `,
        answers: [
            `C = 75⁰`,
            `C = 105⁰`,
            `C = 85⁰`,
            `C = 135⁰`,
        ],
        explain: `
            - Trong tứ giác nội tiếp, tổng số đo hai góc đối diện bằng 180⁰. <br><br>
            - Do đó, nếu A = 75⁰, ta có C = 180⁰ - 75⁰ = 105⁰. Phương án B là đúng. <br><br>
        `,
    },
    {
        question: `
            Cho tứ giác ABCD nội tiếp trong một đường tròn. Biết số đo cung AC = 240⁰, tính số đo góc B. <br><br>
        `,
        answers: [
            `B = 60⁰`,
            `B = 120⁰`,
            `B = 30⁰`,
            `B = 90⁰`,
        ],
        explain: `
            - Số đo góc B bằng một nửa số đo cung bị chắn bởi góc đó. <br><br>
            - Do cung bị chắn bởi góc B có số đo 240⁰, ta có B = 240⁰ / 2 = 120⁰. Do đó, phương án B là đúng. <br><br>
        `,
    }    
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[28].levels[1].state = 'unlock';
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
