import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Người ta dùng một loại xe tải để chở sữa tươi cho một nhà máy. Biết 
            mỗi thùng sữa loại 180 ml nặng trung bình 10 kg. Theo khuyến nghị, 
            trọng tải của xe (tức là tổng khối lượng tối đa cho phép mà xe có 
            thể chở) là 5,25 tấn. Hỏi xe có thể chở được tối đa bao nhiêu thùng 
            sữa như vậy, biết bác lái xe nặng 65 kg?
        `,
        answers: [
            `518`,
            `517`,
            `519`,
            `520`,
        ],
        explain: `
            Đổi đơn vị: 5,25 tấn = 5 250 kg. <br><br>
            Gọi x (thùng) là số sữa mà xe có thể chở (x ∈ N*). <br><br>
            Khi đó, khối lượng sữa mà xe chở là: 10x (kg). <br><br>
            Tổng khối lượng sữa và bác tài xế là: 65 + 10x (kg). <br><br>
            Do trọng tải (tổng khối lượng tối đa cho phép mà xe có thể chở) là 
            5250 kg nên ta có: <br><br>
            65 + 10x ≤ 5250 <br><br>
            10x ≤ 5185 <br><br>
            x ≤ 518,5. <br><br>
            Mà x ∈ N* nên xe tải đó có thể chở tối đa 518 thùng sữa.
        `
    }, {
        question: `
            Nghiệm của bất phương trình -2x + 1 < 0 là
        `,
        answers: [
            `x &gt; ${fraction('1', '2')}`,
            `x &lt; ${fraction('1', '2')}`,
            `x ≤ ${fraction('1', '2')}`,
            `x ≥ ${fraction('1', '2')}`,
        ],
        explain: `
            Ta có: <br><br>
            -2x + 1 < 0 <br><br>
            -2x < -1 <br><br>
            x > ${fraction('1', '2')}
        `
    }, {
        question: `
            Phương trình x - 1 = m + 4 có nghiệm lớn hơn 1 với
        `,
        answers: [
            `m &gt; -4`,
            `m ≥ -4`,
            `m ≤ -4`,
            `m &lt; -4`,
        ],
        explain: `
            Từ x - 1 = m + 4, suy ra x = m + 5. <br><br>
            Theo bài, phương trình x - 1 = m + 4 có nghiệm lớn hơn 1 nên ta có: 
            x > 1.<br><br>
            Suy ra m + 5 >1, do đó m > -4.<br><br>
        `
    },
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[6].levels[0].state = 'unlock';
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
