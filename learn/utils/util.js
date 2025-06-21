export function updateProgressBar(point, maxPoint) {
    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = point / maxPoint * 100 + '%';
}

export function setContinueBtn() {
    const continueBtn = document.querySelector('.continue-btn');
    continueBtn.addEventListener('click', () => {
        displayQuestion();
    });
}

export function fraction(up, down) {
    const frac = `
        <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mfrac>
                <mi style="font-weight: 600; font-family: Arial;">${up}</mi>
                <mi style="font-weight: 600; font-family: Arial;">${down}</mi>
            </mfrac>
        </math>
    `;
    return frac;
}

export function sqrt(expression) {
    const sqrt = `
        <math xmlns="http://www.w3.org/1998/Math/MathML">
            <msqrt style="font-family: 'Tahoma';">
                <mn style="font-family: 'Segoe UI';">${expression}</mn>
            </msqrt>
        </math>
    `;
    return sqrt;
}