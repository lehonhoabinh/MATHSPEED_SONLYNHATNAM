import { updateProgressBar } from "../../../../utils/util.js";

const questions = [
    {
        question: `Hệ thức nào <span class='highlight red'>không</span> là phương trình bậc nhất hai ẩn`,
        answers: [
            "0x + 0y = 1",
            "5x - 8y = 0",
            "4x + 0y = -2",
            "0x - 3y = 9",
        ],
        explain: `
            Phương trình bậc nhất hai ẩn x và y là hệ thức dạng<br>
            <p class="center-text">ax + by = c</p>
            <p> Trong đó a và b <span class="highlight red">không đồng thời bằng 0
            </span></p>
        `
    }, {
        question: `Cặp số nào sau đây là nghiệm của phương trình 4x - 3y = 21`,
        answers: [
            "(3; -3)",
            "(9; 3)",
            "(6; -2)",
            "(-9; 0)",
        ],
        explain: `
            Thay x = 3, y = -3 vào phương trình ta được<br>
            4.3 - 3(-3) = 21<br>
            21 = 21 (Luôn đúng)
        `
    }, {
        question: "Đâu <span class='highlight red'>không</span> phải là hệ phương trình bậc nhất hai ẩn",
        answers: [
            `3x = 9<br>
             8x - 2y² = 9`,
            `-x - 3y = 3<br>
             8x + 2y = -6`,
            `7x + y = 0<br>
             x - y = 2`,
            `-y = 1<br>
             6x + y = 4`
        ],
        explain: `
            8x - 2y² = 9 không phải phương trình bậc nhất hai ẩn
        `
    }, {
        question: `Một mảnh vườn hình chữ nhật có chu vi 34m. Nếu tăng 
        chiều dài thêm 3m và tăng chiều rộng thêm 2m thì diện tích tăng 
        thêm 45m². Đâu là hệ phương trình tính chiều dài, chiều rộng của 
        mảnh vườn.`,
        answers: [
            `2(x + y) = 34<br>
             (x + 2)(y + 3) = xy + 45`,
            `2(x - y) = 10<br>
            (x + 1)(y - 2) = xy - 20`,
            `3(x + y) = 45<br>
            (x + 3)(y + 5) = xy + 80`,
            `x + y = 20<br>
            (x + 4)(y - 1) = xy + 15`
        ],
        explain: `
            Gọi chiều rộng và chiều dài của mảnh vườn là x và y<br>
            Theo đề bài ta có:<br>
            Chu vi hình chữ nhật là: 2(x + y) = 34. (1)<br>

            Hình chữ nhật mới có chiều dài (y + 3)m, chiều rộng (x + 2)m nên 
            có diện tích là (x + 2)(y + 3). Do hình chữ nhật mới có diện tích 
            tăng thêm 45m2 nên ta có phương trình:<br>
            (x + 2)(y + 3) = xy + 45 (2)<br>
            Từ (1) và (2) ta có hệ phương trình:<br><br>
            <p class='highlight red'>2(x + y) = 34</p>
            <p class='highlight red'>(x + 2)(y + 3) = xy + 45</p>
        `
    }, {
        question: `Một công ty dự định sản xuất một 1000 hộp khẩu trang so 
        với quy định. Tuy nhiên do dịch bệnh Covid – 19 bùng phát nên công 
        ty đã đẩy nhanh tiến độ mỗi ngày 10 hộp khẩu trang để kịp phục vụ 
        thị trường do vậy công ty đã hoàn thành sớm hơn kế hoạch 5 ngày. 
        Hỏi theo kế hoạch ban đầu công ty dự kiến sản xuất trong bao nhiêu 
        ngày.`,
        answers: [
            `xy = 1000<br>
             (x - 5)(y + 10) = 1000`,
            `xy = 1000<br>  
            (x - 3)(y + 8) = 1200`,
            `xy = 1000<br>  
            (x - 4)(y + 12) = 800`,
            `xy = 1500<br>
            (x - 5)(y + 10) = xy + 15`
        ],
        explain: `
            Gọi thời gian công ty dự định sản xuất khẩu trang là x<br>
            Gọi năng suất làm vệc ban đầu của công ty là y<br>
            Vì ban đầu công ty dự định sản xuất 1000 hộp khẩu trang nên 
            ta có phương trình: xy = 1000 (1)<br>
            Vì hoàn thành sớm hơn 5 ngày nên thời gian thực tế công ty 
            sản xuất là x - 5<br>
            Vì mỗi ngày công ty làm thêm 10 hộp khẩu trang nên năng suất 
            thực tế của công ty là y + 10<br>
            Ta có phương trình: 1000 = (x - 5)(y +10) (2)<br>
            Từ (1) và (2) ta có hệ phương trình:<br><br>
            <p class='highlight red'>xy = 1000</p>
            <p class='highlight red'>(x - 5)(y + 10) = 1000</p>
        `
    }
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[1].levels[0].state = 'unlock';
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

        const isCorrect = selectedOption.innerHTML === correctAnswer;
        selectedOption.classList.add(isCorrect ? 'correct' : 'wrong');

        if (isCorrect) {
            point++;
            lesson.shift();
            updateProgressBar(point, maxPoint);
            explainElement.innerHTML = explain;
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
