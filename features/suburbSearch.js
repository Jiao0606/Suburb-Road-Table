const suburbListDiv = document.getElementById('suburbList');

// 根據Area調整Title內容
const params = new URLSearchParams(window.location.search);
const area = params.get('area');

document.getElementById('title').textContent =`${area}`;

fetch(`./data/${area}_Suburb.json`)
    .then(res => {
        // 🔍 先檢查 HTTP 狀態
        if (!res.ok) {
            throw new Error(`HTTP 錯誤: ${res.status}`);
        }

        // 🔍 檢查是不是 JSON
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("回傳不是 JSON（可能是 404 HTML）");
        }

        return res.json();
    })
    .then(json => {

        let suburbs = Object.keys(json);

        suburbs.sort((a, b) => a.localeCompare(b));

        suburbs.forEach(suburb => {

            const btn = document.createElement('button');
            btn.className = 'suburb-btn';

            btn.innerHTML = `
                <div class="suburb-text">${suburb}</div>
            `;

            btn.addEventListener('click', () => {
                window.location.href =
                    `road-search.html?area=${area}&suburb=${encodeURIComponent(suburb)}`;
            });

            suburbListDiv.appendChild(btn);
        });
    })
    .catch(err => {
        console.error("讀取失敗:", err);

        // 👇 顯示錯誤在畫面上
        suburbListDiv.innerHTML = `
            <div class="no-result">
                JSON 載入失敗<br>
                ${err.message}
            </div>
        `;
    });


// 返回功能
document.getElementById('backBtn').addEventListener('click', () => {
    if (document.referrer) {
        history.back();
    } else {
        window.location.href = 'index.html';
    }
});