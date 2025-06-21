let units = JSON.parse(localStorage.getItem('units')) || [
    {
        id: 1,
        name: "Khái niệm phương trình và hệ hai phương trình bậc nhất hai ẩn",
        levels: [
            {
                name: "Phương trình bậc nhất hai ẩn",
                state: "unlock",
            }, {
                name: "Hệ hai phương trình bậc nhất hai ẩn",
                state: "lock",
            }, {
                name: "Vận dụng",
                state: "lock",
            }
        ],
    }, {
        id: 2,
        name: "Giải hệ hai phương trình bậc nhất hai ẩn",
        levels: [
            {
                name: "Phương pháp thế",
                state: "lock",
            }, {
                name: "Phương pháp cộng đại số",
                state: "lock",
            }, {
                name: "Vận dụng",
                state: "lock",
            }, {
                name: "Luyện tập chung",
                state: "lock",
            }
        ],
    }, {
        id: 3,
        name: "Giải bài toán bằng cách lập hệ phương trình",
        levels: [
            {
                name: "Luyện tập",
                state: "lock",
            },
            { name: "Bài tập cuối chương I", state: "lock" },
        ],
    }, {
        id: 4,
        name: "Phương trình quy về phương trình bậc nhất một ẩn",
        levels: [
            {
                name: "Phương trình tích",
                state: "lock",
            }, {
                name: "Phương trình chứa ẩn ở mẫu",
                state: "lock",
            }, {
                name: "Bài tập",
                state: "lock",
            }
        ]
    }, {
        id: 5,
        name: "Bất đẳng thức và tính chất",
        levels: [
            { name: "Bất đẳng thức", state: "lock" }, 
            { name: "Liên hệ giữa thứ tự và phép cộng", state: "lock" }, 
            { name: "Liên hệ giữa thứ tự và phép nhân", state: "lock" }, 
            { name: "Vận dụng", state:"lock" }, 
            { name: "Luyện tập chung", state: "lock" },]
    }, {
        id: 6,
        name: "Bất phương trình bậc nhất một ẩn",
        levels: [
            { name: "Khái niệm bất phương trình bậc nhất một ẩn", state: "lock" }, { name: "Cách giải bất phương trình bậc nhất một ẩn", state: "lock" }, { name: "Vận dụng", state: "lock" },
            { name: "Bài tập cuối chương II", state: "lock" },]
    }, {
        id: 7,
        name: "Căn bậc hai và căn thức bậc hai",
        levels: [
            { name: "Căn bậc hai", state: "lock" }, 
            { name: "Căn thức bậc hai", state: "lock" }, 
            { name: "Vận dụng", state: "lock" },]
    }, {
        id: 8,
        name: "Khai căn bậc hai với phép nhân và phép chia",
        levels: [
            { name: "Khai căn bậc hai và phép nhân", state: "lock" }, 
            { name: "Khai căn bậc hai và phép chia", state: "lock" }, 
            { name: "Vận dụng", state: "lock" },]
    }, {
        id: 9,
        name: "Biến đổi đơn giản và rút gọn biểu thức chứa căn thức bậc hai",
        levels: [
            { name: "Đưa thừa số ra ngoài dấu căn", state: "lock" }, 
            { name: "Đưa thừa số vào trong đâu căn", state: "lock" }, 
            { name: "Trục căn thức ở mẫu", state: "lock" }, 
            { name: "Rút gọn biểu thức chứa căn thức bậc hai", state:"lock" }, 
            { name:"Vận dụng", state:"lock"},]
    }, {
        id: 10,
        name: "Căn bậc ba và căn thức bậc ba",
        levels: [
            { name: "Căn bậc ba", state: "lock" }, 
            { name: "Căn thức bậc ba", state: "lock" }, 
            { name: "Vận dụng", state: "lock" }, 
            { name: "Luyện tập chung", state: "lock" },
            { name: "Bài tập cuối chương III", state: "lock" },]
    }, {
        id: 11,
        name: "Tỉ số lượng giác của góc nhọn",
        levels: [
            { name: "Khái niệm tỉ số lượng giác của một góc nhọn", state: "lock" }, 
            { name: "Tỉ số lượng giác của hai góc phụ nhau", state: "lock" }, 
            { name: "Vận dụng", state: "lock" },]
    }, {
        id: 12,
        name: "Một số hệ thức giữa cạnh, góc trong tam giác vuông và ứng dụng",
        levels: [
            { name: "Hệ thức giữa cạnh huyền và cạnh góc vuông", state: "lock" }, { name: "Hệ thức giữa hai cạnh góc vuông", state: "lock" }, 
            { name: "Giải tam giác vuông", state: "lock" }, 
            { name: "Vận dụng", state: "lock" }, 
            { name: "Luyện tập chung", state: "lock" }, 
            { name: "Bài tập cuối chương IV", state: "lock" },]
    }, {
        id: 13,
        name: "Mở đầu về đường tròn",
        levels: [
            { name: "Đường tròn", state: "lock" }, ]
    }, {
        id: 14,
        name: "Cung và dây của một đường tròn",
        levels: [
            { name: "Dây và đường kính của đường tròn", state: "lock" }, 
            { name: "Góc ở tâm, cung và số đo của một cung", state: "lock" }, 
            { name: "Vận dụng", state: "lock" }, ]
    }, {
        id: 15,
        name: `Độ dài của cung tròn <br> Diện tích hình quạt tròn và 
        hình vành khuyên`,
        levels: [
            { name: "Độ dài của cung tròn", state: "lock" }, 
            { name: "Hình quạt tròn và hình vành khuyên", state: "lock" }, 
            { name: "Vận dụng", state: "lock" }, 
            { name: "Luyện tập chung", state: "lock" },]
    }, {
        id: 16,
        name: `Vị trí tương đối của đường thẳng và đường tròn`,
        levels: [
            { name: "Vị trí tương đối của đường thẳng và đường tròn", 
                state: "lock" }, 
            { name: "Hai tiếp tuyến cắt nhau của một đường tròn", 
                state: "lock" }, 
            { name: "Vận dụng", state: "lock" }, ]
    }, {
        id: 17,
        name: `Vị trí tương đối của hai đường tròn`,
        levels: [
            { name: "Vận dụng", state: "lock" },
            { name: "Bài tập cuối chương V", state: "lock" },]
    }, {
        id: 18,
        name: `Hàm số y = ax² (a ≠ 0)`,
        levels: [
            { name: "Hàm số y = ax² (a ≠ 0)", state: "lock" },
            { name: "Vận dụng", state: "lock" }, ]
    }, {
        id: 19,
        name: `Phương trình bậc hai một ẩn`,
        levels: [
            { name: "Định nghĩa phương trình bậc hai một ẩn", state: "lock" },
            { name: "Cách giải phương trình bậc hai một ẩn có dạng đặc biệt", state: "lock" },
            { name: "Công thức nghiệm của phương trình bậc hai", state: "lock" },
            { name: "Vận dụng", state: "lock" },
            { name: "Luyện tập chung", state: "lock" }, ]
    }, {
        id: 20,
        name: `Định lí viete và ứng dụng`,
        levels: [
            { name: "Định lí viete", state: "lock" },
            { name: "Áp dụng định lí viete", state: "lock" },
            { name: "Tìm hai số khi biết tổng và tích của chúng", state: "lock" },
            { name: "Vận dụng", state: "lock" }, ]
    }, {
        id: 21,
        name: `Giải bài toán bằng cách lập phương trình`,
        levels: [
            { name: "Bài tập", state: "lock" },
            { name: "Bài tập cuối chương VI", state: "lock" }, ]
    }, {
        id: 22,
        name: `Bảng tần số và biểu đồ tần số`,
        levels: [
            { name: "Vận dụng", state: "lock" }, ]
    }, {
        id: 23,
        name: `Bảng tần số tương đối và biểu đồ tần số tương đối`,
        levels: [
            { name: "Bảng tần số tương đối", state: "lock" },
            { name: "Vận dụng", state: "lock" }, ]
    }, {
        id: 24,
        name: `Bảng tần số, tần số tương đối ghép nhóm và biểu đồ`,
        levels: [
            { name: "Bảng tần số, tần số tương đối ghép nhóm", state: "lock" },
            { name: "Bài tập cuối chương VII", state: "lock" }, ]
    }, {
        id: 25,
        name: `Phép thử ngẫu nhiên và không gian mẫu`,
        levels: [
            { name: "Vận dụng", state: "lock" }, ]
    }, {
        id: 26,
        name: `Xác suất của biến cố có liên quan tới phép thử`,
        levels: [
            { name: "Vận dụng", state: "lock" },
            { name: "Bài tập cuối chương VIII", state: "lock" }, ]
    }, {
        id: 27,
        name: `Góc nội tiếp`,
        levels: [
            { name: "Vận dụng", state: "lock" }, ]
    }, {
        id: 28,
        name: `Đường tròn ngoại tiếp và đường tròn nội tiếp của một tam giác`,
        levels: [
            { name: "Đường tròn ngoại tiếp một tam giác", 
                state: "lock" },
            { name: "Đường tròn nội tiếp một tam giác", 
                state: "lock" },
            { name: "Vận dụng", state: "lock" }, ]
    }, {
        id: 29,
        name: `Tứ giác nội tiếp`,
        levels: [
            { name: "Đường tròn ngoại tiếp một tứ giác", 
                state: "lock" },
            { name: "Đường tròn ngoại tiếp hình chữ nhật và hình vuông", 
                state: "lock" },
            { name: "Vận dụng", state: "lock" }, ]
    }, {
        id: 30,
        name: `Đa giác đều`,
        levels: [
            { name: "Đa giác đều", 
                state: "lock" },
            { name: "Bài tập cuối chương IX", state: "lock" }, ]
    }, {
        id: 31,
        name: `Hình trụ và hình nón`,
        levels: [
            { name: "Hình trụ", 
                state: "lock" },
            { name: "Hình nón", 
                state: "lock" },
            { name: "Vận dụng", state: "lock" }, ]
    }, {
        id: 32,
        name: `Hình cầu`,
        levels: [
            { name: "Diện tích mặt cầu và thể tích hình cầu", 
                state: "lock" },
            { name: "Vận dụng", state: "lock" },
            { name: "Bài tập cuối chương X", state: "lock" }, ]
    }
];

localStorage.setItem('units', JSON.stringify(units));

function displayUnits() {
    let html = `<h1>Chinh phục toán 9 và đề thi Toán tuyển sinh vào 10</h1>`;
    units.forEach((unit, index) => {
        const {id, name, levels} = unit;
        html += `
            <div class="unit">
                <div class="unit-line">
                    <div class="unit-name">
                        ${name}
                    </div>
                </div>        
                <div class="unit-levels">
        `;
        levels.forEach((level, idx) => {
            html += `
                <div class="level">
                    <div class="level-btn ${level.state}-level">
                    </div>
                    <div class="intro-level">
                        <span class="level-name">${level.name}</span>
                        <a class="start-btn" href="unit/${index + 1}/level/${idx + 1}">Bắt đầu</a>
                    </div>
                </div>
            `;
        });
        html += `
                </div>
            </div>
        `;
    });
    document.querySelector('.mid-section')
        .innerHTML = html;
}

function addEvent() {
    // Lấy tất cả các level-btn có trạng thái unlock
    const levelButtons = document.querySelectorAll('.level-btn.unlock-level');

    levelButtons.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            // Ẩn tất cả các intro-level
            document.querySelectorAll('.intro-level').forEach(intro => {
                intro.classList.remove('show');
                intro.style.display = 'none';
            });

            // Hiển thị intro-level tương ứng
            console.log('show');
            const introLevel = btn.nextElementSibling;
            if (introLevel) {
                introLevel.style.display = 'flex'; // Hiển thị flex trước
                requestAnimationFrame(() => {
                    introLevel.classList.add('show'); // Thêm hiệu ứng phóng to
                });
            }
        });
    });
}

// Gọi hàm sau khi hiển thị nội dung
// resetUnits();
displayUnits();
addEvent();
saveScrollPosition();
addIdentity();


function resetUnits() {
    units = [
        {
            id: 1,
            name: "Khái niệm phương trình và hệ hai phương trình bậc nhất hai ẩn",
            levels: [
                {
                    name: "Phương trình bậc nhất hai ẩn",
                    state: "unlock",
                }, {
                    name: "Hệ hai phương trình bậc nhất hai ẩn",
                    state: "unlock",
                }, {
                    name: "Vận dụng",
                    state: "unlock",
                }
            ],
        }, {
            id: 2,
            name: "Giải hệ hai phương trình bậc nhất hai ẩn",
            levels: [
                {
                    name: "Phương pháp thế",
                    state: "unlock",
                }, {
                    name: "Phương pháp cộng đại số",
                    state: "unlock",
                }, {
                    name: "Vận dụng",
                    state: "unlock",
                }, {
                    name: "Luyện tập chung",
                    state: "unlock",
                }
            ],
        }, {
            id: 3,
            name: "Giải bài toán bằng cách lập hệ phương trình",
            levels: [
                {
                    name: "Luyện tập",
                    state: "unlock",
                },
                { name: "Bài tập cuối chương I", state: "unlock" },
            ],
        }, {
            id: 4,
            name: "Phương trình quy về phương trình bậc nhất một ẩn",
            levels: [
                {
                    name: "Phương trình tích",
                    state: "unlock",
                }, {
                    name: "Phương trình chứa ẩn ở mẫu",
                    state: "unlock",
                }, {
                    name: "Bài tập",
                    state: "unlock",
                }
            ]
        }, {
            id: 5,
            name: "Bất đẳng thức và tính chất",
            levels: [
                { name: "Bất đẳng thức", state: "unlock" }, 
                { name: "Liên hệ giữa thứ tự và phép cộng", state: "unlock" }, 
                { name: "Liên hệ giữa thứ tự và phép nhân", state: "unlock" }, 
                { name: "Vận dụng", state:"unlock" }, 
                { name: "Luyện tập chung", state: "unlock" },]
        }, {
            id: 6,
            name: "Bất phương trình bậc nhất một ẩn",
            levels: [
                { name: "Khái niệm bất phương trình bậc nhất một ẩn", state: "unlock" }, { name: "Cách giải bất phương trình bậc nhất một ẩn", state: "unlock" }, { name: "Vận dụng", state: "unlock" },
                { name: "Bài tập cuối chương II", state: "unlock" },]
        }, {
            id: 7,
            name: "Căn bậc hai và căn thức bậc hai",
            levels: [
                { name: "Căn bậc hai", state: "unlock" }, 
                { name: "Căn thức bậc hai", state: "unlock" }, 
                { name: "Vận dụng", state: "unlock" },]
        }, {
            id: 8,
            name: "Khai căn bậc hai với phép nhân và phép chia",
            levels: [
                { name: "Khai căn bậc hai và phép nhân", state: "unlock" }, 
                { name: "Khai căn bậc hai và phép chia", state: "unlock" }, 
                { name: "Vận dụng", state: "unlock" },]
        }, {
            id: 9,
            name: "Biến đổi đơn giản và rút gọn biểu thức chứa căn thức bậc hai",
            levels: [
                { name: "Đưa thừa số ra ngoài dấu căn", state: "unlock" }, 
                { name: "Đưa thừa số vào trong đâu căn", state: "unlock" }, 
                { name: "Trục căn thức ở mẫu", state: "unlock" }, 
                { name: "Rút gọn biểu thức chứa căn thức bậc hai", state:"unlock" }, 
                { name:"Vận dụng", state:"unlock"},]
        }, {
            id: 10,
            name: "Căn bậc ba và căn thức bậc ba",
            levels: [
                { name: "Căn bậc ba", state: "unlock" }, 
                { name: "Căn thức bậc ba", state: "unlock" }, 
                { name: "Vận dụng", state: "unlock" }, 
                { name: "Luyện tập chung", state: "unlock" },
                { name: "Bài tập cuối chương III", state: "unlock" },]
        }, {
            id: 11,
            name: "Tỉ số lượng giác của góc nhọn",
            levels: [
                { name: "Khái niệm tỉ số lượng giác của một góc nhọn", state: "unlock" }, 
                { name: "Tỉ số lượng giác của hai góc phụ nhau", state: "unlock" }, 
                { name: "Vận dụng", state: "unlock" },]
        }, {
            id: 12,
            name: "Một số hệ thức giữa cạnh, góc trong tam giác vuông và ứng dụng",
            levels: [
                { name: "Hệ thức giữa cạnh huyền và cạnh góc vuông", state: "unlock" }, { name: "Hệ thức giữa hai cạnh góc vuông", state: "unlock" }, 
                { name: "Giải tam giác vuông", state: "unlock" }, 
                { name: "Vận dụng", state: "unlock" }, 
                { name: "Luyện tập chung", state: "unlock" }, 
                { name: "Bài tập cuối chương IV", state: "unlock" },]
        }, {
            id: 13,
            name: "Mở đầu về đường tròn",
            levels: [
                { name: "Đường tròn", state: "unlock" }, ]
        }, {
            id: 14,
            name: "Cung và dây của một đường tròn",
            levels: [
                { name: "Dây và đường kính của đường tròn", state: "unlock" }, 
                { name: "Góc ở tâm, cung và số đo của một cung", state: "unlock" }, 
                { name: "Vận dụng", state: "unlock" }, ]
        }, {
            id: 15,
            name: `Độ dài của cung tròn <br> Diện tích hình quạt tròn và 
            hình vành khuyên`,
            levels: [
                { name: "Độ dài của cung tròn", state: "unlock" }, 
                { name: "Hình quạt tròn và hình vành khuyên", state: "unlock" }, 
                { name: "Vận dụng", state: "unlock" }, 
                { name: "Luyện tập chung", state: "unlock" },]
        }, {
            id: 16,
            name: `Vị trí tương đối của đường thẳng và đường tròn`,
            levels: [
                { name: "Vị trí tương đối của đường thẳng và đường tròn", 
                    state: "unlock" }, 
                { name: "Hai tiếp tuyến cắt nhau của một đường tròn", 
                    state: "unlock" }, 
                { name: "Vận dụng", state: "unlock" }, ]
        }, {
            id: 17,
            name: `Vị trí tương đối của hai đường tròn`,
            levels: [
                { name: "Vận dụng", state: "unlock" },
                { name: "Bài tập cuối chương V", state: "unlock" },]
        }, {
            id: 18,
            name: `Hàm số y = ax² (a ≠ 0)`,
            levels: [
                { name: "Hàm số y = ax² (a ≠ 0)", state: "unlock" },
                { name: "Vận dụng", state: "unlock" }, ]
        }, {
            id: 19,
            name: `Phương trình bậc hai một ẩn`,
            levels: [
                { name: "Định nghĩa phương trình bậc hai một ẩn", state: "unlock" },
                { name: "Cách giải phương trình bậc hai một ẩn có dạng đặc biệt", state: "unlock" },
                { name: "Công thức nghiệm của phương trình bậc hai", state: "unlock" },
                { name: "Vận dụng", state: "unlock" },
                { name: "Luyện tập chung", state: "unlock" }, ]
        }, {
            id: 20,
            name: `Định lí viete và ứng dụng`,
            levels: [
                { name: "Định lí viete", state: "unlock" },
                { name: "Áp dụng định lí viete", state: "unlock" },
                { name: "Tìm hai số khi biết tổng và tích của chúng", state: "unlock" },
                { name: "Vận dụng", state: "unlock" }, ]
        }, {
            id: 21,
            name: `Giải bài toán bằng cách lập phương trình`,
            levels: [
                { name: "Bài tập", state: "unlock" },
                { name: "Bài tập cuối chương VI", state: "unlock" }, ]
        }, {
            id: 22,
            name: `Bảng tần số và biểu đồ tần số`,
            levels: [
                { name: "Vận dụng", state: "unlock" }, ]
        }, {
            id: 23,
            name: `Bảng tần số tương đối và biểu đồ tần số tương đối`,
            levels: [
                { name: "Bảng tần số tương đối", state: "unlock" },
                { name: "Vận dụng", state: "unlock" }, ]
        }, {
            id: 24,
            name: `Bảng tần số, tần số tương đối ghép nhóm và biểu đồ`,
            levels: [
                { name: "Bảng tần số, tần số tương đối ghép nhóm", state: "unlock" },
                { name: "Bài tập cuối chương VII", state: "unlock" }, ]
        }, {
            id: 25,
            name: `Phép thử ngẫu nhiên và không gian mẫu`,
            levels: [
                { name: "Vận dụng", state: "unlock" }, ]
        }, {
            id: 26,
            name: `Xác suất của biến cố có liên quan tới phép thử`,
            levels: [
                { name: "Vận dụng", state: "unlock" },
                { name: "Bài tập cuối chương VIII", state: "unlock" }, ]
        }, {
            id: 27,
            name: `Góc nội tiếp`,
            levels: [
                { name: "Vận dụng", state: "unlock" }, ]
        }, {
            id: 28,
            name: `Đường tròn ngoại tiếp và đường tròn nội tiếp của một tam giác`,
            levels: [
                { name: "Đường tròn ngoại tiếp một tam giác", 
                    state: "unlock" },
                { name: "Đường tròn nội tiếp một tam giác", 
                    state: "unlock" },
                { name: "Vận dụng", state: "unlock" }, ]
        }, {
            id: 29,
            name: `Tứ giác nội tiếp`,
            levels: [
                { name: "Đường tròn ngoại tiếp một tứ giác", 
                    state: "unlock" },
                { name: "Đường tròn ngoại tiếp hình chữ nhật và hình vuông", 
                    state: "unlock" },
                { name: "Vận dụng", state: "unlock" }, ]
        }, {
            id: 30,
            name: `Đa giác đều`,
            levels: [
                { name: "Đa giác đều", 
                    state: "unlock" },
                { name: "Bài tập cuối chương IX", state: "unlock" }, ]
        }, {
            id: 31,
            name: `Hình trụ và hình nón`,
            levels: [
                { name: "Hình trụ", 
                    state: "unlock" },
                { name: "Hình nón", 
                    state: "unlock" },
                { name: "Vận dụng", state: "unlock" }, ]
        }, {
            id: 32,
            name: `Hình cầu`,
            levels: [
                { name: "Diện tích mặt cầu và thể tích hình cầu", 
                    state: "unlock" },
                { name: "Vận dụng", state: "unlock" },
                { name: "Bài tập cuối chương X", state: "unlock" }, ]
        }
    ];
    
    localStorage.setItem('units', JSON.stringify(units));
}

function saveScrollPosition() {
    // Lưu lại vị trí cuộn khi người dùng rời khỏi trang
    window.addEventListener('beforeunload', function () {
        localStorage.setItem('scrollPosition', window.scrollY);
    });

    // Khôi phục lại vị trí cuộn khi trang được tải lại
    window.addEventListener('load', function () {
        const scrollPosition = localStorage.getItem('scrollPosition');
        if (scrollPosition) {
            window.scrollTo(0, parseInt(scrollPosition)); // Cuộn về vị trí đã lưu
        }
    });
}

function addIdentity() {
    let identitys = [
        "(a + b)² = a² + b² + 2ab",
        "(a - b)² = a² + b² - 2ab",
        "a² - b² = (a - b)(a + b)",
        "(a + b)³ = a³ + b³ + 3ab(a + b)",
        "(a - b)³ = a³ - b³ - 3ab(a - b)",
        "a³ + b³ = (a + b)(a² - ab + b²)",
        "a³ - b³ = (a - b)(a² + ab + b²)"
    ];
    let html = `<h1>7 hằng đằng thức đáng nhớ</h1>`;
    identitys.forEach(identity => {
        html += `
            <div class="identity">${identity}</div>
        `;
    })
    const rightSection = document.querySelector('.right-section');
    rightSection.innerHTML = html;
}