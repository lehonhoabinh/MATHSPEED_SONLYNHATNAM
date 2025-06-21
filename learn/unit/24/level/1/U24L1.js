import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Một nhóm nghiên cứu khảo sát về sự phân bố nhiệt độ trung bình của các khu vực trên thế giới trong tháng 12. Sau khi thu thập dữ liệu, các giá trị nhiệt độ được ghi nhận lần lượt là: <br><br>
            15°C, 20°C, 25°C, 22°C, 18°C, 20°C, 23°C, 24°C, 19°C, 22°C, 21°C. <br><br>
            Hãy xác định số lượng khu vực có nhiệt độ trung bình trên 20°C.
        `,
        answers: [
            `5`,
            `4`,
            `3`,
            `6`,
        ],
        explain: `
            Các giá trị nhiệt độ trung bình trên 20°C là: <br><br>
            25°C, 22°C, 20°C, 23°C, 24°C. <br><br>
            Tần số là 5. <br><br>
        `
    },
    {
        question: `
            Trong một lớp học, giáo viên khảo sát số giờ các học sinh dành cho việc học mỗi tuần và thu thập được các kết quả sau: <br><br>
            10, 15, 12, 8, 7, 16, 10, 9, 13, 12, 15. <br><br>
            Hãy tính số lượng học sinh dành hơn 12 giờ mỗi tuần cho việc học.
        `,
        answers: [
            `3`,
            `2`,
            `4`,
            `5`,
        ],
        explain: `
            Các giá trị số giờ học trên 12 là: <br><br>
            15, 16, 13, 15. <br><br>
            Tần số là 4. <br><br>
        `
    },
    {
        question: `
            Một cuộc khảo sát được thực hiện trong một khu vực, ghi nhận thời gian đi làm trung bình của mọi người là: <br><br>
            30 phút, 45 phút, 40 phút, 50 phút, 60 phút, 55 phút, 35 phút. <br><br>
            Hãy xác định số lượng người mất hơn 45 phút để đi làm.
        `,
        answers: [
            `3`,
            `2`,
            `4`,
            `1`,
        ],
        explain: `
            Các giá trị thời gian đi làm hơn 45 phút là: <br><br>
            50 phút, 60 phút, 55 phút. <br><br>
            Tần số là 3. <br><br>
        `
    }    
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[23].levels[1].state = 'unlock';
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
