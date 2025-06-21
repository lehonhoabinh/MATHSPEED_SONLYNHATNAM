import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Màu hạt của đậu Hà Lan có hai kiểu hình: màu vàng và màu xanh, có hai gene ứng với hai kiểu hình này allele trội A và allele lặn a. Hình dạng hạt của đậu Hà Lan có hai kiểu hình: hạt trơn và hạt nhăn, có hai gene ứng với hai kiểu hình này allele trội B và allele lặn b.<br><br>
            Khi cho lai hai cây đậu Hà Lan, cây con lấy ngẫu nhiên một gene từ cây bố và một gene từ cây mẹ để hình thành một cặp gene. Phép thử là cho lai hai cây đậu Hà Lan, trong đó cây bố có kiểu gene là (AA, Bb), cây mẹ có kiểu gene là (Aa, Bb).<br><br>
            Gợi ý: Về kiểu gene, có hai kiểu gene ứng với màu hạt của cây con là AA; Aa.<br>
            Có bốn kiểu gene ứng với hình dạng hạt của cây con là BB; Bb; bB; bb.<br><br>
            Hãy mô tả không gian mẫu của phép thử trên. Không gian mẫu có bao nhiêu phần tử?
        `,
        answers: [
            `8 phần tử`,
            `4 phần tử`,
            `6 phần tử`,
            `16 phần tử`
        ],
        explain: `
            Để mô tả không gian mẫu, ta cần xét tất cả các sự kết hợp có thể xảy ra giữa các allele từ cây bố và cây mẹ.<br><br>
            - Cây bố có kiểu gene (AA, Bb), tức là cây bố chỉ có thể truyền AA cho màu hạt và BB hoặc Bb cho hình dạng hạt.<br>
            - Cây mẹ có kiểu gene (Aa, Bb), tức là cây mẹ có thể truyền AA hoặc Aa cho màu hạt và BB, Bb, bB, bb cho hình dạng hạt.<br><br>
            Kết hợp các allele từ cây bố và cây mẹ, ta có 8 sự kết hợp khác nhau:<br>
            | Màu hạt | Hình dạng hạt |<br>
            |----------|---------------|<br>
            | AA       | BB            |<br>
            | AA       | Bb            |<br>
            | AA       | bB            |<br>
            | AA       | bb            |<br>
            | Aa       | BB            |<br>
            | Aa       | Bb            |<br>
            | Aa       | bB            |<br>
            | Aa       | bb            |<br><br>
            Vậy không gian mẫu có 8 phần tử.
        `
    }    
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[25].levels[0].state = 'unlock';
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
