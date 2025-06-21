import { fraction, sqrt } from "../../../learn/utils/util.js";

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

export function randomTuLuan(id) {
    switch(id) {
        case 1: {
            return random1();
        }
        
        case 2: {
            return random2();
        }

        case 3: {
            return random3();
        }
        
        case 4: {
            return random4();
        }

        case 5: {
            return random5();
        }
    }
}

function random1() { // câu dễ 1đ
    const fullId = [1, 2, 3];
    let usedId = JSON.parse(localStorage.getItem('cau1_tuluan')) || [];
    if (usedId.length === fullId.length) {
        usedId = [];
    }
    let remainingId = fullId.filter(num => !usedId.includes(num));
    remainingId = [...remainingId].sort(() => Math.random() - 0.5);
    const id = remainingId[0];
    usedId.push(id);
    localStorage.setItem('cau1_tuluan', JSON.stringify(usedId));

    switch(id) {
        case 1: { // Tính delta
            let a = randomInRange(2, 5);
            let b = randomInRange(10, 10);
            let c = randomInRange(20, 20);

            let question = `
                Tính delta phương trình bậc hai: <br>
                <span class="highlight indent">${a}x² + ${b}x - ${c} = 0
                </span><br>
            `;

            let delta = b * b + 4 * a * c;

            let answer = delta;

            const explain = `
                Δ = b² - 4ac <br>
                Δ = ${b}² - 4.${a}.${c} = ${delta}.
            `;

            return { question, answer, explain };
        }

        case 2: { // Tính nghiệm x + y của hệ pt
            let a1 = randomInRange(2, 12);
            let b1 = randomInRange(2, 12);
            let a2 = randomInRange(2, 12);
            let b2 = randomInRange(2, 12);
            while (a1 * b2 - a2 * b1 === 0) {
                a2 = randomInRange(2, 12);
                b2 = randomInRange(2, 12);
            }
            let x = randomInRange(2, 12);
            let y = randomInRange(2, 12);
            let c1 = a1 * x + b1 * y;
            let c2 = a2 * x + b2 * y;

            let question = `
                Cho hệ phương trình <br>
                <span class="highlight indent">${a1}x + ${b1}y = ${c1}<span><br>
                <span class="highlight indent">${a2}x + ${b2}y = ${c2}<span><br>
                có nghiệm duy nhất (x; y) <br>
                Tính x - y
            `;

            let answer = x - y;

            const explain = `
                Giải phương trình bằng phương pháp cộng đại số ta thu được <br>
                <span class="highlight indent"> x = ${x}; y = ${y} <br>
                x - y = ${x} - ${y} = ${x - y}
            `;

            return { question, answer, explain };
        }

        case 3: { // C/m (d) và (P) luôn cắt nhau tại 2 đ phân biệt
            let a1 = randomInRange(1, 6);
            let b2 = randomInRange(1, 6);

            let question = `
                Cho đường thẳng (d): y = mx + ${b2} và Parabol (P): y = ${a1}x <br>
                Số giao điểm của (P) và (d) ít nhất là
            `;

            const delta = 4 * a1 * b2;

            let answer;

            if (delta === 0)
                answer = 1;
            else
                answer = 2;

            let explain = `
                Phương trình hoành độ giao điểm của (P) và (d) là: <br>
                ${a1}x² - mx - ${b2} = 0 <br>
                Δ = b² - 4ac <br>
                  = (-m)² - 4(${a1})(-${b2}) = m² + ${delta} <br>
            `;
            if (delta === 0) {
                explain += `
                    Có m² ≥ 0 với mọi m
                    Suy ra m² + 0 ≥ 0 với mọi m
                    Suy ra Δ = 0 là giá trị nhỏ nhất
                    Suy ra phương trình có 2 nghiệm kép
                    Vậy (P) giao (d) ít nhất 1 điểm
                `
            } else {
                explain += `
                    Có m² ≥ 0 với mọi m
                    Suy ra m² + ${delta} > 0 với mọi m
                    Suy ra phương trình có 2 nghiệm phân biệt
                    Vậy (P) giao (d) ít nhất 2 điểm
                `
            }

            return { question, answer, explain };
        }
    }
}

function random2() { // câu dễ 1đ
    const fullId = [1, 2, 3];
    let usedId = JSON.parse(localStorage.getItem('cau2_tuluan')) || [];
    if (usedId.length === fullId.length) {
        usedId = [];
    }
    let remainingId = fullId.filter(num => !usedId.includes(num));
    remainingId = [...remainingId].sort(() => Math.random() - 0.5);
    const id = remainingId[0];
    usedId.push(id);
    localStorage.setItem('cau2_tuluan', JSON.stringify(usedId));

    switch(id) {
        case 1: { // Tính delta
            let a = randomInRange(2, 5);
            let b = randomInRange(10, 10);
            let c = randomInRange(20, 20);

            let question = `
                Tính delta phương trình bậc hai: <br>
                <span class="highlight indent">${a}x² + ${b}x - ${c} = 0
                </span><br>
            `;

            let delta = b * b + 4 * a * c;

            let answer = delta;

            const explain = `
                Δ = b² - 4ac <br>
                Δ = ${b}² - 4.${a}.${c} = ${delta}.
            `;

            return { question, answer, explain };
        }

        case 2: { // Tính nghiệm x + y của hệ pt
            let a1 = randomInRange(2, 12);
            let b1 = randomInRange(2, 12);
            let a2 = randomInRange(2, 12);
            let b2 = randomInRange(2, 12);
            while (a1 * b2 - a2 * b1 === 0) {
                a2 = randomInRange(2, 12);
                b2 = randomInRange(2, 12);
            }
            let x = randomInRange(2, 12);
            let y = randomInRange(2, 12);
            let c1 = a1 * x + b1 * y;
            let c2 = a2 * x + b2 * y;

            let question = `
                Cho hệ phương trình <br>
                <span class="highlight indent">${a1}x + ${b1}y = ${c1}<span><br>
                <span class="highlight indent">${a2}x + ${b2}y = ${c2}<span><br>
                có nghiệm duy nhất (x; y) <br>
                Tính x - y
            `;

            let answer = x - y;

            const explain = `
                Giải phương trình bằng phương pháp cộng đại số ta thu được <br>
                <span class="highlight indent"> x = ${x}; y = ${y} <br>
                x - y = ${x} - ${y} = ${x - y}
            `;

            return { question, answer, explain };
        }

        case 3: { // C/m (d) và (P) luôn cắt nhau tại 2 đ phân biệt
            let a1 = randomInRange(1, 6);
            let b2 = randomInRange(1, 6);

            let question = `
                Cho đường thẳng (d): y = mx + ${b2} và Parabol (P): y = ${a1}x <br>
                Số giao điểm của (P) và (d) ít nhất là
            `;

            const delta = 4 * a1 * b2;

            let answer;

            if (delta === 0)
                answer = 1;
            else
                answer = 2;

            let explain = `
                Phương trình hoành độ giao điểm của (P) và (d) là: <br>
                ${a1}x² - mx - ${b2} = 0 <br>
                Δ = b² - 4ac <br>
                  = (-m)² - 4(${a1})(-${b2}) = m² + ${delta} <br>
            `;
            if (delta === 0) {
                explain += `
                    Có m² ≥ 0 với mọi m
                    Suy ra m² + 0 ≥ 0 với mọi m
                    Suy ra Δ = 0 là giá trị nhỏ nhất
                    Suy ra phương trình có 2 nghiệm kép
                    Vậy (P) giao (d) ít nhất 1 điểm
                `
            } else {
                explain += `
                    Có m² ≥ 0 với mọi m
                    Suy ra m² + ${delta} > 0 với mọi m
                    Suy ra phương trình có 2 nghiệm phân biệt
                    Vậy (P) giao (d) ít nhất 2 điểm
                `
            }

            return { question, answer, explain };
        }
    }
}

function random3() { // giải bài toán bằng cách lập hệ pt (2đ)
    const fullId = [1, 2, 3, 4];
    let usedId = JSON.parse(localStorage.getItem('lap_he_pt')) || [];
    if (usedId.length === fullId.length) {
        usedId = [];
    }
    let remainingId = fullId.filter(num => !usedId.includes(num));
    remainingId = [...remainingId].sort(() => Math.random() - 0.5);
    const id = remainingId[0];
    usedId.push(id);
    localStorage.setItem('lap_he_pt', JSON.stringify(usedId));

    switch(id) {
        case 1: {
            let question = `
            Tìm số nhiên n có hai số, biết rằng tổng của hai chữ số bằng 12, 
            và nếu viết hai chữ số theo thứ tự ngược lại thì được một số lớn 
            hơn n là 36 đơn vị.
            `;

            let answer = 48;

            let explain = `
                Gọi số cần tìm là <span class="overline-text">
                ab</span> (a, b ∈ N*; 0 < a < b < 10)<br>
                Tổng của hai chữ số bằng 12 nên ta có a + b = 12. (1)<br>
                Số ban đầu là <span class="overline-text">ab</span> = 10a + b<br>
                Khi đổi chỗ hai chữ số thì ta được số mới là
                <span class="overline-text">ba</span> = 10b + a<br>
                Số mới lớn hơn số cũ 36 đơn vị nên ta có phương trình<br>
                10a + b + 36 = 10b + a hay 9b - 9a = 36, suy ra b - a = 4 (2)<br>
                Từ (1) và (2), ta có hệ phương trình<br>
                <p class="highlight red indent">a + b = 12</p>
                <p class="highlight red indent">b - a = 4</p><br>
                Trừ từng vế hai phương trình của hệ mới, ta được 2a = 8 hay 
                a = 4 (thỏa mãn điều kiện).<br>
                Thay a = 4 vào phương trình thứ nhất của hệ, ta có<br>
                4 + b = 12, suy ra b = 12 – 4 = 8 (thỏa mãn điều kiện).<br>
                Vậy số cần tìm là 48.<br>
            `;

            return { question, answer, explain };
        }

        case 2: {
            let question = `
                Một chiếc xe khách đi từ Thành phố Hồ Chí Minh đến Cần Thơ, 
                quãng đường dài 170 km. Sau khi xe khách xuất phát 1 giờ 40 phút, một chiếc xe tải bắt đầu đi từ Cần Thơ về Thành phố Chí Minh (trên cùng một tuyến đường với xe khách) và gặp xe khách sau đó 40 phút. Tính vận tốc xe khách (đơn vị km/h), biết rằng mỗi giờ khách đi nhanh hơn xe tải 15 km.
            `;

            let answer = 60;

            let explain = `
                Gọi x(km/h), y(km/h) lần lượt là vận tốc của xe khách và xe tải 
                (x > 0, y > 0).<br>
                Vì mỗi giờ xe khách đi nhanh hơn xe tải 15 km nên ta có 
                x - y = 15. (1)<br>
                Vì quãng đường Thành phố Hồ Chí Minh đến Cần Thơ dài 170 km nên ta có
                <sup>7</sup>/<sub>3</sub>x + <sup>2</sup>/<sub>3</sub>y = 170 (2)<br>
                Từ (1) và (2) ta có hệ phương trình <br>
                <p class="highlight red indent">x - y = 15</p>
                <p class="highlight red indent">7x + 2y = 510</p><br>
                Từ phương trình thứ nhất của hệ trên, ta có y = x - 15. Thế vào 
                phương trình thứ hai của hệ trên, ta được<br>
                7x + 2.(x - 15) = 510, tức là 9x - 30 = 510, suy ra x = 60 
                (thỏa mãn điều kiện).<br>
                Từ đó y = 60 - 15 = 45 (thỏa mãn điều kiện).<br>
                Vậy vận tốc của xe khách là 60 km/h
            `;

            return { question, answer, explain };
        }

        case 3: {
            let question = `
                Tìm số tự nhiên n có hai chữ số, biết rằng nếu viết thêm chữ số 3 
                vào giữa hai chữ số của số n thì được một số lớn hơn số 2n là 585 
                đơn vị, và nếu viết hai chữ số của số n theo thứ tự ngược lại thì 
                được một số nhỏ hơn số n là 18 đơn vị.
            `;

            let answer = 75;

            let explain = `
                Gọi số có hai chữ số cần tìm là n = <span class="overline-text">
                ab</span> (10 <= <span class="overline-text">ab</span>,
                a ∈ N, b ∈ N)<br>
                Sau khi viết thêm chữ số 3 vào giữa hai chữ số của số n thì ta được 
                số mới có dạng <span class="overline-text">a3b</span><br>
                Nếu viết thêm chữ số 3 vào giữa hai chữ số của số n thì được một số 
                lớn hơn số 2n là 585 đơn vị nên ta có phương trình<br>
                <span class="overline-text">a3b</span> - 
                2<span class="overline-text">ab</span> = 585 <br>
                100a + 30 + b - 2(10a + b) = 585<br>
                100a + 30 + b - 20a - 2b = 585<br>
                80a - b = 555 (1)<br>
                Khi viết hai chữ số của số n theo thứ tự ngược lại thì ta được số có 
                dạng <span class="overline-text">ba</span><br>
                Theo bài, số <span class="overline-text">ba</span> nhỏ hơn số
                n = <span class="overline-text">ab</span> 18 đơn vị nên ta có pt<br>
                <span class="overline-text">ab</span> - 
                <span class="overline-text">ba</span> = 18<br>
                10a + b - (10b + a) = 18<br>
                10a + b - 10b - a = 18<br>
                9a - 9b = 18<br>
                a - b = 2 (2)<br>
                Từ (1) và (2) ta có hệ phương trình<br>
                <p class="highlight red indent">80a - b = 555</p>
                <p class="highlight red indent">a - b = 2</p><br>
                Trừ từng vế của hai phương trình ta có<br> 
                (80a - b) - (a - b) = 555 - 2 hay 79a = 553, suy ra a = 7 
                (thỏa mãn điều kiện).<br> 
                • Với a = 7 thay vào phương trình thứ hai ta được b = 5 
                (thỏa mãn điều kiện).<br> 
                Vậy số tự nhiên n có hai chữ số cần tìm là 75.
            `;

            return { question, answer, explain };
        }

        case 4: {
            let question = `
                Trên cánh đồng có diện tích 160 ha của một đơn vị sản xuất, 
                người ta dành 60 ha để cấy thí điểm giống lúa mới, còn lại 
                vẫn cấy giống lúa cũ. Khi thu hoạch, đầu tiên người ta gặt 
                8 ha giống lúa cũ và 7 ha giống lúa mới để đối chứng. Kết quả 
                là 7 ha giống lúa mới cho thu hoạch nhiều hơn 8 ha giống lúa 
                cũ là 2 tấn thóc. Biết rằng tổng số thóc (cả hai giống) thu hoạch cả vụ trên 160 ha là 860 tấn. Hỏi năng suất của giống lúa cũ trên 1 ha là bao nhiêu tấn thóc?
            `;

            let answer = 5;
            
            let explain = `
                Số ha cấy giống lúa cũ là: 160 - 60 = 100 (ha).<br>
                Gọi năng suất của giống lúa cũ và giống lúa mới trên 1 ha 
                lần lượt là x, y (tấn thóc) (x > 0, y > 0).<br>
                Số thóc thu được trên 8 ha giống lúa cũ là 8x (tấn thóc).<br>
                Số thóc thu được trên 7 ha giống lúa mới là 7y (tấn thóc).<br>
                Kết quả 7 ha giống lúa mới cho thu hoạch nhiều hơn 8 ha giống 
                lúa cũ là 2 tấn thóc nên ta có phương trình 7y - 8x = 2.<br>             (1)
                Số thóc cũ thu được trên 100 ha giống lúa cũ là 100x (tấn thóc).<br>
                Số thóc mới thu được trên 60 ha giống lúa mới là 60y (tấn thóc).<br>
                Tổng số thóc (cả hai giống) thu hoạch cả vụ trên 160 ha là 860 tấn 
                nên ta có phương trình 100x + 60y = 860 hay 5x + 3y = 43 (2)<br>
                Từ (1) và (2) ta có hệ phương trình<br>
                <p class="highlight red indent">7y - 8x = 2</p>
                <p class="highlight red indent">5x + 3y = 43</p><br>
                Suy ra<br>
                <p class="highlight red indent">x = 5 (thoả mãn điều kiện)</p>
                <p class="highlight red indent">y = 6 (thoả mãn điều kiện)</p><br>
                Vậy năng suất của giống lúa cũ trên 1 ha là 5 tấn thóc
            `;

            return { question, answer, explain };
        }
    }
}

function random4() { // Câu hình (1đ)
    const fullId = [1, 2, 3, 4];
    let usedId = JSON.parse(localStorage.getItem('geometry')) || [];
    if (usedId.length === fullId.length) {
        usedId = [];
    }
    let remainingId = fullId.filter(num => !usedId.includes(num));
    remainingId = [...remainingId].sort(() => Math.random() - 0.5);
    const id = remainingId[0];
    usedId.push(id);
    localStorage.setItem('geometry', JSON.stringify(usedId));

    switch(id) {
        case 1: {
            let question = `
                Cho hình thang ABCD (AD // BC) có AD = 16 cm, BC = 4 cm và
                ∠A = ∠B = ∠ACD = 90⁰ <br>
                Tính AC (cm)
            `;

            let answer = 8;

            let explain = `
                Ta có ∠ADC + ∠DCE = 90⁰ (hai góc nhọn trong tam giác CDE vuông tại E) và ∠ACE + ∠DCE = ∠ACD = 90⁰ nên ∠ADC = ∠ACE (cùng phụ góc ∠DCE) (1) <br>
                Xét tam giác ACD vuông tại C, ta có
                sin∠ADC = ${fraction('AC', 'AD')} (2) <br>
                Xét tam giác ACE vuông tại E, ta có
                sin∠ACE = ${fraction('AE', 'AC')} (3) <br>
                Từ (1),(2),(3) ta suy ra ${fraction('AC', 'AD')} = 
                ${fraction('AE', 'AC')}, do đó AC² = AE.AD <br>
                Hình thang ABCD có AD // BC và AB ⊥ BC (do B = 90⁰) nên AB ⊥ AD <br>
                Tứ giác ABCE có A = B = E = 90⁰ nên ABCE là hình chữ nhật <br>
                Suy ra AE = BC = 4 cm (tính chất hình chữ nhật). <br>
                Khi đó, AC² = 4.16 = 64 nên AC = 8 (cm) (do AC > 0).
            `;

            return { question, answer, explain };
        }

        case 2: {
            let question = `
                Cho tam giác vuông ABC vuông tại A, đường cao AH. Biết AB = 6 cm, AC = 8 cm. <br>
                Tính độ dài đường cao AH.
            `;
        
            let answer = 4.8;
        
            let explain = `
                Xét tam giác vuông ABC: <br>
                - Theo định lý Pythagore, ta tính BC: <br>
                BC = ${sqrt('AB² + AC²')} = ${sqrt('6² + 8²')} = 10 cm. <br>
                - Sử dụng hệ thức lượng trong tam giác vuông: <br>
                AH = ${fraction('AB × AC', 'BC')} <br>
                Thay số: AH = ${fraction('6 × 8', '10')} = 4.8 cm. <br>
                Vậy đường cao AH = 4.8 cm.
            `;
        
            return { question, answer, explain };
        }

        case 3: {
            let question = `
                Cho tam giác vuông ABC vuông tại B, đường cao BH. Biết AB = 3 cm, BC = 5 cm. <br>
                Tính diện tích tam giác ABC (cm²).
            `;
        
            let answer = 7.2;
        
            let explain = `
                Xét tam giác vuông ABC: <br>
                - Theo định lý Pythagore, ta tính AC: <br>
                AC = ${sqrt('BC² - AB²')} = ${sqrt('5² - 3²')} = 4 cm. <br>
                - Diện tích tam giác ABC: <br>
                ${fraction('1', '2')} × AB × AC = ${fraction('1', '2')} × 3 × 4 = 7.2 cm². <br>
                Vậy diện tích tam giác = 7.2 cm².
            `;
        
            return { question, answer, explain };
        }
         
        case 4: {
            let question = `
                Cho hình thang vuông ABCD (AD ⊥ AB, BC ⊥ AB), biết AB = 6 cm, BC = 8 cm, AD = 5 cm. <br>
                Tính độ dài đường chéo BD.
            `;
        
            let answer = 10;
        
            let explain = `
                Xét tam giác vuông ABD vuông tại A: <br>
                - Theo định lý Pythagore, ta có: <br>
                BD = ${sqrt('AB² + AD²')} = ${sqrt('6² + 5²')} = ${sqrt('36 + 25')} = 10 cm. <br>
                Vậy độ dài đường chéo BD = 10 cm.
            `;
        
            return { question, answer, explain };
        }
    }
}

function random5() { // Câu cuối (1đ)
    const fullId = [1, 2];
    let usedId = JSON.parse(localStorage.getItem('lastQuestion')) || [];
    if (usedId.length === fullId.length) {
        usedId = [];
    }
    let remainingId = fullId.filter(num => !usedId.includes(num));
    remainingId = [...remainingId].sort(() => Math.random() - 0.5);
    const id = remainingId[0];
    usedId.push(id);
    localStorage.setItem('lastQuestion', JSON.stringify(usedId));

    switch(id) {
        case 1: {
            let question = `
                Cho phương trình: <br>
                <span class="highlight indent">
                ${sqrt('x + 3')} - ${sqrt('2x - 5')} = 1
                </span>
                có 2 nghiệm x1, x2 <br>
                Tính x1 + x2
            `;
        
            let answer = 22;
        
            let explain = `
                **Bước 1: Điều kiện xác định** <br>
                x + 3 ≥ 0 và 2x - 5 ≥ 0 ⟹ x ≥ 5/2. <br>
                **Bước 2: Đặt phương trình** <br>
                ${sqrt('x + 3')} - ${sqrt('2x - 5')} = 1. <br>
                Chuyển vế: ${sqrt('x + 3')} = ${sqrt('2x - 5')} + 1. <br>
                **Bước 3: Bình phương hai vế** <br>
                x + 3 = (2x - 5) + 2${sqrt('(2x - 5)')} + 1. <br>
                Rút gọn: x + 3 - 2x + 4 = 2${sqrt('(2x - 5)')}. <br>
                ⟹ -x + 7 = 2${sqrt('(2x - 5)')}. <br>
                **Bước 4: Lại bình phương hai vế** <br>
                (-x + 7)² = 4(2x - 5). <br>
                ⟹ x² - 14x + 49 = 8x - 20. <br>
                ⟹ x² - 22x + 69 = 0. <br>
                **Bước 5: Giải phương trình bậc hai** <br>
                Δ = 22² - 4×1×69 = 400. <br>
                x = ${fraction('-(-22) ± sqrt(400)', '2×1')} = 11 ± 2. <br>
                ⟹ x₁ = 13, x₂ = 9. <br>
                **Bước 6: Kiểm tra điều kiện xác định** <br>
                Thỏa mãn điều kiện xác định: x1 = 13, x2 = 9. <br>
                Vậy x1 + x2 = 13 + 9 = 22
            `;
        
            return { question, answer, explain };
        }

        case 2: {
            let question = `
                Với các số thực dương x và y thoả mãn x + y + xy = 3, tìm giá trị nhỏ nhất của biểu thức
                <span class="highlight indent">
                P = ${fraction('3', 'x + y')} - xy
                </span>
            `;
        
            let answer = 0.5;
        
            let explain = `
                <img class="explain-img" src="./assets/images/hard-q1.jpg">
            `;
        
            return { question, answer, explain };
        }
    }
}
