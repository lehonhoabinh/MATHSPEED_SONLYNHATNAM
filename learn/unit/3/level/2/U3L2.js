import { updateProgressBar } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Giải hệ phương trình
            <p class="highlight red indent">1,5x - 0,6y = 0,3</p>
            <p class="highlight red indent">-2x + y = -2</p><br>
        `,
        answers: [
            "(-3; -8)",
            "(0; -0,5)",
            "(1; 0)",
            "Vô nghiệm",
        ],
        explain: `
            Chia hai vế của phương trình thứ nhất cho 0,3 và nhân hai vế 
            của phương trình thứ hai với 2, ta được<br>
            <p class="highlight red indent">5x - 2y = 1</p>
            <p class="highlight red indent">-4x + 2y = -4</p><br>
            Cộng từng vế hai phương trình của hệ mới, ta được x = -3.
            Thế x = -3 vào phương trình thứ hai của hệ đã cho, ta có<br><br>
            (-2) . (-3) + y = -2 hay 6 + y = -2, suy ra y = -8.<br><br>
            Do đó, hệ phương trình đã cho có nghiệm là (-3; -8).
        `
    }, {
        question: `
            Giải hệ phương trình
            <p class="highlight red indent">2(x - 2) + 3(1 + y) = -2</p>
            <p class="highlight red indent">3(x - 2) - 2(1 + y) = -3</p><br>
        `,
        answers: [
            "(-1; 1)",
            "(3; 2)",
            "(4; -2)",
            "(1; -3)",
        ],
        explain: `
            Đặt a = x - 2; b = 1 + y. Khi đó phương trình trở thành<br>
            <p class="highlight red indent">2a + 3b = -2</p>
            <p class="highlight red indent">3a - 2b = -3</p><br>
            Suy ra<br>
            <p class="highlight red indent">a = -1</p>
            <p class="highlight red indent">b = 0</p><br>
            • Với a = -1 thì x - 2 = -1, suy ra x = 1.<br><br>
            • Với b = 0 thì 1 + y = 0, suy ra y = -1.<br><br>
            Vậy hệ phương trình đã cho có nghiệm là (1; –1).
        `
    }, {
        question: `
            Tìm số tự nhiên n có hai chữ số, biết rằng nếu viết thêm chữ số 3 
            vào giữa hai chữ số của số n thì được một số lớn hơn số 2n là 585 
            đơn vị, và nếu viết hai chữ số của số n theo thứ tự ngược lại thì 
            được một số nhỏ hơn số n là 18 đơn vị.
        `,
        answers: [
            "75",
            "82",
            "31", 
            "77",
        ],
        explain: `
            Gọi số có hai chữ số cần tìm là n = <span class="overline-text">
            ab</span> (10 <= <span class="overline-text">ab</span>,
            a ∈ N, b ∈ N)<br><br>
            Sau khi viết thêm chữ số 3 vào giữa hai chữ số của số n thì ta được 
            số mới có dạng <span class="overline-text">a3b</span><br><br>
            Nếu viết thêm chữ số 3 vào giữa hai chữ số của số n thì được một số 
            lớn hơn số 2n là 585 đơn vị nên ta có phương trình<br>
            <span class="overline-text">a3b</span> - 
            2<span class="overline-text">ab</span> = 585 <br><br>
            100a + 30 + b - 2(10a + b) = 585<br>
            100a + 30 + b - 20a - 2b = 585<br>
            80a - b = 555 (1)<br><br>
            Khi viết hai chữ số của số n theo thứ tự ngược lại thì ta được số có 
            dạng <span class="overline-text">ba</span><br><br>
            Theo bài, số <span class="overline-text">ba</span> nhỏ hơn số
            n = <span class="overline-text">ab</span> 18 đơn vị nên ta có pt<br>
            <span class="overline-text">ab</span> - 
            <span class="overline-text">ba</span> = 18<br>
            10a + b - (10b + a) = 18<br>
            10a + b - 10b - a = 18<br>
            9a - 9b = 18<br>
            a - b = 2 (2)<br><br>
            Từ (1) và (2) ta có hệ phương trình<br>
            <p class="highlight red indent">80a - b = 555</p>
            <p class="highlight red indent">a - b = 2</p><br>
            Trừ từng vế của hai phương trình ta có<br><br> 
            (80a - b) - (a - b) = 555 - 2 hay 79a = 553, suy ra a = 7 
            (thỏa mãn điều kiện).<br><br> 
            • Với a = 7 thay vào phương trình thứ hai ta được b = 5 
            (thỏa mãn điều kiện).<br><br> 
            Vậy số tự nhiên n có hai chữ số cần tìm là 75.
        `
    }, {
        question: `
            Trên cánh đồng có diện tích 160 ha của một đơn vị sản xuất, 
            người ta dành 60 ha để cấy thí điểm giống lúa mới, còn lại 
            vẫn cấy giống lúa cũ. Khi thu hoạch, đầu tiên người ta gặt 
            8 ha giống lúa cũ và 7 ha giống lúa mới để đối chứng. Kết quả 
            là 7 ha giống lúa mới cho thu hoạch nhiều hơn 8 ha giống lúa 
            cũ là 2 tấn thóc. Biết rằng tổng số thóc (cả hai giống) thu hoạch 
            cả vụ trên 160 ha là 860 tấn. Hỏi năng suất của mỗi giống lúa trên 
            1 ha là bao nhiêu tấn thóc?
        `,
        answers: [
            `Lúa cũ: 5 tấn thóc/ha<br>
             Lúa mới: 6 tấn thóc/ha`,
             `Lúa cũ: 6 tấn thóc/ha<br>
             Lúa mới: 5 tấn thóc/ha`,
             `Lúa cũ: 10 tấn thóc/ha<br>
             Lúa mới: 3 tấn thóc/ha`,
             `Lúa cũ: 7 tấn thóc/ha<br>
             Lúa mới: 4 tấn thóc/ha`,
        ],
        explain: `
            Số ha cấy giống lúa cũ là: 160 - 60 = 100 (ha).<br><br>
            Gọi năng suất của giống lúa cũ và giống lúa mới trên 1 ha 
            lần lượt là x, y (tấn thóc) (x > 0, y > 0).<br><br>
            Số thóc thu được trên 8 ha giống lúa cũ là 8x (tấn thóc).<br><br>
            Số thóc thu được trên 7 ha giống lúa mới là 7y (tấn thóc).<br><br>
            Kết quả 7 ha giống lúa mới cho thu hoạch nhiều hơn 8 ha giống 
            lúa cũ là 2 tấn thóc nên ta có phương trình 7y - 8x = 2.<br><br>             (1)
            Số thóc cũ thu được trên 100 ha giống lúa cũ là 100x (tấn thóc).<br><br>
            Số thóc mới thu được trên 60 ha giống lúa mới là 60y (tấn thóc).<br><br>
            Tổng số thóc (cả hai giống) thu hoạch cả vụ trên 160 ha là 860 tấn 
            nên ta có phương trình 100x + 60y = 860 hay 5x + 3y = 43 (2)<br><br>
            Từ (1) và (2) ta có hệ phương trình<br>
            <p class="highlight red indent">7y - 8x = 2</p>
            <p class="highlight red indent">5x + 3y = 43</p><br>
            Suy ra<br>
            <p class="highlight red indent">x = 5 (thoả mãn điều kiện)</p>
            <p class="highlight red indent">y = 6 (thoả mãn điều kiện)</p><br>
        `
    }
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[3].levels[0].state = 'unlock';
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
