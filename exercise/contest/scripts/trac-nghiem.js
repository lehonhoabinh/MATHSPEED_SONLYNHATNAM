import { fraction, sqrt } from '../../../learn/utils/util.js'

function randomInRange(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

function sign() {
    return [1, -1][randomInRange(0, 1)];
}

function __gcd(a, b) {
    if (b === 0) return a;
    return __gcd(b, a % b);
}

export function randomTracNghiem(id) {
    switch(id) {
        case 1: { // Giải hệ phương trình bậc nhất 2 ẩn
            let a1 = randomInRange(2, 12);
            let b1 = randomInRange(2, 12);
            let a2 = randomInRange(2, 12);
            let b2 = randomInRange(2, 12);
            while (a1 * b2 - a2 * b1 === 0) {
                a1 = randomInRange(2, 12);
                b1 = randomInRange(2, 12);
                a2 = randomInRange(2, 12);
                b2 = randomInRange(2, 12);
            }
            let x = randomInRange(2, 12);
            let y = randomInRange(2, 12);
            let c1 = a1 * x + b1 * y;
            let c2 = a2 * x + b2 * y;

            let question = `
                Giải hệ phương trình <br>
                <span class="highlight indent">${a1}x + ${b1}y = ${c1}<span><br>
                <span class="highlight indent">${a2}x + ${b2}y = ${c2}<span><br>
            `;

            let answerChoices = [
                `x = ${x}; y = ${y}`,
            ];
            for (let i = 0; i < 3; i++) {
                let x1 = randomInRange(1, 15);
                let y1 = randomInRange(1, 15);
                while (a1 * x1 + b1 * y1 === c1 || a2 * x1 + b2 * y1 === c2) {
                    x1 = randomInRange(1, 15);
                    y1 = randomInRange(1, 15);
                }
                answerChoices.push(`x = ${x1}; y = ${y1}`);
            }

            const explain = `
                Giải phương trình bằng phương pháp cộng đại số ta thu được <br>
                <span class="highlight indent"> x = ${x}; y = ${y} <br>
                Thay vào hệ phương trình ta thấy thoả mãn
            `;

            return { question, answerChoices, explain };
        }

        case 2: { // Tìm điều kiện xác định của biểu thức trong căn
            let a = randomInRange(2, 5);
            let b = randomInRange(6, 15);

            let question = `
                Tìm điều kiện xác định của biểu thức <br><br>
                <span class="highlight indent">${sqrt(`${a}x - ${b}`)}<span><br>
            `;

            var gcd = __gcd(a, b);
            var ans1 = a / gcd;
            var ans2 = b / gcd;
            let answerChoices = [
                `x ≥ ${fraction(`${ans2}`, `${ans1}`)}`
            ];
            for (let i = 0; i < 3; i++) {
                var choice1 = ans1;
                var choice2 = ans2;
                while (choice1 === ans1 || choice2 === ans2) {
                    var u = randomInRange(2, 20);
                    var v = randomInRange(2, 20);
                    gcd = __gcd(u, v);
                    choice1 = u;
                    choice2 = v;
                }
                answerChoices.push(`x ≥ ${fraction(v, u)}`);
            }

            const explain = `
                Ta có ${sqrt(a + 'x - ' + b)} ≥ 0<br>
                ${a + 'x - ' + b + '≥ 0'} <br>
                ${a + 'x ' + '≥ ' + b} <br>
                x ≥ ${fraction(b, a)}
            `;

            return { question, answerChoices, explain };
        }

        case 3: { // Tính delta
            let a = randomInRange(2, 5);
            let b = randomInRange(10, 10);
            let c = randomInRange(20, 20);

            let question = `
                Tính delta phương trình bậc hai: <br>
                <span class="highlight indent">${a}x² + ${b}x - ${c} = 0
                </span><br>
            `;

            let delta = b * b + 4 * a * c;

            let answerChoices = [];
            answerChoices.push(`Δ = ${delta}`);

            for (let i = 0; i < 3; i++) {
                let randomDelta = randomInRange(-50, 100);
                if (randomDelta === delta) {
                    randomDelta++;
                }
                answerChoices.push(`Δ = ${randomDelta}`);
            }

            const explain = `
                Δ = b² - 4ac <br>
                Δ = ${b}² - 4.${a}.${c} = ${delta}.
            `;

            return { question, answerChoices, explain };
        }

        case 4: { // Bài toán xác suất
            let total = randomInRange(30, 50);
            let favorable = randomInRange(10, total);

            let question = `
                Trong một lớp học có ${total} học sinh. Trong đó, ${favorable} học sinh tham gia vào câu lạc bộ thể thao. 
                Chọn ngẫu nhiên một học sinh trong lớp. Tính xác suất để học sinh đó tham gia vào câu lạc bộ thể thao. <br>
            `;
            let probability = favorable / total;

            let ans = probability.toFixed(2);

            let answerChoices = [
                `P = ${ans}`,
            ];

            for (let i = 0; i < 3; i++) {
                let ans2 = (randomInRange(1, 100) / 100).toFixed(2);
                while (ans2 === ans) 
                    ans2 = (randomInRange(1, 100) / 100).toFixed(2);
                answerChoices.push(`P = ${ans2}`);
            }

            let explain = `
                Xác suất để chọn một học sinh tham gia câu lạc bộ thể thao được tính bằng: <br>
                P = (Số học sinh tham gia câu lạc bộ) / (Tổng số học sinh) <br>
                Vậy P = ${favorable} / ${total} = ${probability.toFixed(2)}. <br>
                Do đó, xác suất là ${probability.toFixed(2)}.
            `;

            return { question, answerChoices, explain };
        }

        case 5: { // Hệ phương trình nào vô nghiệm
            let a3 = randomInRange(2, 4);
            let b3 = randomInRange(2, 4);
            let a4 = a3 * 3;
            let b4 = b3 * 3;
            let c3 = 8;
            let c4 = randomInRange(2, 10);
            while (a3 / a4 === c3 / c4)
                c4 = randomInRange(2, 10);

            let question = `
                Hệ phương trình nào sau đây vô nghiệm
            `;

            let answerChoices = [
                `<p>${a3}x + ${b3}y = ${c3}</p>
                <p>${a4}x + ${b4}y = ${c4}</p>`,
            ];

            for (let i = 0; i < 3; i++) {
                let a1 = randomInRange(2, 15);
                let b1 = randomInRange(2, 15);
                let a2 = randomInRange(2, 15);
                let b2 = randomInRange(2, 15);
                let c1 = randomInRange(2, 15);
                let c2 = randomInRange(2, 15);
                while (a1 / a2 === b1 / b2 && b1 / b2 !== c1 / c2) {
                    a1 = randomInRange(2, 15);
                    b1 = randomInRange(2, 15);
                    a2 = randomInRange(2, 15);
                    b2 = randomInRange(2, 15);
                    c1 = randomInRange(2, 15);
                    c2 = randomInRange(2, 15);
                }
                answerChoices.push(
                    `<p>${a1}x + ${b1}y = ${c1}</p>
                    <p>${a2}x + ${b2}y = ${c2}</p>`
                )
            }

            let explain = `
                Một hệ phương trình sẽ vô nghiệm nếu hai phương trình có hệ số tỷ lệ của các ẩn giống nhau, nhưng tỷ lệ của hằng số khác nhau. <br><br>
                Cụ thể, nếu: <br>
                ${fraction(a3, a4)} = ${fraction(b3, b4)} ≠ ${fraction(c3, c4)} <br><br>
                thì hệ phương trình đó vô nghiệm. <br><br>
                Trong trường hợp này, chúng ta có: <br>
                Phân số tỷ lệ của các hệ số: <br>
                ${fraction(a3, a4)} = ${fraction(b3, b4)} <br>
                Phân số tỷ lệ của các hằng số: <br>
                ${fraction(c3, c4)} <br><br>
                Vì ${fraction(a3, a4)} = ${fraction(b3, b4)} và ${fraction(b3, b4)} ≠ ${fraction(c3, c4)}, nên hệ phương trình này vô nghiệm.
            `;

            return { question, answerChoices, explain };
        }

        case 6: { // Hệ thức trong tam giác vuông
            let question = `
                Cho tam giác ABC vuông tại A , đường cao AH (H ∈ BC). 
                Hệ thức nào đúng?
            `;
            let answerChoices = [
                `AH.BC = AB.AC`,
                `AC² = BC.BH`,
                `AB² = AH.BC`,
                `AH² = AB.AC`,
            ];

            let explain = `
                Hệ thức lượng trong tam giác vuông
            `;

            return { question, answerChoices, explain };
        }

        case 7: { // Tìm điều kiện xác định của biểu thức ở mẫu
            let a1 = randomInRange(2, 5);
            let b1 = randomInRange(6, 15);
            let a2 = randomInRange(2, 5);
            let b2 = a2 * randomInRange(1, 9);

            let question = `
                Tìm điều kiện xác định của biểu thức <br>
                <span class="highlight indent">
                    ${fraction(`${a1} - ${b1}x`, `${a2}x - ${b2}`)}
                <span><br>
            `

            let answerChoices = [
                `x ≠ ${b2 / a2}`
            ];
            for (let i = 0; i < 3; i++) {
                a1 = randomInRange(5, 20);
                b1 = a1 - randomInRange(1, 5);
                answerChoices.push(`x ≠ ${fraction(b1, a1)}`);
            }

            let explain = `
                Ta có ${a2}x - ${b2} ≠ 0 <br>
                ${a2}x ≠ ${b2} <br>
                x ≠ ${b2} / ${a2} <br>
                x ≠ ${b2 / a2}
            `;

            return { question, answerChoices, explain };
        }

        case 8: { // Tính số đo góc nội tiếp
            let a = randomInRange(10, 50) * 2;

            let question = `
                Cho đường tròn (O) đường kính AB. 
                Lấy một điểm C thuộc đường tròn (O) sao cho
                sđBC=${a}, khi đó số đo góc BAC là bao nhiêu độ
            `

            let answerChoices = [
                a / 2, a, a / 2 - 4, a / 2 + 28
            ];

            let explain = `
                Góc nội tiếp bằng một nửa số đo cung bị chắn
            `;

            return { question, answerChoices, explain };
        }

        case 9: { // Công thức Sxq hình trụ
            let a = randomInRange(10, 50) * 2;

            let question = `
                Diện tích xung quanh của hình trụ có bán kính đáy r và chiều cao h là
            `

            let answerChoices = [
                `2πrh`,
                `2πrh + 2πr²`,
                `πrh + 2πr²`,
                `πrh`,
            ];

            let explain = `
                Diện tích xung quanh của hình trụ có bán kính đáy r và 
                chiều cao h là 2πrh
            `;

            return { question, answerChoices, explain };
        }

        case 10: { // Tính căn bậc hai
            let a = randomInRange(4, 1000);

            let question = `
                Căn bậc hai số học của (-${sqrt(`${a}`)})² là
            `

            let answerChoices = [
                `${a}`,
                `${sqrt(`${a}`)}`,
                `-${sqrt(`${a}`)}`,
                `-${a}`,
            ];

            let explain = `
                (-${sqrt(`${a}`)})² = ${a}² <br>
                ${sqrt(`${a}²`)} = ${a}
            `;

            return { question, answerChoices, explain };
        }

        case 11: { // Điểm thuộc đồ thị hs
            let x = randomInRange(1, 9);
            let y = randomInRange(1, 9);
            let a = randomInRange(1, 9);
            let b = y - a * x;

            let question = `
                Điểm A(${x}, ${y}) thuộc đồ thị hàm số nào dưới đây?
            `

            let answerChoices = [
                `y = ${a}x + ${b}`,
            ];

            for (let i = 0; i < 3; i++) {
                let a1 = randomInRange(1, 9);
                let b1 = randomInRange(1, 9);
                if (a1 * x + b1 === y)
                    b1 += 1;
                answerChoices.push(`
                    y = ${a1}x + ${b1}
                `);
            }

            let explain = `
                Thay x = ${x}, y = ${y} vào hàm số y = ${a}x + ${b} 
                ta thấy luôn đúng
            `;

            return { question, answerChoices, explain };
        }

        case 12: { // Có bao nhiêu đường tròn đi qua 2 điểm khác nhau
            // Tạo câu hỏi
            let question = `
                Có bao nhiêu đường tròn đi qua hai điểm khác nhau?
            `;

            // Lựa chọn đáp án
            let answerChoices = [
                `Vô số`,
                `Không có`,
                `1`,
                `2`
            ];

            // Giải thích
            let explain = `
                Đường tròn đi qua hai điểm cố định có tâm nằm trên đường trung trực của đoạn thẳng nối hai điểm đó.<br>
                Vì vậy, có vô số đường tròn có thể đi qua hai điểm khác nhau, mỗi đường tròn có bán kính và tâm khác nhau.<br>
                Do đó, đáp án chính xác là **Vô số**.
            `;

            return { question, answerChoices, explain };
        }

        case 13: { // Hàm số đồng biến
            // Tạo hệ số cho các hàm số bậc nhất
            let a1 = randomInRange(1, 10); // a > 0
            let b1 = randomInRange(-10, 10);
            let a2 = randomInRange(-10, -1); // a < 0
            let b2 = randomInRange(-10, 10);
            let a3 = 0; // a = 0
            let b3 = randomInRange(-10, 10);
            let a4 = randomInRange(-10, -1); 
            let b4 = randomInRange(-10, 10);

            // Câu hỏi
            let question = `
                Hàm số bậc nhất nào sau đây đồng biến trên R?
            `;

            // Đáp án
            let answerChoices = [
                `y = ${a1}x + ${b1}`,
                `y = ${a2}x + ${b2}`,
                `y = ${a3}x + ${b3}`,
                `y = ${a4}x + ${b4}`
            ];

            // Giải thích
            let explain = `
                Hàm số bậc nhất có dạng y = ax + b.<br>
                Nếu a > 0, hàm số đồng biến trên R.<br>
                Trong các đáp án, y = ${a1}x + ${b1} là hàm số đồng biến vì a = ${a1} > 0.
            `;

            return { question, answerChoices, explain };
        }

        case 14: { // Hàm số nghịch biến
            // Tạo hệ số cho các hàm số bậc nhất
            let a1 = randomInRange(-10, -1); // a < 0
            let b1 = randomInRange(-10, 10);
            let a2 = randomInRange(1, 10); // a > 0
            let b2 = randomInRange(-10, 10);
            let a3 = 0; // a = 0
            let b3 = randomInRange(-10, 10);
            let a4 = randomInRange(1, 10); 
            let b4 = randomInRange(-10, 10);

            // Câu hỏi
            let question = `
                Hàm số bậc nhất nào sau đây nghịch biến trên R?
            `;

            // Đáp án
            let answerChoices = [
                `y = ${a1}x + ${b1}`,
                `y = ${a2}x + ${b2}`,
                `y = ${a3}x + ${b3}`,
                `y = ${a4}x + ${b4}`
            ];

            // Giải thích
            let explain = `
                Hàm số bậc nhất có dạng y = ax + b.<br>
                Nếu a < 0, hàm số nghịch biến trên R.<br>
                Trong các đáp án, y = ${a1}x + ${b1} là hàm số nghịch biến vì a = ${a1} < 0.
            `;

            return { question, answerChoices, explain };
        }

        case 15: { // Tính bán kính R
            // Tạo giá trị ngẫu nhiên cho độ dài dây AB và khoảng cách d
            let ab = randomInRange(10, 30); // Độ dài dây AB từ 10 cm đến 30 cm
            let d = randomInRange(2, Math.floor(ab / 2) - 1); // Khoảng cách d nhỏ hơn một nửa AB

            // Tạo câu hỏi
            let question = `
                Cho đường tròn tâm O có dây AB dài ${ab} cm. Biết khoảng cách từ tâm O đến dây AB là ${d} cm. Tính bán kính R của đường tròn.
            `;

            // Tính bán kính R
            let halfAB = ab / 2;
            let R = Math.sqrt(d ** 2 + halfAB ** 2);

            // Đáp án
            let answerChoices = [
                `${R.toFixed(2)} cm`, // Đáp án đúng
                `${(R - randomInRange(1, 3)).toFixed(2)} cm`,
                `${(R + randomInRange(1, 3)).toFixed(2)} cm`,
                `${(R + randomInRange(3, 5)).toFixed(2)} cm`
            ];

            // Giải thích
            let explain = `
                Sử dụng định lý Pitago trong tam giác vuông với:<br>
                - Khoảng cách từ tâm O đến dây là d = ${d} cm.<br>
                - Một nửa dây AB có độ dài là AB / 2 = ${halfAB} cm.<br>
                Công thức tính bán kính là:<br>
                R² = d² + (AB / 2)²<br>
                R = √(${d}² + (${halfAB})²) = ${R.toFixed(2)} cm.<br>
                Do đó, bán kính của đường tròn là ${R.toFixed(2)} cm.
            `;

            return { question, answerChoices, explain };
        }

        case 16: { // Toạ độ giao điểm 2 đường thẳng
            // Tạo hệ số ngẫu nhiên cho hai đường thẳng
            let a1 = randomInRange(-10, 10);
            let b1 = randomInRange(-10, 10);
            let c1 = randomInRange(-10, 10);

            let a2 = randomInRange(-10, 10);
            while (a2 === a1) {
                a2 = randomInRange(-10, 10); // Đảm bảo hệ số a khác nhau để không song song
            }
            let b2 = randomInRange(-10, 10);
            let c2 = randomInRange(-10, 10);

            // Phương trình đường thẳng
            let d1 = `y = ${a1}x + ${b1}`;
            let d2 = `y = ${a2}x + ${b2}`;

            // Tính tọa độ giao điểm
            let x = (b2 - b1) / (a1 - a2);
            let y = a1 * x + b1;

            // Câu hỏi
            let question = `
                Trong mặt phẳng tọa độ Oxy, cho hai đường thẳng:<br>
                (d1): ${d1}<br>
                (d2): ${d2}<br>
                Gọi A là tọa độ giao điểm của (d1) và (d2). Khi đó tọa độ điểm A là?
            `;

            // Đáp án
            let answerChoices = [
                `A(${x.toFixed(2)}, ${y.toFixed(2)})`, // Đáp án đúng
                `A(${(x + 1).toFixed(2)}, ${(y + 1).toFixed(2)})`,
                `A(${(x - 1).toFixed(2)}, ${(y - 1).toFixed(2)})`,
                `A(${(x + 2).toFixed(2)}, ${(y - 2).toFixed(2)})`
            ];

            // Giải thích
            let explain = `
                Để tìm giao điểm của hai đường thẳng, ta giải hệ phương trình:<br>
                (d1): ${d1}<br>
                (d2): ${d2}<br>
                Giải phương trình bằng cách đặt hai biểu thức y bằng nhau:<br>
                ${a1}x + ${b1} = ${a2}x + ${b2}<br>
                Tính toán để tìm x và thay vào một trong hai phương trình để tìm y:<br>
                x = ${(b2 - b1) / (a1 - a2).toFixed(2)}, y = ${(a1 * x + b1).toFixed(2)}.<br>
                Vậy tọa độ giao điểm là A(${x.toFixed(2)}, ${y.toFixed(2)}).
            `;

            return { question, answerChoices, explain };
        }

        case 17: { // Tính độ dài cung
            // Bán kính và góc
            let radius = 2; // Bán kính đường tròn (cm)
            let angle = 60; // Góc ở tâm (độ)

            // Tử số và mẫu số
            let numerator = 2 * radius * angle; // Tử số: 2 × 2 × 60 = 240
            let denominator = 360; // Mẫu số

            // Rút gọn phân số đúng
            let gcd = (a, b) => (b === 0 ? a : gcd(b, a % b)); // Hàm tính ƯCLN
            let divisor = gcd(numerator, denominator);
            let simplifiedNumerator = numerator / divisor; // Tử số rút gọn
            let simplifiedDenominator = denominator / divisor; // Mẫu số rút gọn

            // Độ dài cung đúng
            let arcLength = `π × ${fraction(`${simplifiedNumerator}`, `${simplifiedDenominator}`)}`;

            // Các đáp án sai
            let wrong1 = `π × ${fraction(`${simplifiedNumerator + 2}`, `${simplifiedDenominator}`)}`;
            let wrong2 = `π × ${fraction(`${simplifiedNumerator - 1}`, `${simplifiedDenominator}`)}`;
            let wrong3 = `π × ${fraction(`${simplifiedNumerator}`, `${simplifiedDenominator + 2}`)}`;

            // Câu hỏi
            let question = `
                Cho đường tròn (O; 2 cm). Tính độ dài cung có góc ở tâm là 60° của đường tròn này.
            `;

            // Đáp án
            let answerChoices = [
                `${arcLength}`, // Đáp án đúng
                `${wrong1}`,
                `${wrong2}`,
                `${wrong3}`
            ];

            // Giải thích
            let explain = `
                Công thức tính độ dài cung của đường tròn là:<br>
                L = (2πR × góc) / 360.<br>
                Thay số:<br>
                L = (2π × 2 × 60) / 360 = π × fraction("${simplifiedNumerator}", "${simplifiedDenominator}").<br>
                Do đó, độ dài cung của đường tròn là ${arcLength}.
            `;

            return { question, answerChoices, explain };
        }

        case 18: { // Cho x và tính giá trị biểu thức
            // Tạo hệ số sao cho biểu thức ngay từ đầu cho kết quả là số nguyên
            let a = randomInRange(1, 3); // Hệ số của x (a = 1, 2, 3)
            let b = randomInRange(3, 5) * 3; // Hệ số tự do (b là bội của 3, để giá trị căn hoặc phân số là nguyên)
            let c = randomInRange(1, 2); // Hệ số căn hoặc mẫu số (1 hoặc 2)

            // Tạo biểu thức ngẫu nhiên
            let type = randomInRange(1, 2); // Loại biểu thức: 1 (căn), 2 (phân số)
            let expression;
            let value;

            if (type === 1) {
                // Biểu thức dạng căn với số nguyên
                expression = `sqrt("${a} * x + ${b}")`;
                value = Math.sqrt(a * 1 + b); // Khi x = 1, đảm bảo giá trị căn là số nguyên
            } else {
                // Biểu thức dạng phân số với số nguyên
                expression = `$fraction("${a} * x + ${b}", "${c}")`;
                value = (a * 1 + b) / c; // Khi x = 1, đảm bảo giá trị phân số là số nguyên
            }

            // Câu hỏi
            let question = `
                Khi x = 1, giá trị của biểu thức ${expression} là bao nhiêu?
            `;

            // Đáp án
            let answerChoices = [
                `${value}`, // Đáp án đúng
                `${value - 1}`,
                `${value + 2}`,
                `${value * 2}`
            ];

            // Giải thích
            let explain = `
                Biểu thức được cho là ${expression}.<br>
                Thay x = 1 vào biểu thức:<br>
                - Nếu là căn: L = sqrt("${a} * 1 + ${b}") = sqrt("${a + b}").<br>
                - Nếu là phân số: L = $fraction("${a} * 1 + ${b}", "${c}") = $fraction("${a + b}", "${c}").<br>
                Tính giá trị thực tế, ta được L = ${value}.<br>
                Do đó, đáp án là ${value}.
            `;

            return { question, answerChoices, explain };
        }

        case 19: { // Tính viete
            let a = 2;  // Hệ số a
            let b = -6;  // Hệ số b
            let c = 4;  // Hệ số c

            // Tính tổng và tích các nghiệm từ công thức Vi-ét
            let sum = -b / a;  // Tổng các nghiệm x1 + x2
            let product = c / a;  // Tích các nghiệm x1 * x2

            // Tính giá trị của biểu thức
            let expressionValue = product * sum;

            // Câu hỏi
            let question = `
                Cho phương trình bậc hai: ${a}x² + ${b}x + ${c} = 0. 
                Khi đó, giá trị của biểu thức x1² * x2 + x1 * x2² (với x1, x2 là nghiệm của phương trình) bằng bao nhiêu?
            `;

            // Đáp án
            let answerChoices = [
                `${expressionValue}`, // Đáp án đúng
                `${expressionValue - 1}`,
                `${expressionValue + 2}`,
                `${expressionValue * 2}`
            ];

            // Giải thích
            let explain = `
                Đầu tiên, phương trình bậc hai có dạng ${a}x² + ${b}x + ${c} = 0. 
                Dựa vào công thức Vi-ét, ta có:<br>
                - Tổng các nghiệm: x1 + x2 = ${sum}<br>
                - Tích các nghiệm: x1 * x2 = ${product}<br>
                Tính giá trị biểu thức: x1² * x2 + x1 * x2² = x1 * x2 * (x1 + x2) = ${product} * ${sum} = ${expressionValue}.<br>
                Do đó, đáp án là ${expressionValue}.
            `;

            return { question, answerChoices, explain };
        }

        case 20: { // Tìm phương trình đường thẳng
            // Tạo tọa độ điểm A(x, y) ngẫu nhiên
            let x = randomInRange(-10, 10);
            let y = randomInRange(-10, 10);

            // Tạo hệ số góc m và phần bù b của đường thẳng y = mx + b ngẫu nhiên
            let m = randomInRange(-5, 5);  // Hệ số góc m
            let b = randomInRange(-10, 10);  // Phần bù b

            // Đường thẳng song song với y = mx + b sẽ có dạng y = mx + b'
            // Dễ dàng tìm thấy b' từ tọa độ A(x, y), vì điểm A nằm trên đường thẳng này, nên y = mx + b'
            let b_prime = y - m * x;

            // Tạo câu hỏi
            let question = `
                Cho điểm A(${x}, ${y}). Đường thẳng nào sau đây đi qua A và song song với đường thẳng y = ${m}x + ${b}?
            `;

            // Các lựa chọn đáp án
            let answerChoices = [
                `y = ${m}x + ${b_prime}`,  // Đáp án đúng
                `y = ${m}x + ${b_prime + 1}`,
                `y = ${m}x + ${b_prime - 2}`,
                `y = ${m}x + ${b_prime + 3}`
            ];

            // Giải thích
            let explain = `
                Để tìm đường thẳng song song với y = ${m}x + ${b}, ta sử dụng hệ số góc m giống nhau.<br>
                Vì đường thẳng này đi qua điểm A(${x}, ${y}), ta thay tọa độ A vào công thức y = mx + b để tính b'.<br>
                Khi đó, b' = y - m * x = ${y} - ${m} * ${x} = ${b_prime}.<br>
                Do đó, đáp án là y = ${m}x + ${b_prime}.
            `;

            return { question, answerChoices, explain };
        }

    }
}
