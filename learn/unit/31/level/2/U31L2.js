import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Người ta đổ muối thu hoạch được trên cánh đồng muối thành từng đống có dạng hình nón với chiều cao khoảng 1 m và đường kính đáy khoảng 1,8 m.  
            Hỏi mỗi đống muối có bao nhiêu decimét khối muối? (Làm tròn kết quả đến hàng đơn vị). <br><br>
        `,
        answers: [
            `Thể tích = 763 dm³`,
            `Thể tích = 3,1 dm³`,
            `Thể tích = 5,7 dm³`,
            `Thể tích = 8,1 dm³`,
        ],
        explain: `
            - Thể tích của hình nón được tính theo công thức: V = (1/3)πr²h. <br>
            - Đường kính đáy là 1,8 m, nên bán kính đáy r = 0,9 m. <br>
            - Thay r = 0,9 m và h = 1 m vào công thức, ta có: V = (1/3)π(0,9)²(1) ≈ 0,763 m³. <br>
            - 1 m³ = 1000 dm³, vậy thể tích là khoảng 763 dm³. <br><br>
        `,
    }, 
    {
        question: `
            Người ta đổ muối thu hoạch được trên cánh đồng muối thành từng đống có dạng hình nón với chiều cao khoảng 1,2 m và đường kính đáy khoảng 2 m.  
            Hỏi mỗi đống muối có bao nhiêu decimét khối muối? (Làm tròn kết quả đến hàng đơn vị). <br><br>
        `,
        answers: [
            `Thể tích = 1256 dm³`,
            `Thể tích = 15,4 dm³`,
            `Thể tích = 22,5 dm³`,
            `Thể tích = 28,3 dm³`,
        ],
        explain: `
            - Thể tích của hình nón được tính theo công thức: V = (1/3)πr²h. <br>
            - Đường kính đáy là 2 m, nên bán kính đáy r = 1 m. <br>
            - Thay r = 1 m và h = 1,2 m vào công thức, ta có: V = (1/3)π(1)²(1,2) ≈ 1,256 m³. <br>
            - 1 m³ = 1000 dm³, vậy thể tích là khoảng 1256 dm³. <br><br>
        `,
    }    
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[30].levels[2].state = 'unlock';
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
