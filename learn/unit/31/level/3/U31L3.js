import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Một bể chứa nước có dạng hình trụ với chiều cao 4 m và bán kính đáy là 2 m.  
            Tính diện tích xung quanh của bể chứa nước. <br><br>
        `,
        answers: [
            `Diện tích xung quanh = 50,24 m²`,
            `Diện tích xung quanh = 100,48 m²`,
            `Diện tích xung quanh = 25,12 m²`,
            `Diện tích xung quanh = 75,36 m²`,
        ],
        explain: `
            - Diện tích xung quanh của hình trụ được tính theo công thức: S = 2πrh. <br>
            - Thay r = 2 m và h = 4 m vào công thức, ta có: S = 2π × 2 × 4 = 50,24 m². Phương án A là đúng. <br><br>
        `,
    },
    {
        question: `
            Một đống cát được đổ vào một thùng hình nón với chiều cao 3 m và bán kính đáy 1,5 m.  
            Tính thể tích của đống cát. <br><br>
        `,
        answers: [
            `Thể tích = 21,2 m³`,
            `Thể tích = 31,4 m³`,
            `Thể tích = 14,5 m³`,
            `Thể tích = 23,5 m³`,
        ],
        explain: `
            - Thể tích của hình nón được tính theo công thức: V = (1/3)πr²h. <br>
            - Thay r = 1,5 m và h = 3 m vào công thức, ta có: V = (1/3)π(1,5)²(3) ≈ 21,2 m³. Phương án A là đúng. <br><br>
        `,
    },
    {
        question: `
            Một ống nước có dạng hình trụ rỗng với chiều cao 2 m và đường kính ngoài là 8 cm, đường kính trong là 6 cm.  
            Tính thể tích của phần ống nước chứa nước. <br><br>
        `,
        answers: [
            `Thể tích = 37,7 cm³`,
            `Thể tích = 50,3 cm³`,
            `Thể tích = 120,8 cm³`,
            `Thể tích = 25,4 cm³`,
        ],
        explain: `
            - Thể tích của phần ống nước chứa nước được tính theo công thức: V = πh(R² - r²), trong đó R là bán kính ngoài và r là bán kính trong. <br>
            - Thay h = 200 cm, R = 4 cm và r = 3 cm vào công thức, ta có: V = π × 200 × (4² - 3²) = π × 200 × (16 - 9) = π × 200 × 7 ≈ 4398 cm³ ≈ 37,7 cm³. Phương án A là đúng. <br><br>
        `,
    }    
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[31].levels[0].state = 'unlock';
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
