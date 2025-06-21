import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Giải bất phương trình sau:
            <p class="highlight indent">x - 5 ≥ 0</p>
        `,
        answers: [
            `x ≥ 5`,
            `x ≥ 3`,
            `x ≥ 1`,
            `x ≤ 5`,
        ],
        explain: ``
    }, {
        question: `
            Trong một cuộc thi tuyển dụng việc làm, ban tổ chức quy định mỗi 
            người ứng tuyển phải trả lời 25 câu hỏi ở vòng sơ tuyển. Mỗi câu 
            hỏi này có săn bốn đáp án, trong đó chỉ có một đáp án đúng. Người 
            ứng tuyển chọn đáp án đúng sẽ được cộng thêm 2 điểm, chọn đáp án 
            sai bị trừ đi 1 điểm. Ở vòng sơ tuyển, ban tổ chức tặng cho mỗi 
            người dự thi 5 điểm và theo quy định người ứng tuyển phải trả lời 
            hết 25 câu hỏi; người nào có số điểm từ 25 trở lên mới được dự thi 
            vòng tiếp theo. Hỏi người ứng tuyển phải trả lời chính xác ít nhất 
            bao nhiêu câu hỏi ở vòng sơ tuyển thì mới được vào vòng tiếp theo?
        `,
        answers: [
            `17`,
            `19`,
            `16`,
            `18`,
        ],
        explain: `
            Gọi x là số câu trả lời đúng (0 ≤ x ≤ 25, x ∈ N*). <br><br>
            Số câu trả lời sai là: 25 - x (câu). <br><br>
            Trả lời đúng x câu hỏi được cộng 2x (điểm). <br><br>
            Trả lời sai 25 - x câu hỏi bị trừ 25 - x (điểm). <br><br>
            Vì vậy, sau khi trả lời 25 câu thì người dự thi sẽ có số 
            điểm là: <br><br>
            2x - (25 - x) = 2x - 25 + x = 3x - 25 (điểm). <br><br>
            Theo bài, để được dự thi tiếp vòng sau thì cần có số điểm từ 25 trở 
            lên, nên ta có bất phương trình: <br><br>
            3x - 25 ≥ 25 <br><br>
            3x ≥ 50 <br><br>
            x ≥ ${fraction('50', '3')}. <br><br>
            Mà 0 ≤ x ≤ 25, x ∈ N* nên người ứng tuyển cần phải trả lời chính xác 
            ít nhất là 17 câu hỏi thì mới được dự thi tiếp vòng sau.
        `
    }, {
        question: `
            Một hãng taxi có giá mở cửa là 15 nghìn đồng và giá 12 nghìn đồng 
            cho mỗi kilômét tiếp theo. Hỏi với 200 nghìn đồng thì hành khách 
            có thể di chuyển được tối đa bao nhiêu kilômét (làm tròn đến hàng 
            đơn vị)?
        `,
        answers: [
            `15`,
            `19`,
            `16`,
            `18`,
        ],
        explain: `
            Gọi x là số kilômét mà hành khách đó có thể di chuyển với 200 nghìn đồng (x > 0). <br><br>
            Giá tiền cho x km là 12x (nghìn đồng). <br><br>
            Giá mở cửa của taxi là 15 nghìn đồng nên số tiền cần thanh toán khi đi x km là: 15 + 12x (nghìn đồng). <br><br>
            Theo bài, ta có: <br><br>
            15 + 12x ≤ 200 <br><br>
            12x ≤ 185 <br><br>
            x ≤ ${fraction('185', '12')}  <br><br>
            Mà x > 0 và làm tròn đến hàng đơn vị nên với 200 nghìn đồng thì 
            hành khách có thể di chuyển được tối đa 15 kilômét.
        `
    }
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[5].levels[3].state = 'unlock';
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
