const suburbListDiv = document.getElementById('suburbList');

// 根據Area調整Title內容
const params = new URLSearchParams(window.location.search);
const area = params.get('area');

document.getElementById('title').textContent =`${area}`;

fetch(`./data/${area}_Suburb.json`)
    .then(res => res.json())
    .then(json => {

        // 取得 suburb key
        let suburbs = Object.keys(json);

        // A-Z 排序
        suburbs.sort((a, b) => a.localeCompare(b));

        suburbs.forEach(suburb => {

            const btn = document.createElement('button');
            btn.className = 'suburb-btn';

            btn.innerHTML = `
                <div class="suburb-text">${suburb}</div>
            `;

            // 帶 area + suburb
            btn.addEventListener('click', () => {
                window.location.href =
                    `road-search.html?area=${area}&suburb=${encodeURIComponent(suburb)}`;
            });

            suburbListDiv.appendChild(btn);
        });
    })
    .catch(err => {
        console.error("讀取失敗:", err);
    });


// 返回功能
document.getElementById('backBtn').addEventListener('click', () => {
    if (document.referrer) {
        history.back();
    } else {
        window.location.href = 'index.html';
    }
});