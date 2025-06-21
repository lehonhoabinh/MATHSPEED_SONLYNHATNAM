import { updateProgressBar } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Giải hệ phương trình<br>
            <p class="highlight red indent">x + y = 3</p>
            <p class="highlight red indent">2x - 3y = 1</p>
            theo hướng dẫn sau
            <p>1. Từ phương trình thứ nhất, biểu diễn y theo x rồi thế vào phương 
            trình thứ hai để được một phương trình với một ẩn x. Giải phương trình 
            một ẩn đó để tìm giá trị của x.</p>
            <p>2. Sử dụng giá trị tìm được của x để tìm giá trị của y rồi viết 
            nghiệm của hệ phương trình đã cho.</p>
        `,
        answers: [
            "(2; 1)",
            "(3; 0)",
            "(1; 2)",
            "(-1; 4)",
        ],
        explain: `
            1. Từ phương trình thứ nhất ta có y = 3 - x.<br>
            2. Thế vào phương trình thứ hai, ta được<br>
            2x - 3(3 - x) = 1, hay 2x - 9 + 3x = 1, nên 5x = 10, suy ra x = 2.<br>
            Từ đó y = 3 - 2 = 1.<br>
            Vậy hệ phương trình đã cho có nghiệm là (2; 1).
        `
    }, {
        question: `
            Giải hệ phương trình<br>
            <p class="highlight red indent">x - 3y = 2</p>
            <p class="highlight red indent">-2x + 5y = 1</p>
            bằng phương pháp thế
        `,
        answers: [
            "(-13; -5)",
            "(8; 6)",
            "(1; 2)",
            "(0; -2)",
        ],
        explain: `
            Từ phương trình thứ nhất ta có x = 3y + 2. Thế vào phương trình thứ hai, 
            ta được<br>
            -2(3y + 2) + 5y = 1, tức là -6y - 4 + 5y = 1, suy ra -y = 5 hay y = -5.<br>
            Từ đó x = 3 . (-5) + 2 = -13.<br>
            Vậy hệ phương trình đã cho có nghiệm là (-13; -5).
        `
    }, {
        question: `
            Một mảnh vườn được đánh thành nhiều luống, mỗi luống trồng cùng một số 
            cây cải bắp. Hãy tính số cây cải bắp được trồng trên mảnh vườn đó, biết 
            rằng:<br>
            - Nếu tăng thêm 8 luống, nhưng mỗi luống trồng ít đi 3 cây cải bắp thì số 
            cải bắp của cả vườn sẽ ít đi 108 cây;<br>
            - Nếu giảm đi 4 luống, nhưng mỗi luống trồng thêm 2 cây thì số cải bắp cả 
            vườn sẽ tăng thêm 64 cây.<br>
        `,
        answers: [
            "11088",
            "13209",
            "12913",
            "9009",
        ],
        explain: `
            Gọi x là số luống trong vườn, y là số cây cải bắp trồng ở mỗi luống
            (x, y ∈ N*)<br><br>
            Số cây cải bắp của cả vườn là: xy (cây).<br><br>
            - Nếu tăng thêm 8 luống, nhưng mỗi luống trồng ít đi 3 cây cải bắp thì số 
            cải bắp của cả vườn sẽ ít đi 108 cây<br><br>
            Số luống trong vườn sau khi tăng thêm 8 luống là x + 8 (luống).<br><br>
            Khi mỗi luống trồng ít đi 3 cây cải bắp thì số cây bắp cải ở mỗi luống 
            là: y - 3 (cây).<br><br>
            Theo đề bài, ta có phương trình là:<br><br>
            (x + 8)(y - 3) = xy - 108<br>
            xy - 3x + 8y - 24 = xy - 108<br>
            3x - 8y = 84 (1)<br><br>
            - Nếu giảm đi 4 luống, nhưng mỗi luống trồng thêm 2 cây thì số cải bắp 
            cả vườn sẽ tăng thêm 64 cây.<br><br>
            Số luống trong vườn sau khi giảm đi 4 luống là x - 4 (luống).<br><br>
            Khi mỗi luống trồng thêm 2 cây cải bắp thì số cây bắp cải ở mỗi luống 
            là: y + 2 (cây).<br><br>
            Theo đề bài, ta có phương trình là:<br>
            (x - 4)(y + 2) = xy + 64<br>
            xy + 2x - 4y - 8 = xy + 64<br>
            2x - 4y = 72<br>
            x - 2y = 36 (2)<br><br>
            Từ (1) và (2) ta có hpt:
            <p class="indent highlight red">3x - 8y = 84</p>
            <p class="indent highlight red">x - 2y = 36</p><br>
            Từ phương trình thứ hai, ta có x = 2y + 36. Thế vào phương trình thứ 
            nhất, ta được<br><br>
            3(2y + 36) - 8y = 84, tức là 6y + 216 - 8y = 84, suy ra 2y = 132 hay 
            y = 66.<br><br>
            Từ đó x = 2y + 36 = 2 . 66 + 36 = 168.<br><br>
            Vậy số cây cải bắp được trồng trên mảnh vườn đó là: 168 . 66 = 
            11088 (cây).<br>
        `
    }
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[1].levels[1].state = 'unlock';
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
        option.textContent = answer;

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

        const isCorrect = selectedOption.textContent === correctAnswer;
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
