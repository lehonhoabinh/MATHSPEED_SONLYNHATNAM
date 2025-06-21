import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Người ta thấy rằng lượng sơn cần dùng để sơn kín một mặt cầu bán kính R bằng với lượng sơn cần dùng để sơn kín một hình tròn bán kính 2R (khi độ dày của lớp sơn như nhau) (H.10.24). Từ đó, em hãy dự đoán công thức tính diện tích mặt cầu bán kính R.<br><br>
            <div class="container-img">
                <img src="assets/images/img1.png">
            </div>
        `,
        answers: [
            `S = 4πR²`,
            `S = 4πR`,
            `S = πR²`,
            `S = 4R²`,
        ],
        explain: `
            Diện tích hình tròn bán kính 2R là: S = π . (2R)² = 4πR². <br><br>
            Ta thấy lượng sơn cần dùng để sơn kín một mặt cầu bán kính R bằng với lượng sơn cần dùng để sơn kín một hình tròn bán kính 2R.<br><br>
            Do đó, ta dự đoán công thức tính diện tích mặt cầu là bán kính R là: 
            S = 4πR².
        `,
    }, 
    {
        question: `
            Khinh khí cầu đầu tiên được phát minh bởi anh em nhà Montgolfier (người Pháp) vào năm 1782. Chuyến bay đầu tiên của hai anh em trên khinh khí cầu được thực hiện vào ngày 4 tháng 6 năm 1783 trên bầu trời  Place des Cordeliers ở Annonay (nước Pháp) (theo cand.com.vn). Giả sử một khinh khí cầu có dạng hình cầu với đường kính bằng 11 m. Tính diện tích khinh khí cầu đó (làm tròn kết quả đến hàng đơn vị của m²).<br><br>
            <div class="container-img">
                <img src="assets/images/img2.png">
            </div>
        `,
        answers: [
            `Khoảng 380m²`,
            `Khoảng 390m²`,
            `Khoảng 370m²`,
            `Khoảng 380m²`,
        ],
        explain: `
            - Diện tích bề mặt của hình cầu được tính theo công thức: S = 4πr², trong đó r là bán kính. <br>
            - Đường kính của khinh khí cầu là 11 m, nên bán kính r = 11/2 = 
            5,5 m. <br>
            - Thay r = 5,5 m vào công thức, ta có: S = 4π(5,5)² ≈ 380 m².<br><br>
        `,
    }    
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[31].levels[1].state = 'unlock';
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
