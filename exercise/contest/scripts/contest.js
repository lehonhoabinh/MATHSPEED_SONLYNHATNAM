import { randomTracNghiem } from './trac-nghiem.js';
import { randomTuLuan } from './tu-luan.js';

var userAnswers = {
    q1: null, q2: null, q3: null, q4: null, q5: null, q6: null,
    q7: null, q8: null, q9: null, q10: null, q11: null, q12: null,
    q13: null, q14: null, q15: null, q16: null,
};

const plusPoint = [1, 1, 2, 1, 1];

let time = 0, time2 = 0, totalPoint;

var intervalIds = [];

console.log('ok');

var correctAnswers = [];
var correctAnswers2 = [];

window.userSelect = userSelect;
window.submitExam = submitExam;
window.showAskForSubmit = showAskForSubmit;
window.hideAskForSubmit = hideAskForSubmit;
window.showCancelExam = showCancelExam;
window.hideCancelExam = hideCancelExam;

const turnBack = document.querySelector('.turn-back');
turnBack.addEventListener('click', showCancelExam);

createMultipleChoices();
createConstructedResponse();

setupTime();

function timeRunOut() {
    // Disabled all div and input
    document.querySelectorAll('div, input').forEach((element) => {
        element.style.pointerEvents = 'none'; // Ngăn mọi tương tác chuột
    });

    const timeRunOut = document.querySelector('.time-run-out');
    timeRunOut.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        timeRunOut.classList.add('hide');
        document.body.style.overflow = 'auto';
        submitExam();
    }, 2000);
}

function showCancelExam() {
    const cancelExam = document.querySelector('.cancel-exam');
    cancelExam.classList.remove('hide');
    document.body.style.overflow = 'hidden';
}

function hideCancelExam() {
    const cancelExam = document.querySelector('.cancel-exam');
    cancelExam.classList.add('hide');
    document.body.style.overflow = 'auto';
}

function showAskForSubmit() {
    const askForSubmit = document.querySelector('.ask-for-submit');
    askForSubmit.classList.remove('hide');
    document.body.style.overflow = 'hidden';
}

function hideAskForSubmit() {
    const askForSubmit = document.querySelector('.ask-for-submit');
    askForSubmit.classList.add('hide');
    document.body.style.overflow = 'auto';
}

function submitExam() {
    // Disabled all Interval
    intervalIds.forEach((id) => clearInterval(id));
    console.log("Tất cả các setInterval đã dừng!");
    
    // Disabled all div and input
    document.querySelectorAll('div, input').forEach((element) => {
        element.style.pointerEvents = 'none'; // Ngăn mọi tương tác chuột
    });

    // Enabled turn-back-btn
    turnBack.style.pointerEvents = 'auto';
    turnBack.removeEventListener('click', showCancelExam);
    turnBack.addEventListener('click', () => {
        document.location.href = '../';
    })

    // Compare answers
    const numQuestions1 = 16;
    let point1 = 0;
    let point2 = 0;
    for (let i = 1; i <= numQuestions1; i++) {
        if (userAnswers[`q${i}`] === correctAnswers[i - 1])
            point1 += 0.25;
    }

    // Show explain
    const explains = document.querySelectorAll('.explain');
    explains.forEach(explain => {
        explain.classList.remove('hide-explain');
    });

    // Show true and false answer
    for (let i = 1; i <= numQuestions1; i++) {
        if (userAnswers[`q${i}`] === null) {
            console.log(`q${i}: null`)
            const correctAnswer = document
                .querySelector(`.choice.q${i}.${correctAnswers[i - 1]}`);

            const resultIcon = correctAnswer.querySelector('.result-icon');
            resultIcon.innerHTML = '?';
            resultIcon.classList.add('not-selected');

            const trueBtn = correctAnswer.querySelector('.select-circle');
            trueBtn.classList.add('true-selected');
        } else if (userAnswers[`q${i}`] === correctAnswers[i - 1]) {
            console.log(`q${i}: true`)
            const correctAnswer = document
                .querySelector(`.choice.q${i}.${correctAnswers[i - 1]}`);
            const resultIcon = correctAnswer.querySelector('.result-icon');
            resultIcon.innerHTML = '✓';
            resultIcon.classList.add('true-selected');

            const trueBtn = correctAnswer.querySelector('.select-circle');
            trueBtn.classList.add('true-selected');
        } else {
            console.log(`q${i}: false`)
            const correctAnswer = document
                .querySelector(`.choice.q${i}.${correctAnswers[i - 1]}`);
            let resultIcon = correctAnswer.querySelector('.result-icon');
            resultIcon.innerHTML = '✓';
            resultIcon.classList.add('true-selected');

            const myAnswer = document
                .querySelector(`.choice.q${i}.${userAnswers[`q${i}`]}`);
            resultIcon = myAnswer.querySelector('.result-icon');
            resultIcon.innerHTML = 'x';
            resultIcon.classList.add('false-selected');

            const trueBtn = correctAnswer.querySelector('.select-circle');
            trueBtn.classList.add('true-selected');

            const falseBtn = myAnswer.querySelector('.select-circle');
            falseBtn.classList.add('false-selected');
        }
    }

    // Submit part 2
    const part2Element = document.querySelector('.constructed-response');
    const myInputs = part2Element.querySelectorAll('.your-answer');
    const resultIcons = part2Element.querySelectorAll('.result-icon');
    const results = part2Element.querySelectorAll('.result');
    myInputs.forEach((input, index) => {
        console.log(`Your answer ${index + 1}: ${input.value}`);
        if (input.value === '') {
            resultIcons[index].classList.add('not-selected');
            resultIcons[index].innerHTML = '?';
        } else if (input.value === correctAnswers2[index] ||
        input.value.replace(',', '.') === correctAnswers2[index]) {
            resultIcons[index].classList.add('true-selected');
            resultIcons[index].innerHTML = '✓';
            point2 += plusPoint[index];
        } else {
            resultIcons[index].classList.add('false-selected');
            resultIcons[index].innerHTML = 'x';
        }
        results[index].innerHTML = `
            Đáp án đúng: ${correctAnswers2[index]}
        `;
    });


    // Show point
    totalPoint = point1 + point2;
    const maxPoint = 10;
    const pointElement = document.querySelector('.point');
    pointElement.innerHTML = `Điểm ${totalPoint} / ${maxPoint}`;

    // Save history exams
    saveExam();
}

function userSelect(question, answer) {
    userAnswers[question] = answer;

    // Lấy tất cả các button trong câu hỏi
    var buttons = document.querySelectorAll(`.${question}-choices`);
    buttons.forEach(function(button) {
        button.classList.remove('selected');
    });

    // Thêm lớp 'selected' cho button được chọn
    var selectedButton = document.querySelector(`.${question}-choices.${answer}`);
    selectedButton.classList.add('selected');
}

function createMultipleChoices() {
    console.log('creating questions1');
    let questions1 = part1();

    // Create questions
    let html = ``;
    questions1.forEach((questionGroup, index) => {
        let { question, answerChoices, explain } = questionGroup;
        const correctAns = answerChoices[0];
        answerChoices = [...answerChoices].sort(() => Math.random() - 0.5);
        for (let i = 0; i < 4; i++) {
            if (answerChoices[i] === correctAns) {
                correctAnswers.push(['A', 'B', 'C', 'D'][i]);
                console.log(`q${index + 1}: ${['A', 'B', 'C', 'D'][i]}`)
                break;
            }
        }
        html += `
            <div class="line"></div>
            <label class="question-id">Câu ${index + 1}:</label>
            <label class="question-name">${question}</label>
            <div class="btn-group">
                <div class="choice q${index + 1} A">
                    <div class="select-circle q${index + 1}-choices A" 
                        onclick="userSelect('q${index + 1}', 'A');">A</div>
                    <div class="answer">${answerChoices[0]}</div>
                    <div class="result-icon"></div>
                </div>
                <div class="choice q${index + 1} B">
                    <div class="select-circle q${index + 1}-choices B" 
                        onclick="userSelect('q${index + 1}', 'B');">B</div>
                    <div class="answer">${answerChoices[1]}</div>
                    <div class="result-icon"></div>
                </div>
                <div class="choice q${index + 1} C">
                    <div class="select-circle q${index + 1}-choices C" 
                        onclick="userSelect('q${index + 1}', 'C');">C</div>
                    <div class="answer">${answerChoices[2]}</div>
                    <div class="result-icon"></div>
                </div>
                <div class="choice q${index + 1} D">
                    <div class="select-circle q${index + 1}-choices D" 
                        onclick="userSelect('q${index + 1}', 'D');">D</div>
                    <div class="answer">${answerChoices[3]}</div>
                    <div class="result-icon"></div>
                </div>
            </div>
            <div class="explain hide-explain">${explain ? ('*Giải thích<br>' + explain) : ''}</div>
        `;
    });

    const part1Element = document.querySelector('.multiple-choice');
    if (part1Element) {
        part1Element.innerHTML = html; // Gán nội dung HTML đã tạo
    } else {
        console.error('Không tìm thấy phần tử .multiple-choice');
    }
}

function createConstructedResponse() {
    console.log('creating questions2');
    let questions2 = part2();

    // Create questions
    let html = ``;
    questions2.forEach((questionGroup, index) => {
        let { question, answer, explain } = questionGroup;
        console.log(`q${index + 1}: ${answer}`)
        correctAnswers2.push(String(answer));
        html += `
            <div class="line"></div>
            <label class="question-id">
                Câu ${index + 1}: (${plusPoint[index]}đ)</label>
            <label class="question-name">${question}</label>
            <br>
            <div class="answer-area">
                <input type="text" class="your-answer">
                <div class="result-icon"></div>
            </div>
            <div class="result"></div>
            <div class="explain hide-explain">${explain ? ('*Giải thích<br>' + explain) : ''}</div>
        `;
    });

    const part2Element = document.querySelector('.constructed-response');
    if (part2Element) {
        part2Element.innerHTML = html; // Gán nội dung HTML đã tạo
    } else {
        console.error('Không tìm thấy phần tử .constructed-response');
    }
}

function part1() {
    let numQuestions = 16;
    let questions = [];
    // Lấy hết tất cả các questions
    for (let i = 1; i <= 20; i++) {
        questions.push(randomTracNghiem(i));
    }

    // Xáo trộn và chọn ra 16 câu đầu
    questions = [...questions].sort(() => Math.random() - 0.5);
    questions = questions.slice(0, numQuestions);

    return questions;
}

function part2() {
    let numQuestions = 5;
    let questions = [];
    for (let i = 1; i <= numQuestions; i++) {
        questions.push(randomTuLuan(i));
    }
    return questions;
}

function setupTime() {
    // Lấy URL hiện tại
    const url = window.location.href;

    // Tạo một đối tượng URLSearchParams
    const params = new URLSearchParams(window.location.search);

    // Lấy giá trị của tham số "time"
    time = params.get('time');
    time2 = time * 60;
    intervalIds.push(setInterval(() => {
        time2--;

        if (time2 === 0) {
            timeRunOut();
            setTimeout(() => {
                clearInterval(time2);
            }, 0);
        }

        const hour = Math.floor(time2 / 3600);
        const minute = Math.floor(time2 / 60) % 60;
        const second = time2 % 60;
        displayTime(hour, minute, second);
    }, 1000));

}

function displayTime(hour, minute, second) {
    if (hour < 10) hour = '0' + hour;
    else if (hour === 0) hour = '00';

    if (minute < 10) minute = '0' + minute;
    else if (minute === 0) minute = '00';

    if (second < 10) second = '0' + second;
    else if (second === 0) second = '00';

    const timeELement = document.querySelector('.time');
    timeELement.innerHTML = `${hour}:${minute}:${second}`;

    if (hour === '00' && minute === '00') {
        timeELement.classList.add('running-out');
    }
}

function saveExam() {
    const part1 = document.querySelector('.multiple-choice');
    let html1 = part1.innerHTML;

    const part2 = document.querySelector('.constructed-response');
    let html2 = part2.innerHTML;

    const now = new Date();
    let h = now.getHours();
    if (h < 10) h = '0' + h;
    let m = now.getMinutes();
    if (m < 10) m = '0' + m;
    let s = now.getSeconds();
    if (s < 10) s = '0' + s;

    let day = now.getDate();
    if (day < 10) day = '0' + day;
    let month = now.getMonth() + 1;
    if (month < 10) month = '0' + month;
    let year = now.getFullYear();

    const exam = {
        name: `${h}:${m}:${s} - ${day}/${month}/${year}`,
        point: totalPoint,
        time: (time * 60 - time2),
        part1: html1,
        part2: html2,
    }
    let exams = JSON.parse(localStorage.getItem('history_exams'));
    if (exams === null) exams = [];
    exams.push(exam);
    localStorage.setItem('history_exams', JSON.stringify(exams));
}