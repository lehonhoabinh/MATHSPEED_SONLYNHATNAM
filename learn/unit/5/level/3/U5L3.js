import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Thay |?| trong các biểu thức sau bởi dấu thích hợp (<, >) để được 
            khẳng định đúng.
            <p class="highlight red indent">13 . (-10,5) |?| 13 . 11,2</p> 
        `,
        answers: [
            `&lt;`,
            `&gt;`,
        ],
        explain: ``
    }, {
        question: `
            Một nhà tài trợ dự kiến tổ chức một buổi đi dã ngoại tập thể nhằm 
            giúp các bạn học sinh vùng cao trải nghiệm thực tế tại một trang 
            trại trong 1 ngày (từ 14h00 ngày hôm trước đến 12h00 ngày hôm sau). 
            Cho biết số tiền tài trợ dự kiến là 30 triệu đồng và giá thuê các 
            dịch vụ và phòng nghỉ là 17 triệu đồng 1 ngày, giá mỗi suất ăn trưa, 
            ăn tối là 60 000 đồng và mỗi suất ăn sáng là 30 000 đồng. Hỏi có thể 
            tổ chức cho nhiều nhất bao nhiêu bạn tham gia được?
        `,
        answers: [
            `86`,
            `28`,
            `102`,
            `73`,
        ],
        explain: `
            Gọi x là số bạn học sinh có thể tham gia được (học sinh) (x ∈ N*)<br><br>
            Theo bài, số tiền còn lại sau khi thu dịch vụ và phòng nghỉ là:<br><br>
            30 - 17 = 13 (triệu đồng) = 13 000 (nghìn đồng).<br><br>
            Số tiền ăn sáng, ăn trưa và ăn tối của 1 bạn là:<br><br>
            60 000 + 30 000 + 60 000 = 150 000 (đồng) = 150 (nghìn đồng).<br><br>
            Như vậy, số tiền ăn của x bạn học sinh trong chuyến đi là 150x 
            (nghìn đồng).<br><br>
            Khi đó ta có: 150x ≤ 13 000.<br><br>
            Suy ra x ≤ ${fraction('13000', '150')} hay 
            x ≤ ${fraction('260', '3')} = 86,(6)<br><br>
            Mà x ∈ N* nên số bạn học sinh nhiều nhất có thể tham gia được là 
            86 bạn.<br><br>
            Vậy nhà tài trợ có thể tổ chức cho nhiều nhất 86 bạn tham gia 
            được chuyến đi.
        `
    }
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[4].levels[3].state = 'unlock';
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
