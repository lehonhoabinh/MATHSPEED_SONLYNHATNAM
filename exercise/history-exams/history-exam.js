const url = window.location.href;
const params = new URLSearchParams(window.location.search);
const index = params.get('index');

const exams = JSON.parse(localStorage.getItem('history_exams'));
let { name, point, time, part1, part2 } = exams[index];

document.querySelector('.point')
    .innerHTML = `Điểm: ${point} / 10`;

document.querySelector('.name-exam')
    .innerHTML = `Thời gian kết thúc bài thi: ${name}`;

document.querySelector('.time-exam')
    .innerHTML = `
        Thời gian làm bài thi: 
        ${Math.floor(time / 60)} phút ${time % 60} giây
    `;

document.querySelector('.multiple-choice')
    .innerHTML = part1;

document.querySelector('.constructed-response')
    .innerHTML = part2;